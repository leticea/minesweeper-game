const grid = document.getElementById("grid");
let lockGame = false;
// Set test mode to true if you want to see mine locations
const testMode = false;
generateGrid();

// Generate 10 * 10 Grid
function generateGrid() {
  lockGame = false;
  grid.innerHTML = "";
  for (let i = 0; i < 10; i++) {
    row = grid.insertRow(i);
    for (let j = 0; j < 10; j++) {
      cell = row.insertCell(j);
      cell.onclick = () => {
        init(this);
      };
      let mine = document.createAttribute("mine");
      mine.value = false;
      cell.setAttributeNode(mine);
    }
  }
  generateMines();
}

// Generate mines randomly
function generateMines() {
  // Add 20 mines to game
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(Math.random() * 10);
    let column = Math.floor(Math.random() * 10);
    let cell = grid.rows[row].cells[column];
    cell.setAttribute("mine", "true");
    if (testMode) {
      cell.innerHTML = "X";
    }
  }
}

// Highlight all mines red
function revealMines() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute("mine") == "true") {
        cell.className = "mine";
      }
    }
  }
}

function checkGameComplete() {
  let gameComplete = true;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (
        grid.rows[i].cells[j].getAttribute("mine") == "false" &&
        (grid.rows[i].cells[j].innerHTML = "")
      ) {
        gameComplete = false;
      }
    }
  }
  if (gameComplete) {
    alert("You Found All Mines!");
    revealMines();
  }
}

function init(cell) {
  // Check game completed or not
  if (lockGame) {
    return;
  } else {
    // Check user clicked on mine
    if (cell.getAttribute("mine") == "true") {
      revealMines();
      lockGame = true;
    } else {
      cell.className = "active";
      // Display number of mines around cell
      let mineCount = 0;
      let cellRow = cell.parentNode.rowIndex;
      let cellColumn = cell.cellIndex;
      for (
        let i = Math.max(cellRow - 1, 0);
        i <= Math.min(cellRow + 1, 9);
        i++
      ) {
        for (
          let j = Math.max(cellColumn - 1, 0);
          j <= Math.min(cellColumn + 1, 9);
          j++
        ) {
          if (grid.rows[i].cells[j].getAttribute("mine") == "true") {
            mineCount++;
          }
        }
      }
      cell.innerHTML = mineCount;
      if (mineCount == 0) {
        // If cell doesn't have mine
        for (
          let i = Math.max(cellRow - 1, 0);
          i <= Math.min(cellRow + 1, 9);
          i++
        ) {
          for (
            let j = Math.max(cellColumn - 1, 0);
            j <= Math.min(cellColumn + 1, 9);
            j++
          ) {
            if (grid.rows[i].cells[j].innerHTML == "") {
              init(grid.rows[i].cells[j]);
            }
          }
        }
      }
      checkGameComplete();
    }
  }
}
