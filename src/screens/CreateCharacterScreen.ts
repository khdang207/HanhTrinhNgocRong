import type { Game } from '../core/Game.js';
import type { Input } from '../core/Input.js';
import type { Screen } from './Screen.js';
import { RACES } from '../data/races.js';
import { PlayScreen } from './PlayScreen.js';
import { Player } from '../entities/Player.js';

// Màn hình tạo nhân vật: chọn chủng tộc
export class CreateCharacterScreen implements Screen {
  private chon = 0;

  constructor(private game: Game) {}

  update(_dt: number, input: Input): void {
    if (input.isPressed('arrowleft') || input.isPressed('a')) {
      this.chon = (this.chon + RACES.length - 1) % RACES.length;
    }
    if (input.isPressed('arrowright') || input.isPressed('d')) {
      this.chon = (this.chon + 1) % RACES.length;
    }
    if (input.isPressed('enter') || input.isPressed(' ')) {
      this.batDauChoi();
    }
    if (input.mouseClicked) {
      const w = 960;
      const vung = Math.floor(input.mouseX / (w / 3));
      if (vung >= 0 && vung < 3) this.chon = vung;
    }
  }

  private batDauChoi(): void {
    const race = RACES[this.chon];
    const player = new Player(race);
    this.game.doiManHinh(new PlayScreen(this.game, player));
  }

  render(ctx: CanvasRenderingContext2D): void {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.fillStyle = '#101528';
    ctx.fillRect(0, 0, w, h);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('TẠO NHÂN VẬT - CHỌN CHỦNG TỘC', w / 2, 70);
    ctx.font = '14px monospace';
    ctx.fillStyle = '#aaaaaa';
    ctx.fillText('Dùng phím ← → để chọn, Enter để bắt đầu', w / 2, 100);

    const boxW = 220;
    const boxH = 260;
    const startX = w / 2 - (boxW * 3 + 40) / 2;
    const y = 140;

    for (let i = 0; i < RACES.length; i++) {
      const r = RACES[i];
      const x = startX + i * (boxW + 20);
      const dangChon = i === this.chon;
      ctx.fillStyle = dangChon ? '#ffd60a' : '#2a3350';
      ctx.fillRect(x - 4, y - 4, boxW + 8, boxH + 8);
      ctx.fillStyle = '#1b2340';
      ctx.fillRect(x, y, boxW, boxH);
      ctx.fillStyle = r.mauAo;
      ctx.fillRect(x + boxW / 2 - 20, y + 30, 40, 50);
      ctx.fillStyle = '#ffdbac';
      ctx.fillRect(x + boxW / 2 - 15, y + 10, 30, 22);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.fillText(r.ten, x + boxW / 2, y + 120);
      ctx.font = '13px monospace';
      ctx.fillStyle = '#9df09d';
      ctx.fillText(r.moTa, x + boxW / 2, y + 145);
      ctx.fillStyle = '#cccccc';
      ctx.font = '12px monospace';
      ctx.fillText('HP: ' + r.hp, x + boxW / 2, y + 175);
      ctx.fillText('KI: ' + r.ki, x + boxW / 2, y + 195);
      ctx.fillText('Sức đánh: ' + r.sucDanh, x + boxW / 2, y + 215);
      if (dangChon) {
        ctx.fillStyle = '#ffd60a';
        ctx.font = '14px monospace';
        ctx.fillText('▶ ĐANG CHỌN ◀', x + boxW / 2, y + 245);
      }
    }
  }
}
