// Camera đi theo nhân vật, có giới hạn trong map
export class Camera {
  x = 0;
  y = 0;

  constructor(public width: number, public height: number) {}

  follow(tx: number, ty: number, mapW?: number, mapH?: number): void {
    this.x = tx - this.width / 2;
    this.y = ty - this.height / 2;
    if (mapW !== undefined) {
      this.x = Math.max(0, Math.min(this.x, Math.max(0, mapW - this.width)));
    }
    if (mapH !== undefined) {
      this.y = Math.max(0, Math.min(this.y, Math.max(0, mapH - this.height)));
    }
  }

  apply(ctx: CanvasRenderingContext2D): void {
    ctx.translate(-Math.round(this.x), -Math.round(this.y));
  }
}
