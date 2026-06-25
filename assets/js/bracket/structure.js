// 8팀 더블 엘리미네이션 매치 그래프 정의 (bracket_editor 프로토타입 포팅)
//
// 각 매치는 두 슬롯(slotA, slotB)에 팀을 받는다. 슬롯 출처(source):
//  - { seed: n }             : 초기 시드 배치
//  - { winnerOf: 'matchId' }  : 해당 매치의 승자
//  - { loserOf: 'matchId' }   : 해당 매치의 패자 (패자조 드롭)
// 라운드 타이틀은 yumt UI에 맞춰 한국어로 표기.

export const ROUNDS = [
  // 상단(승자조)
  { id: 'UBQF', title: '승자조 8강', lane: 'upper', col: 0 },
  { id: 'UBSF', title: '승자조 4강', lane: 'upper', col: 1 },
  { id: 'UBF', title: '승자조 결승', lane: 'upper', col: 3 },
  { id: 'GF', title: '최종 결승', lane: 'final', col: 4 },
  // 하단(패자조)
  { id: 'LBR1', title: '패자조 1라운드', lane: 'lower', col: 0 },
  { id: 'LBQF', title: '패자조 8강', lane: 'lower', col: 1 },
  { id: 'LBSF', title: '패자조 4강', lane: 'lower', col: 2 },
  { id: 'LBF', title: '패자조 결승', lane: 'lower', col: 3 },
];

export const MATCHES = [
  // Upper Bracket Quarterfinals (시드 1~8)
  { id: 'UBQF1', round: 'UBQF', slotA: { seed: 1 }, slotB: { seed: 8 } },
  { id: 'UBQF2', round: 'UBQF', slotA: { seed: 4 }, slotB: { seed: 5 } },
  { id: 'UBQF3', round: 'UBQF', slotA: { seed: 2 }, slotB: { seed: 7 } },
  { id: 'UBQF4', round: 'UBQF', slotA: { seed: 3 }, slotB: { seed: 6 } },

  // Upper Bracket Semifinals
  { id: 'UBSF1', round: 'UBSF', slotA: { winnerOf: 'UBQF1' }, slotB: { winnerOf: 'UBQF2' } },
  { id: 'UBSF2', round: 'UBSF', slotA: { winnerOf: 'UBQF3' }, slotB: { winnerOf: 'UBQF4' } },

  // Upper Bracket Final
  { id: 'UBF', round: 'UBF', slotA: { winnerOf: 'UBSF1' }, slotB: { winnerOf: 'UBSF2' } },

  // Lower Bracket Round 1 (UBQF 패자 4명)
  { id: 'LBR1-1', round: 'LBR1', slotA: { loserOf: 'UBQF1' }, slotB: { loserOf: 'UBQF2' } },
  { id: 'LBR1-2', round: 'LBR1', slotA: { loserOf: 'UBQF3' }, slotB: { loserOf: 'UBQF4' } },

  // Lower Bracket Quarterfinals (LBR1 승자 + UBSF 패자, 리매치 방지 교차)
  { id: 'LBQF1', round: 'LBQF', slotA: { winnerOf: 'LBR1-1' }, slotB: { loserOf: 'UBSF2' } },
  { id: 'LBQF2', round: 'LBQF', slotA: { winnerOf: 'LBR1-2' }, slotB: { loserOf: 'UBSF1' } },

  // Lower Bracket Semifinal
  { id: 'LBSF', round: 'LBSF', slotA: { winnerOf: 'LBQF1' }, slotB: { winnerOf: 'LBQF2' } },

  // Lower Bracket Final (LBSF 승자 + UBF 패자)
  { id: 'LBF', round: 'LBF', slotA: { winnerOf: 'LBSF' }, slotB: { loserOf: 'UBF' } },

  // Grand Final (UBF 승자 + LBF 승자)
  { id: 'GF', round: 'GF', slotA: { winnerOf: 'UBF' }, slotB: { winnerOf: 'LBF' } },
];

export const MATCH_BY_ID = Object.fromEntries(MATCHES.map((m) => [m.id, m]));
