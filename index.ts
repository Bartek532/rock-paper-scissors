import { gsap } from "gsap";

const options: [string, string, string] = ["paper", "rock", "scissors"];
const choose = document.querySelector(".choose .options") as HTMLElement;
const userChoice = document.querySelector(".user") as HTMLElement;
const compChoice = document.querySelector(".comp") as HTMLElement;
const gameBoard = document.querySelector(".fight") as HTMLElement;
const result = document.querySelector(".result") as HTMLElement;
const againButton = document.querySelector(".again") as HTMLElement;

let compRepeat: number = 0,
	interval: number,
	time: number = 300,
	player: string;

function playerChoose(e: Event): void {
	for (const option of options) {
		if ((e.target as HTMLElement).classList.contains(option)) {
			userChoice.innerHTML =
				(e.target as HTMLElement).parentElement?.innerHTML || "";
			player = option;
			gameBoard.style.zIndex = "10";
			choose.style.opacity = "0";
			break;
		}
	}
	interval = setInterval(compChoose, time);
}

document
	.querySelectorAll(".option i")
	.forEach((element) => element.addEventListener("click", playerChoose));

function compChoose(): void {
	let rand: number = Math.round(Math.random() * 2);
	compChoice.innerHTML = '<i class="fas fa-hand-' + options[rand] + '"></i>';
	compRepeat++;
	time += 70;
	if (compRepeat == 10) {
		clearInterval(interval);
		time = 300;
		finish(game(player, options[rand]));
	}
}

function game(one: string, two: string): string {
	if (winsFilters(one) === two) {
		return "You lose :(";
	} else if (winsFilters(two) === one) {
		animation();
		return "You win!";
	} else {
		return "Draw";
	}
}

function winsFilters(param: string): string {
	const wins: string[][] = [
		["rock", "paper"],
		["paper", "scissors"],
		["scissors", "rock"],
	];
	return wins.filter(([item]: string[]) => item === param)[0][1];
}

function finish(winner: string): void {
	result.innerHTML = winner;
	againButton.style.opacity = "1";
}

function again(): void {
	gameBoard.style.zIndex = "-1";
	result.innerHTML = "";
	againButton.style.opacity = " 0";
	choose.style.opacity = "1";
	compRepeat = 0;
	gsap.set("svg", {
		opacity: 0,
	});
}

againButton.addEventListener("click", again);

function animation(): void {
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
