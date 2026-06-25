# 토너먼트 기능 제거 인벤토리

> 작성 목적: 토너먼트 브라켓 기능을 **정확히 알고 제거**하기 위한 전수 조사 문서.
> 나중에 스토리북 자리에 다른 콘텐츠로 교체할 예정이므로, **스토리북 화면과 트리거 버튼은 보존**한다.
> 기준 커밋: `master` (765ef8b), 작업 브랜치 `DoDAON/develop/refactoring`.
> **이 문서는 1-a(문서화) 단계 산출물이며, 실제 삭제(1-b)는 승인 후 진행한다.**

---

## 0. 한눈에 보기 (보존 vs 제거)

| 구분 | 항목 | 처리 |
|---|---|---|
| 보존 | `#screen-storybook` 화면 (만화 이미지) | **유지** |
| 보존 | `#btn-open-tournament` 버튼 엘리먼트 + `.storybook-tournament-button` CSS | **유지** (동작만 제거 → 추후 교체 자리) |
| 제거 | `#screen-tournament` 화면 전체 | 삭제 |
| 제거 | 보스 페이지의 "토너먼트 관리" 블록 | 삭제 |
| 제거 | `script.js`의 토너먼트 로직 일체 | 삭제 |
| 제거 | 토너먼트 전용 CSS (`#screen-tournament` ~ 미디어쿼리) | 삭제 |
| 제거 | 토너먼트 전용 2초 폴링 + 보스컨트롤 토너먼트 동기화 | 삭제 |

> **요지**: 토너먼트는 단순 "브라켓 UI 한 덩어리"가 아니라, ①전용 화면 ②보스 관리 패널 ③localStorage 영속화 ④보스컨트롤 JSON(`rankings.dino_desc`) 동기화 ⑤2초 폴링 ⑥export(JSON 다운로드) 까지 6갈래로 퍼져 있다.

---

## 1. HTML (`index.html`)

### 1-1. 보존 — 스토리북 트리거 버튼 (206~207)
```html
<button type="button" id="btn-open-tournament" class="storybook-tournament-button"
    aria-label="토너먼트 대진표 열기"></button>
```
- `#screen-storybook` 안의 만화 이미지 위에 얹힌 투명 버튼.
- **엘리먼트와 CSS는 유지**하되, JS 클릭 핸들러(아래 3-4)는 제거 → 눌러도 아무 동작 없는 상태가 됨(추후 다른 기능으로 교체할 앵커).

### 1-2. 제거 — 토너먼트 화면 전체 (213~235)
`<section id="screen-tournament" class="screen hidden"> ... </section>` 통째.
포함 엘리먼트: `#tournament-mode-badge`, `#tournament-help`, `#tournament-bracket`, `#tournament-team-help`, `#tournament-team-list`, `#btn-back-tournament`.

### 1-3. 제거 — 보스 페이지 "토너먼트 관리" 블록 (436~444)
```html
<div class="dash-section paper-bg boss-tournament-admin"> ... </div>
```
포함 버튼: `#btn-boss-open-tournament`(대진표 관리하기), `#btn-boss-tournament-export`(내보내기), `#btn-boss-tournament-reset`(경기 선택 초기화), `#boss-tournament-status`.

---

## 2. CSS (`styles.css`)

### 2-1. 보존 (754~772)
```
.storybook-tournament-button { ... }           /* 754~767 */
.storybook-tournament-button:focus-visible { } /* 769~772 */
```
트리거 버튼 스타일 → **유지**.

### 2-2. 제거 (774~1034)
- `774` 주석 `/* Tournament bracket */`
- `775` `#screen-tournament { ... }` 부터
- `.tournament-shell`, `.tournament-header`, `.tournament-kicker`, `.tournament-mode-badge`, `.tournament-help`, `.tournament-bracket`, `.bracket-round`, `.bracket-match`, `.bracket-team`(+`.winner`/`.readonly`), `.tournament-champion`, `.tournament-participants`, `.tournament-team-list`, `.tournament-team-card`, `.tournament-bottom-spacer`, `.boss-tournament-admin`, `.boss-tournament-actions`, `.boss-tournament-status` 까지
- `1027~1034` `@media (max-width: 720px) { ... }` — **이 미디어쿼리는 토너먼트 규칙만 들어있어 통째 삭제 가능**.

> 경계 확인 완료: 보존 영역(754~772)과 제거 영역(774~1034)이 깔끔히 분리됨. 1036행부터는 `#btn-back-storybook` 등 무관한 규칙.

---

## 3. JS (`script.js`)

