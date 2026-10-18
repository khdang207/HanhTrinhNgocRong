import type { RaceInfo } from '../data/races.js';
import type { Input } from '../core/Input.js';
import { laySpriteNhanVat, type HanhDong } from '../rendering/SpriteFactory.js';

// Nhân vật người chơi dùng sprite procedural có animation
export class Player {
  x = 100;
  y = 300;
  vx = 0;
  vy = 0;
  rong = 24;
  cao = 36;
  trenMatDat = false;
  private hanhDong: HanhDong = 'idle';
  private frame = 0;
  private demThoiGian = 0;
  private dangDanh = false;

  constructor(public race: RaceInfo) {}

  update(dt: number, input: Input, sanNha: number): void {
    const tocDo = 220;
    const axis = input.getAxis();
    this.vx = axis * tocDo;

    if (input.isPressed('j')) {
      this.dangDanh = true;
      this.hanhDong = 'danh';
      this.frame = 0;
      this.demThoiGian = 0;
    }

    if ((input.isPressed(' ') || input.isPressed('w') || input.isPressed('arrowup')) && this.trenMatDat) {
      this.vy = -520;
      this.trenMatDat = false;
    }

    this.vy += 1400 * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    const chanY = sanNha - this.cao;
    if (this.y >= chanY) {
      this.y = chanY;
      this.vy = 0;
      this.trenMatDat = true;
    } else {
      this.trenMatDat = false;
    }

    if (this.x < 0) this.x = 0;
    if (this.x > 1600 - this.rong) this.x = 1600 - this.rong;

    if (!this.dangDanh) {
      if (!this.trenMatDat) {
        if (input.isDown('w')) this.hanhDong = 'bay';
        else this.hanhDong = 'nhay';
      } else if (Math.abs(this.vx) > 10) {
        this.hanhDong = 'di';
      } else {
        this.hanhDong = 'idle';
      }
    }

    this.demThoiGian += dt;
    const tocDoFrame = this.hanhDong === 'di' ? 0.12 : 0.22;
    if (this.demThoiGian >= tocDoFrame) {
      this.demThoiGian = 0;
      const ds = laySpriteNhanVat(this.race.id, this.hanhDong);
      this.frame = (this.frame + 1) % ds.length;
      if (this.dangDanh && this.frame === 0) {
        this.dangDanh = false;
        this.hanhDong = 'idle';
      }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(this.x + 2, this.y + this.cao - 2, this.rong - 4, 4);
    const ds = laySpriteNhanVat(this.race.id, this.hanhDong);
    const img = ds[this.frame % ds.length];
    const lat = this.vx < 0;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    if (lat) {
      ctx.translate(Math.round(this.x + this.rong / 2), Math.round(this.y));
      ctx.scale(-1, 1);
      ctx.drawImage(img, -16, -6, 32, 48);
    } else {
      ctx.drawImage(img, Math.round(this.x - 4), Math.round(this.y - 6), 32, 48);
    }
    ctx.restore();
  }
}
