// 결과 기반 자동 진출 계산 (bracket_editor 포팅, 동적 teams 대응).
//
// 단일 진실원천: results = { [matchId]: { winner:'slotA'|'slotB', scoreA, scoreB } }
// 시드 배치 + results 만으로 모든 슬롯 점유 팀을 결정론적으로 도출한다.
// 프로토타입과 달리 seed→팀 매핑(teamBySeed)을 인자로 받는다(팀이 동적이므로).

import { MATCH_BY_ID, MATCHES } from './structure.js';

export function resolveSlot(matchId, slot, results, teamBySeed, _seen = new Set()) {
  const guardKey = `${matchId}.${slot}`;
  if (_seen.has(guardKey)) return null; // 순환 방지(정상 구조에선 발생 안 함)
  _seen.add(guardKey);

  const match = MATCH_BY_ID[matchId];
  if (!match) return null;
  const src = match[slot];

  if (src.seed != null) return teamBySeed[src.seed]?.id ?? null;
  if (src.winnerOf) return resolveWinner(src.winnerOf, results, teamBySeed, _seen);
  if (src.loserOf) return resolveLoser(src.loserOf, results, teamBySeed, _seen);
  return null;
}

export function resolveWinner(matchId, results, teamBySeed, _seen = new Set()) {
  const r = results[matchId];
  if (!r || !r.winner) return null;
  return resolveSlot(matchId, r.winner, results, teamBySeed, _seen);
}

export function resolveLoser(matchId, results, teamBySeed, _seen = new Set()) {
  const r = results[matchId];
  if (!r || !r.winner) return null;
  const loserSlot = r.winner === 'slotA' ? 'slotB' : 'slotA';
  return resolveSlot(matchId, loserSlot, results, teamBySeed, _seen);
}

/** 전체 브라켓의 현재 상태를 한 번에 계산. */
export function computeBracket(results, teamBySeed) {
  const out = {};
  for (const m of MATCHES) {
    const slotA = resolveSlot(m.id, 'slotA', results, teamBySeed);
    const slotB = resolveSlot(m.id, 'slotB', results, teamBySeed);
    const r = results[m.id] ?? {};
    out[m.id] = {
      slotA,
      slotB,
      winner: r.winner ?? null,
      scoreA: r.scoreA ?? null,
      scoreB: r.scoreB ?? null,
      ready: Boolean(slotA && slotB),
    };
  }
  return out;
}

/** 모순된 하위 결과(슬롯이 비게 되는 것)를 연쇄 정리. */
export function pruneInvalidResults(results, teamBySeed) {
  let changed = true;
  const cleaned = { ...results };
  while (changed) {
    changed = false;
    for (const m of MATCHES) {
      const r = cleaned[m.id];
      if (!r || !r.winner) continue;
      const slotA = resolveSlot(m.id, 'slotA', cleaned, teamBySeed);
      const slotB = resolveSlot(m.id, 'slotB', cleaned, teamBySeed);
      const present = r.winner === 'slotA' ? slotA : slotB;
      if (!present || !slotA || !slotB) {
        delete cleaned[m.id];
        changed = true;
      }
    }
  }
  return cleaned;
}
