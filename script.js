// --- Data: Questions (3지선다) ---
const questions = [
    {
        q: "MT 조장을 뽑는 시간! 나의 반응은?",
        opt1: "내가 할게! 나만 믿고 따라와! 적극적으로 나선다.",
        opt2: "누군가 하겠지... 조용히 박수 치며 다른 사람을 추천한다.",
        opt3: "조장 대신 마스코트 하면 안 되나요? 엉뚱한 제안을 한다.",
        type1: 'aggressive', type2: 'gentle', type3: 'weird'
    },
    {
        q: "MT 가는 버스 안, 내가 앉고 싶은 자리는?",
        opt1: "멀미하는 친구를 챙겨줄 수 있는 창가 뒷자리.",
        opt2: "기사님 바로 뒷자리에서 기사님과 스몰토크 하기.",
        opt3: "버스 한가운데서 마이크 잡고 노래 부르기 좋은 자리!",
        type1: 'gentle', type2: 'weird', type3: 'aggressive'
    },
    {
        q: "저녁 바베큐 파티, 고기를 구울 때 나는?",
        opt1: "연기 마셔가며 친구들 접시에 고기 올려주기 바쁘다.",
        opt2: "마시멜로, 파인애플 등 고기 말고 이상한 것만 굽고 있다.",
        opt3: "비켜! 고기는 내가 굽는다! 집게와 가위를 독점한다.",
        type1: 'gentle', type2: 'weird', type3: 'aggressive'
    },
    {
        q: "레크리에이션 시간, 장기자랑을 해야 한다면?",
        opt1: "무대 밑에서 누구보다 열심히 호응하고 박수 친다.",
        opt2: "정체불명의 외계어 랩이나 막춤으로 무대를 뒤집어 놓는다.",
        opt3: "제일 먼저 뛰어나가 마이크를 뺏고 주인공이 된다.",
        type1: 'gentle', type2: 'weird', type3: 'aggressive'
    },
    {
        q: "갑자기 폭우가 쏟아져 야외 일정이 취소됐다!",
        opt1: "아쉽지만 어쩔 수 없지. 방 안에서 오순도순 보드게임을 한다.",
        opt2: "비 오는 날엔 수중전이지! 비 맞으며 뛰어놀자고 선동한다.",
        opt3: "비가 오니 파전이 당기네. 갑자기 부침가루를 찾으러 다닌다.",
        type1: 'gentle', type2: 'aggressive', type3: 'weird'
    },
    {
        q: "밤새 놀다가 피곤해서 자려는 친구가 있다면?",
        opt1: "벌써 자? 일어나! 친구를 깨워서 기어코 다시 앉힌다.",
        opt2: "조용히 이불을 덮어주고 방 불을 꺼준다.",
        opt3: "자는 친구 얼굴에 매직으로 낙서 예술 혼을 불태운다.",
        type1: 'aggressive', type2: 'gentle', type3: 'weird'
    },
    {
        q: "조별 미션 중, 길을 잃었다! 어떻게 할까?",
        opt1: "내 직감을 믿어! 이쪽이야! 무작정 앞장서서 걷는다.",
        opt2: "지나가는 사람에게 친절하게 길을 물어본다.",
        opt3: "오히려 좋아. 이곳이 우리의 새로운 아지트다. 돗자리를 깐다.",
        type1: 'aggressive', type2: 'gentle', type3: 'weird'
    },
    {
        q: "MT의 하이라이트! 술자리 게임을 할 때 나는?",
        opt1: "룰도 모르는 나만의 자작 게임을 만들어 유행시킨다.",
        opt2: "게임에 서툰 친구가 걸리지 않게 은근슬쩍 도와준다.",
        opt3: "마셔라 마셔라! 게임의 템포를 최고조로 끌어올린다.",
        type1: 'weird', type2: 'gentle', type3: 'aggressive'
    },
    {
        q: "아침이 밝았다. 기상 시간의 나는?",
        opt1: "가장 먼저 일어나 방을 치우고 해장라면 물을 올린다.",
        opt2: "텐트를 치고 밖에서 자고 있어서 아무도 못 찾고 있다.",
        opt3: "아침부터 에너지 폭발! 자는 친구들 깨우러 다니기 바쁘다.",
        type1: 'gentle', type2: 'weird', type3: 'aggressive'
    },
    {
        q: "MT를 무사히 마치고 집으로 돌아가는 길, 나의 모습은?",
        opt1: "다들 고생했어~ 단톡방에 사진을 공유하며 훈훈하게 마무리.",
        opt2: "나 이제 산에 들어가서 살래. 속세를 떠나 자연인 선언.",
        opt3: "우리 다음 주에 또 어디 갈래?! 벌써 다음 모임을 기획한다.",
        type1: 'gentle', type2: 'weird', type3: 'aggressive'
    }
];

