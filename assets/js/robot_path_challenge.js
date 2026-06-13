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

const commandTab = document.getElementById("command");
const programTab = document.getElementById("program");

const commandPanel = document.getElementById("command-panel");
const programPanel = document.getElementById("program-panel");

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

    programTab.classList.add("active");
    programPanel.classList.remove("hide");
  }
}

programTab.addEventListener("click", () => handleOptionTabClick(false));
commandTab.addEventListener("click", () => handleOptionTabClick(true));

buildPathGrid();
