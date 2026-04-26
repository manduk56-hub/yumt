// --- Data: Questions (3지선다) ---
const questions = [
    {
        q: "여름 휴가 계획을 세울 때 나는?",
        opt1: "무조건 액티비티! 바나나보트, 패러글라이딩 가자!",
        opt2: "좋은 경치 보면서 여유롭게 호캉스나 카페 투어.",
        opt3: "계획은 없다. 발길 닿는 대로 떠나는 무계획 여행!",
        reg1: 'volcano', type1: 'aggressive',
        reg2: 'plains', type2: 'gentle',
        reg3: 'waterSky', type3: 'weird'
    },
    {
        q: "비행기를 탔습니다. 선호하는 좌석은?",
        opt1: "이동이 편하고 사람들과 소통하기 좋은 복도 자리.",
        opt2: "창밖 풍경을 마음껏 볼 수 있는 창가 자리.",
        opt3: "가운데 자리라도 상관없어, 가는 것 자체가 신나!",
        reg1: 'forest', type1: 'gentle',
        reg2: 'waterSky', type2: 'weird',
        reg3: 'volcano', type3: 'aggressive'
    },
    {
        q: "휴가지에서 식사를 고를 때?",
        opt1: "리뷰가 많고 검증된 안전하고 유명한 맛집!",
        opt2: "남들이 안 가는 숨겨진 현지 로컬 맛집 탐험!",
        opt3: "다 같이 먹을 수 있는 푸짐한 바베큐 파티!",
        reg1: 'plains', type1: 'gentle',
        reg2: 'waterSky', type2: 'weird',
        reg3: 'forest', type3: 'aggressive'
    },
    {
        q: "갑자기 비가 쏟아져서 일정이 취소되었다면?",
        opt1: "당황하지만 빠르게 플랜 B 실내 활동을 찾아본다.",
        opt2: "오히려 좋아! 빗소리를 들으며 낮잠을 청한다.",
        opt3: "비를 맞으며 진흙탕에서 뛰어놀 절호의 기회다!",
        reg1: 'forest', type1: 'gentle',
        reg2: 'plains', type2: 'weird',
        reg3: 'volcano', type3: 'aggressive'
    },
    {
        q: "한여름 뙤약볕, 너무 덥다! 어떻게 할까?",
        opt1: "에어컨이 빵빵한 실내로 재빠르게 대피한다.",
        opt2: "이열치열! 더 신나게 땀 흘리며 에너지를 뿜어낸다!",
        opt3: "시원한 계곡물이나 바다에 뛰어들어 수영을 즐긴다.",
        reg1: 'plains', type1: 'gentle',
        reg2: 'volcano', type2: 'aggressive',
        reg3: 'waterSky', type3: 'weird'
    },
    {
        q: "여행 중 예상치 못한 낯선 사람과 대화하게 되었다!",
        opt1: "반갑게 인사하며 여행 꿀팁을 주고받는다.",
        opt2: "적당히 웃으며 예의 바르게 대화하다가 자리를 뜬다.",
        opt3: "경계심을 늦추지 않고 짧게 대답만 한다.",
        reg1: 'forest', type1: 'aggressive',
        reg2: 'waterSky', type2: 'gentle',
        reg3: 'plains', type3: 'weird'
    },
    {
        q: "친구들과 여행 중 의견 충돌이 발생했다!",
        opt1: "내 의견을 강하게 어필하며 사람들을 이끈다.",
        opt2: "분위기를 망치기 싫어 적당히 맞춰주고 양보한다.",
        opt3: "싸우든 말든 신경 안 쓴다. 난 내 갈 길 간다.",
        reg1: 'volcano', type1: 'aggressive',
        reg2: 'forest', type2: 'gentle',
        reg3: 'waterSky', type3: 'weird'
    },
    {
        q: "휴가지에서 예상치 못한 멋진 풍경을 발견했을 때?",
        opt1: "눈에 담고 조용히 나만의 감상에 젖는다.",
        opt2: "일단 친구들을 불러 모아 다 같이 사진을 찍는다!",
        opt3: "신나서 이리저리 뛰어다니며 모든 구석을 탐험한다.",
        reg1: 'plains', type1: 'weird',
        reg2: 'forest', type2: 'gentle',
        reg3: 'volcano', type3: 'aggressive'
    },
    {
        q: "여행의 밤, 가장 완벽한 야식은?",
        opt1: "다 같이 둘러앉아 먹는 따뜻한 라면이나 고기.",
        opt2: "편안한 침대 위에서 먹는 깔끔하고 가벼운 과일.",
        opt3: "눈앞에 보이는 가장 양 많고 자극적인 야시장 음식!",
        reg1: 'forest', type1: 'gentle',
        reg2: 'plains', type2: 'weird',
        reg3: 'volcano', type3: 'aggressive'
    },
    {
        q: "여행의 마지막 날, 당신의 감정은?",
        opt1: "다 같이 모여 앉아 여행의 추억을 도란도란 나눈다.",
        opt2: "아쉬움을 뒤로하고 벌써 다음 여행을 혼자 상상한다.",
        opt3: "아쉬워! 밤새도록 마시고 놀며 마지막 1초까지 불태운다!",
        reg1: 'forest', type1: 'gentle',
        reg2: 'waterSky', type2: 'weird',
        reg3: 'volcano', type3: 'aggressive'
    }
];

