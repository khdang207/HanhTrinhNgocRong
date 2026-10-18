import { taoCanvas, veKhoi, veKhoiVien } from '../core/PixelArt.js';
import type { RaceId } from '../data/races.js';
import { RACES } from '../data/races.js';

// Các hành động của nhân vật
export type HanhDong = 'idle' | 'di' | 'nhay' | 'bay' | 'danh' | 'bidau';
export type LoaiTile = 'dat' | 'co' | 'cay' | 'nha';

const cacheNhanVat = new Map<string, HTMLCanvasElement[]>();

function mauAoCuaToc(raceId: RaceId): string {
  const r = RACES.find((x) => x.id === raceId);
  return r ? r.mauAo : '#3a86ff';
}

function veToc(ctx: CanvasRenderingContext2D, raceId: RaceId): void {
  if (raceId === 'namek') {
    veKhoi(ctx, 8, 4, 16, 3, '#1b7a6b');
    return;
  }
  const mauToc = '#1d1d1d';
  veKhoi(ctx, 7, 1, 18, 5, mauToc);
  veKhoi(ctx, 9, 0, 4, 3, mauToc);
  veKhoi(ctx, 16, 0, 5, 4, mauToc);
  if (raceId === 'xayda') {
    veKhoi(ctx, 5, 2, 3, 4, mauToc);
    veKhoi(ctx, 24, 2, 3, 4, mauToc);
  }
}

function veFrameNhanVat(raceId: RaceId, hanhDong: HanhDong, frame: number): HTMLCanvasElement {
  const c = taoCanvas(32, 48);
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;
  const mauAo = mauAoCuaToc(raceId);
  const mauDa = '#ffdbac';
  const mauVien = '#1d1d1d';
  const mauQuan = '#2b2d42';

  let dichY = 0;
  if (hanhDong === 'idle') dichY = frame === 1 ? 1 : 0;
  if (hanhDong === 'bay') dichY = frame === 1 ? -2 : 0;

  veKhoiVien(ctx, 6, 4 + dichY, 20, 16, mauVien, mauDa, 1);
  veToc(ctx, raceId);
  if (hanhDong === 'bidau') {
    veKhoi(ctx, 10, 11 + dichY, 4, 1, mauVien);
    veKhoi(ctx, 18, 11 + dichY, 4, 1, mauVien);
  } else {
    veKhoi(ctx, 11, 11 + dichY, 3, 4, mauVien);
    veKhoi(ctx, 18, 11 + dichY, 3, 4, mauVien);
  }

  const thanY = 20 + dichY;
  veKhoiVien(ctx, 8, thanY, 16, 14, mauVien, mauAo, 1);
  veKhoi(ctx, 8, thanY + 10, 16, 3, '#ffd60a');

  if (hanhDong === 'danh') {
    if (frame === 0) {
      veKhoiVien(ctx, 2, thanY + 2, 6, 8, mauVien, mauDa, 1);
      veKhoiVien(ctx, 24, thanY + 2, 6, 8, mauVien, mauDa, 1);
    } else if (frame === 1) {
      veKhoiVien(ctx, 2, thanY + 2, 6, 8, mauVien, mauDa, 1);
      veKhoiVien(ctx, 24, thanY, 12, 6, mauVien, mauDa, 1);
    } else {
      veKhoiVien(ctx, 4, thanY + 4, 6, 6, mauVien, mauDa, 1);
      veKhoiVien(ctx, 22, thanY + 4, 6, 6, mauVien, mauDa, 1);
    }
  } else if (hanhDong === 'bay') {
    veKhoiVien(ctx, 1, thanY + 2, 7, 6, mauVien, mauDa, 1);
    veKhoiVien(ctx, 24, thanY + 2, 7, 6, mauVien, mauDa, 1);
  } else {
    veKhoiVien(ctx, 3, thanY + 2, 5, 10, mauVien, mauDa, 1);
    veKhoiVien(ctx, 24, thanY + 2, 5, 10, mauVien, mauDa, 1);
  }

  const chanY = thanY + 14;
  if (hanhDong === 'di') {
    if (frame === 0) {
      veKhoiVien(ctx, 10, chanY, 5, 10, mauVien, mauQuan, 1);
      veKhoiVien(ctx, 17, chanY, 5, 8, mauVien, mauQuan, 1);
    } else if (frame === 1) {
      veKhoiVien(ctx, 10, chanY, 5, 8, mauVien, mauQuan, 1);
      veKhoiVien(ctx, 17, chanY, 5, 10, mauVien, mauQuan, 1);
    } else if (frame === 2) {
      veKhoiVien(ctx, 9, chanY, 5, 9, mauVien, mauQuan, 1);
      veKhoiVien(ctx, 18, chanY, 5, 9, mauVien, mauQuan, 1);
    } else {
      veKhoiVien(ctx, 10, chanY + 2, 5, 8, mauVien, mauQuan, 1);
      veKhoiVien(ctx, 17, chanY + 2, 5, 8, mauVien, mauQuan, 1);
    }
  } else if (hanhDong === 'nhay') {
    veKhoiVien(ctx, 9, chanY, 6, 6, mauVien, mauQuan, 1);
    veKhoiVien(ctx, 17, chanY, 6, 6, mauVien, mauQuan, 1);
  } else if (hanhDong === 'bay') {
    veKhoiVien(ctx, 12, chanY, 8, 8, mauVien, mauQuan, 1);
    veKhoi(ctx, 10, chanY + 10, 12, 2, '#caf0f8');
  } else {
    const caoChan = hanhDong === 'idle' && frame === 1 ? 9 : 10;
    veKhoiVien(ctx, 10, chanY, 5, caoChan, mauVien, mauQuan, 1);
    veKhoiVien(ctx, 17, chanY, 5, caoChan, mauVien, mauQuan, 1);
  }

  if (hanhDong === 'bidau') {
    ctx.globalAlpha = 0.35;
    veKhoi(ctx, 0, 0, 32, 48, '#ff0000');
    ctx.globalAlpha = 1;
  }

  return c;
}

