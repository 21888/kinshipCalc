const relationKinds = [
  { key: "father", title: "爸爸", gender: "male", icon: "person" },
  { key: "mother", title: "妈妈", gender: "female", icon: "person" },
  { key: "olderBrother", title: "哥哥", gender: "male", icon: "group" },
  { key: "olderSister", title: "姐姐", gender: "female", icon: "group" },
  { key: "youngerBrother", title: "弟弟", gender: "male", icon: "group" },
  { key: "youngerSister", title: "妹妹", gender: "female", icon: "group" },
  { key: "son", title: "儿子", gender: "male", icon: "child" },
  { key: "daughter", title: "女儿", gender: "female", icon: "child" },
  { key: "husband", title: "老公", gender: "male", icon: "heart" },
  { key: "wife", title: "老婆", gender: "female", icon: "heart" }
];

const examples = [
  { steps: ["爸爸", "爸爸"], result: "爷爷" },
  { steps: ["妈妈", "爸爸"], result: "外公" },
  { steps: ["爸爸", "妈妈", "爸爸"], result: "太姥爷" },
  { steps: ["哥哥", "姐姐", "爸爸", "妈妈", "姐姐", "弟弟"], result: "舅爷爷" }
];

const baseMapping = {
  "爸爸": { title: "爸爸", aliases: [] },
  "妈妈": { title: "妈妈", aliases: [] },
  "哥哥": { title: "哥哥", aliases: [] },
  "姐姐": { title: "姐姐", aliases: [] },
  "弟弟": { title: "弟弟", aliases: [] },
  "妹妹": { title: "妹妹", aliases: [] },
  "儿子": { title: "儿子", aliases: [] },
  "女儿": { title: "女儿", aliases: [] },
  "老公": { title: "老公", aliases: [] },
  "老婆": { title: "老婆", aliases: [] },
  "爸爸>爸爸": { title: "爷爷", aliases: ["祖父"] },
  "爸爸>妈妈": { title: "奶奶", aliases: ["祖母"] },
  "妈妈>爸爸": { title: "外公", aliases: ["外祖父"] },
  "妈妈>妈妈": { title: "外婆", aliases: ["外祖母"] },
  "爸爸>妈妈>爸爸": { title: "太姥爷", aliases: ["曾外祖父"] },
  "爸爸>妈妈>妈妈": { title: "太姥姥", aliases: ["曾外祖母"] },
  "爸爸>爸爸>爸爸": { title: "太爷爷", aliases: ["曾祖父"] },
  "爸爸>爸爸>妈妈": { title: "太奶奶", aliases: ["曾祖母"] },
  "爸爸>爸爸>哥哥": { title: "伯公", aliases: ["伯爷爷"] },
  "爸爸>爸爸>弟弟": { title: "叔公", aliases: ["叔爷爷"] },
  "爸爸>爸爸>姐姐": { title: "姑奶奶", aliases: ["姑祖母"] },
  "爸爸>爸爸>妹妹": { title: "姑奶奶", aliases: ["姑祖母"] },
  "爸爸>妈妈>哥哥": { title: "大舅爷", aliases: ["舅爷爷", "舅公"] },
  "爸爸>妈妈>弟弟": { title: "小舅爷", aliases: ["舅爷爷", "舅公"] },
  "爸爸>妈妈>姐姐": { title: "姨奶奶", aliases: ["姨祖母"] },
  "爸爸>妈妈>妹妹": { title: "姨奶奶", aliases: ["姨祖母"] },
  "妈妈>爸爸>爸爸": { title: "太姥爷", aliases: ["曾外祖父"] },
  "妈妈>爸爸>妈妈": { title: "太姥姥", aliases: ["曾外祖母"] },
  "妈妈>爸爸>哥哥": { title: "伯外公", aliases: ["外伯祖父"] },
  "妈妈>爸爸>弟弟": { title: "叔外公", aliases: ["外叔祖父"] },
  "妈妈>爸爸>姐姐": { title: "姑姥姥", aliases: ["姑外祖母"] },
  "妈妈>爸爸>妹妹": { title: "姑姥姥", aliases: ["姑外祖母"] },
  "妈妈>妈妈>哥哥": { title: "舅外公", aliases: ["舅姥爷"] },
  "妈妈>妈妈>弟弟": { title: "舅外公", aliases: ["舅姥爷"] },
  "妈妈>妈妈>姐姐": { title: "姨姥姥", aliases: ["姨外祖母"] },
  "妈妈>妈妈>妹妹": { title: "姨姥姥", aliases: ["姨外祖母"] },
  "爸爸>哥哥": { title: "伯伯", aliases: [] },
  "爸爸>弟弟": { title: "叔叔", aliases: [] },
  "爸爸>姐姐": { title: "姑妈", aliases: [] },
  "爸爸>妹妹": { title: "姑妈", aliases: [] },
  "妈妈>哥哥": { title: "舅舅", aliases: [] },
  "妈妈>弟弟": { title: "舅舅", aliases: [] },
  "妈妈>姐姐": { title: "姨妈", aliases: [] },
  "妈妈>妹妹": { title: "姨妈", aliases: [] },
  "哥哥>儿子": { title: "侄子", aliases: [] },
  "哥哥>女儿": { title: "侄女", aliases: [] },
  "弟弟>儿子": { title: "侄子", aliases: [] },
  "弟弟>女儿": { title: "侄女", aliases: [] },
  "姐姐>儿子": { title: "外甥", aliases: [] },
  "姐姐>女儿": { title: "外甥女", aliases: [] },
  "妹妹>儿子": { title: "外甥", aliases: [] },
  "妹妹>女儿": { title: "外甥女", aliases: [] },
  "儿子>儿子": { title: "孙子", aliases: [] },
  "儿子>女儿": { title: "孙女", aliases: [] },
  "女儿>儿子": { title: "外孙", aliases: [] },
  "女儿>女儿": { title: "外孙女", aliases: [] },
  "老公>爸爸": { title: "公公", aliases: [] },
  "老公>妈妈": { title: "婆婆", aliases: [] },
  "老婆>爸爸": { title: "岳父", aliases: [] },
  "老婆>妈妈": { title: "岳母", aliases: [] },
  "老公>哥哥": { title: "大伯子", aliases: [] },
  "老公>弟弟": { title: "小叔子", aliases: [] },
  "老公>姐姐": { title: "大姑子", aliases: [] },
  "老公>妹妹": { title: "小姑子", aliases: [] },
  "老婆>哥哥": { title: "大舅子", aliases: [] },
  "老婆>弟弟": { title: "小舅子", aliases: [] },
  "老婆>姐姐": { title: "大姨子", aliases: [] },
  "老婆>妹妹": { title: "小姨子", aliases: [] }
};

