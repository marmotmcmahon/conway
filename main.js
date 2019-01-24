
function createTable(rows, cols) {
  document.write("<table>");
  for (i = 0; i < rows; i++) {
    document.write("<tr>");
    for (j = 0; j < cols; j++) {
      document.write("<td data-row = " + i + " data-column = " + j + ">" + "</td>");
    }
    document.write("</tr>");
  }
  document.write("</table>");
}
var totalRows = 15;
var totalColumns = 15;
var increment = 3000; // Time per cycle

createTable(totalRows, totalColumns);

$('td').click(function(){
  $(this).toggleClass('alive');
})

function getSick(cell) {
  console.log('sick!')
  cell.classList.add('sick');
}

function kill(cell) {
  cell.classList.remove('pregnant');
  cell.classList.remove('sick');
  cell.classList.remove('alive');
}

function getPregnant(cell) {
  cell.classList.add('pregnant');
}

function birth(cell) {
  cell.classList.remove('pregnant');
  cell.classList.add('alive');
}

  function cell(row, column) {
    return document.querySelectorAll("[data-row='" + row + "'][data-column='" + column +"']")[0];
  }

function checkNeighbors(row, column) {
  
  var counter = 0;

  var currentCell = cell(row, column); 
  
  var neighbors = {
    "currentCell" : currentCell,
    "right" : false,
    "left" : false,
    "top" : false,
    "bottom" : false,
    "topRight" : false,
    "topLeft" : false,
    "bottomRight" : false,
    "bottomLeft" : false
  }
  
  function counterConditional(property, rowOperand, columnOperand) {
      neighbors[property] = cell(row + rowOperand, column + columnOperand);
      if (neighbors[property].classList.contains('alive')) {
        counter += 1;
    }
  }
    
  // Who gets a .left assignment? — all columns except first
  if (column > 0) {
    counterConditional('left', 0, -1);
  }
  
  // Who gets a .top assignment? - all rows except first
  if (row > 0) {
    counterConditional('top', -1, 0);
  }
  
  // Who gets a .topLeft assignment? - everyone but 0,0
  if (row > 0 && column > 0) {
    counterConditional('topLeft', -1, -1);
  }
  
  // .bottomLeft
  if (row < totalRows - 1 && column > 0) {
    counterConditional('bottomLeft', 1, -1)
  }
  
  // Who gets a .bottom assignment? - everyone but bottom row
  if (row < totalRows - 1) {
    counterConditional('bottom', 1, 0);
  }
  // Who gets a .right assignment? - everyone but last row
  if (column < totalColumns - 1) {
    counterConditional('right', 0, 1);
  }
  
  // Who gets a .topRight assignment? - everyone but 0, last-column
  if (row > 0 && column < totalColumns - 1) {
    counterConditional('topRight', -1, +1);
  }
  
  // Who gets a .bottomRight assignment - everyone but last-column, last-row
  if (row < totalRows - 1 && column < totalColumns - 1) {
    counterConditional('bottomRight', +1, +1);
  }
  
  //console.log("R" + row + " C"+ column + ": " + counter);
  
  // Check current cell
  if (neighbors.currentCell.classList.contains('alive')) {
    if (counter < 2 || counter > 3) {
      getSick(neighbors.currentCell);
    }
  }
  
  if (!neighbors.currentCell.classList.contains('alive')) {
    if (counter === 3) {
      getPregnant(neighbors.currentCell);
    }
  }

}

function clearBoard() {
  for (i = 0; i < totalRows; i ++) {
    for (j = 0; j < totalColumns; j++) {
      currentCell = cell(i, j);
      kill(currentCell);
    }
  }
}

function birthDeath(row, column) {
  var currentCell = cell(row, column);
  
  if (currentCell.classList.contains('pregnant')) {
    birth(currentCell);
  }
  
  if (currentCell.classList.contains('sick')) {
    kill(currentCell);
  }
}

function cycle() {
  // For loop across <td>s to check their neighbords
  for (i = 0; i < totalRows; i++) {
    for (j = 0; j < totalColumns; j++) {
      checkNeighbors(i, j);
    }
  }
  for (i = 0; i < totalRows; i ++) {
    for (j = 0; j < totalColumns; j++) {
      birthDeath(i, j);
    }
  }
}

setInterval(cycle, increment);