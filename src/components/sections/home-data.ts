import type { Plan, Testimonial } from "./home-types"

export const palette = {
  teal: "#0d9488",
  blue: "#0B3BFF",
  cyan: "#06b6d4",
  ink: "#050B1A",
  ink2: "#071129",
  textPrimary: "#EAF0FF",
  textSecondary: "rgba(234,240,255,0.72)",
}

export const workflowFallback: Array<{ title: string; body: string }> = [
  {
    title: "Digital Catalog",
    body: "Publish your complete product and service catalog with specs, SLAs, and branch-level visibility.",
  },
  { title: "Smart Offers", body: "Generate winning quotations with templates and controlled approval paths." },
  { title: "Operational Sync", body: "Coordinate delivery, procurement, and branch inventory from one timeline." },
  { title: "Financial Control", body: "Close the loop with invoicing, compliance, and cashflow analytics." },
]

export const operationsFallback: Array<{ title: string; body: string }> = [
  { title: "Branch Synchronization", body: "Route offers and availability between branches with one source of truth." },
  { title: "Procurement Intelligence", body: "Forecast demand movement and optimize sourcing windows before pressure hits." },
  { title: "Execution Visibility", body: "Trace every step from inquiry to compliant invoicing with accountability." },
]

export const industriesFallback = [
  "Engineering Offices",
  "Building Materials",
  "Ready Mix Concrete",
  "Crushers & Quarries",
  "Soil Testing Labs",
  "Contracting Companies",
  "Designers",
  "Equipment Rentals",
]

export const testimonialFallback: Testimonial[] = [
  {
    quote: "We replaced disconnected spreadsheets with one reliable operating flow across procurement, sales, and finance.",
    author: "Rania Al-Harthy",
    role: "Head of Operations",
    company: "Revibe",
    logo: "/images/revibe.png",
  },
  {
    quote: "Branch teams finally share one source of truth. Quote delivery speed improved within the first month.",
    author: "Khaled Mansour",
    role: "Commercial Director",
    company: "ShopGalaxy",
    logo: "/images/shopgalaxy.jpg",
  },
  {
    quote: "Finance gained cleaner approvals and faster invoice cycles with fewer handoffs and zero ambiguity.",
    author: "Sara Al-Qahtani",
    role: "Finance Controller",
    company: "ShopWise",
    logo: "/images/shopwise.jpg",
  },
]

export const plansFallback: Plan[] = [
  { name: "Amtar Basic", price: "Free", period: "Forever", points: ["Catalog", "Supply requests", "Basic invoicing", "One city"] },
  {
    name: "Amtar Growth",
    price: "1609 SAR",
    period: "Annual",
    featured: true,
    points: ["All Saudi cities", "2 team accounts", "Custom domain", "Professional design"],
  },
  {
    name: "Amtar PRO",
    price: "3769 SAR",
    period: "Annual",
    points: ["Instant VAT", "5 team accounts", "Branch management", "Marketplace listing"],
  },
]

export const themeShowcase = [
  { title: "Minimal Commerce", image: "/images/theme1.png" },
  { title: "Industrial Grid", image: "/images/theme2.png" },
  { title: "Material Flow", image: "/images/theme3.png" },
  { title: "Executive Premium", image: "/images/theme4.png" },
]

export const dashboardProof = [
  "/images/dashboard.png",
  "/images/analytics-dashboard.png",
  "/images/analytics-dashboard1.png",
  "/images/analytics-dashboard2.png",
]
