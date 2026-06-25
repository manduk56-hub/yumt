# 브라켓 에디터 → yumt 통합 설계

> 목적: `bracket_editor` 프로토타입(8팀 더블 엘리미네이션)을 yumt에 반영한다.
> 기존 임시 토너먼트는 먼저 제거(→ [[tournament-removal]] 문서 기준)하고, 그 자리에 새 브라켓을 넣는다.
> 핵심 변경: **편집은 어드민(보스)만**, 변경사항은 **Supabase로 동기화**, **유저뷰는 관전(읽기 전용)**.
> 기술스택 유지: 정적 서빙, node 서버 미사용, 무빌드.

---

## 1. 프로토타입 분석 요약

| 파일 | 역할 | yumt 반영 |
|---|---|---|
| `src/bracket/structure.js` | 8팀 더블엘리 매치 그래프(ROUNDS/MATCHES) + 전파 인덱스 | **그대로 포팅** |
| `src/bracket/advance.js` | `resolveSlot`/`computeBracket`/`pruneInvalidResults` (순수) | **그대로 포팅** |
| `src/bracket/layout.js` | 매치 박스 절대좌표 계산(순수) | **그대로 포팅** |
| `src/bracket/connectors.js` | SVG 엘보 연결선(순수) | **그대로 포팅** |
| `src/bracket/render.js` | 브라켓 DOM 렌더 | 포팅 + `admin` 플래그 |
| `src/bracket/modal.js` | 결과입력 모달 | 포팅 + 어드민만 저장 가능 |
| `src/teams/teams.js` | 샘플 8팀(seed/name/members) | 기본값을 MT용으로 교체 |
| `src/teams/render.js` | 하단 팀 카드 리스트 | 포팅 + 어드민 편집 |
| `src/state.js` | localStorage 영속화 + pub/sub | **폐기** → Supabase 동기화로 대체 |
| `src/main.js` | 툴바(가져오기/내보내기/초기화) 와이어링 | 어드민 컨트롤로 재배치 |
| `server.js`, `package.json` | node 정적 서버 | **폐기**(yumt는 정적 서빙) |

### 설계 핵심 (그대로 계승)
- **단일 진실원천**: `results = { [matchId]: { winner:'slotA'|'slotB', scoreA, scoreB } }`. 슬롯 점유 팀은 시드+results로부터 결정론적 파생(`computeBracket`). 슬롯에 팀을 직접 저장하지 않음.
- 상태 전체 = `{ results, teams }`. teams = `[{ id, seed, name, members[] }]`.
- 결과 변경 시 `pruneInvalidResults`로 모순된 하위 결과 자동 정리.

---

## 2. yumt 통합 설계

### 2-1. 데이터 모델 (Supabase)
- 별도 테이블 불필요. **보스 컨트롤 JSON**(`rankings.dino_desc`, BOSS 행)의 `tournament` 키에 `{ results, teams }` 저장.
  - 옛 토너먼트도 같은 위치에 `{ teams, winners }`를 저장했음 → 위치/메커니즘 재사용, 신규 표면 최소.
  - 신규 shape: `tournament = { results: {...}, teams: [...] }`.
- 쓰기(어드민): `appControls.tournament = { results, teams }` → 기존 `saveBossControls()`로 BOSS 행 upsert.
- 읽기(유저): 기존 `fetchBossControls()` + `checkBossMessage()` 폴링(10초)로 수신 → 관전 렌더 갱신.

### 2-2. 모듈 구조 (권장)
- 순수 브라켓 로직/렌더는 프로토타입 구조 유지 → `assets/js/bracket/` 아래 ES 모듈로 포팅.
- 진입 모듈이 `window.DinoBracket = { renderBracket, renderTeamList, openMatchModal, computeBracket, ... }` 노출.
- 기존 `assets/js/script.js`(클래식 스크립트)가 상태 소유 + 동기화 + 어드민 게이팅을 담당하고, `window.DinoBracket`를 호출해 렌더.
  - 즉 **브라켓 모듈 = 순수 뷰/로직(영속화 없음)**, **script.js = 상태/Supabase/권한 소유**.
