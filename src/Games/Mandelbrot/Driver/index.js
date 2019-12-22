import NodeEvent from "events";
import TaskManagement from "./TaskManagement";

const ZOOM_START = 6;

class Driver extends NodeEvent {
  constructor (canvas, width, height) {
    super();
    this.taskManagement = new TaskManagement(4);
    this.canvas = canvas;
    this.W = width;
    this.H = height;
    // 屏幕中央点的虚拟坐标。
    this.c = [-0.5, 0];
    // 比例尺子，代表每个像素点对应虚拟坐标系中的长度
    this.zoom = ZOOM_START / width;
    this.taskManagement.onData(this.handleData.bind(this));
  }

  // 给定虚拟坐标系，求出实际位置。
  getPixelPoint ([x, y]) {
    const { c: [cx, cy], W, H, zoom } = this;
    return [
      W / 2 + (x - cx) / zoom,
      H / 2 - (y - cy) / zoom
    ];
  }

  // 给定实际坐标位置，求解虚拟坐标系坐标
  getMathPoint ([X, Y]) {
    const { c: [cx, cy], W, H, zoom } = this;
    return [
      cx + (X - W / 2) * zoom,
      cy - (Y - H / 2) * zoom
    ];
  }

  resize (width, height) {
    this.W = width;
    this.H = height;
  }

  setSettings ({ iterations, autoIterations, escapeRadius, colorScheme, superSamples, updateTimeout }) {
    this.settings = { iterations, autoIterations, escapeRadius, colorScheme, superSamples, updateTimeout };
  }

  setZoomOut (EX, EY) {
    this.c = this.getMathPoint([EX, EY]);
    this.zoom *= 2;
  }

  setZoom ([SX, SY, EX, EY], zoomOut) {
    if (SX === EX) EX += 5;
    if (SY === EY) EY += 5;
    if (zoomOut) return this.setZoomOut(SY, EY);
    const { W, H } = this;
    const NC = [
      Math.abs(SX - EX) / 2 + Math.min(SX, EX),
      Math.abs(SY - EY) / 2 + Math.min(SY, EY)
    ];
    const [sx, sy] = this.getMathPoint([SX, SY]);
    const [ex, ey] = this.getMathPoint([EX, EY]);
    const w = Math.abs(sx - ex);
    const h = Math.abs(sy - ey);
    const c = this.c;
    this.c = this.getMathPoint(NC);
    console.info("from [%f, %f],to [%f, %f],NC is [%f, %f]", ...c, ...this.c, ...NC);
    this.zoom = (w / h > W / H) ? w / W : h / H;
  }

  draw () {
    this.discontinue();
    const { settings, W, H, zoom } = this;
    const [sx, sy] = this.getMathPoint([0, 0]);
    const [ex, ey] = this.getMathPoint([W, H]);
    console.info("draw [%f, %f]", ...this.c);
    // 迭代次数
    const iterations = !settings.autoIterations
      ? settings.iterations
      : Math.floor(223.0 / Math.sqrt(0.001 + 2.0 * Math.min(
        Math.abs(sx - ex),
        Math.abs(sy - ey)
      )));
    const escapeRadius = Math.pow(settings.escapeRadius, 2.0);
    this.taskManagement.send([sx, sy, ex, ey], zoom, iterations, escapeRadius, settings.superSamples, settings.colorScheme);
    this.waitDate();
  }

  waitDate () {
    const { canvas, W, H, settings: { updateTimeout } } = this;
    const start = new Date().valueOf();
    let pixels = 0;
    this.buffer = [];
    const ctx = canvas.getContext("2d");
    const img = new ImageData(W, 1);
    this.timer = setInterval(() => {
      const buffer = this.buffer;
      this.buffer = [];
      buffer.forEach(([out, h]) => {
        let offset = 0;
        out.forEach(([r, g, b]) => {
          img.data[offset++] = r;
          img.data[offset++] = g;
          img.data[offset++] = b;
          img.data[offset++] = 0xff;
        });
        pixels += W;
        ctx.putImageData(img, 0, Math.round(h));
      });
      this.emit("update", { renderTime: new Date().valueOf() - start, pixels });
      if (pixels / W >= H) {
        clearInterval(this.timer);
        this.timer = false;
      }
    }, updateTimeout);
  }

  handleData (db, ci) {
    this.buffer.push([db, this.getPixelPoint([0, ci])[1]]);
  }

  discontinue () {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.taskManagement.discontinue();
  }
}

export default Driver;
