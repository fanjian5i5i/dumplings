const dumplings = [
  {
    key: "ozy",
    name: "Ozy",
    colorClass: "ozy",
    description: "Blue and breezy. Ozy always shows up with cool confidence.",
  },
  {
    key: "golden",
    name: "Golden",
    colorClass: "golden",
    description: "Shiny and lucky. Golden is the rare premium dumpling.",
  },
  {
    key: "glow",
    name: "Glow",
    colorClass: "glow",
    description: "Glow in the dark and full of electric energy.",
  },
  {
    key: "mimi",
    name: "mimi",
    colorClass: "mimi",
    description: "Purple and playful. mimi brings mystery to every round.",
  },
  {
    key: "tideye",
    name: "tideye",
    colorClass: "tideye",
    description: "A galaxy color mix dumpling with starry swirl energy.",
  },
  {
    key: "rainbow",
    name: "rainbow",
    colorClass: "rainbow",
    description: "Rainbow strips all over and full of cheerful color.",
  },
  {
    key: "shark",
    name: "Sharky",
    colorClass: "shark",
    description: "A cool shark-style dumpling with ocean fins and gill marks.",
  },
  {
    key: "chickty",
    name: "Chickty",
    colorClass: "chickty",
    description: "A fluffy orange chicken dumpling. Chickty is rare and clucky! (10% rarity)",
  },
  {
    key: "razor",
    name: "Razor",
    colorClass: "razor",
    description: "The rarest of them all. 💎 Razor is a shiny silver cutie cruising in a golden car. (3% rarity)",
  },
  {
    key: "sushi",
    name: "Sushi",
    colorClass: "sushi",
    description: "A super cute sushi dumpling with rice, seaweed, and salmon topping. (4% rarity)",
  },
  {
    key: "earth",
    name: "Earth",
    colorClass: "earth",
    description: "A planet-inspired dumpling with blue oceans and green land like Earth.",
  },
  {
    key: "rapunzul",
    name: "Rapunzul",
    colorClass: "rapunzul",
    description: "A princess dumpling with very long yellow hair.",
  },
  {
    key: "veve",
    name: "Veve",
    colorClass: "veve",
    description: "Veve in his afterlife form: a pale coffee vampire dumpling with sharp fangs and a dark cape.",
  },
  {
    key: "vampire",
    name: "Vampire",
    colorClass: "vampire",
    description: "A midnight vampire dumpling with red eyes and sharp fangs. (8% rarity)",
  },
  {
    key: "rose",
    name: "Peach",
    colorClass: "rose",
    description: "A peach-shaped cutie with soft peach skin, a leafy ear accent, and a thorny shirt. (14% rarity)",
  },
  {
    key: "aurora",
    name: "Aurora",
    colorClass: "aurora",
    description: "A princess bride with a flowing white wedding dress, diamond crown, rainbow twin braids, and a rose bouquet. (6% rarity)",
  },
  {
    key: "ducky",
    name: "Ducy Wucky",
    colorClass: "ducky",
    description: "Ducy Wucky is a duck dumpling who always holds a bundle of flowers. (23% rarity)",
  },
  {
    key: "goos",
    name: "Goos",
    colorClass: "goos",
    description: "A playful goos dumpling with fluffy white feathers and an orange beak. (1% rarity)",
  },
];

const STORAGE_ACTIVE_USER_KEY = "dumpling_active_user_v1";
const STORAGE_COLLECTION_PREFIX = "dumpling_collection_";
const STORAGE_LANGUAGE_KEY = "dumpling_language_v1";

