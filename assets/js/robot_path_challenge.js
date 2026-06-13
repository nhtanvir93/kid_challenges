const BLANK = 0;
const ROBOT = 1;
const STAR = 2;
const WALL = 3;
const DIAMOND = 4;

const icons = {
  [BLANK]: null,
  [ROBOT]: "robot-icon",
  [STAR]: "star-icon",
  [WALL]: "wall-icon",
  [DIAMOND]: "diamond-icon",
};

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const directions = {
  [UP]: "Move Up",
  [DOWN]: "Move Down",
  [LEFT]: "Move Left",
  [RIGHT]: "Move Right",
};

const arrowIcons = {
  [UP]: "arrow-up",
  [DOWN]: "arrow-down",
  [LEFT]: "arrow-left",
  [RIGHT]: "arrow-right",
};

const levels = [
  [
    [WALL, WALL, WALL, WALL, WALL, WALL],
    [WALL, BLANK, BLANK, BLANK, STAR, WALL],
    [WALL, BLANK, WALL, WALL, BLANK, WALL],
    [WALL, BLANK, WALL, WALL, DIAMOND, BLANK],
    [ROBOT, BLANK, BLANK, WALL, WALL, DIAMOND],
    [WALL, WALL, BLANK, BLANK, BLANK, BLANK],
    [WALL, WALL, WALL, WALL, WALL, WALL],
  ],
];

let currentLevel = 1;
let isCommandTab = true;
let currentMoves = [];

const commandTab = document.getElementById("command");
const programTab = document.getElementById("program");

const commandPanel = document.getElementById("command-panel");
const programPanel = document.getElementById("program-panel");

const upBtn = document.getElementById("btn-up");
const downBtn = document.getElementById("btn-down");
const leftBtn = document.getElementById("btn-left");
const rightBtn = document.getElementById("btn-right");

function buildPathGrid() {
  const pathGrid = document.getElementById("path-grid");

  const paths = [];
  const level = levels[currentLevel - 1];

  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 6; col++) {
      const iconNo = level[row][col];

      const path = document.createElement("div");
      path.classList.add("path");

      if (iconNo !== BLANK) {
        const icon = document.createElement("div");
        icon.classList.add(icons[iconNo], "icon");
        path.append(icon);
      }

      path.setAttribute("data-row", row);
      path.setAttribute("data-col", col);
      path.setAttribute("data-icon-no", iconNo);

      paths.push(path);
    }
  }

  pathGrid.append(...paths);
}

function handleOptionTabClick(isCommandClicked) {
  isCommandTab = isCommandClicked;

  if (isCommandTab) {
    programPanel.classList.add("hide");
    programTab.classList.remove("active");

    commandTab.classList.add("active");
    commandPanel.classList.remove("hide");
  } else {
    commandPanel.classList.add("hide");
    commandTab.classList.remove("active");

    renderProgramMoves();
    programTab.classList.add("active");
    programPanel.classList.remove("hide");
  }
}

function handleMoveClick(moveNo) {
  currentMoves.push({
    moveNo,
    label: directions[moveNo],
  });

  renderProgramMoves();
}

function removeMove(idx) {
  currentMoves.splice(idx, 1);
  renderProgramMoves();
}

function renderProgramMoves() {
  if (isCommandTab) {
    return;
  }

  const moveList = document.getElementById("move-list");

  if (currentMoves.length === 0) {
    const noCommand = document.createElement("div");
    noCommand.classList.add("no-command");

    const text = document.createElement("p");
    text.textContent = "No command added yet!";

    noCommand.appendChild(text);
    moveList.replaceChildren(noCommand);

    return;
  }

  const moves = [];

  for (const [idx, { moveNo, label }] of currentMoves.entries()) {
    const move = document.createElement("div");
    move.classList.add("move");

    const moveDetails = document.createElement("div");
    moveDetails.classList.add("move-details");

    const serial = document.createElement("div");
    serial.classList.add("serial");
    serial.textContent = idx + 1;

    const icon = document.createElement("div");
    icon.classList.add(arrowIcons[moveNo]);

    const text = document.createElement("p");
    text.textContent = directions[moveNo];

    moveDetails.append(serial, icon, text);

    const closeIconContainer = document.createElement("div");
    closeIconContainer.classList.add("round-bg", "cursor-pointer");
    closeIconContainer.addEventListener("click", () => removeMove(idx));

    const closeIcon = document.createElement("div");
    closeIcon.classList.add("close-icon");

    closeIconContainer.appendChild(closeIcon);

    move.append(moveDetails, closeIconContainer);

    moves.push(move);
  }

  const hitInfo = document.createElement("div");
  hitInfo.classList.add("hit-info");

  const totalMoves = currentMoves.length;
  const firstHitInfo = document.createElement("div");
  firstHitInfo.classList.add("first-hit-info");
  firstHitInfo.textContent = `${totalMoves} ${totalMoves > 1 ? "commands" : "command"}`;

  const secondHitInfo = document.createElement("div");
  secondHitInfo.classList.add("second-hit-info");

  const thirdHitInfo = document.createElement("div");
  thirdHitInfo.classList.add("third-hit-info");
  thirdHitInfo.textContent = "hit Run!";

  hitInfo.append(firstHitInfo, secondHitInfo, thirdHitInfo);

  moveList.replaceChildren(...moves, hitInfo);
}

programTab.addEventListener("click", () => handleOptionTabClick(false));
commandTab.addEventListener("click", () => handleOptionTabClick(true));

upBtn.addEventListener("click", () => handleMoveClick(UP));
downBtn.addEventListener("click", () => handleMoveClick(DOWN));
leftBtn.addEventListener("click", () => handleMoveClick(LEFT));
rightBtn.addEventListener("click", () => handleMoveClick(RIGHT));

buildPathGrid();
