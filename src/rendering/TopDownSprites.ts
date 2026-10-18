import { taoCanvas, veKhoi } from '../core/PixelArt.js';

// Sprite top-down đẹp kiểu Zelda, vẽ bằng code với shading
export type Huong = 'xuong' | 'len' | 'trai' | 'phai';
export type LoaiTileDep = 'co' | 'co_hoa' | 'nuoc' | 'cay' | 'duong' | 'nha' | 'da';

const cacheHero = new Map<string, HTMLCanvasElement[]>();
const cacheTile = new Map<string, HTMLCanvasElement[]>();

// Bảng màu đẹp, hài hòa
const MAU = {
  vien: '#1a1a2e',
  da: '#ffdbac',
  daToi: '#e8a87c',
  toc: '#3b2f2f',
  tocSang: '#5a4a4a',
  aoXanh: '#2d6a4f',
  aoXanhToi: '#1b4332',
  aoXanhSang: '#52b788',
  thatLung: '#7a5230',
  quan: '#2b2d42',
  kiem: '#dee2e6',
  kiemSang: '#ffffff',
};

// Vẽ hero nhìn từ trên xuống, 32x40
function veHero(huong: Huong, frame: number): HTMLCanvasElement {
  const c = taoCanvas(32, 40);
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  const nhipChan = frame === 1 ? 2 : 0; // chân xen kẽ khi đi

  // bóng dưới chân
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath();
  ctx.ellipse(16, 37, 10, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // chân (giày nâu)
  if (huong === 'xuong' || huong === 'len') {
    veKhoi(ctx, 9, 30 - nhipChan, 6, 8, MAU.vien);
    veKhoi(ctx, 10, 31 - nhipChan, 4, 6, '#5a2d0c');
    veKhoi(ctx, 17, 30 + nhipChan, 6, 8, MAU.vien);
    veKhoi(ctx, 18, 31 + nhipChan, 4, 6, '#5a2d0c');
  } else {
    const dx = huong === 'trai' ? -1 : 1;
    veKhoi(ctx, 11, 30, 10, 8, MAU.vien);
    veKhoi(ctx, 12 + dx, 31, 8, 6, '#5a2d0c');
  }

  // thân áo xanh có shading
  veKhoi(ctx, 7, 16, 18, 16, MAU.vien); // viền
  veKhoi(ctx, 8, 17, 16, 14, MAU.aoXanh); // nền áo
  veKhoi(ctx, 8, 17, 5, 14, MAU.aoXanhSang); // highlight trái
  veKhoi(ctx, 19, 17, 5, 14, MAU.aoXanhToi); // shadow phải
  // thắt lưng
  veKhoi(ctx, 8, 26, 16, 3, MAU.thatLung);
  veKhoi(ctx, 14, 26, 4, 3, '#ffd60a'); // khóa vàng

  // tay
  if (huong === 'xuong') {
    veKhoi(ctx, 3, 18, 5, 10, MAU.vien);
    veKhoi(ctx, 4, 19, 3, 8, MAU.da);
    veKhoi(ctx, 24, 18, 5, 10, MAU.vien);
    veKhoi(ctx, 25, 19, 3, 8, MAU.da);
  } else if (huong === 'len') {
    // tay khuất sau khi quay lưng
    veKhoi(ctx, 4, 18, 4, 8, MAU.aoXanhToi);
    veKhoi(ctx, 24, 18, 4, 8, MAU.aoXanhToi);
  } else {
    const tayTruoc = huong === 'phai' ? 24 : 3;
    veKhoi(ctx, tayTruoc, 18, 5, 10, MAU.vien);
    veKhoi(ctx, tayTruoc + 1, 19, 3, 8, MAU.da);
  }

  // đầu
  veKhoi(ctx, 7, 2, 18, 15, MAU.vien); // viền đầu
  veKhoi(ctx, 8, 3, 16, 13, MAU.da); // mặt
  veKhoi(ctx, 8, 3, 16, 4, MAU.daToi); // shading trên

  if (huong === 'xuong') {
    // tóc mái
    veKhoi(ctx, 8, 3, 16, 5, MAU.toc);
    veKhoi(ctx, 10, 5, 4, 3, MAU.tocSang);
    // mắt
    veKhoi(ctx, 11, 10, 3, 3, MAU.vien);
    veKhoi(ctx, 18, 10, 3, 3, MAU.vien);
    veKhoi(ctx, 12, 10, 1, 1, '#ffffff');
  } else if (huong === 'len') {
    // sau đầu toàn tóc
    veKhoi(ctx, 8, 3, 16, 13, MAU.toc);
    veKhoi(ctx, 10, 5, 6, 6, MAU.tocSang);
  } else {
    // nhìn ngang
    veKhoi(ctx, 8, 3, 16, 5, MAU.toc);
    const matX = huong === 'phai' ? 18 : 11;
    veKhoi(ctx, matX, 10, 3, 3, MAU.vien);
    // tai
    veKhoi(ctx, huong === 'phai' ? 23 : 6, 9, 3, 4, MAU.da);
  }

  // kiếm đeo sau lưng (đẹp)
  if (huong === 'len') {
    veKhoi(ctx, 14, 0, 4, 18, MAU.vien);
    veKhoi(ctx, 15, 1, 2, 16, MAU.kiemSang);
  }

  return c;
}

export function laySpriteHero(huong: Huong): HTMLCanvasElement[] {
  const key = 'hero_' + huong;
  const co = cacheHero.get(key);
  if (co) return co;
  const arr = [veHero(huong, 0), veHero(huong, 1)];
  cacheHero.set(key, arr);
  return arr;
}

// Vẽ tile đẹp 32x32
function veTileDep(loai: LoaiTileDep, frame: number): HTMLCanvasElement {
  const c = taoCanvas(32, 32);
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  if (loai === 'co' || loai === 'co_hoa') {
    // cỏ nền với nhiễu đẹp
    veKhoi(ctx, 0, 0, 32, 32, '#5da24a');
    // đốm cỏ đậm/nhạt
    const hatGiong = loai === 'co' ? 1 : 7;
    for (let i = 0; i < 12; i++) {
      const x = (i * 13 + hatGiong * 7) % 28;
      const y = (i * 17 + hatGiong * 3) % 28;
      veKhoi(ctx, x, y, 2, 3, i % 2 === 0 ? '#4a8a3d' : '#7ab86a');
    }
    if (loai === 'co_hoa') {
      // hoa nhỏ
      veKhoi(ctx, 8, 8, 4, 4, '#ffffff');
      veKhoi(ctx, 9, 9, 2, 2, '#ff70a6');
      veKhoi(ctx, 20, 18, 4, 4, '#ffffff');
      veKhoi(ctx, 21, 19, 2, 2, '#ffd60a');
    }
  } else if (loai === 'nuoc') {
    veKhoi(ctx, 0, 0, 32, 32, '#3a86ff');
    veKhoi(ctx, 0, 0, 32, 32, frame === 0 ? '#2a75e0' : '#3a86ff');
    // sóng
    const dich = frame === 0 ? 0 : 4;
    veKhoi(ctx, 4 + dich, 8, 10, 2, '#90e0ef');
    veKhoi(ctx, 18 - dich, 20, 10, 2, '#90e0ef');
    veKhoi(ctx, 8, 14, 2, 2, '#caf0f8');
  } else if (loai === 'cay') {
    // nền cỏ
    veKhoi(ctx, 0, 0, 32, 32, '#5da24a');
    // bóng cây
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(16, 28, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    // thân
    veKhoi(ctx, 14, 20, 5, 10, MAU.vien);
    veKhoi(ctx, 15, 21, 3, 8, '#6b4226');
    // tán lá 3 lớp shading
    veKhoi(ctx, 5, 6, 22, 16, MAU.vien);
    veKhoi(ctx, 6, 7, 20, 14, '#2d6a4f');
    veKhoi(ctx, 6, 7, 8, 14, '#52b788'); // sáng trái
    veKhoi(ctx, 20, 7, 6, 14, '#1b4332'); // tối phải
    veKhoi(ctx, 10, 4, 12, 6, '#40916c'); // đỉnh
  } else if (loai === 'duong') {
    veKhoi(ctx, 0, 0, 32, 32, '#e9d8a6');
    veKhoi(ctx, 0, 0, 32, 2, '#d4b87a');
    for (let i = 0; i < 6; i++) {
      veKhoi(ctx, (i * 11) % 28, (i * 7) % 28, 3, 2, '#d4b87a');
    }
  } else if (loai === 'da') {
    veKhoi(ctx, 0, 0, 32, 32, '#5da24a');
    veKhoi(ctx, 8, 10, 16, 12, MAU.vien);
    veKhoi(ctx, 9, 11, 14, 10, '#adb5bd');
    veKhoi(ctx, 9, 11, 14, 4, '#dee2e6'); // highlight
  } else if (loai === 'nha') {
    // nền cỏ
    veKhoi(ctx, 0, 0, 32, 32, '#5da24a');
    // thân nhà
    veKhoi(ctx, 5, 14, 22, 14, MAU.vien);
    veKhoi(ctx, 6, 15, 20, 12, '#e9d8a6');
    // mái ngói đỏ đẹp
    veKhoi(ctx, 3, 6, 26, 10, MAU.vien);
    veKhoi(ctx, 4, 7, 24, 8, '#ae2012');
    veKhoi(ctx, 4, 7, 24, 3, '#e76f51'); // sáng mái
    // cửa
    veKhoi(ctx, 13, 20, 6, 8, MAU.vien);
    veKhoi(ctx, 14, 21, 4, 7, '#5a2d0c');
    // cửa sổ
    veKhoi(ctx, 8, 17, 6, 6, MAU.vien);
    veKhoi(ctx, 9, 18, 4, 4, '#94d2bd');
  }

  return c;
}

export function layTileDep(loai: LoaiTileDep): HTMLCanvasElement[] {
  const key = 'tile_' + loai;
  const co = cacheTile.get(key);
  if (co) return co;
  let arr: HTMLCanvasElement[];
  if (loai === 'nuoc') {
    arr = [veTileDep(loai, 0), veTileDep(loai, 1)];
  } else {
    arr = [veTileDep(loai, 0)];
  }
  cacheTile.set(key, arr);
  return arr;
}

// Quái slime dễ thương
export function laySpriteSlime(frame: number): HTMLCanvasElement {
  const c = taoCanvas(32, 28);
  const ctx = c.getContext('2d')!;
  const nhay = frame === 1 ? -3 : 0;
  // bóng
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(16, 26, 12, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  // thân slime
  veKhoi(ctx, 5, 8 + nhay, 22, 18, MAU.vien);
  veKhoi(ctx, 6, 9 + nhay, 20, 16, '#80ed99');
  veKhoi(ctx, 6, 9 + nhay, 8, 16, '#b7f0c0'); // highlight
  // mắt
  veKhoi(ctx, 10, 14 + nhay, 4, 6, MAU.vien);
  veKhoi(ctx, 18, 14 + nhay, 4, 6, MAU.vien);
  veKhoi(ctx, 11, 15 + nhay, 2, 2, '#ffffff');
  // miệng
  veKhoi(ctx, 13, 20 + nhay, 6, 2, MAU.vien);
  return c;
}