const uiText = {
  en: {
    pageTitle: "Mystery Dumpling Boxes",
    kicker: "Mystery Box Game",
    heroTitle: "Dumpling Surprise",
    heroSubtitle: "Choose one box out of three. Reveal a dumpling and grow your collection.",
    switchLanguageAria: "Switch language",
    switchButton: "中文",
    authPanelAria: "Kid login",
    authPanelTitle: "Kid Accounts",
    authSubtitle: "Log in with Sarah, James, Estella, or Dean to play.",
    loginTitle: "Login",
    loginKidLabel: "Quick pick kid",
    loginKidPlaceholder: "Choose a kid account",
    loginUsernameLabel: "Username",
    loginUsernamePlaceholder: "Enter username",
    loginPasswordLabel: "Password",
    loginPasswordPlaceholder: "Enter password",
    loginSubmit: "Login",
    sessionLoggedInPrefix: "Logged in as",
    logout: "Logout",
    mathGateAria: "Math challenge",
    mathGateTitle: "Solve this math problem to open the envelope",
    mathRuleText: "Normal = open 1, Hard = open 2, Extra Hard = open 3.",
    mathLevelLabel: "Choose difficulty",
    difficultyNormalOption: "Normal (Open 1)",
    difficultyHardOption: "Hard (Open 2)",
    difficultyExtraOption: "Extra Hard (Open 3)",
    mathQuestionPlaceholder: "Question goes here",
    mathAnswerPlaceholder: "Type your answer",
    unlockEnvelope: "Unlock Envelope",
    cancel: "Cancel",
    resultPanelDefaultTitle: "Pick a box to reveal your dumpling",
    resultPanelDefaultText: "One choice per round.",
    nextRound: "Play Next Round",
    collectionAria: "Dumpling collection",
    collectionTitle: "Collection",
    openingSkip: "Skip",
    goldenAlt: "Golden dumpling",
    sharkAlt: "Sharky dumpling",
    dumplingVideoAria: "Dumpling video",
    loginFailed: "Login failed. Check username and password.",
    loginWelcome: "Welcome, {name}!",
    loginWelcomeBack: "Welcome back, {name}!",
    loginPrompt: "Login with Sarah, James, Estella, or Dean to start playing.",
    loginExpired: "Session expired. Please login again.",
    loggedOut: "Logged out.",
    solveToUnlock: "Solve a math challenge to unlock envelopes",
    roundRuleBase: "Normal opens 1, Hard opens 2, Extra Hard opens 3.",
    roundRuleBonus: "Normal opens 1, Hard opens 2, Extra Hard opens 3. Bonus unlocked: +1 free open each round.",
    envelopesLeft: "{count} envelope{suffix} left this round",
    difficultyPrefix: "Difficulty: {label}.{bonus}",
    difficultyBonus: " + 1 bonus free open!",
    roundComplete: "Round complete",
    roundCompleteText: "Click Play Next Round to solve another challenge.",
    mysteryEnvelope: "Mystery Envelope {index}",
    openMysteryEnvelope: "Open mystery envelope {index}",
    showDescription: "Show description for {name}",
    opening: "Opening...",
    youGot: "You got {name}!",
    answerTypeNumber: "Type a number answer first.",
    answerTryAgain: "Not quite. Try again.",
    difficultyNormal: "Normal",
    difficultyHard: "Hard",
    difficultyExtra: "Extra Hard",
  },
  zh: {
    pageTitle: "神秘饺子盲盒",
    kicker: "盲盒小游戏",
    heroTitle: "饺子惊喜",
    heroSubtitle: "三选一打开盲盒，解锁饺子并扩展你的收藏。",
    switchLanguageAria: "切换语言",
    switchButton: "EN",
    authPanelAria: "小朋友登录",
    authPanelTitle: "小朋友账号",
    authSubtitle: "使用 Sarah、James、Estella 或 Dean 登录开始游戏。",
    loginTitle: "登录",
    loginKidLabel: "快速选择账号",
    loginKidPlaceholder: "选择一个小朋友账号",
    loginUsernameLabel: "用户名",
    loginUsernamePlaceholder: "输入用户名",
    loginPasswordLabel: "密码",
    loginPasswordPlaceholder: "输入密码",
    loginSubmit: "登录",
    sessionLoggedInPrefix: "当前登录：",
    logout: "退出登录",
    mathGateAria: "数学挑战",
    mathGateTitle: "先解答数学题，再打开信封",
    mathRuleText: "普通 = 开1个，困难 = 开2个，超难 = 开3个。",
    mathLevelLabel: "选择难度",
    difficultyNormalOption: "普通（开1个）",
    difficultyHardOption: "困难（开2个）",
    difficultyExtraOption: "超难（开3个）",
    mathQuestionPlaceholder: "题目会显示在这里",
    mathAnswerPlaceholder: "输入答案",
    unlockEnvelope: "解锁信封",
    cancel: "取消",
    resultPanelDefaultTitle: "选择一个盲盒来揭晓你的饺子",
    resultPanelDefaultText: "每轮按难度可开多个。",
    nextRound: "下一轮",
    collectionAria: "饺子收藏",
    collectionTitle: "收藏",
    openingSkip: "跳过",
    goldenAlt: "金色饺子",
    sharkAlt: "鲨鲨饺子",
    dumplingVideoAria: "饺子视频",
    loginFailed: "登录失败，请检查用户名和密码。",
    loginWelcome: "欢迎你，{name}！",
    loginWelcomeBack: "欢迎回来，{name}！",
    loginPrompt: "请使用 Sarah、James、Estella 或 Dean 登录开始游戏。",
    loginExpired: "登录状态已过期，请重新登录。",
    loggedOut: "已退出登录。",
    solveToUnlock: "先完成数学挑战，再解锁信封",
    roundRuleBase: "普通开1个，困难开2个，超难开3个。",
    roundRuleBonus: "普通开1个，困难开2个，超难开3个。奖励已解锁：每轮额外+1次免费开启。",
    envelopesLeft: "本轮还可开启 {count} 个信封",
    difficultyPrefix: "当前难度：{label}{bonus}",
    difficultyBonus: "，并有 +1 次奖励开启！",
    roundComplete: "本轮完成",
    roundCompleteText: "点击“下一轮”继续挑战。",
    mysteryEnvelope: "神秘信封 {index}",
    openMysteryEnvelope: "打开神秘信封 {index}",
    showDescription: "查看 {name} 的介绍",
    opening: "开启中...",
    youGot: "你获得了 {name}！",
    answerTypeNumber: "请先输入数字答案。",
    answerTryAgain: "不太对，再试一次。",
    difficultyNormal: "普通",
    difficultyHard: "困难",
    difficultyExtra: "超难",
  },
};

const dumplingI18n = {
  ozy: {
    zhName: "欧吉",
    zhDescription: "蓝色清爽风。欧吉总是自带酷酷的自信。",
  },
  golden: {
    zhName: "金金",
    zhDescription: "闪亮又幸运。金金是稀有高级饺子。",
  },
  glow: {
    zhName: "闪闪",
    zhDescription: "会发光，能量满满。",
  },
  mimi: {
    zhName: "咪咪",
    zhDescription: "紫色又活泼。咪咪让每一轮都充满神秘感。",
  },
  tideye: {
    zhName: "星潮",
    zhDescription: "银河配色的饺子，带着星空旋涡能量。",
  },
  rainbow: {
    zhName: "彩虹",
    zhDescription: "全身彩虹条纹，快乐值拉满。",
  },
  shark: {
    zhName: "鲨鲨",
    zhDescription: "鲨鱼风格饺子，拥有海洋鳍和鳃纹。",
  },
  chickty: {
    zhName: "小鸡奇",
    zhDescription: "毛绒绒的橙色小鸡饺子。小鸡奇稀有又可爱！（10% 稀有度）",
  },
  razor: {
    zhName: "锐锐",
    zhDescription: "最稀有的饺子。锐锐银闪闪，还坐着金色小车！（3% 稀有度）",
  },
  sushi: {
    zhName: "寿司",
    zhDescription: "超可爱的寿司饺子，米饭、海苔和三文鱼顶料齐全。（4% 稀有度）",
  },
  earth: {
    zhName: "地球",
    zhDescription: "星球灵感饺子，蓝色海洋和绿色陆地就像地球。",
  },
};

