// Tiện ích vẽ pixel art procedural bằng code, không dùng ảnh ngoài
export function taoCanvas(rong: number, cao: number): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = rong;
  c.height = cao;
  return c;
}

// Vẽ một khối chữ nhật pixel
export function veKhoi(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  mau: string
): void {
  ctx.fillStyle = mau;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

// Vẽ hình chữ nhật có viền đậm kiểu chibi
export function veKhoiVien(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  mauVien: string, mauTrong: string, doDayVien = 1
): void {
  veKhoi(ctx, x, y, w, h, mauVien);
  veKhoi(ctx, x + doDayVien, y + doDayVien, w - doDayVien * 2, h - doDayVien * 2, mauTrong);
}