- `script.js`는 `window.supabaseClient`를 노출해 모듈/디버깅에서 재사용.

### 2-3. 어드민 vs 유저
| | 어드민(보스, `isBossProfile`) | 유저(관전) |
|---|---|---|
| 매치 박스 | 클릭 → 모달에서 승자/스코어 입력·저장 | 클릭 시 읽기전용 표시(또는 비활성) |
| 팀 리스트 | 팀명·팀원 편집 | 읽기 전용 |
| 초기화/내보내기 | 가능 | 없음 |
| 저장 | 편집 시 즉시 `saveBossControls()`(Supabase) | 저장 없음, 폴링으로 수신 |

### 2-4. 화면/진입점 (yumt)
- 유저: 스토리북의 트리거 버튼 `#btn-open-tournament`(보존됨) → 재건된 `#screen-tournament`(관전 모드).
- 어드민: 보스 페이지의 토너먼트 관리 블록(재건) → `#screen-tournament`(관리 모드).

### 2-5. 스타일
- 프로토타입의 회색 패널 스타일을 `#screen-tournament` 컨테이너 하위로 **스코프**해서 yumt 우드/쥬라기 테마와 충돌 방지(전역 `:root` 변수 누수 금지, 접두사/스코프 사용).
- 캔버스 폭 ≈ 1042px → 좁은 화면은 가로 스크롤(프로토타입 동일).

---

## 3. 폐기 항목
- `server.js`, `package.json` (node 서버) — 미포팅.
- `state.js`의 localStorage-단일진실원천 모델 — Supabase로 대체(로컬은 캐시 용도로만 선택적 사용).
- 프로토타입의 "유저뷰에서 편집" 동작 — 어드민 전용으로 게이팅.

---

## 4. 구현 단계

- **Phase A — 기존 토너먼트 제거(1-b)**: [[tournament-removal]] 체크리스트대로 삭제(트리거 버튼 보존). ※ 재구성/세션 작업으로 `script.js` 줄번호가 이동했으므로 삭제 직전 grep으로 위치 재확인.
- **Phase B — 브라켓 모듈 포팅**: `assets/js/bracket/*` 추가(structure/advance/layout/connectors/render/modal/teams). 서버·localStorage 제거, MT 기본 팀 적용, `admin` 플래그 도입, `window.DinoBracket` 노출.
- **Phase C — 화면/스타일**: `#screen-tournament` 재건(관전/관리 공용) + 보스 관리 진입 블록. 프로토타입 CSS 스코프 포팅.
- **Phase D — script.js 와이어링**: 상태를 `appControls.tournament`로 보유, 진입 핸들러(유저=스토리북 버튼/어드민=보스 페이지), 어드민 편집→`saveBossControls()`, 폴링 수신→관전 갱신. 보스컨트롤 shape 갱신.
- **Phase E — 검증**: 정적 서버 로딩, `node --check`(문법), 어드민 편집→유저 동기화 수동 확인.

---

## 5. 결정 필요 항목
1. **매치 스코어 입력** 유지 여부(프로토타입 기능). 권장: 유지.
2. **팀원(members) 뷰/편집** 유지 여부. 권장: 유지(= "팀뷰").
3. **기본 팀 8개**: 공룡 테마(티라노 팀 등) / 학생 명단 기반 / 빈 상태(관리자가 채움). 권장: 공룡 테마.
4. **모듈 구조**(2-2) 채택 여부. 권장: 채택.

---

## 6. 리스크/주의
- 클래식 `script.js` ↔ ES 모듈 브리지: 모듈은 deferred 실행이라 로드시점이 아닌 "토너먼트 열기 클릭" 시점에만 `window.DinoBracket`를 참조하므로 안전.
- 폴링 주기: 관전 화면에서 더 잦은 동기화가 필요하면 옛 토너먼트처럼 2초 폴링을 한시적으로 둘 수 있음(기본 10초).
- 보스컨트롤 JSON 용량: `{results, teams}`는 작아 `dino_desc` text 컬럼에 충분.
- 동시 편집(보스 다중 탭): 마지막 저장 우선(옛 동작과 동일).