const fixedUsers = [
  { displayName: "Sarah", username: "sfan2", password: "35092" },
  { displayName: "James", username: "jfan", password: "37056" },
  { displayName: "Estella", username: "exue", password: "123456" },
  { displayName: "Dean", username: "dfan", password: "20211120" },
];

const collectionTemplate = Object.fromEntries(dumplings.map((item) => [item.key, 0]));

const difficultyConfig = {
  normal: { opens: 1 },
  hard: { opens: 2 },
  extra: { opens: 3 },
};

const rarityTable = [
  { key: "ducky", chance: 14 },
  { key: "goos", chance: 1 },
  { key: "veve", chance: 8 },
  { key: "vampire", chance: 8 },
  { key: "rose", chance: 10 },
  { key: "aurora", chance: 5 },
  { key: "razor", chance: 2 },
  { key: "sushi", chance: 2 },
  { key: "chickty", chance: 6 },
  { key: "earth", chance: 5 },
  { key: "rapunzul", chance: 5 },
  { key: "rainbow", chance: 3 },
  { key: "tideye", chance: 8 },
  { key: "ozy", chance: 4 },
  { key: "golden", chance: 4 },
  { key: "glow", chance: 4 },
  { key: "mimi", chance: 5 },
  { key: "shark", chance: 6 },
];

const dumplingRarityByKey = Object.fromEntries(
  rarityTable.map((entry) => [entry.key, entry.chance])
);

const state = {
  canOpen: true,
  roundRewards: [],
  openedIndexes: new Set(),
  opensAllowed: 0,
  roundBonusOpen: 0,
  opensUsed: 0,
  selectedDifficulty: "normal",
  collection: { ...collectionTemplate },
  currentUser: null,
  language: localStorage.getItem(STORAGE_LANGUAGE_KEY) === "zh" ? "zh" : "en",
};

const boxesRoot = document.getElementById("boxes");
const resultText = document.getElementById("resultText");
const resultPanelTitle = document.querySelector("#resultPanel h2");
const resultVisual = document.getElementById("resultVisual");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const collectionList = document.getElementById("collectionList");
const crewList = document.getElementById("crewList");
const mathGate = document.getElementById("mathGate");
const mathQuestion = document.getElementById("mathQuestion");
const mathForm = document.getElementById("mathForm");
const mathAnswer = document.getElementById("mathAnswer");
const mathFeedback = document.getElementById("mathFeedback");
const mathCancelBtn = document.getElementById("mathCancelBtn");
const mathLevel = document.getElementById("mathLevel");
const authPanel = document.getElementById("authPanel");
const gameArea = document.getElementById("gameArea");
const sessionBar = document.getElementById("sessionBar");
const activeUserLabel = document.getElementById("activeUserLabel");
const logoutBtn = document.getElementById("logoutBtn");
const loginForm = document.getElementById("loginForm");
const loginKidSelect = document.getElementById("loginKidSelect");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const authFeedback = document.getElementById("authFeedback");
const langToggleBtn = document.getElementById("langToggleBtn");

function t(key, vars = {}) {
  const active = uiText[state.language] || uiText.en;
  let template = active[key] || uiText.en[key] || key;

  Object.entries(vars).forEach(([name, value]) => {
    template = template.replaceAll(`{${name}}`, String(value));
  });

  return template;
}

function getDifficultyLabel(level) {
  if (level === "hard") {
    return t("difficultyHard");
  }

  if (level === "extra") {
    return t("difficultyExtra");
  }

  return t("difficultyNormal");
}

function getDumplingName(dumpling) {
  const translated = dumplingI18n[dumpling.key];
  return state.language === "zh" && translated ? translated.zhName : dumpling.name;
}

function getDumplingDescription(dumpling) {
  const translated = dumplingI18n[dumpling.key];
  return state.language === "zh" && translated ? translated.zhDescription : dumpling.description;
}

let pendingOpen = null;
let currentMathAnswer = null;
let openingOverlay = null;

function ensureOpeningOverlay() {
  if (openingOverlay) {
    const skipBtn = openingOverlay.querySelector(".opening-skip-btn");
    if (skipBtn) {
      skipBtn.textContent = t("openingSkip");
    }
    return openingOverlay;
  }

  const overlay = document.createElement("div");
  overlay.className = "opening-overlay hidden";
  overlay.innerHTML = `
    <video class="opening-overlay-video" src="open.mp4" muted playsinline preload="auto" loop></video>
    <button type="button" class="opening-skip-btn">${t("openingSkip")}</button>
  `;

  document.body.appendChild(overlay);
  openingOverlay = overlay;
  return overlay;
}

function playOpeningOverlay(durationMs = 10000) {
  const overlay = ensureOpeningOverlay();
  const video = overlay.querySelector(".opening-overlay-video");
  const skipBtn = overlay.querySelector(".opening-skip-btn");

  return new Promise((resolve) => {
    let finished = false;

    const finish = () => {
      if (finished) {
        return;
      }
      finished = true;
      clearTimeout(timerId);
      skipBtn.removeEventListener("click", finish);
      overlay.classList.add("hidden");
      video.pause();
      resolve();
    };

    overlay.classList.remove("hidden");
    skipBtn.addEventListener("click", finish);
    video.currentTime = 0;
    video.play().catch(() => {
      // If autoplay is blocked, timer + skip still allow continue.
    });

    const timerId = window.setTimeout(finish, durationMs);
  });
}

