import type { Game } from '../core/Game.js';
import type { Input } from '../core/Input.js';
import type { Screen } from './Screen.js';
import type { Player } from '../entities/Player.js';

// Màn hình chơi thử: map test 1600px
export class PlayScreen implements Screen {
  private mapW = 1600;
  private mapH = 540;
  private sanNha = 480;

  constructor(private game: Game, private player: Player) {}

  update(dt: number, input: Input): void {
    this.player.update(dt, input, this.sanNha);
    const cam = this.game.layCamera();
    cam.follow(this.player.x + this.player.rong / 2, this.player.y, this.mapW, this.mapH);
  }

  render(ctx: CanvasRenderingContext2D): void {
    const cam = this.game.layCamera();
    ctx.save();
    cam.apply(ctx);
    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(cam.x, cam.y, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(200, 80, 120, 20);
    ctx.fillRect(600, 120, 160, 20);
    ctx.fillStyle = '#7a5230';
    ctx.fillRect(0, this.sanNha, this.mapW, this.mapH - this.sanNha);
    ctx.fillStyle = '#5da24a';
    ctx.fillRect(0, this.sanNha, this.mapW, 12);
    for (let x = 300; x < this.mapW; x += 400) {
      ctx.fillStyle = '#6b4226';
      ctx.fillRect(x, this.sanNha - 60, 30, 60);
      ctx.fillStyle = '#2d6a4f';
      ctx.fillRect(x - 20, this.sanNha - 110, 70, 50);
    }
    this.player.render(ctx);
    ctx.restore();

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(10, 10, 300, 90);
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Tộc: ' + this.player.race.ten, 20, 32);
    ctx.fillText('HP: ' + this.player.race.hp + '  KI: ' + this.player.race.ki, 20, 52);
    ctx.fillStyle = '#9df09d';
    ctx.fillText('A/D di chuyển, Space nhảy, J đánh', 20, 72);
    ctx.fillText('Giữ W trên không để bay thử', 20, 88);
  }
}
