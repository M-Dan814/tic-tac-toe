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

