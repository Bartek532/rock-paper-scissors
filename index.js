"use strict";
var _a;
exports.__esModule = true;
var gsap_1 = require("gsap");
var options = ['paper', 'rock', 'scissors'];
var elements = {
    choose: document.querySelector('.choose .options'),
    userChoice: document.querySelector('.user'),
    compChoice: document.querySelector('.comp'),
    gameBoard: document.querySelector('.fight'),
    result: document.querySelector('.result'),
    againButton: document.querySelector('.again')
};
var compRepeat = 0, interval, time = 300, player;
function playerChoose(e) {
    var _a, _b;
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        if (e.target.classList.contains(option)) {
            (_a = elements.userChoice) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', ((_b = e.target.parentElement) === null || _b === void 0 ? void 0 : _b.innerHTML) || '');
            player = option;
            elements.gameBoard.style.zIndex = '10';
            elements.choose.style.opacity = '0';
            break;
        }
    }
    interval = setInterval(compChoose, time);
}
document.querySelectorAll('.option i').forEach(function (element) { return element.addEventListener('click', playerChoose); });
function compChoose() {
    var _a;
    var rand = Math.round(Math.random() * 2);
    (_a = elements.compChoice) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', '<i class="fas fa-hand-' + options[rand] + '"></i>');
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
        return 'You lose :(';
    }
    else if (winsFilters(two) === one) {
        animation();
        return 'You win!';
    }
    else {
        return 'Draw';
    }
}
function winsFilters(param) {
    var wins = [
        ['rock', 'paper'],
        ['paper', 'scissors'],
        ['scissors', 'rock'],
    ];
    var result = wins.find(function (_a) {
        var item = _a[0];
        return item === param;
    });
    wins.findIndex(function (item) { return item[0] === param; });
    wins.map(function (item) { return item + '2'; });
    wins.filter(function (item) { return item[0] === param; });
    return result ? result[1] : '';
}
function finish(winner) {
    var _a;
    (_a = elements.result) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', winner);
    elements.againButton.style.opacity = '1';
}
function again() {
    var _a;
    elements.gameBoard.style.zIndex = '-1';
    (_a = elements.result) === null || _a === void 0 ? void 0 : _a.insertAdjacentHTML('beforeend', '');
    elements.againButton.style.opacity = ' 0';
    elements.choose.style.opacity = '1';
    compRepeat = 0;
    gsap_1["default"].set('svg', {
        opacity: 0
    });
}
(_a = elements.againButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', again);
function animation() {
    var tl = gsap_1["default"].timeline();
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
    });
}
