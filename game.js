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
];

const STORAGE_ACTIVE_USER_KEY = "dumpling_active_user_v1";
const STORAGE_COLLECTION_PREFIX = "dumpling_collection_";

const fixedUsers = [
  { displayName: "Sarah", username: "sfan2", password: "35092" },
  { displayName: "James", username: "jfan", password: "37056" },
  { displayName: "Estella", username: "exue", password: "123456" },
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
let openingOverlay = null;

function ensureOpeningOverlay() {
  if (openingOverlay) {
    return openingOverlay;
  }

  const overlay = document.createElement("div");
  overlay.className = "opening-overlay hidden";
  overlay.innerHTML = `
    <video class="opening-overlay-video" src="open.mp4" muted playsinline preload="auto" loop></video>
    <button type="button" class="opening-skip-btn">Skip</button>
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
  return `<span class="dumpling-icon ${colorClass}" aria-hidden="true"><span class="eye eye-left"></span><span class="eye eye-right"></span><span class="mouth"></span><span class="rainbow-crown"></span></span>`;
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

function dumplingVideoMarkup() {
  return `<video class="result-dumpling-video" src="open.mp4" autoplay muted playsinline controls onerror="this.style.display='none';" aria-label="Dumpling video"></video>`;
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
  // Razor 3%, Sushi 4%, Chickty 10%
  // Remaining chance split across the rest.
  const rarityTable = [
    { key: "razor", chance: 3 },
    { key: "sushi", chance: 4 },
    { key: "chickty", chance: 10 },
    { key: "earth", chance: 8 },
    { key: "rainbow", chance: 5 },
    { key: "tideye", chance: 13 },
    { key: "ozy", chance: 11 },
    { key: "golden", chance: 11 },
    { key: "glow", chance: 11 },
    { key: "mimi", chance: 10 },
    { key: "shark", chance: 10 },
  ];

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
    li.className = "collection-item";
    
    const header = document.createElement("div");
    header.className = "collection-item-header";
    
    const name = document.createElement("span");
    name.textContent = item.name;

    const pill = document.createElement("span");
    pill.className = `tag ${item.colorClass}`;
    pill.textContent = `x${state.collection[item.key]}`;

    header.appendChild(name);
    header.appendChild(pill);
    li.appendChild(header);
    
    // Add expandable content
    const content = document.createElement("div");
    content.className = "collection-item-content";
    
    const description = document.createElement("p");
    description.className = "collection-description hidden";
    description.textContent = item.description;
    
    // Try to load PNG image, fallback to CSS icon
    const img = document.createElement("img");
    img.src = `${item.key}.png`;
    img.alt = item.name;
    img.className = "dumpling-image";
    const visualHolder = document.createElement("div");
    visualHolder.className = "collection-visual-holder";
    visualHolder.setAttribute("role", "button");
    visualHolder.setAttribute("tabindex", "0");
    visualHolder.setAttribute("aria-label", `Show description for ${item.name}`);
    const rainbowCrown = document.createElement("span");
    rainbowCrown.className = "rainbow-crown";
    visualHolder.appendChild(rainbowCrown);
    
    const toggleDescription = () => {
      description.classList.toggle("hidden");
    };

    visualHolder.addEventListener("click", toggleDescription);
    visualHolder.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleDescription();
      }
    });
    const renderCssVisual = () => {
      // If image doesn't exist, show CSS dumpling icon instead
      const visual = document.createElement("div");
      visual.className = `dumpling-icon ${item.colorClass}`;
      
      const eyeLeft = document.createElement("span");
      eyeLeft.className = "eye eye-left";
      const eyeRight = document.createElement("span");
      eyeRight.className = "eye eye-right";
      
      const mouth = document.createElement("span");
      mouth.className = "mouth";
      
      visual.appendChild(eyeLeft);
      visual.appendChild(eyeRight);
      visual.appendChild(mouth);

      // Jewel eyes for Razor
      if (item.key === "razor") {
        eyeLeft.className = "eye eye-left lash-eye";
        eyeRight.className = "eye eye-right lash-eye";
      }
      
      // Add wings for Chickty
      if (item.key === "chickty") {
        const wingLeft = document.createElement("span");
        wingLeft.className = "wing wing-left";
        const wingRight = document.createElement("span");
        wingRight.className = "wing wing-right";
        visual.appendChild(wingLeft);
        visual.appendChild(wingRight);
        mouth.className = "beak";
      }

      // Add golden car for Razor
      if (item.key === "razor") {
        const car = document.createElement("span");
        car.className = "razor-car";
        const wheel1 = document.createElement("span");
        wheel1.className = "razor-wheel razor-wheel-left";
        const wheel2 = document.createElement("span");
        wheel2.className = "razor-wheel razor-wheel-right";
        const wheelHub1 = document.createElement("span");
        wheelHub1.className = "razor-hub";
        const wheelHub2 = document.createElement("span");
        wheelHub2.className = "razor-hub";
        wheel1.appendChild(wheelHub1);
        wheel2.appendChild(wheelHub2);
        const windshield = document.createElement("span");
        windshield.className = "razor-windshield";
        const rearWindow = document.createElement("span");
        rearWindow.className = "razor-rear-window";
        const hood = document.createElement("span");
        hood.className = "razor-hood";
        const doorLine = document.createElement("span");
        doorLine.className = "razor-door-line";
        const headlight = document.createElement("span");
        headlight.className = "razor-headlight";
        const taillight = document.createElement("span");
        taillight.className = "razor-taillight";
        const cheekLeft = document.createElement("span");
        cheekLeft.className = "cheek cheek-left razor-cheek";
        const cheekRight = document.createElement("span");
        cheekRight.className = "cheek cheek-right razor-cheek";
        car.appendChild(wheel1);
        car.appendChild(wheel2);
        car.appendChild(hood);
        car.appendChild(windshield);
        car.appendChild(rearWindow);
        car.appendChild(doorLine);
        car.appendChild(headlight);
        car.appendChild(taillight);
        visual.appendChild(cheekLeft);
        visual.appendChild(cheekRight);
        visual.appendChild(car);
      }

      if (item.key === "sushi") {
        const topping = document.createElement("span");
        topping.className = "sushi-topping";
        const boat = document.createElement("span");
        boat.className = "sushi-boat";
        const oar = document.createElement("span");
        oar.className = "sushi-oar";
        const handLeft = document.createElement("span");
        handLeft.className = "sushi-hand sushi-hand-left";
        const handRight = document.createElement("span");
        handRight.className = "sushi-hand sushi-hand-right";
        const cheekLeft = document.createElement("span");
        cheekLeft.className = "cheek cheek-left sushi-cheek";
        const cheekRight = document.createElement("span");
        cheekRight.className = "cheek cheek-right sushi-cheek";
        mouth.className = "mouth sushi-smile";
        visual.appendChild(handLeft);
        visual.appendChild(handRight);
        visual.appendChild(cheekLeft);
        visual.appendChild(cheekRight);
        visual.appendChild(topping);
        visual.appendChild(boat);
        visual.appendChild(oar);
      }
      
      if (img.parentElement) {
        img.replaceWith(visual);
      } else {
        visualHolder.appendChild(visual);
      }
    };

    if (item.key === "golden") {
      renderCssVisual();
    } else {
      visualHolder.appendChild(img);
      img.onerror = renderCssVisual;
    }
    
    content.appendChild(description);
    content.appendChild(visualHolder);
    li.appendChild(content);
    
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

  const revealReward = () => {
    if (clickedButton.classList.contains("revealed")) {
      return;
    }

    clickedButton.classList.remove("opening");
    clickedButton.classList.add("opened", "revealed");
    clickedButton.innerHTML = `<span class="box-inner">${rewardVisualMarkup(reward)}<span class="box-label">${reward.name}</span></span>`;

    renderCollection();

    resultPanelTitle.textContent = `You got ${reward.name}!`;
    resultText.textContent = reward.description;
    resultVisual.innerHTML = rewardVisualMarkup(reward, false);
    if (hasOpenedEveryDumpling()) {
      resultVisual.innerHTML += dumplingVideoMarkup();
      const rewardVideo = resultVisual.querySelector(".result-dumpling-video");
      if (rewardVideo) {
        rewardVideo.currentTime = 0;
        rewardVideo.play().catch(() => {
          // User can press play if autoplay is blocked.
        });
      }
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

  clickedButton.innerHTML = `<span class="box-inner"><span class="box-label">Opening...</span></span>`;

  playOpeningOverlay(10000).then(revealReward);
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
    setAuthFeedback("Login with Sarah, James, or Estella to start playing.");
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