// --- Data: Dinosaurs (12 Types) ---
const dinoTypes = {
    aggressive: [
        {
            emoji: '🦖',
            name: '티라노사우루스',
            desc: '자신감이 넘치고 항상 무리의 중심이 되는 최고의 포식자! 한번 목표를 정하면 직진합니다.',
            skills: ['공포의 포효', '파괴적인 치악력'],
            role: '든든한 지킴이',
            mtTip: '고기 굽는 집게를 꼭 챙기세요! 맛있는 바베큐 파티를 열어주면 홍주은도 도망갈 거예요!'
        },
        {
            emoji: '🦖',
            name: '안킬로사우루스',
            desc: '단단한 등껍질과 멋진 꼬리 곤봉! 평소엔 조용하지만, 친구들을 괴롭히면 무시무시하게 변신해요.',
            skills: ['철벽 방패', '꼬리 팡팡 공격'],
            role: '듬직한 보디가드',
            mtTip: '홍주은의 공격을 튼튼한 몸으로 막아주세요! 친구들을 등 뒤로 숨겨주는 당신은 최고의 영웅!'
        },
        {
            emoji: '🦖',
            name: '파키케팔로사우루스',
            desc: '엄청난 박치기왕! 하고 싶은 일이 생기면 머리부터 들이밀고 보는 열정 가득한 공룡이에요.',
            skills: ['파워 박치기', '우다다 돌진'],
            role: '용감한 돌격대장',
            mtTip: '어려운 상황이 오면 가장 먼저 앞장서주세요! 당신의 용기가 친구들에게 큰 힘이 될 거예요!'
        },
        {
            emoji: '🦕',
            name: '모사사우루스',
            desc: '바다의 제왕! 한 번 시작하면 끝을 보는 아주 멋진 야망가 공룡이랍니다.',
            skills: ['물속에서 숨기', '큰 파도 일으키기'],
            role: '물속의 영웅',
            mtTip: '계곡이나 바다로 홍주은을 유인해볼까요? 물속이라면 당신이 세상에서 제일 강하니까요!'
        }
    ],
    gentle: [
        {
            emoji: '🦖',
            name: '벨로시랩터',
            desc: '빠르고 영리하며 눈치가 100단이에요! 친구들 사이에서 똑똑박사 역할을 톡톡히 해낼 거예요.',
            skills: ['살금살금 걷기', '번개 같은 기습'],
            role: '똑똑한 정찰대장',
            mtTip: '홍주은이 어디 있는지 제일 먼저 찾아낼 수 있어요! 친구들에게 미리 알려주는 거 잊지 마세요!'
        },
        {
            emoji: '🦖',
            name: '트리케라톱스',
            desc: '방어력 최고! 평화를 사랑하고 맡은 일을 묵묵히 해내는 아주 믿음직한 공룡 친구예요.',
            skills: ['뿔 세우기', '튼튼한 경계'],
            role: '캠프 수호천사',
            mtTip: '우리 캠프의 평화를 지켜주세요! 지친 친구들이 편하게 쉴 수 있는 안전한 장소를 만들어봐요.'
        },
        {
            emoji: '🦕',
            name: '브라키오사우루스',
            desc: '커다란 몸집만큼 마음씨도 아주 넓어요! 싸우는 걸 싫어하고 모두와 사이좋게 지내는 착한 친구예요.',
            skills: ['높은 곳 구경하기', '평화의 노래'],
            role: '다정한 중재자',
            mtTip: '목을 길게 빼고 멀리까지 지켜봐 주세요! 친구들이 싸우지 않게 토닥토닥 해주는 것도 잊지 말기!'
        },
        {
            emoji: '🦕',
            name: '플레시오사우루스',
            desc: '물속을 우아하게 헤엄치는 낭만 공룡! 마음이 따뜻하고 예쁜 풍경을 보는 걸 정말 좋아해요.',
            skills: ['우아하게 피하기', '부드러운 물결'],
            role: '따뜻한 마음지기',
            mtTip: '무서운 상황에서도 여유를 잃지 마세요! 당신의 다정한 모습이 친구들의 무서움을 잊게 해줄 거예요.'
        }
    ],
    weird: [
        {
            emoji: '🦖',
            name: '스피노사우루스',
            desc: '물과 땅을 가리지 않는 만능 재주꾼! 남들이 뭐라 해도 나만의 길을 가는 멋쟁이 공룡이에요.',
            skills: ['첨벙첨벙 수영', '반짝이는 돛 자랑'],
            role: '엉뚱한 개척자',
            mtTip: '남들이 안 가는 길을 찾아보세요! 예상치 못한 곳에서 나타나 홍주은을 깜짝 놀라게 해줄 수 있어요!'
        },
        {
            emoji: '🦕',
            name: '스테고사우루스',
            desc: '등에 난 골판처럼 개성이 넘쳐요! 자신만의 취향이 확실한 아주 매력적인 공룡이랍니다.',
            skills: ['반짝반짝 골판', '꼬리 가시 흔들기'],
            role: '화려한 응원단장',
            mtTip: '당신의 멋진 패션이 홍주은의 눈을 휘둥그레하게 만들 거예요! 제일 예쁜 옷을 입고 오세요!'
        },
        {
            emoji: '🦖',
            name: '파라사우롤로푸스',
            desc: '신기한 소리를 내는 분위기 메이커! 노래 부르는 걸 좋아하고 친구들을 항상 웃게 해줘요.',
            skills: ['뿌우우 나팔 소리', '신나는 응원'],
            role: '흥부자 대장님',
            mtTip: '노래방에서 당신의 실력을 보여주세요! 신나는 노래로 홍주은의 정신을 쏙 빼놓는 거예요!'
        },
        {
            emoji: '🦕',
            name: '프테라노돈',
            desc: '하늘을 자유롭게 날아다녀요! 새로운 곳을 탐험하는 걸 좋아하는 호기심 많은 공룡이랍니다.',
            skills: ['슈웅 급강하', '하늘 정찰'],
            role: '하늘의 탐험가',
            mtTip: '하늘 높이 올라가서 홍주은의 약점을 찾아보세요! 위에서 내려다보는 시야가 큰 도움이 될 거예요!'
        }
    ]
};

