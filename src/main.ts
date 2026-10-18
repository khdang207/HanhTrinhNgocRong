import { Game } from './core/Game.js';

// Điểm khởi động game, gắn vào thẻ canvas có id="game"
const canvas = document.getElementById('game') as HTMLCanvasElement | null;
if (!canvas) {
  throw new Error('Không tìm thấy thẻ canvas có id="game"');
}
const game = new Game(canvas);
game.start();