// --- Data: Dinosaurs (12 Types) ---
const dinoTypes = {
    volcano: {
        aggressive: { emoji: '🦖', name: '티라노사우루스', desc: '자신감이 넘치고 항상 무리의 중심이 되는 최고의 포식자! 한번 목표를 정하면 직진합니다.' },
        gentle: { emoji: '🦎', name: '벨로시랩터', desc: '빠르고 영리하며 눈치가 100단입니다! 나서기보다는 똑똑하게 상황을 판단하는 지능캐입니다.' },
        weird: { emoji: '🐊', name: '스피노사우루스', desc: '물과 육지를 가리지 않는 다재다능함! 남의 시선을 신경 쓰지 않고 나만의 길을 가는 마이웨이의 표본입니다.' }
    },
    plains: {
        aggressive: { emoji: '🐢', name: '안킬로사우루스', desc: '단단한 등껍질과 꼬리 곤봉! 겉으로는 조용해 보이지만, 한 번 화나면 아무도 말릴 수 없는 외유내강형입니다.' },
        gentle: { emoji: '🦏', name: '트리케라톱스', desc: '방어력 만렙! 안정을 최우선으로 생각하며 묵묵히 제 할 일을 다하는 믿음직한 평화주의자입니다.' },
        weird: { emoji: '🦕', name: '스테고사우루스', desc: '등에 난 화려한 골판처럼 남다른 개성을 가졌습니다. 자신만의 확고한 취향을 즐기는 독특한 매력의 소유자입니다.' }
    },
    forest: {
        aggressive: { emoji: '🐏', name: '파키케팔로사우루스', desc: '강력한 박치기왕! 꽂히는 일이 있으면 불도저처럼 밀어붙이는 엄청난 추진력과 열정을 가졌습니다.' },
        gentle: { emoji: '🦕', name: '브라키오사우루스', desc: '거대하지만 느긋하고 따뜻한 마음씨를 가졌습니다. 다투는 것을 싫어하고 모두와 잘 지내는 둥글둥글한 성격입니다.' },
        weird: { emoji: '🎺', name: '파라사우롤로푸스', desc: '독특한 울음소리로 소통하는 분위기 메이커! 감수성이 풍부하고 주변 사람들을 즐겁게 해주는 재주꾼입니다.' }
    },
    waterSky: {
        aggressive: { emoji: '🦈', name: '모사사우루스', desc: '바다의 폭군! 한 번 꽂히면 끝장을 보는 스케일이 남다른 야망가입니다. 압도적인 존재감을 자랑합니다.' },
        gentle: { emoji: '🦢', name: '플레시오사우루스', desc: '물속을 여유롭게 유영하는 우아함의 대명사! 감성적이고 낭만을 즐길 줄 아는 부드러운 성격입니다.' },
        weird: { emoji: '🦅', name: '프테라노돈', desc: '하늘을 훨훨 나는 자유로운 영혼! 얽매이는 것을 싫어하고 언제나 새로운 세상과 모험을 꿈꾸는 탐험가입니다.' }
    }
};

const adjectivesPool = {
    aggressive: ["열정폭발", "불도저 같은", "위풍당당한", "브레이크 없는", "압도적인 카리스마의"],
    gentle: ["느긋한", "평화주의자", "겉바속촉", "신중하고 섬세한", "배려심 넘치는"],
    weird: ["예측불허", "자유로운 영혼", "4차원 매력의", "독보적 마이웨이", "어디로 튈지 모르는"]
};

// Mock Rankings (Simulated backend data)
const mockRankings = [
    { name: "MT 수호 전설", dinoName: "불도저 같은 안킬로사우루스", score: 2500, age: 25, weight: 1250 },
    { name: "비상소집 1호", dinoName: "자유로운 영혼 프테라노돈", score: 1800, age: 18, weight: 900 },
    { name: "홍주은 저격수", dinoName: "예측불허 모사사우루스", score: 1500, age: 15, weight: 750 },
    { name: "조용한 수호자", dinoName: "느긋한 브라키오사우루스", score: 1200, age: 12, weight: 600 }
];

