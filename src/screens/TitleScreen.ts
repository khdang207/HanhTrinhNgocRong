import type { Game } from '../core/Game.js';
import type { Input } from '../core/Input.js';
import type { Screen } from './Screen.js';
import { CreateCharacterScreen } from './CreateCharacterScreen.js';
import { GalleryScreen } from './GalleryScreen.js';
import { TopDownPlayScreen } from './TopDownPlayScreen.js';

// Màn hình tiêu đề
export class TitleScreen implements Screen {
  private thoiGian = 0;

  constructor(private game: Game) {}

  update(dt: number, input: Input): void {
    this.thoiGian += dt;
    if (input.isPressed('g')) {
      this.game.doiManHinh(new GalleryScreen(this.game));
      return;
    }
    if (input.isPressed('t')) {
      this.game.doiManHinh(new TopDownPlayScreen(this.game));
      return;
    }
    if (input.isPressed('enter') || input.mouseClicked) {
      this.game.doiManHinh(new CreateCharacterScreen(this.game));
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#1a2a6c');
    g.addColorStop(1, '#0b1020');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd60a';
    ctx.font = 'bold 42px monospace';
    ctx.fillText('DRAGON QUEST ONLINE', w / 2, h / 2 - 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px monospace';
    ctx.fillText('HÀNH TRÌNH NGỌC RỒNG', w / 2, h / 2 - 20);
    ctx.font = '16px monospace';
    ctx.fillStyle = '#9df09d';
    if (Math.floor(this.thoiGian * 2) % 2 === 0) {
      ctx.fillText('Nhấn Enter để bắt đầu (side-view)', w / 2, h / 2 + 40);
    }
    ctx.fillStyle = '#7dd3fc';
    ctx.font = '14px monospace';
    ctx.fillText('Nhấn T để chơi Hero Adventure top-down kiểu Zelda', w / 2, h / 2 + 65);
    ctx.fillText('Nhấn G để xem Gallery sprite', w / 2, h / 2 + 85);
    ctx.fillStyle = '#888888';
    ctx.font = '12px monospace';
    ctx.fillText('Fan game phi thương mại - chạy offline', w / 2, h - 30);
  }
}
