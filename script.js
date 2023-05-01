const grid = document.getElementById("grid");
let lockGame = false;
const testMode = false;
generateGrid();

// Generate 10 * 10 Grid
function generateGrid() {
  lockGame = false;
  grid.innerHTML = "";
  for (var i = 0; i < 10; i++) {
    row = grid.insertRow(i);
    for (var j = 0; j < 10; j++) {
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