// --- State ---
let currentQuestionIndex = 0;
let userName = "";
let studentId = "";
let scores = {
    region: { volcano: 0, plains: 0, forest: 0, waterSky: 0 },
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
const screenLocation = document.getElementById('screen-location');
const screenSchedule = document.getElementById('screen-schedule');
const screenGrowth = document.getElementById('screen-growth');

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

const btnNavLocation = document.getElementById('btn-nav-location');
const btnNavSchedule = document.getElementById('btn-nav-schedule');
const btnNavGrowth = document.getElementById('btn-nav-growth');
const btnBackLoc = document.getElementById('btn-back-loc');
const btnBackSch = document.getElementById('btn-back-sch');
const btnBackGrowth = document.getElementById('btn-back-growth');

const elGrowthDinoName = document.getElementById('growth-dino-name');
const elValAge = document.getElementById('val-age');
const elValWeight = document.getElementById('val-weight');
const elMyCode = document.getElementById('my-code');
const inputFriendCode = document.getElementById('friend-code');
const btnSubmitCode = document.getElementById('btn-submit-code');
const elCodeMsg = document.getElementById('code-msg');
const tbodyRanking = document.getElementById('ranking-body');

// Check for saved profile on load
let savedProfile = null;
try {
    const data = localStorage.getItem('dinoProfile');
    if (data) savedProfile = JSON.parse(data);
} catch (e) { }

// --- Functions ---
function init() {
    if (savedProfile) {
        document.body.className = 'theme-jurassic';
        populateDashboard();
        showScreen(screenDashboard);
    } else {
        showScreen(screenIntro);
    }
}

function showScreen(screenEl) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        setTimeout(() => { if (!s.classList.contains('active')) s.classList.add('hidden'); }, 600);
    });

    screenEl.classList.remove('hidden');
    setTimeout(() => { screenEl.classList.add('active'); }, 50);
}

function generateCode() {
    const chars = "가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허고노도로모보소오조초코토포호기니디리미비시이지치키티피히";
    let code = "";
    for (let i = 0; i < 4; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // add 2 random numbers
    code += Math.floor(Math.random() * 90 + 10);
    return code;
}

function startQuiz() {
    userName = inputName.value.trim();
    studentId = inputId.value.trim();

    if (!userName || !studentId) {
        alert("이름과 학번을 모두 입력해주세요!");
        return;
    }

    currentQuestionIndex = 0;
    scores = {
        region: { volcano: 0, plains: 0, forest: 0, waterSky: 0 },
        type: { aggressive: 0, gentle: 0, weird: 0 }
    };

    document.getElementById('loading-spinner').innerText = '🏕️';
    document.getElementById('loading-title').innerText = 'MT 성향 분석 중...';
    document.getElementById('loading-desc').innerText = '당신의 여행 스타일과 성향을 파악하고 있습니다.';

    showScreen(screenQuiz);
    renderQuestion();
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
        scores.region[q.reg1]++; scores.type[q.type1]++;
    } else if (optNum === 2) {
        scores.region[q.reg2]++; scores.type[q.type2]++;
    } else {
        scores.region[q.reg3]++; scores.type[q.type3]++;
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
    }, 2500);

    setTimeout(() => {
        document.body.className = 'theme-jurassic';
        generateResult();
        showScreen(screenResult);
    }, 6000);
}

function getHighestKey(obj) {
    return Object.keys(obj).reduce((a, b) => obj[a] > obj[b] ? a : b);
}

