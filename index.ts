import gsap from 'gsap';

const options = ['paper', 'rock', 'scissors'];
const elements: { [key: string]: HTMLElement | null } = {
	choose: document.querySelector('.choose .options'),
	userChoice: document.querySelector('.user'),
	compChoice: document.querySelector('.comp'),
	gameBoard: document.querySelector('.fight'),
	result: document.querySelector('.result'),
	againButton: document.querySelector('.again'),
};

let compRepeat = 0,
	interval: number,
	time = 300,
	player: string;

function playerChoose(e: Event): void {
	for (const option of options) {
		if ((e.target as HTMLElement).classList.contains(option)) {
			elements.userChoice?.firstChild ? elements.userChoice?.removeChild(elements.userChoice?.firstChild) : null;
			elements.userChoice?.insertAdjacentHTML(
				'beforeend',
				(e.target as HTMLElement).parentElement?.innerHTML || ''
			);
			player = option;
			elements.gameBoard!.style.zIndex = '10';
			elements.choose!.style.opacity = '0';
			break;
		}
	}
	interval = setInterval(compChoose, time);
}

document.querySelectorAll('.option i').forEach(element => element.addEventListener('click', playerChoose));

function compChoose(): void {
	const rand = Math.round(Math.random() * 2);
	elements.compChoice?.firstChild ? elements.compChoice?.removeChild(elements.compChoice!.firstChild) : null;
	elements.compChoice?.insertAdjacentHTML('beforeend', '<i class="fas fa-hand-' + options[rand] + '"></i>');
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
		return 'You lose :(';
	} else if (winsFilters(two) === one) {
		animation();
		return 'You win!';
	} else {
		return 'Draw';
	}
}

function winsFilters(param: string): string {
	const wins = [
		['rock', 'paper'],
		['paper', 'scissors'],
		['scissors', 'rock'],
	];

	const result = wins.find(([item]) => item === param);
	return result ? result[1] : '';
}

function finish(winner: string): void {
	elements.result?.insertAdjacentHTML('beforeend', winner);
	elements.againButton!.style.opacity = '1';
}

function again(): void {
	elements.gameBoard!.style.zIndex = '-1';
	elements.result?.insertAdjacentHTML('beforeend', '');
	elements.againButton!.style.opacity = ' 0';
	elements.choose!.style.opacity = '1';
	compRepeat = 0;
	gsap.set('svg', {
		opacity: 0,
	});
}

elements.againButton?.addEventListener('click', again);

function animation(): void {
	const tl = gsap.timeline();

	tl.set('svg', {
		opacity: 1,
	})
		.addLabel('party')
		.from('.line1', {
			y: -50,
			x: 50,
			scaleX: 0,
			transformOrigin: '50% 100%',
			duration: 0.5,
		})
		.from(
			'.line2',
			{
				y: -50,
				x: -50,
				scaleX: 0,
				transformOrigin: '0% 100%',
				duration: 0.5,
			},
			'party'
		)
		.from('.flag', {
			scale: 0,
			stagger: 0.2,
			transformOrigin: '50% 0%',
			duration: 0.5,
		});
}
