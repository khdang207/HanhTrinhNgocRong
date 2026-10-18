// Dữ liệu chủng tộc khởi đầu, tách riêng để dễ cân bằng sau này
export type RaceId = 'traidat' | 'namek' | 'xayda';

export interface RaceInfo {
  id: RaceId;
  ten: string;
  moTa: string;
  mauAo: string;
  hp: number;
  ki: number;
  sucDanh: number;
}

export const RACES: RaceInfo[] = [
  {
    id: 'traidat',
    ten: 'Trái Đất',
    moTa: 'Cân bằng, dễ chơi',
    mauAo: '#3a86ff',
    hp: 100,
    ki: 100,
    sucDanh: 10,
  },
  {
    id: 'namek',
    ten: 'Namek',
    moTa: 'Trâu bò, hồi phục tốt',
    mauAo: '#2ec4b6',
    hp: 130,
    ki: 90,
    sucDanh: 9,
  },
  {
    id: 'xayda',
    ten: 'Xayda',
    moTa: 'Sát thương cao',
    mauAo: '#e71d36',
    hp: 90,
    ki: 110,
    sucDanh: 13,
  },
];
