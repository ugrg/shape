import Worker from "./calc.worker.js";

const TASK_FOR_WORKER = "TASK-FOR-WORKER";

class TaskManagement {
  constructor (pool = 1) {
    this.pool = Array(pool).fill(0).map(() => new Worker());
    this.pool.forEach((worker) => {
      worker.addEventListener("message", this.handleMessage.bind(this));
    });
  }

  handleMessage (message) {
    const { type, db, ci } = message.data;
    if (type !== TASK_FOR_WORKER) return;
    this.resolve(db, ci);
  }

  onData (callback) {
    this.resolve = callback;
  }

  send ([sx, sy, ex, ey], zoom, iterations, escapeRadius, superSamples, colorScheme) {
    this.pool.forEach((worker, i) => {
      worker.postMessage({
        type: TASK_FOR_WORKER,
        fn: "calc",
        args: [
          [sx, sy, ex, ey],
          zoom,
          i,
          iterations,
          escapeRadius,
          superSamples,
          colorScheme
        ]
      });
    });
  }

  discontinue () {
    this.task = {};
    this.pool.forEach(worker => worker.postMessage({ type: TASK_FOR_WORKER, fn: "discontinue" }));
  }
}

export default TaskManagement;
