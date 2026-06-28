// 브라켓 렌더: 라운드 헤더 + 매치 박스(절대좌표) + SVG 연결선 (bracket_editor 포팅).
// 매치 박스 클릭 시 onMatchClick(matchId) 호출. teams를 받아 동적 팀명 표시.

import { MATCHES, ROUNDS } from './structure.js';
import { computeLayout, GEO } from './layout.js';
import { renderConnectors } from './connectors.js';
import { computeBracket } from './advance.js';
import { bySeed, byId } from './teams.js';

let cachedLayout = null;

export function renderBracket(root, results, teams, onMatchClick) {
  const layout = (cachedLayout ??= computeLayout());
  const { positions, columns, width, height, upperBottom } = layout;
  const teamById = byId(teams);
  const bracket = computeBracket(results, bySeed(teams));

  root.style.width = `${width}px`;
  root.style.height = `${height}px`;
  root.replaceChildren();

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('bracket-connectors');
  root.appendChild(svg);
  renderConnectors(svg, positions, width, height);

  for (const r of ROUNDS) {
    const col = columns[r.id];
    if (!col) continue;
    const header = document.createElement('div');
    header.className = 'round-header';
    header.textContent = r.title;
    header.style.left = `${col.x}px`;
    header.style.width = `${GEO.MATCH_W}px`;
    const topY = col.lane === 'lower' ? upperBottom + GEO.LANE_GAP - GEO.PAD_TOP + 8 : 8;
    header.style.top = `${topY}px`;
    root.appendChild(header);
  }

  for (const m of MATCHES) {
    root.appendChild(renderMatchBox(m, positions[m.id], bracket[m.id], teamById, onMatchClick));
  }
}

function renderMatchBox(match, pos, st, teamById, onMatchClick) {
  const box = document.createElement('div');
  box.className = 'match-box';
  box.style.left = `${pos.x}px`;
  box.style.top = `${pos.y}px`;
  box.style.width = `${GEO.MATCH_W}px`;
  box.dataset.matchId = match.id;
  if (!st.ready) box.classList.add('is-pending');

  box.appendChild(renderSlot(st.slotA, st.scoreA, st.winner === 'slotA', st.ready, teamById));
  box.appendChild(renderSlot(st.slotB, st.scoreB, st.winner === 'slotB', st.ready, teamById));

  const info = document.createElement('button');
  info.className = 'match-info';
  info.type = 'button';
  info.title = '경기 상세';
  info.textContent = 'ⓘ';
  box.appendChild(info);

  box.addEventListener('click', () => onMatchClick?.(match.id));
  return box;
}

function renderSlot(teamId, score, isWinner, ready, teamById) {
  const slot = document.createElement('div');
  slot.className = 'match-slot';
  if (isWinner) slot.classList.add('is-winner');

  const name = document.createElement('span');
  name.className = 'slot-name';
  const team = teamId ? teamById[teamId] : null;
  name.textContent = team ? team.name : (ready ? '—' : 'TBD');
  if (!team) slot.classList.add('is-empty');

  const sc = document.createElement('span');
  sc.className = 'slot-score';
  sc.textContent = score != null ? String(score) : '';

  slot.append(name, sc);
  return slot;
}
