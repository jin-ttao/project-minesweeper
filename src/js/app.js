import { openBoard } from "./check.js";

export function renderBoard() {
  const gameBoard = document.querySelector(".game-board");
  const WIDTHSPACE = 9;
  const HEIGHTSPACE = 9;

  for (let row = 0; row < HEIGHTSPACE; row++) {
    for (let column = 0; column < WIDTHSPACE; column++) {
      const space = document.createElement("div");

      space.classList.add("item");
      space.dataset.row = row;
      space.dataset.column = column;

      gameBoard.appendChild(space);
    }
  }
}