const adjectivesPool = {
    aggressive: ["열정폭발", "불도저 같은", "위풍당당한", "브레이크 없는", "압도적인 카리스마의"],
    gentle: ["느긋한", "평화주의자", "겉바속촉", "신중하고 섬세한", "배려심 넘치는"],
    weird: ["예측불허", "자유로운 영혼", "4차원 매력의", "독보적 마이웨이", "어디로 튈지 모르는"]
};

// --- Supabase 설정 ---
const SUPABASE_URL = "https://xtymdgdnbeukkgwfmgzu.supabase.co";
const SUPABASE_KEY = "sb_publishable_ixzG850Es4Amfs_32MZSlg_xwx5XKja"; // Anon Key
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// --- State ---
let currentQuestionIndex = 0;
let userName = "";
let studentId = "";
let scores = {
    type: { aggressive: 0, gentle: 0, weird: 0 }
};

// --- DOM Elements ---
const screenIntro = document.getElementById('screen-intro');
const screenQuiz = document.getElementById('screen-quiz');
const screenYouAre = document.getElementById('screen-you-are');
const screenFusion = document.getElementById('screen-fusion');
const screenLoading = document.getElementById('screen-loading');
const screenResult = document.getElementById('screen-result');
const screenDashboard = document.getElementById('screen-dashboard');
const screenSchedule = document.getElementById('screen-schedule');
const screenGrowth = document.getElementById('screen-growth');
const screenBossInfo = document.getElementById('screen-boss-info');
const screenBossWarning = document.getElementById('screen-boss-warning');
const screenDinoDetail = document.getElementById('screen-dino-detail');
const screenBossPersonal = document.getElementById('screen-boss-personal');

const inputName = document.getElementById('user-name');
const inputId = document.getElementById('user-id');
const btnStart = document.getElementById('btn-start');

const elQuestionNum = document.getElementById('question-number');
const elQuestionText = document.getElementById('question-text');
const btnOpt1 = document.getElementById('btn-opt1');
const btnOpt2 = document.getElementById('btn-opt2');
const btnOpt3 = document.getElementById('btn-opt3');
const progressBar = document.getElementById('progress');

const btnRestart = document.getElementById('btn-restart');
const btnConfirm = document.getElementById('btn-confirm');
const btnResetAll = document.getElementById('btn-reset-all');

const btnNavSchedule = document.getElementById('btn-nav-schedule');
const btnNavGrowth = document.getElementById('btn-nav-growth');
const btnNavBoss = document.getElementById('btn-nav-boss');
const btnBackSch = document.getElementById('btn-back-sch');
const btnBackGrowth = document.getElementById('btn-back-growth');
const btnBackDetail = document.getElementById('btn-back-detail');
const btnToDashboard = document.getElementById('btn-to-dashboard');
const btnWarningNext = document.getElementById('btn-warning-next');
const dashDinoProfile = document.getElementById('dash-dino-profile');

const elGrowthDinoName = document.getElementById('growth-dino-name');
const elValAge = document.getElementById('val-age');
const elValWeight = document.getElementById('val-weight');
const elMyCode = document.getElementById('my-code');
const inputFriendCode = document.getElementById('friend-code');
const btnSubmitCode = document.getElementById('btn-submit-code');
const elCodeMsg = document.getElementById('code-msg');
const tbodyRanking = document.getElementById('ranking-body');

const elDetailEmoji = document.getElementById('detail-emoji');
const elDetailDinoName = document.getElementById('detail-dino-name');
const elDetailRole = document.getElementById('detail-role');
const elDetailSkills = document.getElementById('detail-skills');
const elDetailMtTip = document.getElementById('detail-mt-tip');
const elDetailDesc = document.getElementById('detail-desc');

let savedProfile = null;
let hasCoinsColumn = true;
let hasUsedCodesColumn = true;
let isPendingNewProfile = false;

// --- Functions ---
function isCompletedProfile(profile) {
    if (!profile) return false;
    return (profile.score || 0) > 0 || Boolean(profile.dinoName && profile.dinoEmoji && profile.dinoDesc);
}

function applyDinoDetailsFromCatalog(profile) {
    if (!profile || !profile.dinoName) return profile;

    for (const type in dinoTypes) {
        for (const d of dinoTypes[type]) {
            if (profile.dinoEmoji === d.emoji && profile.dinoName.includes(d.name)) {
                profile.skills = d.skills;
                profile.role = d.role;
                profile.mtTip = d.mtTip;
                return profile;
            }
        }
    }

    return profile;
}

function buildProfileFromRanking(data) {
    return applyDinoDetailsFromCatalog({
        name: data.name,
        studentId: data.student_id,
        dinoName: data.dino_name,
        dinoEmoji: data.dino_emoji,
        dinoDesc: data.dino_desc,
        code: data.code,
        age: data.age,
        weight: data.weight,
        score: data.score,
        coins: data.coins ?? 0,
        usedCodes: normalizeUsedCodes(data.used_codes),
        skills: [],
        role: "지킴이",
        mtTip: "다시 오신 것을 환영합니다."
    });
}

function normalizeUsedCodes(value) {
    if (Array.isArray(value)) return value.map(String);
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) return parsed.map(String);
        } catch (e) {
            return value.split(',').map(code => code.trim()).filter(Boolean);
        }
    }
    return [];
}

async function init() {
    savedProfile = null;
    isPendingNewProfile = false;
    showScreen(screenIntro);
}

