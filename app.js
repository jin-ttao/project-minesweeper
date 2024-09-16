function renderBoard() {
  const gameBoard = document.querySelector(".gameBoard");
  const widthSpace = 9;
  const heightSpace = 9;

  for (let row = 0; row < heightSpace; row++) {
    for (let column = 0; column < widthSpace; column++) {
      const space = document.createElement("div");

      space.classList.add("item");
      space.dataset.row = row;
      space.dataset.col = column;

      gameBoard.appendChild(space);
    }
  }
}

renderBoard();
