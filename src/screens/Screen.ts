import type { Input } from '../core/Input.js';

// Giao diện chung cho mọi màn hình trong game
export interface Screen {
  update(dt: number, input: Input): void;
  render(ctx: CanvasRenderingContext2D): void;
}