const generationNames = {
  4: "高",
  5: "天",
  6: "烈",
  7: "太",
  8: "远",
  9: "鼻"
};

const generationOrdinals = {
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九"
};

const historyKey = "kinship.calculation.history.h5";
let steps = [];
let currentResult = null;

const els = {
  homeScreen: document.getElementById("homeScreen"),
  historyScreen: document.getElementById("historyScreen"),
  pathWrap: document.getElementById("pathWrap"),
  relationGrid: document.getElementById("relationGrid"),
  resultCard: document.getElementById("resultCard"),
  resultTitle: document.getElementById("resultTitle"),
  resultDesc: document.getElementById("resultDesc"),
  aliasPill: document.getElementById("aliasPill"),
  examplesList: document.getElementById("examplesList"),
  deleteStep: document.getElementById("deleteStep"),
  clearAll: document.getElementById("clearAll"),
  clearPathTop: document.getElementById("clearPathTop"),
  calculate: document.getElementById("calculate"),
  openHistory: document.getElementById("openHistory"),
  backHome: document.getElementById("backHome"),
  clearHistory: document.getElementById("clearHistory"),
  historyList: document.getElementById("historyList")
};

function relationKey(path) {
  return path.join(">");
}

function relationText(path) {
  return path.length === 0 ? "我自己" : path.join("的");
}

function pathText(path) {
  return ["我", ...path].join(" > ");
}

function toChineseNumber(value) {
  const digits = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

  if (value <= 10) {
    return value === 10 ? "十" : digits[value];
  }

  if (value < 20) {
    return `十${digits[value % 10]}`;
  }

  if (value < 100) {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    return `${digits[tens]}十${ones === 0 ? "" : digits[ones]}`;
  }

  return String(value);
}

