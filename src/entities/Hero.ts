import type { Input } from '../core/Input.js';
import { laySpriteHero, type Huong } from '../rendering/TopDownSprites.js';

// Nhân vật hero top-down kiểu Zelda
export class Hero {
  x = 400;
  y = 300;
  rong = 32;
  cao = 40;
  huong: Huong = 'xuong';
  dangDi = false;
  private frame = 0;
  private demThoiGian = 0;
  tocDo = 180;

  update(dt: number, input: Input, vaCham: (x: number, y: number) => boolean): void {
    let dx = 0;
    let dy = 0;
    if (input.isDown('a') || input.isDown('arrowleft')) dx -= 1;
    if (input.isDown('d') || input.isDown('arrowright')) dx += 1;
    if (input.isDown('w') || input.isDown('arrowup')) dy -= 1;
    if (input.isDown('s') || input.isDown('arrowdown')) dy += 1;

    this.dangDi = dx !== 0 || dy !== 0;

    // ưu tiên hướng ngang khi đi chéo để sprite đẹp
    if (dx !== 0 && dy !== 0) {
      // giữ hướng cũ nếu đang đi chéo, chỉ cập nhật khi đổi hẳn
      if (dx !== 0) this.huong = dx < 0 ? 'trai' : 'phai';
    } else if (dx !== 0) {
      this.huong = dx < 0 ? 'trai' : 'phai';
    } else if (dy !== 0) {
      this.huong = dy < 0 ? 'len' : 'xuong';
    }

    // chuẩn hóa vector chéo
    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    const nx = this.x + dx * this.tocDo * dt;
    const ny = this.y + dy * this.tocDo * dt;

    // va chạm đơn giản theo tile
    if (!vaCham(nx, this.y)) this.x = nx;
    if (!vaCham(this.x, ny)) this.y = ny;

    // animation
    if (this.dangDi) {
      this.demThoiGian += dt;
      if (this.demThoiGian > 0.18) {
        this.demThoiGian = 0;
        this.frame = (this.frame + 1) % 2;
      }
    } else {
      this.frame = 0;
      this.demThoiGian = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const ds = laySpriteHero(this.huong);
    const img = ds[this.frame];
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, Math.round(this.x - 16), Math.round(this.y - 20), 32, 40);
  }
}
