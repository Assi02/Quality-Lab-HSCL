export type SpecLimit =
  | { type: 'range'; center: number; tol: number }
  | { type: 'max'; value: number }
  | { type: 'min'; value: number }
  | { type: 'between'; lo: number; hi: number }
  | { type: 'na' };

export interface GradeSpec {
  grade: string;
  family: string;
  type: string;
  mfg: {
    ian?: SpecLimit;
    nsa?: SpecLimit;
    stsa?: SpecLimit;
    oan?: SpecLimit;
    coan?: SpecLimit;
    pd?: SpecLimit;
    tint?: SpecLimit;
    hl?: SpecLimit;
    grit325?: SpecLimit;
    grit100?: SpecLimit;
    grit35?: SpecLimit;
    phAvg?: SpecLimit;
    phMax?: SpecLimit;
    phMin?: SpecLimit;
    ph25?: SpecLimit;
    fines?: SpecLimit;
    ash?: SpecLimit;
    pH?: SpecLimit;
    td?: SpecLimit;
    sulphur?: SpecLimit;
  };
  ship: {
    ian?: SpecLimit;
    oan?: SpecLimit;
    coan?: SpecLimit;
    pd?: SpecLimit;
    tint?: SpecLimit;
    hl?: SpecLimit;
    grit325?: SpecLimit;
    grit100?: SpecLimit;
    phAvg?: SpecLimit;
    fines?: SpecLimit;
    ash?: SpecLimit;
    pH?: SpecLimit;
    td?: SpecLimit;
    sulphur?: SpecLimit;
  };
  onlineParams: string[];
}

const R = (center: number, tol: number): SpecLimit => ({
  type: 'range',
  center,
  tol,
});
const MAX = (value: number): SpecLimit => ({ type: 'max', value });
const MIN = (value: number): SpecLimit => ({ type: 'min', value });
const BTW = (lo: number, hi: number): SpecLimit => ({
  type: 'between',
  lo,
  hi,
});
const NA: SpecLimit = { type: 'na' };