function ancestorEntry(path) {
  if (path.length === 0 || !path.every((item) => item === "爸爸" || item === "妈妈")) {
    return null;
  }

  const last = path[path.length - 1];
  const isMale = last === "爸爸";

  if (path.length === 1) {
    return { title: isMale ? "爸爸" : "妈妈", aliases: [] };
  }

  if (path.length === 2) {
    const isMaternalLine = path[0] === "妈妈";

    if (isMale) {
      return {
        title: isMaternalLine ? "外公" : "爷爷",
        aliases: [isMaternalLine ? "外祖父" : "祖父"]
      };
    }

    return {
      title: isMaternalLine ? "外婆" : "奶奶",
      aliases: [isMaternalLine ? "外祖母" : "祖母"]
    };
  }

  if (path.length === 3) {
    const isPaternalLine = path.slice(0, -1).every((item) => item === "爸爸");

    if (isMale) {
      return {
        title: isPaternalLine ? "太爷爷" : "太姥爷",
        aliases: [isPaternalLine ? "曾祖父" : "曾外祖父"]
      };
    }

    return {
      title: isPaternalLine ? "太奶奶" : "太姥姥",
      aliases: [isPaternalLine ? "曾祖母" : "曾外祖母"]
    };
  }

  const hasMaternalBranch = path.slice(0, -1).includes("妈妈");
  const prefix = hasMaternalBranch ? "外" : "";
  const generation = generationNames[path.length];
  const ordinal = generationOrdinals[path.length] || toChineseNumber(path.length);
  const ancestorTitle = `${isMale ? "祖父" : "祖母"}`;

  return {
    title: generation ? `${prefix}${generation}${ancestorTitle}` : `${prefix}${ordinal}世${ancestorTitle}`,
    aliases: generation ? [`${ordinal}世${ancestorTitle}`] : [`第${path.length}代直系祖先`]
  };
}

function entryForPath(path) {
  return baseMapping[relationKey(path)] || ancestorEntry(path) || ancestorSiblingEntry(path);
}

function isParent(relation) {
  return relation === "爸爸" || relation === "妈妈";
}

function isSibling(relation) {
  return relation === "哥哥" || relation === "姐姐" || relation === "弟弟" || relation === "妹妹";
}

function isBrother(relation) {
  return relation === "哥哥" || relation === "弟弟";
}

function siblingGenderKey(relation) {
  return isBrother(relation) ? "male" : "female";
}

const genericAncestorSiblingMapping = {
  "爸爸": {
    male: { title: "伯伯或叔叔", aliases: ["爸爸"] },
    female: { title: "姑妈", aliases: [] }
  },
  "妈妈": {
    male: { title: "舅舅", aliases: [] },
    female: { title: "姨妈", aliases: ["妈妈"] }
  },
  "爸爸>爸爸": {
    male: { title: "伯公或叔公", aliases: ["爷爷"] },
    female: { title: "姑奶奶", aliases: ["姑祖母"] }
  },
  "爸爸>妈妈": {
    male: { title: "舅爷爷", aliases: ["舅公"] },
    female: { title: "姨奶奶", aliases: ["奶奶"] }
  },
  "妈妈>爸爸": {
    male: { title: "伯外公或叔外公", aliases: ["外公"] },
    female: { title: "姑姥姥", aliases: ["姑外婆"] }
  },
  "妈妈>妈妈": {
    male: { title: "舅外公", aliases: ["舅姥爷"] },
    female: { title: "姨姥姥", aliases: ["姨外婆", "外婆"] }
  }
};

function ancestorSiblingEntry(path) {
  const firstSiblingIndex = path.findIndex(isSibling);

  if (firstSiblingIndex <= 0) {
    return null;
  }

  const ancestorPath = path.slice(0, firstSiblingIndex);
  const siblingPath = path.slice(firstSiblingIndex);

  if (!ancestorPath.every(isParent) || !siblingPath.every(isSibling)) {
    return null;
  }

  const ancestor = ancestorEntry(ancestorPath);
  if (!ancestor) {
    return null;
  }

  const lastSibling = siblingPath[siblingPath.length - 1];
  const genderKey = siblingGenderKey(lastSibling);
  const mapped = genericAncestorSiblingMapping[relationKey(ancestorPath)]?.[genderKey];

  if (mapped && siblingPath.length > 1) {
    return mapped;
  }

  const relationTitle = siblingPath.length > 1
    ? (genderKey === "male" ? "兄弟" : "姐妹")
    : lastSibling;

  return {
    title: `${ancestor.title}的${relationTitle}`,
    aliases: []
  };
}

function normalizedPath(path) {
  const normalized = [...path];
  let didChange = true;

  while (didChange) {
    didChange = false;

    for (let index = 0; index < normalized.length - 1; index += 1) {
      if (!isSibling(normalized[index])) {
        continue;
      }

      let siblingEnd = index;
      while (siblingEnd < normalized.length && isSibling(normalized[siblingEnd])) {
        siblingEnd += 1;
      }

      if (siblingEnd < normalized.length && isParent(normalized[siblingEnd])) {
        normalized.splice(index, siblingEnd - index + 1, normalized[siblingEnd]);
        didChange = true;
        break;
      }
    }
  }

  return normalized;
}