### 3-1. DOM 참조 (제거)
- `211` `const screenTournament = ...`
- `241` `const btnOpenTournament = ...` → 엘리먼트는 보존이지만 이 const는 핸들러용. 핸들러 제거 시 함께 정리.
- `242` `const btnBackTournament = ...`

### 3-2. 상수/상태 (제거, 1311~1344)
- `TOURNAMENT_STORAGE_KEY`, `DEFAULT_TOURNAMENT_TEAMS`, `TOURNAMENT_MATCHES`, `TOURNAMENT_ROUNDS`
- `tournamentState`, `isTournamentAdminMode`, `tournamentReturnScreen`, `tournamentSaveQueue`, `tournamentSaving`

### 3-3. 함수 (제거, 1346~1572)
`freshTournamentState`, `normalizeTournamentState`, `loadTournamentState`, `saveTournamentState`, `canManageTournament`, `setBossTournamentStatus`, `persistTournamentState`, `resolveTournament`, `getTournamentTeamName`, `createTournamentMatch`, `renderTournament`, `exportTournament`

### 3-4. 이벤트 리스너 (제거, 1645~1684)
- `btnOpenTournament` click (1645~1655) — 스토리북 트리거. **제거**(버튼 자체는 보존).
- `btnBackTournament` click (1656)
- `#btn-boss-open-tournament` click (1657~1664)
- `#btn-boss-tournament-export` click (1665~1669)
- `#btn-boss-tournament-reset` click (1670~1684)

### 3-5. 폴링 (제거, 1894~1898)
```js
setInterval(() => {
    if (screenTournament?.classList.contains('active') && !isTournamentAdminMode) {
        checkBossMessage();
    }
}, 2000);
```
토너먼트 화면 실시간 동기화 전용 2초 폴링 → **제거**.
※ `setInterval(checkBossMessage, 10000)` (1893) 은 보스 메시지/컨트롤용이므로 **유지**.

---

## 4. 숨은 결합 (반드시 함께 처리)

토너먼트 상태는 별도 테이블이 아니라 **보스 컨트롤 JSON(`rankings.dino_desc`)에 얹혀** 저장된다. 다음 지점에서 `tournament` 키를 함께 정리해야 잔재가 안 남는다.

- `298` `appControls` 기본값의 `tournament: null`
- `400` `parseBossControls` defaults의 `tournament: null`
- `414` `parseBossControls`의 `tournament: parsed.tournament || null`
- `432` `serializeBossControls`의 `tournament: controls.tournament || null` → **쓰기 중단**
- `445~448` `fetchBossControls` 내 `if (appControls.tournament) { tournamentState = ...; saveTournamentState(); }`
- `1808~1815` `checkBossMessage` 내 토너먼트 상태 동기화 블록

### DB 영향
- **마이그레이션 불필요.** 기존 BOSS 행의 `dino_desc` JSON에 `tournament` 키가 남아 있어도, 읽지 않으면 무해(무시됨).
- `serializeBossControls`에서 `tournament` 쓰기를 멈추면, 보스가 다음에 컨트롤을 저장하는 순간 자연스럽게 키가 사라진다.

---

## 5. 제거 체크리스트 (1-b 단계에서 사용)

- [ ] HTML: `#screen-tournament`(213~235) 삭제
- [ ] HTML: `.boss-tournament-admin` 블록(436~444) 삭제
- [ ] HTML: `#btn-open-tournament`(206~207) **보존**
- [ ] CSS: 774~1034 삭제 / 754~772 **보존**
- [ ] JS: 상수·상태(3-2), 함수(3-3), 리스너(3-4), 2초 폴링(3-5) 삭제
- [ ] JS: DOM 참조 `screenTournament`/`btnBackTournament` 삭제, `btnOpenTournament` 핸들러 제거
- [ ] JS: 보스컨트롤 `tournament` 키 정리(4번 6개 지점)
- [ ] 검증: 스토리북 화면 정상 표시 + 트리거 버튼 눌러도 에러 없음(콘솔 클린)
- [ ] 검증: 보스 페이지 정상 표시(토너먼트 관리 블록만 사라짐)
- [ ] 검증: 보스 메시지 발송/수신(10초 폴링) 정상 동작

---

## 6. 사이드이펙트 / 주의

- `btnOpenTournament` 핸들러를 지우면 버튼은 **무동작**이 된다(의도된 상태, 추후 교체 자리).
- 2초 폴링 제거로 보스 컨트롤 반영 주기가 최대 10초로 통일된다(원래 토너먼트 화면에서만 2초였음). 일반 사용성엔 영향 없음.
- `localStorage`의 `dinoVillageTournamentV1` 키는 더 이상 읽지/쓰지 않게 된다. 기존 사용자 브라우저에 남은 값은 무해.
