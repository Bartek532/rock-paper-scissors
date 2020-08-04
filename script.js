const options = ["paper", "rock", "scissors"];
const choose = document.querySelector('.choose .options');
const userChoice = document.querySelector(".user");
const compChoice = document.querySelector(".comp");
const gameBoard = document.querySelector(".fight");
const result = document.querySelector(".result");
const againButton = document.querySelector(".again");

let compRepeat = 0,
	interval,
	time = 300,
	player = "";

function playerChoose(e) {
	for (const option of options) {
		if (e.target.classList.contains(option)) {
			userChoice.innerHTML = e.target.parentNode.innerHTML;
			player = option;
			gameBoard.style.zIndex = 10;
			choose.style.opacity = 0;
			break;
		}
	}
	interval = setInterval(compChoose, time);
}

for (const element of document.querySelectorAll(".option i")) {
	element.addEventListener("click", playerChoose);
}

function compChoose() {
	let rand = Math.round(Math.random() * 2);
	compChoice.innerHTML = '<i class="fas fa-hand-' + options[rand] + '"></i>';
	compRepeat++;
	time += 70;
	if (compRepeat == 10) {
		clearInterval(interval);
		time = 300;
		finish(game(player, options[rand]));
	}
}

function game(one, two) {
	if (winsFilters(one) === two) {
		return "You lose :(";
	} else if (winsFilters(two) === one) {
		animation();
		return "You win!";
	} else {
		return "Draw";
	}
}

function winsFilters(param) {
	const wins = [
		["rock", "paper"],
		["paper", "scissors"],
		["scissors", "rock"],
	];
	return wins.filter(([item]) => item === param)[0][1];
}

function finish(winner) {
	result.innerHTML = winner;
	againButton.style.opacity = 1;

}

function again() {
	gameBoard.style.zIndex = -1;
	result.innerHTML = "";
	againButton.style.opacity = 0;
	choose.style.opacity = 1;
	compRepeat = 0;
	gsap.set('svg', {
		opacity: 0
	})
}

againButton.addEventListener("click", again);


//animations 
function animation() {
	const tl = new TimelineMax();

	tl.set('svg', {
			opacity: 1
		})
		.addLabel('party')
		.from('.line1', {
			y: -50,
			x: 50,
			scaleX: 0,
			transformOrigin: '50% 100%',
			duration: 0.5
		})
		.from('.line2', {
			y: -50,
			x: -50,
			scaleX: 0,
			transformOrigin: '0% 100%',
			duration: 0.5
		}, 'party')
		.from('.flag', {
			scale: 0,
			stagger: 0.2,
			transformOrigin: '50% 0%',
			duration: 0.5
		})
}