function normalizeCollection(input) {
  const safeCollection = { ...collectionTemplate };

  if (!input || typeof input !== "object") {
    return safeCollection;
  }

  dumplings.forEach((item) => {
    const raw = input[item.key];
    safeCollection[item.key] = Number.isFinite(raw) && raw >= 0 ? Math.floor(raw) : 0;
  });

  return safeCollection;
}

function saveActiveUsername(username) {
  localStorage.setItem(STORAGE_ACTIVE_USER_KEY, username);
}

function readActiveUsername() {
  return localStorage.getItem(STORAGE_ACTIVE_USER_KEY);
}

function setAuthFeedback(message, isError = false) {
  authFeedback.textContent = message;
  authFeedback.style.color = isError ? "#fecaca" : "#bbf7d0";
}

function applyLanguageText() {
  document.documentElement.lang = state.language;
  document.title = t("pageTitle");

  const textById = {
    kickerText: "kicker",
    heroTitle: "heroTitle",
    heroSubtitle: "heroSubtitle",
    authPanelTitle: "authPanelTitle",
    authSubtitle: "authSubtitle",
    loginTitle: "loginTitle",
    loginKidLabel: "loginKidLabel",
    loginUsernameLabel: "loginUsernameLabel",
    loginPasswordLabel: "loginPasswordLabel",
    loginSubmitBtn: "loginSubmit",
    sessionLoggedInPrefix: "sessionLoggedInPrefix",
    logoutBtn: "logout",
    mathGateTitle: "mathGateTitle",
    mathRuleText: "mathRuleText",
    mathLevelLabel: "mathLevelLabel",
    unlockEnvelopeBtn: "unlockEnvelope",
    mathCancelBtn: "cancel",
    nextRoundBtn: "nextRound",
    collectionTitle: "collectionTitle",
  };

  Object.entries(textById).forEach(([id, key]) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = t(key);
    }
  });

  loginUsername.placeholder = t("loginUsernamePlaceholder");
  loginPassword.placeholder = t("loginPasswordPlaceholder");
  mathAnswer.placeholder = t("mathAnswerPlaceholder");

  authPanel.setAttribute("aria-label", t("authPanelAria"));
  mathGate.setAttribute("aria-label", t("mathGateAria"));
  const collectionPane = document.querySelector(".collection");
  if (collectionPane) {
    collectionPane.setAttribute("aria-label", t("collectionAria"));
  }

  const normalOption = mathLevel.querySelector('option[value="normal"]');
  const hardOption = mathLevel.querySelector('option[value="hard"]');
  const extraOption = mathLevel.querySelector('option[value="extra"]');
  if (normalOption) {
    normalOption.textContent = t("difficultyNormalOption");
  }
  if (hardOption) {
    hardOption.textContent = t("difficultyHardOption");
  }
  if (extraOption) {
    extraOption.textContent = t("difficultyExtraOption");
  }

  langToggleBtn.textContent = t("switchButton");
  langToggleBtn.setAttribute("aria-label", t("switchLanguageAria"));

  if (!state.currentUser) {
    resultPanelTitle.textContent = t("resultPanelDefaultTitle");
    resultText.textContent = t("resultPanelDefaultText");
  }

  if (openingOverlay) {
    const skipBtn = openingOverlay.querySelector(".opening-skip-btn");
    if (skipBtn) {
      skipBtn.textContent = t("openingSkip");
    }
  }

  if (mathGate.classList.contains("hidden")) {
    mathQuestion.textContent = t("mathQuestionPlaceholder");
  }
}

function setLanguage(languageCode) {
  state.language = languageCode === "zh" ? "zh" : "en";
  localStorage.setItem(STORAGE_LANGUAGE_KEY, state.language);
  applyLanguageText();
  populateKidSelector();
  renderCollection();

  if (state.currentUser) {
    refreshRenderedBoxLabels();
    updateRoundMessage();
    updateBoxInteractivity(mathGate.classList.contains("hidden") ? false : true);
  }
}

function findFixedUser(username) {
  return fixedUsers.find((item) => item.username.toLowerCase() === username.toLowerCase()) || null;
}

function collectionStorageKey(username) {
  return `${STORAGE_COLLECTION_PREFIX}${username.toLowerCase()}`;
}

function readCollectionForUser(username) {
  const raw = localStorage.getItem(collectionStorageKey(username));
  if (!raw) {
    return { ...collectionTemplate };
  }

  try {
    return normalizeCollection(JSON.parse(raw));
  } catch {
    return { ...collectionTemplate };
  }
}

function saveCollectionForUser(username, collection) {
  localStorage.setItem(collectionStorageKey(username), JSON.stringify(normalizeCollection(collection)));
}

function populateKidSelector() {
  loginKidSelect.innerHTML = `<option value="">${t("loginKidPlaceholder")}</option>`;

  fixedUsers.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.username;
    option.textContent = `${item.displayName} (${item.username})`;
    loginKidSelect.appendChild(option);
  });
  loginKidSelect.disabled = false;
}

function persistCurrentCollection() {
  if (!state.currentUser) {
    return;
  }
  saveCollectionForUser(state.currentUser, state.collection);
}

function applyLoggedOutView() {
  state.currentUser = null;
  state.collection = { ...collectionTemplate };
  populateKidSelector();
  authPanel.classList.remove("hidden");
  gameArea.classList.add("hidden");
  sessionBar.classList.add("hidden");
  resultVisual.innerHTML = "";
  resultVisual.classList.remove("revealed");
  closeMathGate();
}

function applyLoggedInView(account) {
  state.currentUser = account.username;
  authPanel.classList.add("hidden");
  gameArea.classList.remove("hidden");
  sessionBar.classList.remove("hidden");
  activeUserLabel.textContent = account.displayName;
}

