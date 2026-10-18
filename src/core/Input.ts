// Quản lý bàn phím và chuột cho toàn game
export class Input {
  private keys = new Set<string>();
  private pressed = new Set<string>();
  mouseX = 0;
  mouseY = 0;
  mouseClicked = false;

  constructor(private canvas: HTMLCanvasElement) {
    window.addEventListener('keydown', (e) => {
      const k = e.key.toLowerCase();
      if (!this.keys.has(k)) this.pressed.add(k);
      this.keys.add(k);
      if ([' ', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
    canvas.addEventListener('mousemove', (e) => {
      const r = canvas.getBoundingClientRect();
      this.mouseX = (e.clientX - r.left) * (canvas.width / r.width);
      this.mouseY = (e.clientY - r.top) * (canvas.height / r.height);
    });
    canvas.addEventListener('mousedown', () => {
      this.mouseClicked = true;
    });
  }

  isDown(key: string): boolean {
    return this.keys.has(key.toLowerCase());
  }

  isPressed(key: string): boolean {
    return this.pressed.has(key.toLowerCase());
  }

  endTick(): void {
    this.pressed.clear();
    this.mouseClicked = false;
  }

  getAxis(): number {
    let a = 0;
    if (this.isDown('a') || this.isDown('arrowleft')) a -= 1;
    if (this.isDown('d') || this.isDown('arrowright')) a += 1;
    return a;
  }
}
