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
];

const STORAGE_ACTIVE_USER_KEY = "dumpling_active_user_v1";
const STORAGE_COLLECTION_PREFIX = "dumpling_collection_";

const fixedUsers = [
  { displayName: "Sarah", username: "sfan2", password: "35092" },
  { displayName: "James", username: "jfan", password: "37056" },
];

const collectionTemplate = Object.fromEntries(dumplings.map((item) => [item.key, 0]));

const difficultyConfig = {
  normal: { opens: 1, label: "Normal" },
  hard: { opens: 2, label: "Hard" },
  extra: { opens: 3, label: "Extra Hard" },
};

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
};

const boxesRoot = document.getElementById("boxes");
const resultText = document.getElementById("resultText");
const resultPanelTitle = document.querySelector("#resultPanel h2");
const resultVisual = document.getElementById("resultVisual");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const collectionList = document.getElementById("collectionList");
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

let pendingOpen = null;
let currentMathAnswer = null;

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
  loginKidSelect.innerHTML = '<option value="">Choose a kid account</option>';

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
    setAuthFeedback("Login failed. Check username and password.", true);
    return false;
  }

  state.collection = readCollectionForUser(account.username);
  applyLoggedInView(account);
  saveActiveUsername(account.username);
  renderCollection();
  startRound();
  setAuthFeedback(`Welcome, ${account.displayName}!`);
  return true;
}

function dumplingIconMarkup(colorClass) {
  return `<span class="dumpling-icon ${colorClass}" aria-hidden="true"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth"></span></span>`;
}

function rewardVisualMarkup(reward, decorative = true) {
  if (reward.key === "golden") {
    const alt = decorative ? "" : "Golden dumpling";
    const fallback = dumplingIconMarkup("golden");
    return `<span class="golden-visual"><img class="dumpling-art golden-art" src="golden.png" alt="${alt}" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';"><span class="golden-fallback">${fallback}</span></span>`;
  }

  if (reward.key === "shark") {
    const alt = decorative ? "" : "Sharky dumpling";
    const fallback = dumplingIconMarkup("shark");
    return `<span class="shark-visual"><img class="dumpling-art sharky-art" src="sharky.png" alt="${alt}" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';"><span class="shark-fallback">${fallback}</span></span>`;
  }

  return dumplingIconMarkup(reward.colorClass);
}

function hasAllDumplingsAtLeastTwo() {
  return dumplings.every((item) => (state.collection[item.key] || 0) >= 2);
}

function randomDumpling() {
  const roll = Math.random();

  if (roll < 0.8) {
    const commonPool = [dumplings[0], dumplings[1], dumplings[2], dumplings[3], dumplings[6]];
    return commonPool[randomInt(0, commonPool.length - 1)];
  }

  if (roll < 0.95) {
    return dumplings[4];
  }

  return dumplings[5];
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
    resultPanelTitle.textContent = "Solve a math challenge to unlock envelopes";
    if (hasAllDumplingsAtLeastTwo()) {
      resultText.textContent = "Normal opens 1, Hard opens 2, Extra Hard opens 3. Bonus unlocked: +1 free open each round.";
    } else {
      resultText.textContent = "Normal opens 1, Hard opens 2, Extra Hard opens 3.";
    }
    return;
  }

  const left = Math.max(state.opensAllowed - state.opensUsed, 0);
  if (left > 0) {
    resultPanelTitle.textContent = `${left} envelope${left === 1 ? "" : "s"} left this round`;
    const bonusText = state.roundBonusOpen > 0 ? " + 1 bonus free open!" : "";
    resultText.textContent = `Difficulty: ${difficultyConfig[state.selectedDifficulty].label}.${bonusText}`;
  } else {
    resultPanelTitle.textContent = "Round complete";
    resultText.textContent = "Click Play Next Round to solve another challenge.";
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
    btn.innerHTML = `<span class="box-inner"><span class="envelope"><span class="envelope-back"></span><span class="envelope-flap"></span><span class="envelope-cut"></span><span class="seal">?</span></span><span class="box-label">Mystery Envelope ${index + 1}</span></span>`;
    btn.setAttribute("aria-label", `Open mystery envelope ${index + 1}`);
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

function renderCollection() {
  collectionList.innerHTML = "";

  dumplings.forEach((item) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = item.name;

    const pill = document.createElement("span");
    pill.className = `tag ${item.colorClass}`;
    pill.textContent = `x${state.collection[item.key]}`;

    li.appendChild(name);
    li.appendChild(pill);
    collectionList.appendChild(li);
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

  window.setTimeout(() => {
    clickedButton.classList.remove("opening");
    clickedButton.classList.add("opened", "revealed");
    clickedButton.innerHTML = `<span class="box-inner">${rewardVisualMarkup(reward)}<span class="box-label">${reward.name}</span></span>`;

    renderCollection();

    resultPanelTitle.textContent = `You got ${reward.name}!`;
    resultText.textContent = reward.description;
    resultVisual.innerHTML = rewardVisualMarkup(reward, false);

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
  }, 560);
}

function tryUnlockEnvelope(event) {
  event.preventDefault();

  if (!pendingOpen) {
    return;
  }

  const submitted = Number.parseInt(mathAnswer.value, 10);

  if (Number.isNaN(submitted)) {
    mathFeedback.textContent = "Type a number answer first.";
    return;
  }

  if (submitted !== currentMathAnswer) {
    mathFeedback.textContent = "Not quite. Try again.";
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
  setAuthFeedback("Logged out.");
}

function bootstrapAuth() {
  applyLoggedOutView();
  renderCollection();
  const activeUsername = readActiveUsername();

  if (!activeUsername) {
    setAuthFeedback("Login with Sarah or James to start playing.");
    return;
  }

  const account = findFixedUser(activeUsername);

  if (!account) {
    setAuthFeedback("Session expired. Please login again.");
    localStorage.removeItem(STORAGE_ACTIVE_USER_KEY);
    return;
  }

  state.collection = readCollectionForUser(account.username);
  applyLoggedInView(account);
  renderCollection();
  startRound();
  setAuthFeedback(`Welcome back, ${account.displayName}!`);
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

bootstrapAuth();
