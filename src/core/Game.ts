import { Loop } from './Loop.js';
import { Input } from './Input.js';
import { Camera } from './Camera.js';
import type { Screen } from '../screens/Screen.js';
import { TitleScreen } from '../screens/TitleScreen.js';

// Quản lý màn hình và vòng lặp chính của game
export class Game {
  private ctx: CanvasRenderingContext2D;
  private input: Input;
  private camera: Camera;
  private loop: Loop;
  private screen: Screen;

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Không lấy được 2d context');
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    this.input = new Input(canvas);
    this.camera = new Camera(canvas.width, canvas.height);
    this.screen = new TitleScreen(this);
    this.loop = new Loop(1 / 60, (dt) => this.tick(dt), () => this.draw());
  }

  start(): void {
    this.loop.start();
  }

  doiManHinh(s: Screen): void {
    this.screen = s;
  }

  layCamera(): Camera {
    return this.camera;
  }

  private tick(dt: number): void {
    this.screen.update(dt, this.input);
    this.input.endTick();
  }

  private draw(): void {
    const ctx = this.ctx;
    const canvas = this.canvas;
    ctx.save();
    ctx.fillStyle = '#0b1020';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.screen.render(ctx);
    ctx.restore();
  }
}
