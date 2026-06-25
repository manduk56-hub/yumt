// 매치 박스의 절대좌표(x, y)를 계산 (bracket_editor 포팅, 변경 없음).
// leaf(각 lane의 col 0)는 균등 배치, 이후 컬럼은 feeder들의 y 평균에 둔다.
// upper lane을 위, lower lane을 그 아래(LANE_GAP)에. Grand Final은 UBF/LBF y 평균.

import { MATCHES, MATCH_BY_ID } from './structure.js';

export const GEO = {
  MATCH_W: 178,
  MATCH_H: 52,
  COL_PITCH: 208,
  LEAF_PITCH: 92,
  LANE_GAP: 88,
  PAD_X: 16,
  PAD_TOP: 56,
};

const LANES = {
  upper: ['UBQF', 'UBSF', 'UBF'],
  lower: ['LBR1', 'LBQF', 'LBSF', 'LBF'],
};

function laneFeeders(match, laneRounds) {
  const ids = [];
  for (const slot of ['slotA', 'slotB']) {
    const src = match[slot];
    if (src.winnerOf && laneRounds.includes(MATCH_BY_ID[src.winnerOf].round)) {
      ids.push(src.winnerOf);
    }
  }
  return ids;
}

function layoutLane(laneRounds, originY, pos) {
  const byRound = laneRounds.map((r) => MATCHES.filter((m) => m.round === r));

  byRound[0].forEach((m, i) => {
    pos[m.id] = { col: 0, y: originY + i * GEO.LEAF_PITCH };
  });

  for (let c = 1; c < byRound.length; c++) {
    byRound[c].forEach((m, i) => {
      const feeders = laneFeeders(m, laneRounds).filter((id) => pos[id]);
      let y;
      if (feeders.length) {
        y = feeders.reduce((s, id) => s + pos[id].y, 0) / feeders.length;
      } else {
        y = originY + i * GEO.LEAF_PITCH;
      }
      pos[m.id] = { col: laneRounds.indexOf(m.round), y };
    });
  }
}

export function computeLayout() {
  const pos = {};

  const ROUND_COL = {
    UBQF: 0, UBSF: 1, UBF: 3, GF: 4,
    LBR1: 0, LBQF: 1, LBSF: 2, LBF: 3,
  };

  layoutLane(LANES.upper, GEO.PAD_TOP, pos);
  const upperBottom = Math.max(...LANES.upper.flatMap((r) =>
    MATCHES.filter((m) => m.round === r).map((m) => pos[m.id].y)
  )) + GEO.MATCH_H;

  layoutLane(LANES.lower, upperBottom + GEO.LANE_GAP, pos);

  pos['GF'] = { col: ROUND_COL.GF, y: (pos['UBF'].y + pos['LBF'].y) / 2 };

  const positions = {};
  for (const m of MATCHES) {
    const gridCol = ROUND_COL[m.round];
    positions[m.id] = { x: GEO.PAD_X + gridCol * GEO.COL_PITCH, y: pos[m.id].y };
  }

  const columns = {};
  for (const m of MATCHES) {
    const key = m.round;
    if (columns[key]) continue;
    const lane = LANES.upper.includes(key) ? 'upper'
      : LANES.lower.includes(key) ? 'lower' : 'final';
    columns[key] = {
      lane,
      col: ROUND_COL[key],
      x: GEO.PAD_X + ROUND_COL[key] * GEO.COL_PITCH,
      top: lane === 'lower' ? null : 0,
    };
  }

  const width = GEO.PAD_X * 2 + ROUND_COL.GF * GEO.COL_PITCH + GEO.MATCH_W;
  const height = Math.max(...MATCHES.map((m) => positions[m.id].y)) + GEO.MATCH_H + GEO.PAD_TOP;

  return { positions, columns, width, height, upperBottom };
}
