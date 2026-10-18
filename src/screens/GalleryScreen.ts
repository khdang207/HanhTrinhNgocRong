import type { Game } from '../core/Game.js';
import type { Input } from '../core/Input.js';
import type { Screen } from './Screen.js';
import { TitleScreen } from './TitleScreen.js';
import { RACES } from '../data/races.js';
import { laySpriteNhanVat, laySpriteQuai, laySpriteNPC, layTile, type HanhDong } from '../rendering/SpriteFactory.js';

// Màn hình gallery xem toàn bộ asset vẽ bằng code
export class GalleryScreen implements Screen {
  private hanhDongs: HanhDong[] = ['idle', 'di', 'nhay', 'bay', 'danh', 'bidau'];
  private thoiGian = 0;

  constructor(private game: Game) {}

  update(dt: number, input: Input): void {
    this.thoiGian += dt;
    if (input.isPressed('escape') || input.isPressed('g')) {
      this.game.doiManHinh(new TitleScreen(this.game));
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    const w = ctx.canvas.width;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, ctx.canvas.height);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.fillText('GALLERY - ASSET VẼ BẰNG CODE', 20, 30);
    ctx.font = '13px monospace';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('Nhấn G hoặc Esc để quay lại', 20, 52);

    let y = 80;
    for (const race of RACES) {
      ctx.fillStyle = '#ffd60a';
      ctx.font = 'bold 15px monospace';
      ctx.fillText('Tộc: ' + race.ten, 20, y);
      y += 10;
      let x = 20;
      for (const hd of this.hanhDongs) {
        const sprites = laySpriteNhanVat(race.id, hd);
        const idx = Math.floor(this.thoiGian * 4) % sprites.length;
        const img = sprites[idx];
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x - 4, y, 72, 84);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px monospace';
        ctx.fillText(hd, x, y + 78);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, x + 4, y + 4, 64, 64);
        x += 84;
      }
      y += 100;
    }

    ctx.fillStyle = '#ffd60a';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('Quái và NPC', 20, y);
    y += 10;
    let x2 = 20;
    const ds = [
      { img: laySpriteQuai(0)[0], ten: 'quai_xanh' },
      { img: laySpriteQuai(1)[0], ten: 'quai_do' },
      { img: laySpriteNPC('onggia'), ten: 'ong_gia' },
      { img: laySpriteNPC('cogai'), ten: 'co_gai' },
    ];
    for (const it of ds) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(x2 - 4, y, 72, 84);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(it.ten, x2, y + 78);
      ctx.drawImage(it.img, x2 + 4, y + 4, 64, 64);
      x2 += 84;
    }
  }
}
