// 하단 참여 팀 리스트 (bracket_editor 포팅). 어드민=팀명/팀원 편집, 유저=읽기 전용.
// 어드민 팀원 편집은 DB 명단(roster)을 모달로 띄워 선택(memberModal)한다.
// 모든 사용자 입력값은 value/textContent로만 출력(XSS 방지).

import { openMemberModal } from './memberModal.js';

export function renderTeamList(root, teams, { admin, onRename, onEditMembers, roster }) {
  root.replaceChildren();
  const sorted = [...teams].sort((a, b) => a.seed - b.seed);

  for (const team of sorted) {
    const card = document.createElement('article');
    card.className = 'team-list-card';

    const head = document.createElement('header');
    head.className = 'team-list-head';
    const seed = document.createElement('span');
    seed.className = 'team-seed';
    seed.textContent = `#${team.seed}`;
    head.appendChild(seed);

    if (admin) {
      const nameInput = document.createElement('input');
      nameInput.className = 'team-name-input';
      nameInput.value = team.name;
      nameInput.maxLength = 30;
      nameInput.setAttribute('aria-label', `${team.seed}번 팀 이름`);
      nameInput.addEventListener('change', () => {
        onRename?.(team.id, nameInput.value.trim() || `팀 ${team.seed}`);
      });
      head.appendChild(nameInput);
    } else {
      const h3 = document.createElement('h3');
      h3.className = 'team-list-name';
      h3.textContent = team.name;
      head.appendChild(h3);
    }
    card.appendChild(head);

    if (admin) {
      const picker = document.createElement('div');
      picker.className = 'team-members-picker';

      const chips = document.createElement('div');
      chips.className = 'team-members-chips';
      const members = team.members ?? [];
      if (members.length === 0) {
        const empty = document.createElement('span');
        empty.className = 'team-members-empty';
        empty.textContent = '아직 팀원이 없습니다';
        chips.appendChild(empty);
      } else {
        for (const m of members) {
          const chip = document.createElement('span');
          chip.className = 'team-member-chip';
          chip.textContent = m;
          chips.appendChild(chip);
        }
      }

      const pickBtn = document.createElement('button');
      pickBtn.type = 'button';
      pickBtn.className = 'team-members-pick-btn';
      pickBtn.textContent = members.length ? '팀원 수정' : '팀원 선택';
      pickBtn.addEventListener('click', () => {
        const takenByOthers = new Set();
        for (const other of teams) {
          if (other.id === team.id) continue;
          for (const m of (other.members ?? [])) takenByOthers.add(m);
        }
        openMemberModal({
          team,
          roster,
          takenByOthers,
          onConfirm: (next) => onEditMembers?.(team.id, next),
        });
      });

      picker.append(chips, pickBtn);
      card.appendChild(picker);
    } else {
      const ul = document.createElement('ul');
      ul.className = 'team-list-members';
      for (const m of (team.members ?? [])) {
        const li = document.createElement('li');
        li.textContent = m;
        ul.appendChild(li);
      }
      card.appendChild(ul);
    }

    root.appendChild(card);
  }
}
