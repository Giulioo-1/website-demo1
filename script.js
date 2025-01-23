const boardElement = document.getElementById("board");
const playerXScoreElement = document.getElementById("player-x-score");
const playerOScoreElement = document.getElementById("player-o-score");
const resetButton = document.getElementById("reset-button");

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let xTurn = true;
let playerXScore = 0;
let playerOScore = 0;

// Inizializza la griglia
function initializeBoard() {
  boardElement.innerHTML = "";
  board.forEach((row, i) => {
    row.forEach((_, j) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", () => handleMove(i, j, cell));
      boardElement.appendChild(cell);
    });
  });
}

// Gestione del clic su una cella
function handleMove(row, col, cell) {
  if (board[row][col] !== "") return;

  const currentPlayer = xTurn ? "X" : "O";
  board[row][col] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.style.color = xTurn ? "#e74c3c" : "#3498db"; // Rosso per X, blu per O
  cell.classList.add("disabled");

  if (checkWin(currentPlayer)) {
    alert(`Il giocatore ${currentPlayer} ha vinto!`);
    if (xTurn) playerXScore++;
    else playerOScore++;
    updateScores();
    resetGame();
  } else if (isBoardFull()) {
    alert("Pareggio!");
    resetGame();
  } else {
    xTurn = !xTurn;
  }
}

// Controllo della vittoria
function checkWin(player) {
  // Controlla righe, colonne e diagonali
  return (
    board.some(row => row.every(cell => cell === player)) ||
    [0, 1, 2].some(col => board.every(row => row[col] === player)) ||
    [board[0][0], board[1][1], board[2][2]].every(cell => cell === player) ||
    [board[0][2], board[1][1], board[2][0]].every(cell => cell === player)
  );
}

// Controllo del riempimento della griglia
function isBoardFull() {
  return board.flat().every(cell => cell !== "");
}

// Aggiornamento dei punteggi
function updateScores() {
  playerXScoreElement.textContent = `Giocatore X: ${playerXScore}`;
  playerOScoreElement.textContent = `Giocatore O: ${playerOScore}`;
}

// Reset del gioco
function resetGame() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  xTurn = true;
  initializeBoard();
}

// Inizializzazione
resetButton.addEventListener("click", resetGame);
initializeBoard();