function descriptiveEntry(path) {
  for (let prefixLength = path.length - 1; prefixLength >= 1; prefixLength -= 1) {
    const prefix = path.slice(0, prefixLength);
    const suffix = path.slice(prefixLength);
    const prefixEntry = entryForPath(prefix);

    if (prefixEntry) {
      return {
        title: `${prefixEntry.title}的${relationText(suffix)}`,
        aliases: []
      };
    }
  }

  return null;
}

function calculateKinship(path) {
  if (path.length === 0) {
    return {
      title: "我",
      relationDescription: "我自己",
      aliases: [],
      isKnown: true
    };
  }

  const key = relationKey(path);
  const mapped = entryForPath(path);

  if (mapped) {
    return {
      title: mapped.title,
      relationDescription: relationText(path),
      aliases: mapped.aliases || [],
      isKnown: true
    };
  }

  const normalized = normalizedPath(path);
  if (relationKey(normalized) !== key) {
    const normalizedEntry = entryForPath(normalized);

    if (normalizedEntry) {
      return {
        title: normalizedEntry.title,
        relationDescription: relationText(path),
        aliases: normalizedEntry.aliases || [],
        isKnown: true
      };
    }

    const normalizedDescription = descriptiveEntry(normalized);
    if (normalizedDescription) {
      return {
        title: normalizedDescription.title,
        relationDescription: relationText(path),
        aliases: normalizedDescription.aliases || [],
        isKnown: true
      };
    }
  }

  const description = descriptiveEntry(path);
  if (description) {
    return {
      title: description.title,
      relationDescription: relationText(path),
      aliases: description.aliases || [],
      isKnown: true
    };
  }

  return {
    title: "暂未收录",
    relationDescription: "可以尝试减少路径或换一种说法",
    aliases: [],
    isKnown: false
  };
}

function iconSvg(type) {
  if (type === "group") {
    return `
      <svg class="person-svg" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="8" r="3.5" fill="currentColor"></circle>
        <circle cx="16" cy="8" r="3.5" fill="currentColor" opacity=".82"></circle>
        <path d="M3.5 18.5c.7-3.4 2.3-5.1 4.5-5.1s3.8 1.7 4.5 5.1H3.5Z" fill="currentColor"></path>
        <path d="M11.5 18.5c.7-3.4 2.3-5.1 4.5-5.1s3.8 1.7 4.5 5.1h-9Z" fill="currentColor" opacity=".82"></path>
      </svg>`;
  }

  if (type === "child") {
    return `
      <svg class="person-svg" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="5.5" r="3" fill="currentColor"></circle>
        <path d="M11 9h2v11h-2z" fill="currentColor"></path>
        <path d="M5.5 11.3 12 9l6.5 2.3-.8 2.2-4.2-1.5v8h-3v-8l-4.2 1.5-.8-2.2Z" fill="currentColor"></path>
      </svg>`;
  }

  if (type === "heart") {
    return `
      <svg class="person-svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20.6 4.8 13.8C1.4 10.7 3.2 5 7.8 5c1.8 0 3.2.9 4.2 2.2C13 5.9 14.4 5 16.2 5c4.6 0 6.4 5.7 3 8.8L12 20.6Z" fill="currentColor"></path>
      </svg>`;
  }

  return `
    <svg class="person-svg" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="currentColor"></circle>
      <path d="M5 20c.9-4.5 3.2-6.8 7-6.8s6.1 2.3 7 6.8H5Z" fill="currentColor"></path>
    </svg>`;
}

function chevronSvg(className = "path-chevron") {
  return `
    <svg class="${className}" viewBox="0 0 8 12" aria-hidden="true">
      <path d="M1.5 1.2 6.2 6l-4.7 4.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>`;
}

function renderPath() {
  els.pathWrap.innerHTML = "";

  const root = document.createElement("span");
  root.className = "path-token root";
  root.textContent = "我";
  els.pathWrap.append(root);

  steps.forEach((step) => {
    const group = document.createElement("span");
    group.className = "path-step";
    group.innerHTML = `${chevronSvg()}<span class="path-token">${step}</span>`;
    els.pathWrap.append(group);
  });

  const hasContent = steps.length > 0;
  els.clearPathTop.disabled = !hasContent;
  els.deleteStep.disabled = !hasContent;
  els.clearAll.disabled = !hasContent && currentResult === null;
}

