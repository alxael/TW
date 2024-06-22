window.onload = () => {
  const counter = document.createElement("div");
  counter.setAttribute("id", "counter");
  counter.style.marginLeft = "calc(100% - 20px)";
  counter.style.marginTop = "20px";
  document.body.appendChild(counter);

  const addMush = () => {
    const mush = document.createElement("img");
    mush.setAttribute("src", "badgers/mush.png");

    mush.style.display = "inline-block";
    mush.style.position = "absolute";
    let w = window.innerWidth;
    let h = window.innerHeight;
    let posx = 100 + Math.floor(Math.random() * w - 100);
    let posy = 100 + Math.floor(Math.random() * h - 100);
    mush.style.left = posx + "px";
    mush.style.top = posy + "px";

    document.body.appendChild(mush);
  }

  let imageInterval;
  let imageIndex = 1;
  const changeImage = () => {
    const bursuc = document.getElementById("bursuc");
    bursuc.setAttribute("src", `badgers/badger-${imageIndex}.png`);
    imageIndex++;
    if (imageIndex == 5) {
      imageIndex = 1;
      const squatCount = localStorage.getItem("squatCount");
      const newSquatCount = parseInt(squatCount) + 1;
      localStorage.setItem("squatCount", newSquatCount);
      counter.innerHTML = String(newSquatCount);
      if(newSquatCount % 5 == 0)
        addMush();
    }
  };

  const keyDownListener = (event) => {
    if (event.key == "b") {
      const bursucExistent = document.getElementById("bursuc");
      if (bursucExistent) bursucExistent.remove();
      const counter = document.getElementById("counter");
      counter.innerHTML = 0;

      clearInterval(imageInterval);
      imageIndex = 1;

      localStorage.setItem("squatCount", "0");

      let bursuc = document.createElement("img");
      bursuc.setAttribute("id", "bursuc");
      bursuc.setAttribute("src", "badgers/badger-1.png");

      bursuc.style.display = "inline-block";
      bursuc.style.position = "absolute";
      let w = window.innerWidth;
      let h = window.innerHeight;
      let posx = 100 + Math.floor(Math.random() * w - 100);
      let posy = 100 + Math.floor(Math.random() * h - 100);
      bursuc.style.left = posx + "px";
      bursuc.style.top = posy + "px";

      bursuc.onclick = () => {
        clearInterval(imageInterval);
        imageIndex = 1;
        imageInterval = setInterval(changeImage, 200);
      };

      document.body.appendChild(bursuc);
    } else if (event.key == "p") {
      const bursucAudioExistent = document.getElementById("bursucAudio");
      if (bursucAudioExistent) bursucAudioExistent.remove();

      const bursucAudio = document.createElement("audio");
      bursucAudio.setAttribute("id", "bursucAudio");
      bursucAudio.setAttribute("src", "badgers/badger.mp3");
      bursucAudio.play();
    }
  };

  document.body.addEventListener("keydown", keyDownListener);
};
