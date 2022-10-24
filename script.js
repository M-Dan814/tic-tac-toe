const Players = (name, icon) => {
  const play = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == "d") {
        arr[i] = icon;
      }
    }
  };

  return { name, icon, play };
};

