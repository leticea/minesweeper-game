const grid = document.getElementById("grid");
let lockGame = false;
// Set test mode to true if you want see mines location
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