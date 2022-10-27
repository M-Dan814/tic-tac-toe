const container = document.querySelector(".container");
let player_score = 0;
let comp_score = 0;

const Players = (name, icon) => {
  return { name, icon };
};

CreatePlayer = () => {
  const name = prompt("Enter player's name: ");
  return Players(name, "X");
};

const Player = CreatePlayer();
const Computer = Players("Computer", "O");

const GameBoard = (() => {
  const game = ["d", "d", "d", "d", "d", "d", "d", "d", "d"];
  const possible = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let picked = [];
  const play = (icon) => {
    let index = Math.floor(Math.random() * possible.length);
    if (game.indexOf("d") != -1) {
      if (game[possible[index]] == "d") {
        game[possible[index]] = icon;
        picked.push(possible[index]);
        possible.splice(index, 1);
      } else {
        while (game[possible[index]] != "d") {
          index = Math.floor(Math.random() * possible.length);
        }
        game[possible[index]] = icon;
      }
    }
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
    const score_div = document.createElement("div");
    const player = document.createElement("div");
    const comp = document.createElement("div");
    player.textContent = `${Player.name}: ${player_score}`;
    comp.textContent = `Computer: ${comp_score}`;
    score_div.append(player, comp);
    container.append(score_div);
  };

  return { createDivs };
})();

const Play = (() => {
  let playerIndices = [];
  let compIndices = [];
  const getIndices = (arr) => {
    playerIndices = [];
    compIndices = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == "X") {
        playerIndices.push(i);
      } else if (arr[i] == "O") {
        compIndices.push(i);
      }
    }
  };

  const playGame = (arr) => {
    const possible_Wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    DisplayController.createDivs(arr);
    getIndices(arr);
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
          GameBoard.play("O");
          playGame(arr);
        },
        { once: true }
      );
    });

    // Function to check if a player has won or not
    const checker = (arr, target) => target.every((v) => arr.includes(v));

    for (let i = 0; i < 8; i++) {
      console.log(compIndices);
      console.log(`computer ${i}: ${checker(compIndices, possible_Wins[i])}`);
      if (checker(compIndices, possible_Wins[i])) {
        const comp_Win = document.createElement("div");
        comp_Win.textContent = "The Computer Wins!!!";
        container.append(comp_Win);
        comp_score++;
        break;
      } else if (checker(playerIndices, possible_Wins[i])) {
        const Player_Win = document.createElement("div");
        Player_Win.textContent = "Congratulations! You Win!";
        container.append(Player_Win);
        player_score++;
        break;
      } else if (GameBoard.game.indexOf("d") == -1) {
        const draw = document.createElement("div");
        draw.textContent = "It's a draw!";
        container.append(draw);
        break;
      }
    }
  };

  return { playGame };
})();

Play.playGame(GameBoard.game);
