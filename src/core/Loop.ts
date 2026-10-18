// Vòng lặp game với timestep cố định để logic ổn định trên mọi máy
export class Loop {
  private rafId = 0;
  private lastTime = 0;
  private acc = 0;
  private running = false;

  // step: thời gian mỗi tick logic (giây), ví dụ 1/60
  constructor(
    private step: number,
    private onUpdate: (dt: number) => void,
    private onRender: () => void
  ) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now() / 1000;
    this.acc = 0;
    const frame = () => {
      if (!this.running) return;
      const now = performance.now() / 1000;
      let delta = now - this.lastTime;
      this.lastTime = now;
      if (delta > 0.25) delta = 0.25;
      this.acc += delta;
      while (this.acc >= this.step) {
        this.onUpdate(this.step);
        this.acc -= this.step;
      }
      this.onRender();
      this.rafId = requestAnimationFrame(frame);
    };
    this.rafId = requestAnimationFrame(frame);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.rafId);
  }
}
