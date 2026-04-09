// @ts-nocheck
// @ts-ignore
function WaveGenerator(e: any) {
  this.init(e || {});
}

WaveGenerator.prototype = {
  init: function (e: any) {
    this.phase = e.phase || 0;
    this.offset = e.offset || 0;
    this.frequency = e.frequency || 0.001;
    this.amplitude = e.amplitude || 1;
  },
  update: function () {
    return (
      (this.phase += this.frequency),
      (e = this.offset + Math.sin(this.phase) * this.amplitude)
    );
  },
  value: function () {
    return e;
  },
};

// @ts-ignore
function Line(e: any) {
  this.init(e || {});
}

Line.prototype = {
  init: function (e: any) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (let t, n = 0; n < E.size; n++) {
      t = new Node();
      (t as any).x = pos.x;
      (t as any).y = pos.y;
      this.nodes.push(t);
    }
  },
  update: function () {
    let e = this.spring,
      t = this.nodes[0];
    (t as any).vx += (pos.x - (t as any).x) * e;
    (t as any).vy += (pos.y - (t as any).y) * e;
    for (let n, i = 0, a = this.nodes.length; i < a; i++) {
      t = this.nodes[i];
      if (0 < i) {
        n = this.nodes[i - 1];
        (t as any).vx += ((n as any).x - (t as any).x) * e;
        (t as any).vy += ((n as any).y - (t as any).y) * e;
        (t as any).vx += (n as any).vx * E.dampening;
        (t as any).vy += (n as any).vy * E.dampening;
      }
      (t as any).vx *= this.friction;
      (t as any).vy *= this.friction;
      (t as any).x += (t as any).vx;
      (t as any).y += (t as any).vy;
      e *= E.tension;
    }
  },
  draw: function () {
    let e,
      t,
      n = (this.nodes[0] as any).x,
      i = (this.nodes[0] as any).y;
    ctx.beginPath();
    ctx.moveTo(n, i);
    for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
      e = this.nodes[a];
      t = this.nodes[a + 1];
      n = 0.5 * ((e as any).x + (t as any).x);
      i = 0.5 * ((e as any).y + (t as any).y);
      ctx.quadraticCurveTo((e as any).x, (e as any).y, n, i);
    }
    e = this.nodes[a];
    t = this.nodes[a + 1];
    ctx.quadraticCurveTo((e as any).x, (e as any).y, (t as any).x, (t as any).y);
    ctx.stroke();
    ctx.closePath();
  },
};

// @ts-ignore
function onMousemove(e: any) {
  function o() {
    lines = [];
    for (let e = 0; e < E.trails; e++)
      lines.push(
        new Line({ spring: 0.45 + (e / E.trails) * 0.025 })
      );
  }
  function c(e: any) {
    e.touches
      ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
      : ((pos.x = e.clientX), (pos.y = e.clientY));
    e.preventDefault();
  }
  function l(e: any) {
    if (1 == e.touches.length) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }
  document.removeEventListener("mousemove", onMousemove as any);
  document.removeEventListener("touchstart", onMousemove as any);
  document.addEventListener("mousemove", c);
  document.addEventListener("touchmove", c);
  document.addEventListener("touchstart", l);
  c(e);
  o();
  render();
}

function render() {
  if ((ctx as any).running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "hsla(" + Math.round(f.update()) + ",100%,50%,0.025)";
    ctx.lineWidth = 10;
    for (let e, t = 0; t < E.trails; t++) {
      e = lines[t];
      e.update();
      e.draw();
    }
    (ctx as any).frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

let ctx: CanvasRenderingContext2D;
let f: any;
let e = 0;
let pos = { x: 0, y: 0 };
let lines: any[] = [];
const E = {
  debug: true,
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

function Node() {
  (this as any).x = 0;
  (this as any).y = 0;
  (this as any).vy = 0;
  (this as any).vx = 0;
}

export const renderCanvas = function (options?: { enabled?: boolean; trails?: number; size?: number }) {
  if (options?.enabled === false) {
    return () => {}
  }

  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null
  const nextCtx = canvas?.getContext("2d")
  if (!canvas || !nextCtx) {
    return () => {}
  }

  ctx = nextCtx as CanvasRenderingContext2D
  ;(ctx as any).running = true
  ;(ctx as any).frame = 1

  if (typeof options?.trails === "number") {
    E.trails = Math.max(0, Math.floor(options.trails))
  }
  if (typeof options?.size === "number") {
    E.size = Math.max(0, Math.floor(options.size))
  }

  f = new WaveGenerator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });
  document.addEventListener("mousemove", onMousemove as any);
  document.addEventListener("touchstart", onMousemove as any);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  const onFocus = () => {
    if (!(ctx as any).running) {
      ;(ctx as any).running = true
      render()
    }
  }
  const onBlur = () => {
    ;(ctx as any).running = false
  }
  window.addEventListener("focus", onFocus)
  window.addEventListener("blur", onBlur)
  resizeCanvas();

  return () => {
    ;(ctx as any).running = false
    document.removeEventListener("mousemove", onMousemove as any)
    document.removeEventListener("touchstart", onMousemove as any)
    document.body.removeEventListener("orientationchange", resizeCanvas)
    window.removeEventListener("resize", resizeCanvas)
    window.removeEventListener("focus", onFocus)
    window.removeEventListener("blur", onBlur)
  }
};
