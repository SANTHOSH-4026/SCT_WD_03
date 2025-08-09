const board = document.getElementById("game-board");
const message = document.getElementById("message");
let mode = "2P";
let currentPlayer = "X";
let cells = [];
let isGameOver = false;

document.getElementById("mode").addEventListener("change", (e) => {
  mode = e.target.value;
});

function startGame() {
  board.innerHTML = "";
  cells = Array(9).fill("");
  currentPlayer = "X";
  isGameOver = false;
  message.textContent = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleMove(i));
    board.appendChild(cell);
  }
}

function handleMove(index) {
  if (cells[index] !== "" || isGameOver) return;

  cells[index] = currentPlayer;
  board.children[index].textContent = currentPlayer;
  if (checkWinner()) {
    message.textContent = `${currentPlayer} wins!`;
    isGameOver = true;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    message.textContent = "It's a draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Player ${currentPlayer}'s turn`;

  if (mode === "CPU" && currentPlayer === "O") {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let available = cells.map((val, idx) => val === "" ? idx : null).filter(v => v !== null);
  let move = available[Math.floor(Math.random() * available.length)];
  handleMove(move);
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]          
  ];

  return wins.some(combination =>
    combination.every(index => cells[index] === currentPlayer)
  );
}