function loginUser(username, password) {
  const account = findFixedUser(username);

  if (!account || account.password !== password) {
    setAuthFeedback(t("loginFailed"), true);
    return false;
  }

  state.collection = readCollectionForUser(account.username);
  applyLoggedInView(account);
  saveActiveUsername(account.username);
  renderCollection();
  startRound();
  setAuthFeedback(t("loginWelcome", { name: account.displayName }));
  return true;
}

function dumplingIconMarkup(colorClass) {
  return `<span class="dumpling-icon ${colorClass}" aria-hidden="true"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth"></span><span class="rainbow-crown"></span></span>`;
}

function rewardVisualMarkup(reward, decorative = true) {
  if (reward.key === "golden") {
    const alt = decorative ? "" : t("goldenAlt");
    const fallback = dumplingIconMarkup("golden");
    return `<span class="golden-visual"><img class="dumpling-art golden-art" src="golden.png" alt="${alt}" onerror="this.style.display='none'; this.parentElement.querySelector('.golden-fallback').style.display='inline-block';"><span class="golden-fallback">${fallback}</span></span>`;
  }

  if (reward.key === "shark") {
    const alt = decorative ? "" : t("sharkAlt");
    const fallback = dumplingIconMarkup("shark");
    return `<span class="shark-visual"><img class="dumpling-art sharky-art" src="sharky.png" alt="${alt}" onerror="this.style.display='none'; this.parentElement.querySelector('.shark-fallback').style.display='inline-block';"><span class="shark-fallback">${fallback}</span></span>`;
  }

  if (reward.key === "ducky") {
    return `<span class="dumpling-icon ducky"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth ducky-beak"></span><span class="ducky-bouquet"></span><span class="ducky-bouquet-wrap"></span></span>`;
  }

  if (reward.key === "goos") {
    return `<span class="dumpling-icon goos"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth goos-beak"></span><span class="goos-wing goos-wing-left"></span><span class="goos-wing goos-wing-right"></span><span class="goos-tail"></span></span>`;
  }

  return dumplingIconMarkup(reward.colorClass);
}

function dumplingVideoMarkup() {
  return `<video class="result-dumpling-video" src="open.mp4" autoplay muted playsinline controls onerror="this.style.display='none';" aria-label="${t("dumplingVideoAria")}"></video>`;
}

function createdDumplingVisualMarkup(item) {
  if (item.key === "golden" || item.key === "shark") {
    return rewardVisualMarkup(item, true);
  }

  if (item.key === "chickty") {
    return `<span class="dumpling-icon chickty"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="beak"></span><span class="rainbow-crown"></span><span class="wing wing-left"></span><span class="wing wing-right"></span></span>`;
  }

  if (item.key === "razor") {
    return `<span class="dumpling-icon razor"><span class="eye eye-left lash-eye"></span><span class="eye eye-right lash-eye"></span><span class="mouth"></span><span class="rainbow-crown"></span><span class="cheek cheek-left razor-cheek"></span><span class="cheek cheek-right razor-cheek"></span><span class="razor-car"><span class="razor-wheel razor-wheel-left"><span class="razor-hub"></span></span><span class="razor-wheel razor-wheel-right"><span class="razor-hub"></span></span><span class="razor-hood"></span><span class="razor-windshield"></span><span class="razor-rear-window"></span><span class="razor-door-line"></span><span class="razor-headlight"></span><span class="razor-taillight"></span></span></span>`;
  }

  if (item.key === "sushi") {
    return `<span class="dumpling-icon sushi"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth sushi-smile"></span><span class="rainbow-crown"></span><span class="sushi-hand sushi-hand-left"></span><span class="sushi-hand sushi-hand-right"></span><span class="cheek cheek-left sushi-cheek"></span><span class="cheek cheek-right sushi-cheek"></span><span class="sushi-topping"></span><span class="sushi-boat"></span><span class="sushi-oar"></span></span>`;
  }

  if (item.key === "rapunzul") {
    return `<span class="dumpling-icon rapunzul"><span class="eye eye-left lash-eye"></span><span class="eye eye-right lash-eye"></span><span class="mouth"></span><span class="rainbow-crown"></span><span class="rapunzul-top-hair"></span><span class="rapunzul-hair rapunzul-hair-left"></span><span class="rapunzul-hair rapunzul-hair-right"></span></span>`;
  }

  if (item.key === "veve") {
    return `<span class="dumpling-icon veve"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth veve-fangs"></span><span class="rainbow-crown"></span><span class="veve-cape"></span></span>`;
  }

  if (item.key === "rose") {
    return `<span class="dumpling-icon rose"><span class="peach-garden-bg"></span><span class="peach-garden-daisies"></span><span class="peach-garden-house"></span><span class="peach-garden-panda"></span><span class="eye eye-left lash-eye"></span><span class="eye eye-right lash-eye"></span><span class="mouth"></span><span class="rose-ear-flower"></span><span class="rose-thorn-shirt"><span class="rose-bottom-leaf rose-bottom-leaf-left"></span><span class="rose-bottom-leaf rose-bottom-leaf-right"></span></span></span>`;
  }

  if (item.key === "aurora") {
    return `<span class="dumpling-icon aurora"><span class="eye eye-left lash-eye"></span><span class="eye eye-right lash-eye"></span><span class="aurora-nose"></span><span class="mouth aurora-lips"></span><span class="aurora-crown"></span><span class="aurora-neck"></span><span class="aurora-head-seam"></span><span class="aurora-body-highlight"></span><span class="aurora-veil"></span><span class="aurora-braid aurora-braid-left"></span><span class="aurora-braid aurora-braid-right"></span><span class="aurora-belly"></span><span class="aurora-bodice"></span><span class="aurora-arm aurora-arm-left"></span><span class="aurora-arm aurora-arm-right"></span><span class="aurora-bouquet"></span><span class="aurora-dress"><span class="aurora-leg aurora-leg-left"><span class="aurora-heel"></span></span><span class="aurora-leg aurora-leg-right"><span class="aurora-heel"></span></span></span></span>`;
  }

  if (item.key === "ducky") {
    return `<span class="dumpling-icon ducky"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth ducky-beak"></span><span class="ducky-bouquet"></span><span class="ducky-bouquet-wrap"></span></span>`;
  }

  if (item.key === "goos") {
    return `<span class="dumpling-icon goos"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth goos-beak"></span><span class="goos-wing goos-wing-left"></span><span class="goos-wing goos-wing-right"></span><span class="goos-tail"></span></span>`;
  }

  return dumplingIconMarkup(item.colorClass);
}

