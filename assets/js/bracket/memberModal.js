// 팀원 선택 모달. DB 명단(roster)을 체크박스로 보여주고, 다른 팀에 이미
// 배정된 인원은 비활성화한다. 결정 시 onConfirm(선택된 이름 배열) 호출.
// 모든 이름은 textContent/value로만 출력(XSS 방지). 클래스는 bk- 접두사(전역).

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

/**
 * @param {{
 *   team: {id,name,members?:string[]},
 *   roster: string[],                 // DB 명단(전체 후보)
 *   takenByOthers: Set<string>|string[], // 다른 팀에 이미 배정된 이름
 *   onConfirm: (members:string[])=>void
 * }} opts
 */
export function openMemberModal({ team, roster, takenByOthers, onConfirm }) {
  const ov = ensureOverlay();
  const taken = takenByOthers instanceof Set ? takenByOthers : new Set(takenByOthers || []);
  const current = new Set(team?.members ?? []);

  // 후보 목록: 명단 + 명단에 없는 기존 팀원(레거시 자유입력)도 앞에 포함
  const names = Array.isArray(roster) ? [...roster] : [];
  for (const m of current) if (!names.includes(m)) names.unshift(m);

  const selected = new Set(current);

  ov.replaceChildren();
  const dialog = document.createElement('div');
  dialog.className = 'bk-modal bk-member-modal';

  // 헤더
  const head = document.createElement('div');
  head.className = 'bk-modal-head';
  const h2 = document.createElement('h2');
  h2.textContent = `${team?.name ?? '팀'} · 팀원 선택`;
  const closeBtn = document.createElement('button');
  closeBtn.className = 'bk-modal-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', '닫기');
  closeBtn.textContent = '✕';
  closeBtn.addEventListener('click', close);
  head.append(h2, closeBtn);

  // 본문
  const body = document.createElement('div');
  body.className = 'bk-modal-body';

  const search = document.createElement('input');
  search.className = 'bk-member-search';
  search.type = 'search';
  search.placeholder = '이름 검색';
  search.setAttribute('aria-label', '팀원 이름 검색');

  const count = document.createElement('p');
  count.className = 'bk-modal-note bk-member-count';
  const updateCount = () => { count.textContent = `선택됨 ${selected.size}명`; };
  updateCount();

  const list = document.createElement('div');
  list.className = 'bk-member-list';

  for (const name of names) {
    const disabled = taken.has(name) && !current.has(name);

    const item = document.createElement('label');
    item.className = 'bk-member-item';
    item.dataset.name = name;
    if (disabled) item.classList.add('is-taken');

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = name;
    cb.checked = selected.has(name);
    cb.disabled = disabled;
    cb.addEventListener('change', () => {
      if (cb.checked) selected.add(name); else selected.delete(name);
      updateCount();
    });

    const label = document.createElement('span');
    label.className = 'bk-member-name';
    label.textContent = name;

    item.append(cb, label);

    if (disabled) {
      const badge = document.createElement('span');
      badge.className = 'bk-member-badge';
      badge.textContent = '다른 팀';
      item.appendChild(badge);
    }

    list.appendChild(item);
  }

  search.addEventListener('input', () => {
    const q = search.value.trim().toLowerCase();
    for (const item of list.children) {
      const hit = !q || item.dataset.name.toLowerCase().includes(q);
      item.hidden = !hit;
    }
  });

  body.append(search, count, list);

  // 액션
  const actions = document.createElement('div');
  actions.className = 'bk-modal-actions';
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'bk-btn-clear';
  cancelBtn.type = 'button';
  cancelBtn.textContent = '취소';
  cancelBtn.addEventListener('click', close);

  const confirmBtn = document.createElement('button');
  confirmBtn.className = 'bk-btn-save';
  confirmBtn.type = 'button';
  confirmBtn.textContent = '결정';
  confirmBtn.addEventListener('click', () => {
    // 명단 순서 유지하여 반영
    const ordered = names.filter((n) => selected.has(n));
    onConfirm?.(ordered);
    close();
  });
  actions.append(cancelBtn, confirmBtn);

  dialog.append(head, body, actions);
  ov.appendChild(dialog);
  ov.hidden = false;
  search.focus();
}
