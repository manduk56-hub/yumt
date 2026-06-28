// 기본 8팀(공룡 테마) + 팀 배열로부터 조회 맵 생성.
// 팀은 동적이며(어드민 편집/Supabase 동기화) seed→팀, id→팀 맵을 그때그때 만든다.

export const DEFAULT_TEAMS = [
  { id: 't1', seed: 1, name: '티라노 팀', members: [] },
  { id: 't2', seed: 2, name: '트리케라 팀', members: [] },
  { id: 't3', seed: 3, name: '브라키오 팀', members: [] },
  { id: 't4', seed: 4, name: '벨로시랩터 팀', members: [] },
  { id: 't5', seed: 5, name: '스테고 팀', members: [] },
  { id: 't6', seed: 6, name: '안킬로 팀', members: [] },
  { id: 't7', seed: 7, name: '스피노 팀', members: [] },
  { id: 't8', seed: 8, name: '프테라 팀', members: [] },
];

export const bySeed = (teams) => Object.fromEntries(teams.map((t) => [t.seed, t]));
export const byId = (teams) => Object.fromEntries(teams.map((t) => [t.id, t]));

export function cloneDefaultTeams() {
  return DEFAULT_TEAMS.map((t) => ({ ...t, members: [...t.members] }));
}