function renderResult() {
  if (!currentResult) {
    els.resultCard.hidden = true;
    return;
  }

  els.resultCard.hidden = false;
  els.resultCard.classList.toggle("unknown", !currentResult.isKnown);
  els.resultTitle.textContent = currentResult.title;
  els.resultDesc.textContent = currentResult.relationDescription;

  if (currentResult.aliases.length > 0) {
    els.aliasPill.hidden = false;
    els.aliasPill.textContent = `又称 ${currentResult.aliases.join(" / ")}`;
  } else {
    els.aliasPill.hidden = true;
    els.aliasPill.textContent = "";
  }
}

function renderRelations() {
  els.relationGrid.innerHTML = relationKinds.map((kind) => `
    <button class="relation-card ${kind.gender === "female" ? "female" : "male"}" data-relation="${kind.title}" type="button" aria-label="添加${kind.title}">
      <span class="relation-icon">${iconSvg(kind.icon)}</span>
      <span>${kind.title}</span>
    </button>
  `).join("");
}

function renderExamples() {
  els.examplesList.innerHTML = examples.map((example, index) => `
    <button class="example-row" type="button" data-example-index="${index}" aria-label="${index + 1}.、${relationText(example.steps)}、${example.result}">
      <span class="example-index">${index + 1}.</span>
      <span class="example-expression">${relationText(example.steps)}</span>
      <span class="example-result">${example.result}</span>
      <span class="example-chevron">${chevronSvg("example-chevron")}</span>
    </button>
  `).join("");
}

function readHistory() {
  try {
    return JSON.parse(localStorage.getItem(historyKey) || "[]");
  } catch {
    return [];
  }
}

function writeHistory(records) {
  localStorage.setItem(historyKey, JSON.stringify(records.slice(0, 20)));
}

function addHistory(result, path) {
  const records = readHistory();
  records.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    path: [...path],
    resultTitle: result.title,
    relationDescription: result.relationDescription,
    isKnown: result.isKnown,
    createdAt: new Date().toISOString()
  });
  writeHistory(records);
}

function renderHistory() {
  const records = readHistory();
  els.clearHistory.disabled = records.length === 0;

  if (records.length === 0) {
    els.historyList.innerHTML = `
      <div class="empty-history">
        <div>
          <strong>暂无历史记录</strong>
          <span>计算后会保存在这里</span>
        </div>
      </div>
    `;
    return;
  }

  els.historyList.innerHTML = records.map((record) => `
    <article class="history-row">
      <div class="history-row-head">
        <strong class="history-result ${record.isKnown ? "" : "unknown"}">${record.resultTitle}</strong>
        <time class="history-time">${formatDate(record.createdAt)}</time>
      </div>
      <p class="history-path">${pathText(record.path)}</p>
      <p class="history-desc">${record.relationDescription}</p>
    </article>
  `).join("");
}

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

function calculateAndShow() {
  currentResult = calculateKinship(steps);
  renderResult();
  renderPath();
  addHistory(currentResult, steps);
}

function appendStep(title) {
  steps.push(title);
  currentResult = null;
  renderPath();
  renderResult();
}

function deleteLastStep() {
  if (steps.length === 0) return;
  steps.pop();
  currentResult = null;
  renderPath();
  renderResult();
}

function clearPath() {
  if (steps.length === 0 && !currentResult) return;
  steps = [];
  currentResult = null;
  renderPath();
  renderResult();
}

function applyExample(index) {
  const example = examples[index];
  if (!example) return;
  steps = [...example.steps];
  currentResult = calculateKinship(steps);
  renderPath();
  renderResult();
  addHistory(currentResult, steps);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHistory() {
  renderHistory();
  els.homeScreen.hidden = true;
  els.historyScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function showHome() {
  els.historyScreen.hidden = true;
  els.homeScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function bindEvents() {
  els.relationGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-relation]");
    if (!button) return;
    appendStep(button.dataset.relation);
  });

  els.examplesList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-example-index]");
    if (!button) return;
    applyExample(Number(button.dataset.exampleIndex));
  });

  els.deleteStep.addEventListener("click", deleteLastStep);
  els.clearAll.addEventListener("click", clearPath);
  els.clearPathTop.addEventListener("click", clearPath);
  els.calculate.addEventListener("click", calculateAndShow);
  els.openHistory.addEventListener("click", showHistory);
  els.backHome.addEventListener("click", showHome);
  els.clearHistory.addEventListener("click", () => {
    if (!readHistory().length) return;
    localStorage.removeItem(historyKey);
    renderHistory();
  });
}

function init() {
  renderRelations();
  renderExamples();
  renderPath();
  renderResult();
  bindEvents();
}

init();
