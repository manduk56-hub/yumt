// 매치 박스 사이 승자 진출 연결선을 SVG 엘보로 그린다 (bracket_editor 포팅, 변경 없음).
// 패자 드롭선(upper→lower)은 교차가 지저분하므로 생략(프로토타입과 동일).

import { MATCHES } from './structure.js';
import { GEO } from './layout.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

export function renderConnectors(svg, positions, width, height) {
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.replaceChildren();

  for (const m of MATCHES) {
    for (const slot of ['slotA', 'slotB']) {
      const src = m[slot];
      if (!src.winnerOf) continue; // 승자 진출선만
      const from = positions[src.winnerOf];
      const to = positions[m.id];
      if (!from || !to) continue;
      drawElbow(svg, from, to);
    }
  }
}

function drawElbow(svg, from, to) {
  const sx = from.x + GEO.MATCH_W;
  const sy = from.y + GEO.MATCH_H / 2;
  const tx = to.x;
  const ty = to.y + GEO.MATCH_H / 2;
  const midX = sx + (tx - sx) / 2;

  const d = `M ${sx} ${sy} H ${midX} V ${ty} H ${tx}`;
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', d);
  path.setAttribute('class', 'connector');
  path.setAttribute('fill', 'none');
  svg.appendChild(path);
}