function allCreatedDumplingsMarkup() {
  const items = dumplings
    .map(
      (item) =>
        `<span class="created-dumpling-item"><span class="created-dumpling-visual">${createdDumplingVisualMarkup(item)}</span><span class="created-dumpling-name">${item.name}</span></span>`
    )
    .join("");

  return `<div class="created-dumplings-showcase" aria-label="All created dumplings">${items}</div>`;
}

function roamingDumplingVisualMarkup(item) {
  if (item.key === "golden" || item.key === "shark") {
    return rewardVisualMarkup(item, true);
  }

  if (item.key === "goos") {
    return `<span class="dumpling-icon goos"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth goos-beak"></span><span class="goos-wing goos-wing-left"></span><span class="goos-wing goos-wing-right"></span><span class="goos-tail"></span></span>`;
  }

  return dumplingIconMarkup(item.colorClass);
}

function hasAllDumplingsAtLeastTwo() {
  return dumplings.every((item) => (state.collection[item.key] || 0) >= 2);
}

function hasOpenedEveryDumpling() {
  return dumplings.every((item) => (state.collection[item.key] || 0) >= 1);
}

function randomDumpling() {
  const roll = Math.random() * 100;

  // Explicit rarity table (percent chance)
  // Veve is 30%.

  let threshold = 0;
  for (const entry of rarityTable) {
    threshold += entry.chance;
    if (roll < threshold) {
      const found = dumplings.find((item) => item.key === entry.key);
      if (found) {
        return found;
      }
    }
  }

  return dumplings[0];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMathProblem() {
  const type = randomInt(1, 3);
  const level = state.selectedDifficulty;

  if (level === "normal") {
    if (type === 1) {
      const a = randomInt(20, 79);
      const b = randomInt(10, 39);
      return { question: `${a} + ${b} = ?`, answer: a + b };
    }

    if (type === 2) {
      const a = randomInt(30, 89);
      const b = randomInt(5, a - 5);
      return { question: `${a} - ${b} = ?`, answer: a - b };
    }

    const a = randomInt(2, 10);
    const b = randomInt(2, 10);
    return { question: `${a} x ${b} = ?`, answer: a * b };
  }

  if (level === "hard") {
    if (type === 1) {
      const a = randomInt(120, 399);
      const b = randomInt(40, 199);
      return { question: `${a} + ${b} = ?`, answer: a + b };
    }

    if (type === 2) {
      const a = randomInt(200, 499);
      const b = randomInt(30, 199);
      return { question: `${a} - ${b} = ?`, answer: a - b };
    }

    const a = randomInt(6, 12);
    const b = randomInt(6, 12);
    return { question: `${a} x ${b} = ?`, answer: a * b };
  }

  const a = randomInt(11, 15);
  const b = randomInt(11, 15);
  if (type <= 2) {
    return { question: `${a} x ${b} = ?`, answer: a * b };
  }

  const c = randomInt(20, 70);
  return { question: `${a} x ${b} + ${c} = ?`, answer: a * b + c };
}

function closeMathGate() {
  mathGate.classList.add("hidden");
  mathFeedback.textContent = "";
  mathAnswer.value = "";
}

function openMathGate(index, clickedButton) {
  const problem = generateMathProblem();
  pendingOpen = { index, button: clickedButton };
  currentMathAnswer = problem.answer;

  mathQuestion.textContent = problem.question;
  mathFeedback.textContent = "";
  mathAnswer.value = "";
  mathGate.classList.remove("hidden");
  mathAnswer.focus();
  updateBoxInteractivity(true);
}

function generateRoundRewards() {
  return [randomDumpling(), randomDumpling(), randomDumpling()];
}

function updateRoundMessage() {
  if (state.opensAllowed === 0) {
    resultPanelTitle.textContent = t("solveToUnlock");
    if (hasAllDumplingsAtLeastTwo()) {
      resultText.textContent = t("roundRuleBonus");
    } else {
      resultText.textContent = t("roundRuleBase");
    }
    return;
  }

  const left = Math.max(state.opensAllowed - state.opensUsed, 0);
  if (left > 0) {
    const suffix = left === 1 ? "" : "s";
    resultPanelTitle.textContent = t("envelopesLeft", { count: left, suffix });
    const bonusText = state.roundBonusOpen > 0 ? t("difficultyBonus") : "";
    resultText.textContent = t("difficultyPrefix", {
      label: getDifficultyLabel(state.selectedDifficulty),
      bonus: bonusText,
    });
  } else {
    resultPanelTitle.textContent = t("roundComplete");
    resultText.textContent = t("roundCompleteText");
  }
}

function updateBoxInteractivity(forceDisabled = false) {
  const buttons = boxesRoot.querySelectorAll(".box");
  buttons.forEach((button) => {
    const index = Number.parseInt(button.dataset.index || "-1", 10);
    const shouldDisable =
      forceDisabled ||
      !state.canOpen ||
      state.openedIndexes.has(index) ||
      (state.opensAllowed > 0 && state.opensUsed >= state.opensAllowed);

    button.disabled = shouldDisable;
  });
}

function renderBoxes() {
  boxesRoot.innerHTML = "";

  state.roundRewards.forEach((_, index) => {
    const btn = document.createElement("button");
    btn.className = "box";
    btn.type = "button";
    btn.dataset.index = String(index);
    btn.innerHTML = `<span class="box-inner"><span class="envelope"><span class="envelope-back"></span><span class="envelope-flap"></span><span class="envelope-cut"></span><span class="seal">?</span></span><span class="box-label">${t("mysteryEnvelope", { index: index + 1 })}</span></span>`;
    btn.setAttribute("aria-label", t("openMysteryEnvelope", { index: index + 1 }));
    btn.disabled = false;

    btn.addEventListener("click", () => {
      if (!state.canOpen || state.openedIndexes.has(index)) {
        return;
      }

      if (state.opensAllowed === 0) {
        openMathGate(index, btn);
        return;
      }

      openBox(index, btn);
    });
    boxesRoot.appendChild(btn);
  });
}

function refreshRenderedBoxLabels() {
  const buttons = boxesRoot.querySelectorAll(".box");
  buttons.forEach((button) => {
    const index = Number.parseInt(button.dataset.index || "-1", 10);
    if (index < 0 || index >= state.roundRewards.length) {
      return;
    }

    const label = button.querySelector(".box-label");
    if (!label) {
      return;
    }

    if (button.classList.contains("opening")) {
      label.textContent = t("opening");
      return;
    }

    if (state.openedIndexes.has(index)) {
      label.textContent = getDumplingName(state.roundRewards[index]);
      return;
    }

    label.textContent = t("mysteryEnvelope", { index: index + 1 });
    button.setAttribute("aria-label", t("openMysteryEnvelope", { index: index + 1 }));
  });
}

function renderCollection() {
  collectionList.innerHTML = "";

  const collected = dumplings.filter((item) => (state.collection[item.key] || 0) > 0);
  const li = document.createElement("li");
  li.className = "collection-roam-card";

  const title = document.createElement("p");
  title.className = "collection-roam-title";

  if (collected.length === 0) {
    title.textContent = "No collected dumplings yet. Open an envelope to start your dumpling swarm.";
    li.appendChild(title);
    collectionList.appendChild(li);
    renderCrew();
    return;
  }

  title.textContent = "Your collected dumplings are roaming around!";
  li.appendChild(title);

  const stage = document.createElement("div");
  stage.className = "collection-roam-stage";

  const cols = 4;
  const rowGap = 20;

  collected.forEach((item, index) => {
    const count = state.collection[item.key] || 0;
    const token = document.createElement("span");
    token.className = item.key === "aurora" ? "roaming-dumpling aurora-dance" : "roaming-dumpling";

    const col = index % cols;
    const row = Math.floor(index / cols);
    const left = 12 + col * 24;
    const top = 18 + row * rowGap;

    token.style.left = `${Math.min(left, 88)}%`;
    token.style.top = `${Math.min(top, 82)}%`;
    token.style.setProperty("--dx", `${((index % 5) - 2) * 12}px`);
    token.style.setProperty("--dy", `${((index % 7) - 3) * 9}px`);
    token.style.animationDuration = item.key === "aurora" ? "2.8s" : `${9 + (index % 5) * 1.4}s`;
    token.style.animationDelay = `-${(index % 6) * 0.8}s`;
    token.innerHTML = `<span class="roaming-visual">${roamingDumplingVisualMarkup(item)}</span><span class="roaming-name">${item.name}</span><span class="roaming-count">x${count}</span>`;
    stage.appendChild(token);
  });

  li.appendChild(stage);
  collectionList.appendChild(li);

  renderCrew();
}

function renderCrew() {
  if (!crewList) {
    return;
  }

  crewList.innerHTML = "";

  const sortedByRarity = [...dumplings].sort((a, b) => {
    const rarityA = dumplingRarityByKey[a.key] ?? 0;
    const rarityB = dumplingRarityByKey[b.key] ?? 0;

    if (rarityB !== rarityA) {
      return rarityB - rarityA;
    }

    return a.name.localeCompare(b.name);
  });

  sortedByRarity.forEach((item) => {
    const li = document.createElement("li");
    li.className = "crew-item";
    const rarity = dumplingRarityByKey[item.key] ?? 0;
    li.innerHTML = `<span class="crew-visual">${createdDumplingVisualMarkup(item)}</span><span class="crew-name">${item.name}</span><span class="crew-rarity">Rarity: ${rarity}%</span>`;
    crewList.appendChild(li);
  });
}

function openBox(index, clickedButton) {
  if (
    !state.canOpen ||
    state.openedIndexes.has(index) ||
    state.opensAllowed === 0 ||
    state.opensUsed >= state.opensAllowed
  ) {
    return;
  }

  state.canOpen = false;
  state.openedIndexes.add(index);
  state.opensUsed += 1;
  updateBoxInteractivity(true);
  clickedButton.classList.add("opening");

  const reward = state.roundRewards[index];
  state.collection[reward.key] += 1;

  if (state.roundBonusOpen === 0 && hasAllDumplingsAtLeastTwo()) {
    state.roundBonusOpen = 1;
    state.opensAllowed = Math.min(state.opensAllowed + 1, state.roundRewards.length);
  }

  persistCurrentCollection();

  const revealReward = () => {
    if (clickedButton.classList.contains("revealed")) {
      return;
    }

    clickedButton.classList.remove("opening");
    clickedButton.classList.add("opened", "revealed");
    clickedButton.innerHTML = `<span class="box-inner">${rewardVisualMarkup(reward)}<span class="box-label">${getDumplingName(reward)}</span></span>`;

    renderCollection();

    resultPanelTitle.textContent = t("youGot", { name: getDumplingName(reward) });
    resultText.textContent = getDumplingDescription(reward);
    resultVisual.innerHTML = rewardVisualMarkup(reward, false);

    const appendAllCreatedShowcase = () => {
      if (resultVisual.querySelector(".created-dumplings-showcase")) {
        return;
      }
      resultVisual.insertAdjacentHTML("beforeend", allCreatedDumplingsMarkup());
    };

    if (hasOpenedEveryDumpling()) {
      resultVisual.innerHTML += dumplingVideoMarkup();
      const rewardVideo = resultVisual.querySelector(".result-dumpling-video");
      if (rewardVideo) {
        rewardVideo.currentTime = 0;
        rewardVideo.addEventListener("ended", appendAllCreatedShowcase, { once: true });
        rewardVideo.addEventListener("pause", () => {
          if (!rewardVideo.ended) {
            rewardVideo.play().catch(() => {
              // Keep trying while video is active.
            });
          }
        });
        rewardVideo.play().catch(() => {
          // User can press play if autoplay is blocked.
        });
      }

      // Fallback in case ended event doesn't fire.
      window.setTimeout(appendAllCreatedShowcase, 10500);
    }

    resultVisual.classList.remove("revealed");
    void resultVisual.offsetWidth;
    resultVisual.classList.add("revealed");

    if (state.opensUsed >= state.opensAllowed) {
      state.canOpen = false;
      updateRoundMessage();
      updateBoxInteractivity();
      return;
    }

    state.canOpen = true;
    updateRoundMessage();
    updateBoxInteractivity();
  };

  clickedButton.innerHTML = `<span class="box-inner"><span class="box-label">${t("opening")}</span></span>`;

  playOpeningOverlay(10000).then(revealReward);
}

function tryUnlockEnvelope(event) {
  event.preventDefault();

  if (!pendingOpen) {
    return;
  }

  const submitted = Number.parseInt(mathAnswer.value, 10);

  if (Number.isNaN(submitted)) {
    mathFeedback.textContent = t("answerTypeNumber");
    return;
  }

  if (submitted !== currentMathAnswer) {
    mathFeedback.textContent = t("answerTryAgain");
    mathAnswer.select();
    return;
  }

  const unlocked = pendingOpen;
  const baseOpens = difficultyConfig[state.selectedDifficulty].opens;
  state.roundBonusOpen = hasAllDumplingsAtLeastTwo() ? 1 : 0;
  state.opensAllowed = Math.min(baseOpens + state.roundBonusOpen, state.roundRewards.length);
  state.opensUsed = 0;
  state.canOpen = true;
  closeMathGate();
  pendingOpen = null;
  currentMathAnswer = null;
  updateRoundMessage();
  openBox(unlocked.index, unlocked.button);
}

function cancelMathGate() {
  pendingOpen = null;
  currentMathAnswer = null;
  closeMathGate();
  if (state.canOpen) {
    updateBoxInteractivity(false);
  }
}

function startRound() {
  if (!state.currentUser) {
    return;
  }

  state.canOpen = true;
  state.roundRewards = generateRoundRewards();
  state.openedIndexes = new Set();
  state.opensAllowed = 0;
  state.roundBonusOpen = 0;
  state.opensUsed = 0;
  pendingOpen = null;
  currentMathAnswer = null;
  resultVisual.innerHTML = "";
  resultVisual.classList.remove("revealed");
  closeMathGate();
  renderBoxes();
  updateRoundMessage();
  updateBoxInteractivity(false);
}

function handleLogin(event) {
  event.preventDefault();
  const typedUsername = loginUsername.value.trim();
  const pickedUsername = loginKidSelect.value.trim();
  loginUser(typedUsername || pickedUsername, loginPassword.value);
  loginPassword.value = "";
}

function handleLogout() {
  persistCurrentCollection();
  localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
  applyLoggedOutView();
  renderCollection();
  renderBoxes();
  setAuthFeedback(t("loggedOut"));
}

function bootstrapAuth() {
  applyLoggedOutView();
  renderCollection();
  const activeUsername = readActiveUsername();

  if (!activeUsername) {
    setAuthFeedback(t("loginPrompt"));
    return;
  }

  const account = findFixedUser(activeUsername);

  if (!account) {
    setAuthFeedback(t("loginExpired"));
    localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
    return;
  }

  state.collection = readCollectionForUser(account.username);
  applyLoggedInView(account);
  renderCollection();
  startRound();
  setAuthFeedback(t("loginWelcomeBack", { name: account.displayName }));
}

nextRoundBtn.addEventListener("click", startRound);
mathForm.addEventListener("submit", tryUnlockEnvelope);
mathCancelBtn.addEventListener("click", cancelMathGate);
loginForm.addEventListener("submit", handleLogin);
logoutBtn.addEventListener("click", handleLogout);
loginKidSelect.addEventListener("change", () => {
  loginUsername.value = loginKidSelect.value;
  loginUsername.focus();
});
mathLevel.addEventListener("change", () => {
  state.selectedDifficulty = mathLevel.value;

  if (!mathGate.classList.contains("hidden")) {
    const problem = generateMathProblem();
    currentMathAnswer = problem.answer;
    mathQuestion.textContent = problem.question;
    mathFeedback.textContent = "";
    mathAnswer.value = "";
    mathAnswer.focus();
  }
});

langToggleBtn.addEventListener("click", () => {
  setLanguage(state.language === "en" ? "zh" : "en");
});

applyLanguageText();
bootstrapAuth();
