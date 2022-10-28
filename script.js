const container = document.querySelector(".container");
const new_game = document.querySelector("#new-game");
const reset = document.querySelector("#reset");
const new_player = document.querySelector("#new-player");
let player_score = 0;
let comp_score = 0;
let turn = 0;

const Players = (name, icon) => {
  return { name, icon };
};

CreatePlayer = () => {
  const name = prompt("Enter player's name: ");
  return Players(name, "X");
};

let Player = CreatePlayer();
const Computer = Players("Computer", "O");

const GameBoard = (() => {
  const game = ["d", "d", "d", "d", "d", "d", "d", "d", "d"];

  return { game };
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
    score_div.classList.add("score");
    const player = document.createElement("div");
    player.id = "player";
    const comp = document.createElement("div");
    comp.id = "comp ";
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
  let arr = [...GameBoard.game];
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

  let possible = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let picked = [];
  const play = () => {
    let index = Math.floor(Math.random() * possible.length);
    if (arr.indexOf("d") != -1) {
      if (arr[possible[index]] == "d") {
        arr[possible[index]] = "O";
        picked.push(possible[index]);
        possible.splice(index, 1);
      } else {
        while (arr[possible[index]] != "d") {
          index = Math.floor(Math.random() * possible.length);
        }
        arr[possible[index]] = "O";
      }
    }
    return arr;
  };

  const playGame = () => {
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
          arr[number] = "X";
          play();
          playGame(arr);
          console.log(arr);
        },
        { once: true }
      );
    });

    // Function to check if a player has won or not
    const checker = (arr, target) => target.every((v) => arr.includes(v));

    for (let i = 0; i < 8; i++) {
      if (checker(compIndices, possible_Wins[i])) {
        const comp_Win = document.createElement("div");
        comp_Win.textContent = "The Computer Wins!!!";
        comp_Win.id = "compWin";
        comp_Win.classList.add("result");
        container.append(comp_Win);
        comp_score++;
        arr = [...GameBoard.game];
        break;
      } else if (checker(playerIndices, possible_Wins[i])) {
        const Player_Win = document.createElement("div");
        Player_Win.textContent = "Congratulations! You Win!";
        Player_Win.id = "playerWin";
        Player_Win.classList.add("result");
        container.append(Player_Win);
        player_score++;
        arr = [...GameBoard.game];
        break;
      } else if (arr.indexOf("d") == -1) {
        const draw = document.createElement("div");
        draw.textContent = "It's a draw!";
        draw.id = "draw";
        draw.classList.add("result");
        container.append(draw);
        arr = [...GameBoard.game];
        break;
      }
    }
  };

  return { play, playGame };
})();

new_game.addEventListener("click", () => {
  container.innerHTML = "";
  if (turn % 2 == 0) {
    Play.playGame();
    turn++;
  } else {
    Play.play();
    Play.playGame();
    turn++;
  }
});

new_player.addEventListener("click", () => {
  player_score = 0;
  comp_score = 0;
  Player = CreatePlayer();
  Play.playGame();
});

reset.addEventListener("click", () => {
  player_score = 0;
  comp_score = 0;
  Play.playGame();
});

Play.playGame();