export const GRADES: GradeSpec[] = [
  {
    grade: 'N110',
    family: 'ASTM',
    type: 'ASTM Grade',
    mfg: {
      ian: R(145, 4),
      nsa: R(127, 4),
      stsa: R(115, 4),
      oan: R(113, 4),
      coan: R(97, 4),
      pd: R(345, 25),
      tint: R(123, 4),
      hl: MAX(0.8),
      grit325: MAX(500),
      grit100: MAX(100),
      grit35: MAX(10),
      phAvg: R(28, 5),
      phMax: MAX(70),
      fines: MAX(2.5),
      ash: MAX(0.5),
      pH: R(8, 2),
      td: MIN(80),
    },
    ship: {
      ian: R(145, 5),
      oan: R(113, 5),
      coan: R(97, 5),
      pd: R(345, 25),
      tint: R(123, 4),
      hl: MAX(1),
      grit325: MAX(500),
      grit100: MAX(100),
      phAvg: R(28, 5),
      fines: MAX(8),
      ash: MAX(0.5),
    },
    onlineParams: [
      'ian',
      'nsa',
      'oan',
      'coan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'N220',
    family: 'ASTM',
    type: 'ASTM Grade',
    mfg: {
      ian: R(121, 4),
      nsa: R(114, 4),
      stsa: R(106, 4),
      oan: R(114, 4),
      coan: R(98, 4),
      pd: R(355, 25),
      tint: R(116, 4),
      hl: MAX(0.8),
      grit325: MAX(500),
      grit100: MAX(100),
      grit35: MAX(10),
      phAvg: R(28, 5),
      phMax: MAX(70),
      fines: MAX(2.5),
      ash: MAX(0.5),
      pH: R(8, 2),
      td: MIN(80),
    },
    ship: {
      ian: R(121, 5),
      oan: R(114, 5),
      coan: R(98, 5),
      pd: R(355, 25),
      tint: R(116, 4),
      hl: MAX(1),
      grit325: MAX(500),
      grit100: MAX(100),
      phAvg: R(28, 5),
      fines: MAX(8),
      ash: MAX(0.5),
    },
    onlineParams: [
      'ian',
      'nsa',
      'stsa',
      'oan',
      'coan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'N330',
    family: 'ASTM',
    type: 'ASTM Grade',
    mfg: {
      ian: R(82, 4),
      nsa: R(76, 4),
      stsa: R(75, 4),
      oan: R(102, 4),
      coan: R(88, 4),
      pd: R(380, 25),
      tint: R(104, 4),
      hl: MAX(0.8),
      grit325: MAX(500),
      grit100: MAX(100),
      grit35: MAX(10),
      phAvg: R(28, 5),
      phMax: MAX(70),
      fines: MAX(2.5),
      ash: MAX(0.5),
      pH: R(8, 2),
      td: MIN(80),
    },
    ship: {
      ian: R(82, 5),
      oan: R(102, 5),
      coan: R(88, 5),
      pd: R(380, 25),
      tint: R(104, 4),
      hl: MAX(1),
      grit325: MAX(500),
      grit100: MAX(100),
      phAvg: R(28, 5),
      fines: MAX(8),
      ash: MAX(0.5),
    },
    onlineParams: [
      'ian',
      'nsa',
      'stsa',
      'oan',
      'coan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'N539',
    family: 'ASTM',
    type: 'ASTM Grade',
    mfg: {
      ian: R(43, 4),
      nsa: R(39, 4),
      stsa: R(38, 4),
      oan: R(111, 4),
      coan: R(81, 4),
      pd: R(385, 25),
      hl: MAX(0.6),
      grit325: MAX(500),
      grit100: MAX(100),
      grit35: MAX(10),
      phAvg: R(28, 5),
      phMax: MAX(70),
      fines: MAX(2.5),
      ash: MAX(0.5),
      pH: R(8, 2),
    },
    ship: {
      ian: R(43, 5),
      oan: R(111, 5),
      coan: R(81, 5),
      pd: R(385, 25),
      hl: MAX(0.6),
      grit325: MAX(500),
      phAvg: R(28, 5),
      fines: MAX(8),
      ash: MAX(0.5),
    },
    onlineParams: [
      'ian',
      'nsa',
      'oan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'N550',
    family: 'ASTM',
    type: 'ASTM Grade',
    mfg: {
      ian: R(43, 4),
      nsa: R(40, 4),
      stsa: R(39, 4),
      oan: R(121, 4),
      coan: R(85, 4),
      pd: R(360, 25),
      hl: MAX(0.6),
      grit325: MAX(500),
      grit100: MAX(100),
      grit35: MAX(10),
      phAvg: R(28, 5),
      phMax: MAX(70),
      fines: MAX(2.5),
      ash: MAX(0.5),
      pH: R(8, 2),
    },
    ship: {
      ian: R(43, 5),
      oan: R(121, 5),
      coan: R(85, 5),
      pd: R(360, 25),
      hl: MAX(0.6),
      grit325: MAX(500),
      phAvg: R(28, 5),
      fines: MAX(8),
      ash: MAX(0.5),
    },
    onlineParams: [
      'ian',
      'nsa',
      'oan',
      'coan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'N660',
    family: 'ASTM',
    type: 'ASTM Grade',
    mfg: {
      ian: R(36, 4),
      nsa: R(35, 4),
      stsa: R(34, 4),
      oan: R(90, 4),
      coan: R(74, 4),
      pd: R(440, 25),
      hl: MAX(0.6),
      grit325: MAX(500),
      grit100: MAX(100),
      grit35: MAX(10),
      phAvg: R(28, 5),
      phMax: MAX(70),
      fines: MAX(2.5),
      ash: MAX(0.5),
      pH: R(8, 2),
    },
    ship: {
      ian: R(36, 5),
      oan: R(90, 5),
      coan: R(74, 5),
      pd: R(440, 25),
      hl: MAX(0.6),
      grit325: MAX(500),
      phAvg: R(28, 5),
      fines: MAX(8),
      ash: MAX(0.5),
    },
    onlineParams: [
      'ian',
      'nsa',
      'oan',
      'coan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'N774',
    family: 'ASTM',
    type: 'ASTM Grade',
    mfg: {
      ian: R(29, 4),
      nsa: R(30, 4),
      stsa: R(29, 4),
      oan: R(72, 4),
      coan: R(63, 4),
      pd: R(490, 25),
      hl: MAX(0.6),
      grit325: MAX(500),
      grit100: MAX(100),
      grit35: MAX(10),
      phAvg: R(28, 5),
      phMax: MAX(70),
      fines: MAX(2.5),
      ash: MAX(0.5),
      pH: R(8, 2),
    },
    ship: {
      ian: R(29, 5),
      oan: R(72, 5),
      coan: R(63, 5),
      pd: R(490, 25),
      hl: MAX(0.6),
      grit325: MAX(500),
      phAvg: R(28, 5),
      fines: MAX(8),
      ash: MAX(0.5),
    },
    onlineParams: [
      'ian',
      'nsa',
      'oan',
      'coan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'KLAREX RG 522',
    family: 'KLAREX RG',
    type: 'Special Grade',
    mfg: {
      ian: R(32, 4),
      nsa: R(33, 4),
      stsa: R(31, 4),
      oan: R(52, 4),
      coan: R(48, 5),
      hl: MAX(0.6),
      grit325: MAX(25),
      grit100: MAX(5),
      grit35: MAX(0),
      phAvg: R(25, 5),
      phMax: MAX(50),
      phMin: MIN(15),
      fines: MAX(3.5),
      ash: MAX(0.2),
      pH: BTW(6, 10),
      td: MIN(80),
      sulphur: MAX(1),
    },
    ship: {
      ian: R(32, 5),
      oan: R(52, 5),
      hl: MAX(1),
      grit325: MAX(25),
      phAvg: R(25, 5),
      fines: MAX(12),
      ash: MAX(0.2),
    },
    onlineParams: [
      'ian',
      'nsa',
      'stsa',
      'oan',
      'coan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'phMin',
      'ph25',
      'fines',
    ],
  },
  {
    grade: 'JETEX 105',
    family: 'JETEX',
    type: 'Special Grade',
    mfg: {
      ian: R(83, 4),
      oan: R(102, 4),
      tint: R(104, 4),
      hl: MAX(0.8),
      grit325: MAX(15),
      grit100: MAX(5),
      phAvg: R(22, 5),
      phMax: MAX(60),
      fines: MAX(2.5),
      ash: MAX(0.2),
    },
    ship: {
      ian: R(83, 5),
      oan: R(102, 5),
      hl: MAX(1),
      grit325: MAX(25),
      phAvg: R(22, 5),
      fines: MAX(12),
    },
    onlineParams: [
      'ian',
      'oan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'JETEX 175',
    family: 'JETEX',
    type: 'Special Grade',
    mfg: {
      ian: R(42, 4),
      oan: R(120, 4),
      tint: R(55, 4),
      hl: MAX(0.6),
      grit325: MAX(10),
      grit100: MAX(1),
      phAvg: R(22, 5),
      fines: MAX(2.5),
      ash: MAX(0.2),
    },
    ship: {
      ian: R(42, 5),
      oan: R(120, 5),
      hl: MAX(1),
      grit325: MAX(15),
      phAvg: R(22, 5),
      fines: MAX(12),
    },
    onlineParams: [
      'ian',
      'oan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
  {
    grade: 'ELECTRA 273',
    family: 'ELECTRA',
    type: 'Special Grade',
    mfg: {
      ian: R(41, 4),
      oan: R(124, 4),
      coan: R(82, 5),
      tint: R(55, 4),
      hl: MAX(0.6),
      grit325: MAX(10),
      grit100: MAX(1),
      phAvg: R(22, 5),
      fines: MAX(2.5),
      ash: MAX(0.2),
      pH: BTW(6, 9),
    },
    ship: {
      ian: R(41, 5),
      oan: R(124, 5),
      hl: MAX(1),
      grit325: MAX(10),
      phAvg: R(22, 5),
      fines: MAX(12),
    },
    onlineParams: [
      'ian',
      'oan',
      'coan',
      'pd',
      'hl',
      'grit325',
      'phAvg',
      'phMax',
      'fines',
    ],
  },
];

export const ONLINE_COLUMNS = [
  { key: 'ian', label: 'IAN', unit: 'mg/g' },
  { key: 'oan', label: 'OAN', unit: 'cc/100g' },
  { key: 'coan', label: 'COAN', unit: 'cc/100g' },
  { key: 'pd', label: 'PD', unit: 'kg/m³' },
  { key: 'hl', label: 'Heat loss', unit: '%' },
  { key: 'grit325', label: 'Grit #325', unit: 'ppm' },
  { key: 'phAvg', label: 'PH avg', unit: 'gf' },
  { key: 'phMax', label: 'PH max', unit: 'gf' },
  { key: 'phMin', label: 'PH min', unit: 'gf' },
  { key: 'ph25', label: '25% max', unit: 'gf' },
  { key: 'fines', label: 'Fines', unit: '%' },
];

export function getGrade(name: string): GradeSpec | undefined {
  return GRADES.find((g) => g.grade === name);
}

export function checkSpec(
  value: number,
  limit: SpecLimit
): 'ok' | 'oos' | 'na' {
  if (limit.type === 'na') return 'na';
  if (limit.type === 'range')
    return Math.abs(value - limit.center) <= limit.tol ? 'ok' : 'oos';
  if (limit.type === 'max') return value < limit.value ? 'ok' : 'oos';
  if (limit.type === 'min') return value > limit.value ? 'ok' : 'oos';
  if (limit.type === 'between')
    return value >= limit.lo && value <= limit.hi ? 'ok' : 'oos';
  return 'na';
}

export function formatSpec(limit: SpecLimit | undefined): string {
  if (!limit) return '—';
  if (limit.type === 'na') return 'N/A';
  if (limit.type === 'range') return `${limit.center} ± ${limit.tol}`;
  if (limit.type === 'max') return `< ${limit.value}`;
  if (limit.type === 'min') return `> ${limit.value}`;
  if (limit.type === 'between') return `${limit.lo} – ${limit.hi}`;
  return '—';
}

export const PRODUCTION_LINES = [
  { lineNo: 1, grade: 'N330', lot: 'L-2406-11', startDay: 'Apr 25', dayNo: 3 },
  { lineNo: 2, grade: 'N550', lot: 'L-2406-08', startDay: 'Apr 23', dayNo: 5 },
  {
    lineNo: 3,
    grade: 'KLAREX RG 522',
    lot: 'L-2406-14',
    startDay: 'Apr 28',
    dayNo: 1,
  },
  { lineNo: 4, grade: 'N660', lot: 'L-2406-09', startDay: 'Apr 21', dayNo: 7 },
  { lineNo: 5, grade: 'N774', lot: 'L-2406-12', startDay: 'Apr 24', dayNo: 4 },
];
