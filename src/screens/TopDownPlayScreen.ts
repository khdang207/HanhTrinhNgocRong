import type { Game } from '../core/Game.js';
import type { Input } from '../core/Input.js';
import type { Screen } from './Screen.js';
import { TitleScreen } from './TitleScreen.js';
import { Hero } from '../entities/Hero.js';
import { layTileDep, laySpriteSlime, type LoaiTileDep } from '../rendering/TopDownSprites.js';

// Map top-down đơn giản 25x18 tile, mỗi tile 32px
const MAP: LoaiTileDep[][] = [];
const RONG_MAP = 25;
const CAO_MAP = 18;

function taoMap(): void {
  if (MAP.length > 0) return;
  for (let y = 0; y < CAO_MAP; y++) {
    const hang: LoaiTileDep[] = [];
    for (let x = 0; x < RONG_MAP; x++) {
      // viền nước
      if (x === 0 || y === 0 || x === RONG_MAP - 1 || y === CAO_MAP - 1) {
        hang.push('nuoc');
      } else if (x === 5 && y === 4) {
        hang.push('nha');
      } else if ((x === 10 && y === 8) || (x === 15 && y === 5) || (x === 18 && y === 12)) {
        hang.push('cay');
      } else if ((x + y) % 7 === 0) {
        hang.push('co_hoa');
      } else if (x >= 8 && x <= 12 && y === 10) {
        hang.push('duong');
      } else if ((x === 7 && y === 7) || (x === 16 && y === 10)) {
        hang.push('da');
      } else {
        hang.push('co');
      }
    }
    MAP.push(hang);
  }
}

// Kiểm tra va chạm: nước, cây, nhà, đá thì chặn
function laTileChan(tile: LoaiTileDep): boolean {
  return tile === 'nuoc' || tile === 'cay' || tile === 'nha' || tile === 'da';
}

// Màn chơi hero adventure top-down
export class TopDownPlayScreen implements Screen {
  private hero = new Hero();
  private thoiGian = 0;
  private slimeX = 500;
  private slimeY = 200;
  private slimeHuong = 1;

  constructor(private game: Game) {
    taoMap();
    this.hero.x = 400;
    this.hero.y = 300;
  }

  private vaCham(x: number, y: number): boolean {
    // kiểm tra 4 góc của hero
    const diem = [
      { px: x - 10, py: y - 8 },
      { px: x + 10, py: y - 8 },
      { px: x - 10, py: y + 12 },
      { px: x + 10, py: y + 12 },
    ];
    for (const d of diem) {
      const tx = Math.floor(d.px / 32);
      const ty = Math.floor(d.py / 32);
      if (tx < 0 || ty < 0 || tx >= RONG_MAP || ty >= CAO_MAP) return true;
      if (laTileChan(MAP[ty][tx])) return true;
    }
    return false;
  }

  update(dt: number, input: Input): void {
    this.thoiGian += dt;
    if (input.isPressed('escape')) {
      this.game.doiManHinh(new TitleScreen(this.game));
      return;
    }
    this.hero.update(dt, input, (x, y) => this.vaCham(x, y));

    // slime đi qua lại đơn giản
    this.slimeX += this.slimeHuong * 40 * dt;
    if (this.slimeX > 600) this.slimeHuong = -1;
    if (this.slimeX < 450) this.slimeHuong = 1;

    const cam = this.game.layCamera();
    cam.follow(this.hero.x, this.hero.y, RONG_MAP * 32, CAO_MAP * 32);
  }

  render(ctx: CanvasRenderingContext2D): void {
    const cam = this.game.layCamera();
    ctx.save();
    cam.apply(ctx);

    // vẽ map
    const x0 = Math.max(0, Math.floor(cam.x / 32));
    const y0 = Math.max(0, Math.floor(cam.y / 32));
    const x1 = Math.min(RONG_MAP - 1, Math.ceil((cam.x + ctx.canvas.width) / 32));
    const y1 = Math.min(CAO_MAP - 1, Math.ceil((cam.y + ctx.canvas.height) / 32));

    ctx.imageSmoothingEnabled = false;
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const tile = MAP[y][x];
        const ds = layTileDep(tile);
        const idx = ds.length > 1 ? Math.floor(this.thoiGian * 2) % ds.length : 0;
        ctx.drawImage(ds[idx], x * 32, y * 32, 32, 32);
      }
    }

    // vẽ slime
    const slimeFrame = Math.floor(this.thoiGian * 3) % 2;
    const slimeImg = laySpriteSlime(slimeFrame);
    ctx.drawImage(slimeImg, Math.round(this.slimeX - 16), Math.round(this.slimeY - 14), 32, 28);

    // vẽ hero
    this.hero.render(ctx);

    ctx.restore();

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(10, 10, 320, 64);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('HERO ADVENTURE - Top-down', 20, 32);
    ctx.fillStyle = '#9df09d';
    ctx.font = '12px monospace';
    ctx.fillText('WASD / phím mũi tên để đi, Esc để về title', 20, 52);
    ctx.fillText('Đi quanh làng, tránh nước và cây', 20, 68);
  }
}
