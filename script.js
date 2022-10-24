const container = document.querySelector(".container");

const Players = (name, icon) => {
  return { name, icon };
};

const CreatePlayer = () => {
  const name = prompt("Enter player's name: ");
  return Players(name, "X");
};

const GameBoard = (() => {
  const game = ["d", "d", "d", "d", "d", "d", "d", "d", "d"];
  const play = (icon) => {
    let index = Math.floor(Math.random() * 9);
    while (game.indexOf("d") != -1) {
      if (game[index] != "d") {
        game[index] = icon;
      } else {
        index = Math.floor(Math.random() * 9);
      }
      return game;
    }
  };
  return { play };
})();

const Display = (() => {
  const createDivs = (arr) => {
    for (let i = 0; i < 9; i++) {
      const smallerDivs = document.createElement("div");
      smallerDivs.classList.add(arr[i]);
      if (smallerDivs.classList.contains("O")) {
        smallerDivs.textContent = "O";
      } else if (smallerDivs.classList.contains("X")) {
        smallerDivs.textContent = "X";
      }
      container.append(smallerDivs);
    }
  };
  return { createDivs };
})();