async function fetchProfileFromDB(name, id) {
    const { data, error } = await supabaseClient
        .from('rankings')
        .select('*')
        .eq('name', name)
        .eq('student_id', id)
        .maybeSingle();

    if (error) throw error;
    return data ? buildProfileFromRanking(data) : null;
}

function showScreen(screenEl) {
    if (!screenEl) return;

    // 기존 타이머들 정리 (충돌 방지)
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => {
        if (s.dataset.hideTimer) {
            clearTimeout(parseInt(s.dataset.hideTimer));
            delete s.dataset.hideTimer;
        }
        if (s !== screenEl) {
            s.classList.remove('active');
            // 애니메이션(0.5s) 후 완전히 숨김
            const timer = setTimeout(() => {
                if (!s.classList.contains('active')) {
                    s.classList.add('hidden');
                }
            }, 600);
            s.dataset.hideTimer = timer;
        }
    });

    // 대상 화면 표시
    screenEl.classList.remove('hidden');
    // 브라우저 리플로우 강제 (transition 보장)
    void screenEl.offsetWidth;

    // 약간의 지연 후 활성화 (hidden 제거와 active 추가 사이의 간격)
    setTimeout(() => {
        screenEl.classList.add('active');
    }, 20);
}

function generateCode() {
    const adj3 = ["멍청한", "뜨거운", "차가운", "용감한", "귀여운", "날렵한", "커다란", "즐거운", "졸고있는", "배고픈", "배부른", "화가난", "신비로운", "어리숙한"];
    const noun3 = ["비둘기", "도마뱀", "다람쥐", "개구리", "코끼리", "너구리", "독수리", "펭귄", "팬더", "기린", "하마", "거북이", "고양이", "강아지"];

    const adj2 = ["멋진", "빠른", "착한", "기쁜", "슬픈", "힘센", "밝은", "푸른", "검은", "맑은", "깊은", "작은"];
    const noun4 = ["사슴벌레", "스테고사우", "프테라노돈", "아기공룡", "작은새들", "산토끼들", "시골쥐들", "들고양이"];

    // 50% 확률로 3+3 또는 2+4 조합 생성
    if (Math.random() > 0.5) {
        const a = adj3[Math.floor(Math.random() * adj3.length)];
        const n = noun3[Math.floor(Math.random() * noun3.length)];
        return (a + n).substring(0, 6); // 확실히 6자리 보장
    } else {
        const a = adj2[Math.floor(Math.random() * adj2.length)];
        const n = noun4[Math.floor(Math.random() * noun4.length)];
        return (a + n).substring(0, 6);
    }
}

async function startQuiz() {
    userName = inputName.value.trim();
    studentId = inputId.value.trim();

    if (!userName || !studentId) {
        alert("이름과 학번을 모두 입력해주세요!");
        return;
    }

    btnStart.disabled = true;
    const originalBtnText = btnStart.innerText;
    btnStart.innerText = "데이터베이스 확인 중...";

    try {
        if (userName === "\uD64D\uC8FC\uC740" && studentId === "22411923") {
            savedProfile = await fetchProfileFromDB(userName, studentId);
            if (!savedProfile) {
                savedProfile = {
                    name: userName,
                    studentId: studentId,
                    dinoName: "\uD3ED\uAD70 \uD64D\uC8FC\uC740\uC0AC\uC6B0\uB8E8\uC2A4",
                    dinoEmoji: "\uD83E\uDD96",
                    dinoDesc: "",
                    code: "BOSS00",
                    age: 99,
                    weight: 9999,
                    score: 999999,
                    coins: 0
                };
                const saved = await saveProfileToCloud(savedProfile, { verify: true });
                if (!saved) throw new Error('Boss profile save failed');
            }
            showBossPersonalPage();
            return;
        }

        savedProfile = await fetchProfileFromDB(userName, studentId);
        isPendingNewProfile = false;

        if (savedProfile) {
            document.body.className = 'theme-jurassic';
            populateDashboard();
            showScreen(screenDashboard);
            return;
        }

        if (!savedProfile) {
            savedProfile = {
                name: userName,
                studentId: studentId,
                dinoName: "",
                dinoEmoji: "",
                dinoDesc: "",
                code: generateCode(),
                age: 0,
                weight: 0,
                score: 0,
                coins: 0,
                usedCodes: [],
                skills: [],
                role: "",
                mtTip: ""
            };
            isPendingNewProfile = true;
        }

        currentQuestionIndex = 0;
        scores = { type: { aggressive: 0, gentle: 0, weird: 0 } };

        document.getElementById('loading-spinner').innerText = '';
        document.getElementById('loading-title').innerText = '?? ?? ???? ???? ?...';
        document.getElementById('loading-desc').innerText = 'Supabase? ??? ???? ?????.';

        showScreen(screenQuiz);
        renderQuestion();
    } catch (e) {
        console.error('Supabase profile check failed:', e);
        alert('?????? ?? ?? ??? ?????. ?? ? ?? ??????.');
    } finally {
        btnStart.disabled = false;
        btnStart.innerText = originalBtnText;
    }
}