function generateResult() {
    const topRegion = getHighestKey(scores.region);
    const topType = getHighestKey(scores.type);

    const matchedDino = dinoTypes[topRegion][topType];
    const adjPool = adjectivesPool[topType];
    const randomAdjective = adjPool[Math.floor(Math.random() * adjPool.length)];

    document.getElementById('result-name').innerText = `${userName}님의 공룡 전사 자아는`;
    document.getElementById('dino-emoji').innerText = matchedDino.emoji;
    document.getElementById('dino-name').innerText = `${randomAdjective} ${matchedDino.name}`;
    document.getElementById('dino-description').innerText = matchedDino.desc;

    let act = 50, soc = 50, eat = 50;
    if (topType === 'aggressive') { act = 90; soc = 40; eat = 80; }
    if (topType === 'gentle') { act = 30; soc = 90; eat = 60; }
    if (topType === 'weird') { act = 70; soc = 50; eat = 40; }

    act += Math.floor(Math.random() * 20) - 10;
    soc += Math.floor(Math.random() * 20) - 10;
    eat += Math.floor(Math.random() * 20) - 10;

    setTimeout(() => {
        document.getElementById('stat-active').style.width = `${Math.min(100, Math.max(10, act))}%`;
        document.getElementById('stat-social').style.width = `${Math.min(100, Math.max(10, soc))}%`;
        document.getElementById('stat-eat').style.width = `${Math.min(100, Math.max(10, eat))}%`;
    }, 500);

    savedProfile = {
        name: userName,
        studentId: studentId,
        dinoName: `${randomAdjective} ${matchedDino.name}`,
        code: generateCode(),
        age: 10,
        weight: 500,
        score: 1000
    };
}

function populateDashboard() {
    if (!savedProfile) return;
    // Main Dashboard
    document.getElementById('dash-user-info').innerText = `전사 합류 완료. ${savedProfile.name} [${savedProfile.dinoName}] — 홍주은을 막아내라!`;

    // Growth Dashboard
    elGrowthDinoName.innerText = `${savedProfile.name}님의 공룡 (${savedProfile.dinoName})`;
    elValAge.innerText = savedProfile.age;
    elValWeight.innerText = savedProfile.weight;
    elMyCode.innerText = savedProfile.code;

    renderRanking();
}

function handleCodeSubmit() {
    const code = inputFriendCode.value.trim();
    if (code.length !== 6) {
        elCodeMsg.innerText = "올바른 6자리(한글4+숫자2) 전사 코드를 입력해주세요!";
        elCodeMsg.style.color = "#d32f2f";
        return;
    }
    if (code === savedProfile.code) {
        elCodeMsg.innerText = "자신의 코드는 입력할 수 없습니다! 다른 전사의 코드를 입력하세요.";
        elCodeMsg.style.color = "#d32f2f";
        return;
    }

    // Simulate successful growth
    savedProfile.age += 1;
    savedProfile.weight += 50;
    savedProfile.score += 100;
    localStorage.setItem('dinoProfile', JSON.stringify(savedProfile));

    elValAge.innerText = savedProfile.age;
    elValWeight.innerText = savedProfile.weight;

    elCodeMsg.innerText = "동맹 성공! 전투력이 강화됐습니다! 홍주은을 쓰러뜨릴 수 있다! 🔥";
    elCodeMsg.style.color = "#388e3c";
    inputFriendCode.value = "";

    renderRanking();
}

function renderRanking() {
    // Combine mock data with user data
    let allPlayers = [...mockRankings, savedProfile];

    // Sort by score descending
    allPlayers.sort((a, b) => b.score - a.score);

    tbodyRanking.innerHTML = "";
    allPlayers.forEach((player, index) => {
        const isMe = (player.code === savedProfile.code);
        const tr = document.createElement('tr');
        if (isMe) tr.className = "my-row";

        tr.innerHTML = `
            <td>${index + 1}위</td>
            <td>${player.name}<br><small style="color:#555">${player.dinoName}</small></td>
            <td>전투령: ${player.age}<br>전투중: ${player.weight}kg</td>
        `;
        tbodyRanking.appendChild(tr);
    });
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
    showScreen(screenIntro);
    document.querySelectorAll('.stat-fill').forEach(el => el.style.width = '0%');
});

btnConfirm.addEventListener('click', () => {
    if (savedProfile) localStorage.setItem('dinoProfile', JSON.stringify(savedProfile));
    populateDashboard();
    showScreen(screenDashboard);
});

btnSubmitCode.addEventListener('click', handleCodeSubmit);

// Menu Navigations
btnNavLocation.addEventListener('click', () => showScreen(screenLocation));
btnNavSchedule.addEventListener('click', () => showScreen(screenSchedule));
btnNavGrowth.addEventListener('click', () => showScreen(screenGrowth));
btnBackLoc.addEventListener('click', () => showScreen(screenDashboard));
btnBackSch.addEventListener('click', () => showScreen(screenDashboard));
btnBackGrowth.addEventListener('click', () => showScreen(screenDashboard));

btnResetAll.addEventListener('click', () => {
    localStorage.removeItem('dinoProfile');
    savedProfile = null;
    document.body.className = 'theme-valley';
    inputName.value = '';
    inputId.value = '';
    showScreen(screenIntro);
    document.querySelectorAll('.stat-fill').forEach(el => el.style.width = '0%');
});

// Initialize app
init();