export function laySpriteNhanVat(raceId: RaceId, hanhDong: HanhDong): HTMLCanvasElement[] {
  const key = raceId + '_' + hanhDong;
  const co = cacheNhanVat.get(key);
  if (co) return co;
  let soFrame = 1;
  if (hanhDong === 'idle') soFrame = 2;
  if (hanhDong === 'di') soFrame = 4;
  if (hanhDong === 'bay') soFrame = 2;
  if (hanhDong === 'danh') soFrame = 3;
  const arr: HTMLCanvasElement[] = [];
  for (let i = 0; i < soFrame; i++) arr.push(veFrameNhanVat(raceId, hanhDong, i));
  cacheNhanVat.set(key, arr);
  return arr;
}

export function laySpriteQuai(loai: number): HTMLCanvasElement[] {
  const c = taoCanvas(32, 32);
  const ctx = c.getContext('2d')!;
  const mauThan = loai === 0 ? '#80ed99' : '#f4978e';
  const mauMat = '#d90429';
  veKhoiVien(ctx, 4, 8, 24, 18, '#1d1d1d', mauThan, 1);
  veKhoi(ctx, 8, 4, 16, 8, mauThan);
  veKhoi(ctx, 10, 12, 5, 5, mauMat);
  veKhoi(ctx, 18, 12, 5, 5, mauMat);
  veKhoi(ctx, 12, 20, 8, 3, '#ffffff');
  veKhoi(ctx, 8, 26, 6, 4, '#1d1d1d');
  veKhoi(ctx, 18, 26, 6, 4, '#1d1d1d');
  return [c];
}

export function laySpriteNPC(loai: 'onggia' | 'cogai'): HTMLCanvasElement {
  const c = taoCanvas(32, 48);
  const ctx = c.getContext('2d')!;
  if (loai === 'onggia') {
    veKhoiVien(ctx, 8, 6, 16, 14, '#1d1d1d', '#ffdbac', 1);
    veKhoi(ctx, 8, 14, 16, 8, '#ffffff');
    veKhoiVien(ctx, 8, 20, 16, 14, '#1d1d1d', '#7a5230', 1);
    veKhoiVien(ctx, 10, 34, 5, 10, '#1d1d1d', '#2b2d42', 1);
    veKhoiVien(ctx, 17, 34, 5, 10, '#1d1d1d', '#2b2d42', 1);
  } else {
    veKhoi(ctx, 6, 2, 20, 18, '#5a2d0c');
    veKhoiVien(ctx, 8, 8, 16, 12, '#1d1d1d', '#ffdbac', 1);
    veKhoiVien(ctx, 8, 20, 16, 14, '#1d1d1d', '#ff70a6', 1);
    veKhoiVien(ctx, 10, 34, 5, 10, '#1d1d1d', '#2b2d42', 1);
    veKhoiVien(ctx, 17, 34, 5, 10, '#1d1d1d', '#2b2d42', 1);
  }
  return c;
}

export function layTile(loai: LoaiTile): HTMLCanvasElement {
  const c = taoCanvas(32, 32);
  const ctx = c.getContext('2d')!;
  if (loai === 'dat') {
    veKhoi(ctx, 0, 0, 32, 32, '#7a5230');
    veKhoi(ctx, 4, 4, 6, 6, '#8a5f3a');
    veKhoi(ctx, 20, 12, 8, 6, '#6b4226');
  } else if (loai === 'co') {
    veKhoi(ctx, 0, 0, 32, 32, '#7a5230');
    veKhoi(ctx, 0, 0, 32, 10, '#5da24a');
    veKhoi(ctx, 4, 2, 3, 8, '#4a8a3d');
  } else if (loai === 'cay') {
    veKhoi(ctx, 13, 18, 6, 14, '#6b4226');
    veKhoi(ctx, 6, 6, 20, 14, '#2d6a4f');
    veKhoi(ctx, 10, 2, 12, 8, '#40916c');
  } else {
    veKhoi(ctx, 4, 14, 24, 16, '#e9d8a6');
    veKhoi(ctx, 2, 8, 28, 8, '#ae2012');
    veKhoi(ctx, 13, 20, 6, 10, '#5a2d0c');
    veKhoi(ctx, 7, 17, 6, 6, '#94d2bd');
  }
  return c;
}
