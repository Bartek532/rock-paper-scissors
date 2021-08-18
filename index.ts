import gsap from "gsap";

const options = ["paper", "rock", "scissors"];
const elements: Record<string, HTMLElement | null> = {
  choose: document.querySelector(".choose .options"),
  userChoice: document.querySelector(".user"),
  computerChoice: document.querySelector(".comp"),
  gameBoard: document.querySelector(".fight"),
  result: document.querySelector(".result"),
  againButton: document.querySelector(".again"),
};

let computerChooseRepeat = 0,
  interval: number,
  time = 300,
  player: string;

function playerChoose(e: Event) {
  for (const option of options) {
    if ((e.target as HTMLElement).classList.contains(option)) {
      elements.userChoice!.innerHTML = "";
      elements.userChoice?.insertAdjacentHTML(
        "beforeend",
        `<div class="${(e.target as HTMLElement).classList.value}"></div>`
      );
      player = option;
      elements.gameBoard!.classList.add("moveFront");
      elements.choose!.classList.add("hide");
      break;
    }
  }
  interval = setInterval(computerChoose, time);
}

document
  .querySelectorAll(".option")
  .forEach(element => element.addEventListener("click", playerChoose));

function computerChoose() {
  const rand = Math.round(Math.random() * (options.length - 1));
  elements.computerChoice?.firstChild
    ? elements.computerChoice?.removeChild(elements.computerChoice!.firstChild)
    : null;
  elements.computerChoice?.insertAdjacentHTML(
    "beforeend",
    '<div class="option fas fa-hand-' + options[rand] + '"></div>'
  );
  computerChooseRepeat++;
  time += 70;
  if (computerChooseRepeat == 10) {
    clearInterval(interval);
    time = 300;
    finishGame(game(player, options[rand]));
  }
}

function game(one: string, two: string) {
  if (filterWins(one) === two) {
    return "You lose :(";
  } else if (filterWins(two) === one) {
    animation();
    return "You win!";
  } else {
    return "Draw";
  }
}

function filterWins(param: string) {
  const wins = [
    ["rock", "paper"],
    ["paper", "scissors"],
    ["scissors", "rock"],
  ];

  const result = wins.find(([item]) => item === param);
  return result ? result[1] : null;
}

function finishGame(winner: string) {
  elements.result?.insertAdjacentHTML("beforeend", winner);
  elements.againButton!.classList.remove("hide");
}

function playAgain() {
  elements.gameBoard!.classList.remove("moveFront");
  elements.result?.firstChild
    ? elements.result?.removeChild(elements.result.firstChild)
    : null;
  elements.againButton!.classList.add("hide");
  elements.choose!.classList.remove("hide");
  computerChooseRepeat = 0;
  gsap.set("svg", {
    opacity: 0,
  });
}

elements.againButton?.addEventListener("click", playAgain);

function animation() {
  const tl = gsap.timeline();

  tl.set("svg", {
    opacity: 1,
  })
    .addLabel("party")
    .from(".line1", {
      y: -50,
      x: 50,
      scaleX: 0,
      transformOrigin: "50% 100%",
      duration: 0.5,
    })
    .from(
      ".line2",
      {
        y: -50,
        x: -50,
        scaleX: 0,
        transformOrigin: "0% 100%",
        duration: 0.5,
      },
      "party"
    )
    .from(".flag", {
      scale: 0,
      stagger: 0.2,
      transformOrigin: "50% 0%",
      duration: 0.5,
    });
}
