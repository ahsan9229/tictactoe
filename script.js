let p1S = 0;
let p2S = 0;

let boxes = document.querySelectorAll(".box");
let restBtn = document.querySelector(".resetBtn");
let msgCountainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let player1Score = document.querySelector("#User-Score");
let player2Score = document.querySelector("#Comp-Score");
let msg = document.querySelector("#msg");
let showName1 = document.querySelector(".playerNameValue1");
let showName2 = document.querySelector(".playerNameValue2");
let modal = document.querySelector(".modal");
let span = document.getElementsByClassName("close")[0];
let fpn = document.querySelector(".FPN");
let spn = document.querySelector(".SPN");
let startGame = document.querySelector("#btnStart");
let count = 0;
let turn0 = true;
let Player1;
let Player2;
let p1name = document.querySelector(".p1Name");
let p2name = document.querySelector(".p2Name");

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = firsPlayerSign;
      // showName1.style.backgroundColor:
      turn0 = false;
    } else {
      box.innerText = scndPlayerSign;
      turn0 = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const disableBox = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};
const enabledBox = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const restGame = () => {
  enabledBox();
  msgCountainer.classList.add("hide");
  count = 0;
};
const showWinner = (winner, score) => {
  disableBox();
  if (winner === Player1) {
    player1Score.innerText = score;
  } else {
    player2Score.innerText = score;
  }
  msgCountainer.classList.remove("hide");
  msg.innerText = `Congratulation Player ${winner}  you Win the Game`;
};

const gameDraw = () => {
  disableBox();
  msgCountainer.classList.remove("hide");
  msg.innerText = `Game was a DRAW! - please try again`;
};
const checkWinner = () => {
  for (pattern of winPatterns) {
    let playVal1 = boxes[pattern[0]].innerText;
    let playVal2 = boxes[pattern[1]].innerText;
    let playVal3 = boxes[pattern[2]].innerText;

    if (playVal1 != "" && playVal2 != "" && playVal3 != "") {
      if (playVal1 == playVal2 && playVal2 == playVal3) {
        if (playVal1 == firsPlayerSign) {
          p1S++;
          showWinner(Player1, p1S);
        } else {
          p2S++;
          showWinner(Player2, p2S);
        }
        return true;
      }
    }
  }
};
newGameBtn.addEventListener("click", () => {
  restGame();
});
restBtn.addEventListener("click", () => {
  restGame();
});

startGame.addEventListener("click", () => {
  let arr = ["X", "O"];
  Player1 = fpn.value;
  Player2 = spn.value;

  for (let i = 0; i < arr.length; i++) {
    let value = Math.floor(Math.random() * 2);
    firsPlayerSign = value === 0 ? "X" : "O";
    scndPlayerSign = firsPlayerSign === "X" ? "O" : "X";
  }

  if (fpn.value === "" || spn.value === "") {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
    showName1.innerHTML = `Player 1: ${fpn.value} and your sign is : ${firsPlayerSign}`;
    showName2.innerHTML = `Player 2: ${spn.value} and your sign is : ${scndPlayerSign}`;
    p1name.innerText = Player1;
    p2name.innerText = Player2;
  }
});

window.addEventListener("load", () => {
  modal.style.display = "block";
});
