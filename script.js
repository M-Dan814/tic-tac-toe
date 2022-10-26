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
  const possible = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let picked = [];
  const play = (icon) => {
    let index = Math.floor(Math.random() * possible.length);
    if (game.indexOf("d") != -1) {
      console.log(possible[index]);
      if (game[possible[index]] == "d") {
        game[possible[index]] = icon;
        picked.push(possible[index]);
        possible.splice(index, 1);
        console.log(possible, picked);
      } else {
        while (game[possible[index]] != "d") {
          index = Math.floor(Math.random() * possible.length);
        }
        game[possible[index]] = icon;
      }
    }
    console.log(game);
    return game;
  };
  return { play, game };
})();

const DisplayController = (() => {
  const createDivs = (arr) => {
    container.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const smallerDivs = document.createElement("div");
      smallerDivs.classList.add("block");
      smallerDivs.classList.add(arr[i]);
      smallerDivs.setAttribute("target", i);
      if (smallerDivs.classList.contains("O")) {
        smallerDivs.textContent = "O";
      } else if (smallerDivs.classList.contains("X")) {
        smallerDivs.textContent = "X";
      }
      container.append(smallerDivs);
    }
  };

  const addFunctionality = (arr, icon) => {
    createDivs(arr);
    const userBlocks = document.querySelectorAll(".d");
    userBlocks.forEach((Block) => {
      Block.addEventListener(
        "click",
        () => {
          Block.classList.remove("d");
          Block.classList.add("X");
          Block.textContent = "X";
          let number = Block.getAttribute("target");
          GameBoard.game[number] = "X";
          GameBoard.play(icon);
          createDivs(arr);
          addFunctionality(arr, icon);
        },
        { once: true }
      );
    });
  };
  return { addFunctionality };
})();

const Computer = Players("Computer", "O");
DisplayController.addFunctionality(
  GameBoard.play(Computer.icon),
  Computer.icon
);
