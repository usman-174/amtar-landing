#!/usr/bin/env node
/**
 * Compress images in public/v2/ in place (same filenames; safe temp + rename).
 *
 *   npm run compress:v2
 *
 * JPG: mozjpeg, quality ~80, max width 1920px (keeps aspect ratio).
 * PNG: zlib compression (no format change — keeps transparency if present).
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, "..")
const V2_DIR = path.join(ROOT, "public", "v2")

const MAX_WIDTH = 1920
const JPEG_QUALITY = 80
const PNG_COMPRESSION = 9
const PNG_EFFORT = 10

function formatBytes(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
}

async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const base = path.basename(filePath)
  const tmp = `${filePath}.compressing`

  const beforeBuf = await fs.readFile(filePath)
  const before = beforeBuf.length

  let pipeline = sharp(beforeBuf).rotate()

  const meta = await pipeline.metadata()
  const w = meta.width ?? 0
  if (w > MAX_WIDTH) {
    pipeline = pipeline.resize(MAX_WIDTH, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
  }

  try {
    if (ext === ".jpg" || ext === ".jpeg") {
      await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp)
    } else if (ext === ".png") {
      await pipeline.png({ compressionLevel: PNG_COMPRESSION, effort: PNG_EFFORT }).toFile(tmp)
    } else {
      console.log(`skip ${base} (use .jpg / .jpeg / .png)`)
      return
    }

    const { size: after } = await fs.stat(tmp)
    await fs.rename(tmp, filePath)
    const pct = before > 0 ? ((1 - after / before) * 100).toFixed(1) : "0"
    console.log(`${base}: ${formatBytes(before)} → ${formatBytes(after)} (−${pct}%)`)
  } catch (err) {
    await fs.unlink(tmp).catch(() => {})
    throw err
  }
}

async function main() {
  let names
  try {
    names = await fs.readdir(V2_DIR)
  } catch {
    console.error(`Missing folder: ${V2_DIR}`)
    process.exit(1)
  }

  const images = names.filter((n) => /\.(jpe?g|png)$/i.test(n)).sort()
  if (images.length === 0) {
    console.log("No .jpg / .png files in public/v2/")
    return
  }

  console.log(`Compressing ${images.length} file(s) in public/v2/ …\n`)
  for (const name of images) {
    await compressFile(path.join(V2_DIR, name))
  }
  console.log("\nDone. Commit the smaller files when you are happy with quality.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
