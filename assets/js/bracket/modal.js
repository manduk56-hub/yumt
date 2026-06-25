// 매치 결과 모달 (bracket_editor 포팅). 어드민=승자/스코어 입력, 유저=읽기 전용.
// 팀명/팀원은 textContent로 출력(XSS 방지). 클래스는 bk- 접두사(전역, yumt와 충돌 방지).

import { MATCH_BY_ID } from './structure.js';
import { computeBracket } from './advance.js';
import { bySeed, byId } from './teams.js';

let overlay = null;

function ensureOverlay() {
  if (overlay) return overlay;
  overlay = document.createElement('div');
  overlay.className = 'bk-modal-overlay';
  overlay.hidden = true;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  document.body.appendChild(overlay);
  return overlay;
}

export function close() { if (overlay) overlay.hidden = true; }

export function openMatchModal(matchId, results, teams, { admin, onSubmit, onClear }) {
  const ov = ensureOverlay();
  const match = MATCH_BY_ID[matchId];
  const teamById = byId(teams);
  const st = computeBracket(results, bySeed(teams))[matchId];
  const teamA = st.slotA ? teamById[st.slotA] : null;
  const teamB = st.slotB ? teamById[st.slotB] : null;
  let selected = st.winner; // 'slotA' | 'slotB' | null

  ov.replaceChildren();
  const dialog = document.createElement('div');
  dialog.className = 'bk-modal';

  const head = document.createElement('div');
  head.className = 'bk-modal-head';
  const h2 = document.createElement('h2');
  h2.textContent = `${match.round} · ${matchId}`;
  const closeBtn = document.createElement('button');
  closeBtn.className = 'bk-modal-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', '닫기');
  closeBtn.textContent = '✕';
  closeBtn.addEventListener('click', close);
  head.append(h2, closeBtn);

  const body = document.createElement('div');
  body.className = 'bk-modal-body';
  const note = document.createElement('p');
  note.className = 'bk-modal-note';

  if (!st.ready) {
    note.textContent = '아직 두 팀이 모두 정해지지 않았습니다. 이전 경기 결과를 먼저 입력하세요.';
    body.appendChild(note);
  } else {
    note.textContent = admin ? '승자를 선택하면 다음 라운드/패자조로 자동 진출합니다.' : '경기 결과입니다.';
    body.appendChild(note);
    const cards = document.createElement('div');
    cards.className = 'bk-team-cards';
    cards.appendChild(teamCard(teamA, 'slotA', st.scoreA, selected, admin));
    cards.appendChild(teamCard(teamB, 'slotB', st.scoreB, selected, admin));
    body.appendChild(cards);
    if (admin) {
      cards.addEventListener('change', (e) => {
        if (e.target.name === 'bk-winner') selected = e.target.value;
      });
    }
  }

  const actions = document.createElement('div');
  actions.className = 'bk-modal-actions';
  if (admin) {
    const clearBtn = document.createElement('button');
    clearBtn.className = 'bk-btn-clear';
    clearBtn.type = 'button';
    clearBtn.textContent = '결과 초기화';
    clearBtn.addEventListener('click', () => { onClear?.(); close(); });

    const saveBtn = document.createElement('button');
    saveBtn.className = 'bk-btn-save';
    saveBtn.type = 'button';
    saveBtn.textContent = '저장';
    saveBtn.disabled = !st.ready;
    saveBtn.addEventListener('click', () => {
      if (!selected) { note.textContent = '승자를 선택하세요.'; return; }
      onSubmit?.({ winner: selected, scoreA: readScore(body, 'slotA'), scoreB: readScore(body, 'slotB') });
      close();
    });
    actions.append(clearBtn, saveBtn);
  } else {
    const okBtn = document.createElement('button');
    okBtn.className = 'bk-btn-save';
    okBtn.type = 'button';
    okBtn.textContent = '닫기';
    okBtn.addEventListener('click', close);
    actions.append(okBtn);
  }

  dialog.append(head, body, actions);
  ov.appendChild(dialog);
  ov.hidden = false;
}

function teamCard(team, slot, score, selected, admin) {
  const label = document.createElement('label');
  label.className = 'bk-team-card';
  label.dataset.slot = slot;

  if (admin) {
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'bk-winner';
    radio.value = slot;
    if (selected === slot) radio.checked = true;
    label.appendChild(radio);
  } else if (selected === slot) {
    label.classList.add('is-winner');
  }

  const main = document.createElement('div');
  main.className = 'bk-team-card-main';
  const nm = document.createElement('div');
  nm.className = 'bk-team-card-name';
  nm.textContent = team?.name ?? '—';
  const mem = document.createElement('div');
  mem.className = 'bk-team-card-members';
  mem.textContent = (team?.members ?? []).join(', ');
  main.append(nm, mem);
  label.appendChild(main);

  if (admin) {
    const sc = document.createElement('input');
    sc.className = 'bk-score-input';
    sc.type = 'number';
    sc.min = '0';
    sc.inputMode = 'numeric';
    sc.dataset.slot = slot;
    sc.value = score ?? '';
    sc.placeholder = '점수';
    label.appendChild(sc);
  } else {
    const sc = document.createElement('span');
    sc.className = 'bk-score-readonly';
    sc.textContent = score != null ? String(score) : '';
    label.appendChild(sc);
  }
  return label;
}

function readScore(body, slot) {
  const el = body.querySelector(`.bk-score-input[data-slot="${slot}"]`);
  const v = el?.value?.trim();
  return v === '' || v == null ? null : Number(v);
}
