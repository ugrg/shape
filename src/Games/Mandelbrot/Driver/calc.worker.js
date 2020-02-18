import calc from "./calc";

const TASK_FOR_WORKER = "TASK-FOR-WORKER";
let timer = 0;

self.addEventListener("message", ({ data: { type, fn, args } }) => {
  if (type !== TASK_FOR_WORKER) return;
  switch (fn) {
    case "calc": {
      return run(...args);
    }
    case "discontinue": {
      return clearInterval(timer);
    }
  }
});

function run ([sx, sy, ex, ey], zoom, index, iterations, escapeRadius, superSamples, colorScheme) {
  let ci = sy + zoom * index;
  timer = setInterval(() => {
    self.postMessage({
      type: TASK_FOR_WORKER,
      db: calc(sx, ex, zoom, ci, superSamples, escapeRadius, iterations, colorScheme),
      ci: ci
    }, undefined);
    ci -= zoom * 4;
    if (ci < ey) clearInterval(timer);
  }, 0);
}
