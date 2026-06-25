// 브라켓 진입 모듈. 순수 뷰/로직을 묶어 window.DinoBracket 으로 노출한다.
// 영속화/권한/Supabase 동기화는 yumt의 클래식 script.js가 담당하고,
// 여기서는 상태를 받아 렌더하고, 어드민 편집 시 onChange(nextState)로 새 상태를 돌려준다.

import { cloneDefaultTeams, bySeed } from './teams.js';
import { computeBracket, pruneInvalidResults } from './advance.js';
import { renderBracket } from './render.js';
import { renderTeamList } from './teamlist.js';
import { openMatchModal, close as closeModal } from './modal.js';
import { close as closeMemberModal } from './memberModal.js';

function defaultState() {
  return { results: {}, teams: cloneDefaultTeams() };
}

/** Supabase/외부에서 들어온 값 검증 → { results, teams } 정규화 */
function normalize(state) {
  const base = defaultState();
  if (!state || typeof state !== 'object') return base;

  const teams = Array.isArray(state.teams) && state.teams.length === 8
    ? state.teams.map((t, i) => ({
        id: t.id || `t${i + 1}`,
        seed: t.seed ?? i + 1,
        name: String(t.name ?? `팀 ${i + 1}`).slice(0, 30),
        members: Array.isArray(t.members) ? t.members.map(String) : [],
      }))
    : base.teams;

  const results = (state.results && typeof state.results === 'object') ? state.results : {};
  return { results: pruneInvalidResults(results, bySeed(teams)), teams };
}

/**
 * 브라켓 + 팀 리스트 렌더.
 * @param {{ bracketEl?:Element, teamListEl?:Element, state:{results,teams}, admin:boolean, onChange?:(next)=>void }} opts
 */
function render({ bracketEl, teamListEl, state, admin, onChange, roster }) {
  const { results, teams } = state;
  const seedMap = bySeed(teams);

  if (bracketEl) {
    renderBracket(bracketEl, results, teams, (matchId) => {
      openMatchModal(matchId, results, teams, {
        admin,
        onSubmit: admin ? (payload) => {
          const cleaned = pruneInvalidResults({ ...results, [matchId]: payload }, seedMap);
          onChange?.({ results: cleaned, teams });
        } : null,
        onClear: admin ? () => {
          const next = { ...results };
          delete next[matchId];
          onChange?.({ results: pruneInvalidResults(next, seedMap), teams });
        } : null,
      });
    });
  }

  if (teamListEl) {
    renderTeamList(teamListEl, teams, {
      admin,
      roster,
      onRename: admin ? (id, name) => onChange?.({ results, teams: teams.map((t) => (t.id === id ? { ...t, name } : t)) }) : null,
      onEditMembers: admin ? (id, members) => onChange?.({ results, teams: teams.map((t) => (t.id === id ? { ...t, members } : t)) }) : null,
    });
  }
}

window.DinoBracket = {
  defaultState,
  normalize,
  render,
  closeModal: () => { closeModal(); closeMemberModal(); },
};