function renderQuestion() {
    const q = questions[currentQuestionIndex];
    elQuestionNum.innerText = `Q ${currentQuestionIndex + 1} / ${questions.length}`;
    elQuestionText.innerText = q.q;
    btnOpt1.innerText = q.opt1;
    btnOpt2.innerText = q.opt2;
    btnOpt3.innerText = q.opt3;

    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function handleOptionClick(optNum) {
    const q = questions[currentQuestionIndex];
    if (optNum === 1) {
        scores.type[q.type1]++;
    } else if (optNum === 2) {
        scores.type[q.type2]++;
    } else {
        scores.type[q.type3]++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        progressBar.style.width = `100%`;
        finishQuiz();
    }
}

function finishQuiz() {
    showScreen(screenYouAre);

    setTimeout(() => {
        showScreen(screenFusion);
    }, 1500);

    setTimeout(() => {
        document.body.className = 'theme-jurassic';
        generateResult();
        showScreen(screenResult);
    }, 4000);
}

function getHighestKey(obj) {
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
}

function setResultBackground() {
    const bgEl = document.getElementById('result-bg');
    bgEl.innerHTML = '';

    const emojis = [''];

    for (let i = 0; i < 22; i++) {
        const span = document.createElement('span');
        span.className = 'bg-emoji';
        span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.left = `${Math.random() * 94}%`;
        span.style.top = `${Math.random() * 94}%`;
        span.style.fontSize = `${1.8 + Math.random() * 2.2}rem`;
        span.style.animationDelay = `${(Math.random() * 5).toFixed(1)}s`;
        span.style.animationDuration = `${(4 + Math.random() * 4).toFixed(1)}s`;
        bgEl.appendChild(span);
    }
}
async function generateResult() {
    try {
        const existingProfile = savedProfile || {};
        const topType = getHighestKey(scores.type);

        setResultBackground();

        const dinoList = dinoTypes[topType];
        const matchedDino = dinoList[Math.floor(Math.random() * dinoList.length)];
        const adjPool = adjectivesPool[topType];
        const randomAdjective = adjPool[Math.floor(Math.random() * adjPool.length)];

        document.getElementById('result-name').innerText = '나는 ' + matchedDino.name + ' 였어!';
        document.getElementById('dino-emoji').innerText = matchedDino.emoji;
        document.getElementById('dino-name').innerText = randomAdjective + ' ' + matchedDino.name;
        document.getElementById('dino-description').innerText = matchedDino.desc;

        savedProfile = {
            name: userName,
            studentId: studentId,
            dinoName: randomAdjective + ' ' + matchedDino.name,
            dinoEmoji: matchedDino.emoji,
            dinoDesc: matchedDino.desc,
            code: existingProfile.code || generateCode(),
            age: 10,
            weight: 500,
            score: 1000,
            coins: existingProfile.coins ?? 0,
            usedCodes: existingProfile.usedCodes || [],
            skills: matchedDino.skills,
            role: matchedDino.role,
            mtTip: matchedDino.mtTip
        };

    } catch (err) {
        console.error("결과 저장 중 오류:", err);
        alert('결과를 데이터베이스에 저장하지 못했어요. 다시 시도해주세요.');
        showScreen(screenIntro);
    }
}
function populateDashboard() {
    if (!savedProfile) return;
    // Main Dashboard
    document.getElementById('dash-user-info').innerText = `와줘서 고마워요! ${savedProfile.dinoName}! 우리 엠티를 꼭 지켜주세요!`;
    document.getElementById('dash-emoji').innerText = savedProfile.dinoEmoji || '🦖';
    document.getElementById('dash-dino-name').innerText = savedProfile.dinoName;
    document.getElementById('dash-dino-desc').innerText = savedProfile.dinoDesc || '';

    // Growth Dashboard
    elGrowthDinoName.innerText = `${savedProfile.name} 공룡 친구 (${savedProfile.dinoName})`;
    elValAge.innerText = savedProfile.age;
    elValWeight.innerText = savedProfile.weight;
    elMyCode.innerText = savedProfile.code;

    renderRanking();
}

async function handleCodeSubmit() {
    if (!savedProfile) return;
    const code = inputFriendCode.value.trim().normalize('NFC');

    if (code.length !== 6) {
        elCodeMsg.innerText = "\uCE5C\uAD6C \uCF54\uB4DC\uB294 6\uAE00\uC790\uC608\uC694.";
        elCodeMsg.style.color = "#d32f2f";
        return;
    }

    try {
        btnSubmitCode.disabled = true;
        btnSubmitCode.innerText = "\uD655\uC778 \uC911...";

        const latestProfile = await fetchProfileFromDB(savedProfile.name, savedProfile.studentId);
        if (!latestProfile) throw new Error("Current profile missing in Supabase");
        savedProfile = latestProfile;

        if (code === savedProfile.code) {
            elCodeMsg.innerText = "\uC790\uAE30 \uCF54\uB4DC\uB294 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC5B4\uC694.";
            elCodeMsg.style.color = "#d32f2f";
            return;
        }

        if ((savedProfile.usedCodes || []).map(c => String(c).normalize('NFC')).includes(code)) {
            elCodeMsg.innerText = "\uC774\uBBF8 \uC0AC\uC6A9\uD55C \uCF54\uB4DC\uC608\uC694.";
            elCodeMsg.style.color = "#d32f2f";
            return;
        }

        const { data, error } = await supabaseClient
            .from('rankings')
            .select('code,name,student_id')
            .eq('code', code)
            .limit(5);

        if (error) throw error;
        const matchingUsers = data || [];
        if (matchingUsers.length === 0) {
            elCodeMsg.innerText = "\uB4F1\uB85D\uB418\uC9C0 \uC54A\uC740 \uCF54\uB4DC\uC608\uC694.";
            elCodeMsg.style.color = "#d32f2f";
            return;
        }

        const isOnlyCurrentUserCode = matchingUsers.every(user =>
            user.name === savedProfile.name && user.student_id === savedProfile.studentId
        );
        if (isOnlyCurrentUserCode) {
            elCodeMsg.innerText = "\uC790\uAE30 \uCF54\uB4DC\uB294 \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC5B4\uC694.";
            elCodeMsg.style.color = "#d32f2f";
            return;
        }

        if (!hasUsedCodesColumn) {
            throw new Error("rankings.used_codes column is required for duplicate-code prevention");
        }

        const { data: redeemedProfile, error: redeemError } = await supabaseClient.rpc('redeem_friend_code', {
            p_name: savedProfile.name,
            p_student_id: savedProfile.studentId,
            p_friend_code: code
        });

        if (redeemError) throw redeemError;
        if (!redeemedProfile) throw new Error("Growth save failed");

        savedProfile = buildProfileFromRanking(Array.isArray(redeemedProfile) ? redeemedProfile[0] : redeemedProfile);

        elValAge.innerText = savedProfile.age;
        elValWeight.innerText = savedProfile.weight;

        elCodeMsg.innerText = "\uC131\uACF5! \uB370\uC774\uD130\uBCA0\uC774\uC2A4\uC5D0 \uC131\uC7A5\uC774 \uBC18\uC601\uB410\uC5B4\uC694.";
        elCodeMsg.style.color = "#388e3c";
        inputFriendCode.value = "";

        renderRanking();
    } catch (e) {
        console.error("Code validation failed", e);
        const message = e.message && e.message.includes('used_codes')
            ? "\uC911\uBCF5 \uC0AC\uC6A9 \uBC29\uC9C0\uB97C \uC704\uD55C DB \uCEEC\uB7FC used_codes\uAC00 \uD544\uC694\uD574\uC694. \uB9C8\uC774\uADF8\uB808\uC774\uC158\uC744 \uBA3C\uC800 \uC801\uC6A9\uD574\uC8FC\uC138\uC694."
            : "\uB370\uC774\uD130\uBCA0\uC774\uC2A4 \uD655\uC778 \uB610\uB294 \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC5B4\uC694. \uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.";
        elCodeMsg.innerText = message;
        elCodeMsg.style.color = "#d32f2f";
    } finally {
        btnSubmitCode.disabled = false;
        btnSubmitCode.innerText = "\uC6A9\uAE30 \uC5BB\uAE30";
    }
}

async function createProfileInCloud(profile) {
    if (!profile) return false;

    for (let attempt = 0; attempt < 5; attempt++) {
        const payload = {
            code: profile.code,
            name: profile.name,
            student_id: profile.studentId,
            dino_name: profile.dinoName,
            dino_emoji: profile.dinoEmoji,
            dino_desc: profile.dinoDesc,
            age: profile.age,
            weight: profile.weight,
            score: profile.score
        };

        if (hasCoinsColumn) payload.coins = profile.coins ?? 0;
        if (hasUsedCodesColumn) payload.used_codes = profile.usedCodes || [];

        try {
            let { data, error } = await supabaseClient
                .from('rankings')
                .insert(payload)
                .select('*')
                .maybeSingle();

            if (error && error.code === 'PGRST204' && String(error.message || '').includes('coins')) {
                hasCoinsColumn = false;
                delete payload.coins;
                const retry = await supabaseClient
                    .from('rankings')
                    .insert(payload)
                    .select('*')
                    .maybeSingle();
                data = retry.data;
                error = retry.error;
            }

            if (error && error.code === 'PGRST204' && String(error.message || '').includes('used_codes')) {
                hasUsedCodesColumn = false;
                delete payload.used_codes;
                const retry = await supabaseClient
                    .from('rankings')
                    .insert(payload)
                    .select('*')
                    .maybeSingle();
                data = retry.data;
                error = retry.error;
            }

            if (error && error.code === '23505' && String(error.message || '').includes('code')) {
                profile.code = generateCode();
                continue;
            }

            if (error && error.code === '23505') {
                const existing = await fetchProfileFromDB(profile.name, profile.studentId);
                if (existing) {
                    savedProfile = existing;
                    return true;
                }
            }

            if (error) throw error;
            if (data) savedProfile = buildProfileFromRanking(data);
            return true;
        } catch (e) {
            console.error("Profile create failed", e);
            return false;
        }
    }

    return false;
}
async function saveProfileToCloud(profile, options = {}) {
    if (!profile) return false;

    const payload = {
        code: profile.code,
        name: profile.name,
        student_id: profile.studentId,
        dino_name: profile.dinoName,
        dino_emoji: profile.dinoEmoji,
        dino_desc: profile.dinoDesc,
        age: profile.age,
        weight: profile.weight,
        score: profile.score
    };

    if (hasCoinsColumn && Object.prototype.hasOwnProperty.call(profile, 'coins')) {
        payload.coins = profile.coins ?? 0;
    }
    if (hasUsedCodesColumn && Object.prototype.hasOwnProperty.call(profile, 'usedCodes')) {
        payload.used_codes = profile.usedCodes || [];
    }

    try {
        let { data, error } = await supabaseClient
            .from('rankings')
            .upsert(payload, { onConflict: 'name,student_id' })
            .select('*')
            .maybeSingle();

        if (error && error.code === 'PGRST204' && String(error.message || '').includes('coins')) {
            if (options.requireCoins) {
                throw error;
            }
            hasCoinsColumn = false;
            delete payload.coins;
            const retry = await supabaseClient
                .from('rankings')
                .upsert(payload, { onConflict: 'name,student_id' })
                .select('*')
                .maybeSingle();
            data = retry.data;
            error = retry.error;
        }

        if (error && error.code === 'PGRST204' && String(error.message || '').includes('used_codes')) {
            hasUsedCodesColumn = false;
            if (options.requireUsedCodes) {
                throw error;
            }
            delete payload.used_codes;
            const retry = await supabaseClient
                .from('rankings')
                .upsert(payload, { onConflict: 'name,student_id' })
                .select('*')
                .maybeSingle();
            data = retry.data;
            error = retry.error;
        }

        if (error) throw error;

        if (options.verify) {
            const fresh = await fetchProfileFromDB(profile.name, profile.studentId);
            if (!fresh || fresh.code !== profile.code) {
                throw new Error('Saved profile could not be verified in Supabase');
            }
            savedProfile = fresh;
        } else if (data) {
            savedProfile = buildProfileFromRanking(data);
        }

        return true;
    } catch (e) {
        console.error("Cloud save failed", e);
        return false;
    }
}
async function renderRanking() {
    try {
        const { data, error } = await supabaseClient
            .from('rankings')
            .select('*')
            .order('score', { ascending: false })
            .limit(20);

        if (error) throw error;
        updateRankingUI(data || []);
    } catch (e) {
        console.error("Failed to fetch rankings", e);
        tbodyRanking.innerHTML = `<tr><td colspan="3">랭킹을 데이터베이스에서 불러오지 못했어요.</td></tr>`;
    }
}
function updateRankingUI(allPlayers) {
    tbodyRanking.innerHTML = "";
    allPlayers.forEach((player, index) => {
        const isMe = (savedProfile && player.code === savedProfile.code);
        const tr = document.createElement('tr');
        if (isMe) tr.className = "my-row";

        // Supabase 컬럼명에 맞춰 데이터 매핑 (snake_case 대응)
        const name = player.name;
        const dinoName = player.dino_name || player.dinoName;
        const age = player.age;
        const weight = player.weight;

        tr.innerHTML = `
            <td>${index + 1}위</td>
            <td>${name}<br><small style="color:#555">${dinoName}</small></td>
            <td>용기: ${age}<br>무게: ${weight}kg</td>
        `;
        tbodyRanking.appendChild(tr);
    });
}

function showDinoDetail() {
    if (!savedProfile) return;

    elDetailEmoji.innerText = savedProfile.dinoEmoji || '🦖';
    elDetailDinoName.innerText = savedProfile.dinoName;
    elDetailRole.innerText = savedProfile.role || '공룡 친구';
    elDetailMtTip.innerText = '공룡친구들과 코드를 교환하면 강해질 수 있어요!';
    elDetailDesc.innerText = savedProfile.dinoDesc || '';

    const elDetailCoins = document.getElementById('detail-coins');
    if (elDetailCoins) {
        elDetailCoins.innerText = savedProfile.coins ?? 0;
    }

    // elDetailSkills is removed from HTML

    showScreen(screenDinoDetail);
}

async function showBossPersonalPage() {
    document.body.className = 'theme-jurassic';
    showScreen(screenBossPersonal);

    // 데이터 불러오기
    try {
        const { data, error } = await supabaseClient
            .from('rankings')
            .select('*')
            .order('score', { ascending: false });

        if (error) throw error;

        // 통계 계산
        const totalUsers = data.length;
        const avgScore = totalUsers > 0
            ? Math.round(data.reduce((acc, cur) => acc + (cur.score || 0), 0) / totalUsers)
            : 0;

        document.getElementById('boss-total-users').innerText = totalUsers;
        document.getElementById('boss-avg-score').innerText = avgScore;

        // 랭킹 테이블 채우기
        const bossRankingBody = document.getElementById('boss-ranking-body');
        bossRankingBody.innerHTML = '';
        data.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td><small>${user.dino_name || '진화 중'}</small></td>
                <td>${user.score || 0}</td>
            `;
            bossRankingBody.appendChild(tr);
        });
    } catch (e) {
        console.error("보스 데이터 로드 실패:", e);
    }
}

async function grantSurveyCompletionCoins() {
    if (!savedProfile) return false;

    const latestProfile = await fetchProfileFromDB(savedProfile.name, savedProfile.studentId);
    if (!latestProfile) return false;
    savedProfile = latestProfile;

    const hasCompletedSurvey = (savedProfile.score || 0) > 0;
    const hasNoCoinsYet = (savedProfile.coins ?? 0) === 0;

    if (!hasCompletedSurvey || !hasNoCoinsYet) return false;

    savedProfile.coins = 3;
    return saveProfileToCloud(savedProfile, { verify: true, requireCoins: true });
}
// --- Event Listeners ---
btnStart.addEventListener('click', startQuiz);
inputId.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') startQuiz();
});

btnOpt1.addEventListener('click', () => handleOptionClick(1));
btnOpt2.addEventListener('click', () => handleOptionClick(2));
btnOpt3.addEventListener('click', () => handleOptionClick(3));

btnRestart.addEventListener('click', () => {
    document.body.className = 'theme-valley';
    inputName.value = '';
    inputId.value = '';
    savedProfile = null;
    isPendingNewProfile = false;
    showScreen(screenIntro);
    document.querySelectorAll('.stat-fill').forEach(el => el.style.width = '0%');
});

btnConfirm.addEventListener('click', async () => {
    if (savedProfile) {
        btnConfirm.disabled = true;
        const originalText = btnConfirm.innerText;
        btnConfirm.innerText = "\uC800\uC7A5 \uC911...";

        const saved = isPendingNewProfile
            ? await createProfileInCloud(savedProfile)
            : await saveProfileToCloud(savedProfile, { verify: true });
        if (!saved) {
            alert('데이터베이스 저장에 실패했어요. 잠시 후 다시 시도해주세요.');
            btnConfirm.disabled = false;
            btnConfirm.innerText = originalText;
            return;
        }
        isPendingNewProfile = false;
        btnConfirm.disabled = false;
        btnConfirm.innerText = originalText;
    }

    const overlay = document.getElementById('flicker-overlay');
    overlay.classList.add('flicker-active');

    setTimeout(() => {
        showScreen(screenBossWarning);
        overlay.classList.remove('flicker-active');
    }, 2000);
});
btnToDashboard.addEventListener('click', async () => {
    const coinSaved = await grantSurveyCompletionCoins();
    if (!coinSaved) {
        console.warn('Coin grant was not saved. Check that the rankings.coins column exists.');
    }
    populateDashboard();
    showScreen(screenDashboard);
});



btnNavBoss.addEventListener('click', () => showScreen(screenBossInfo));

btnWarningNext.addEventListener('click', () => showScreen(screenBossInfo));

btnSubmitCode.addEventListener('click', handleCodeSubmit);

// Menu Navigations
btnNavSchedule.addEventListener('click', () => showScreen(screenSchedule));
btnNavGrowth.addEventListener('click', () => showScreen(screenGrowth));
btnBackSch.addEventListener('click', () => showScreen(screenDashboard));
btnBackGrowth.addEventListener('click', () => showScreen(screenDashboard));
btnBackDetail.addEventListener('click', () => showScreen(screenDashboard));

dashDinoProfile.addEventListener('click', showDinoDetail);

// Boss Actions
const btnBossSendMsg = document.getElementById('btn-boss-send-msg');
const bossMessageInput = document.getElementById('boss-message-input');

if (btnBossSendMsg) {
    btnBossSendMsg.addEventListener('click', async () => {
        const msg = bossMessageInput.value.trim();
        if (!msg) return;

        btnBossSendMsg.disabled = true;
        btnBossSendMsg.innerText = "전송 중...";

        try {
            const timestamp = Date.now();
            const payload = msg + "||" + timestamp;
            await supabaseClient.from('rankings').upsert({
                code: 'BOSS00',
                name: '홍주은',
                student_id: '22411923',
                dino_name: '폭군 홍주은사우루스',
                dino_desc: payload,
                age: 99,
                weight: 9999,
                score: 999999
            }, { onConflict: 'name,student_id' });
            alert("보스의 메시지가 온 마을에 울려 퍼졌습니다!");
            bossMessageInput.value = "";
        } catch (e) {
            console.error(e);
            alert("메시지 전송 실패!");
        } finally {
            btnBossSendMsg.disabled = false;
            btnBossSendMsg.innerText = "메시지 전송";
        }
    });
}

document.getElementById('btn-boss-refresh')?.addEventListener('click', showBossPersonalPage);
document.getElementById('btn-boss-reincarnate')?.addEventListener('click', async () => {
    if (confirm("정말 인간들의 세상으로 돌아가시겠습니까? (로컬 데이터만 삭제됩니다)")) {

        savedProfile = null;
        isPendingNewProfile = false;
        showScreen(screenIntro);
    }
});

btnResetAll.addEventListener('click', async () => {
    if (confirm("정말 환생하시겠습니까? 지금까지의 기록이 모두 사라지며 데이터베이스에서도 삭제됩니다.")) {
        if (savedProfile) {
            // [New] 데이터베이스에서 삭제
            try {
                await supabaseClient
                    .from('rankings')
                    .delete()
                    .eq('name', savedProfile.name)
                    .eq('student_id', savedProfile.studentId);
                console.log("DB 데이터 삭제 완료");
            } catch (e) {
                console.error("DB 삭제 실패:", e);
            }
        }
        savedProfile = null;
        isPendingNewProfile = false;
        document.body.className = 'theme-valley';
        inputName.value = '';
        inputId.value = '';
        showScreen(screenIntro);
        document.querySelectorAll('.stat-fill').forEach(el => el.style.width = '0%');
    }
});

// Boss Global Notification Polling
let lastBossMessageTimestamp = "";
async function checkBossMessage() {
    // 보스 계정이면 자기 자신 알림 띄우지 않음
    if (savedProfile && savedProfile.code === "BOSS00") return;

    try {
        const { data, error } = await supabaseClient
            .from('rankings')
            .select('dino_desc')
            .eq('code', 'BOSS00')
            .maybeSingle();

        if (data && data.dino_desc && data.dino_desc.includes("||")) {
            const [currentMsg, ts] = data.dino_desc.split("||");
            if (lastBossMessageTimestamp !== ts) {
                if (lastBossMessageTimestamp !== "") { // 처음 로딩 시에는 알림 패스
                    showGlobalNotification(currentMsg);
                }
                lastBossMessageTimestamp = ts;
            }
        }
    } catch (e) { }
}

function showGlobalNotification(msg) {
    const noti = document.getElementById('global-notification');
    const notiText = document.getElementById('global-notification-text');
    if (!noti || !notiText) return;

    notiText.innerText = msg;
    noti.classList.remove('hidden');
    noti.style.display = 'flex';
    noti.style.animation = "slideInDown 0.5s ease forwards";

    setTimeout(() => {
        noti.style.animation = "slideOutUp 0.5s ease forwards";
        setTimeout(() => {
            noti.classList.add('hidden');
            noti.style.display = 'none';
        }, 500);
    }, 8000); // 8초 후 사라짐
}

setInterval(checkBossMessage, 10000); // 10초마다 확인

// Initialize app
init();
