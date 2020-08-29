import { gsap } from "gsap";
var options = ["paper", "rock", "scissors"];
var choose = document.querySelector(".choose .options");
var userChoice = document.querySelector(".user");
var compChoice = document.querySelector(".comp");
var gameBoard = document.querySelector(".fight");
var result = document.querySelector(".result");
var againButton = document.querySelector(".again");
var compRepeat = 0, interval, time = 300, player;
function playerChoose(e) {
    var _a;
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        if (e.target.classList.contains(option)) {
            userChoice.innerHTML =
                ((_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.innerHTML) || "";
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
    .forEach(function (element) { return element.addEventListener("click", playerChoose); });
function compChoose() {
    var rand = Math.round(Math.random() * 2);
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
    }
    else if (winsFilters(two) === one) {
        animation();
        return "You win!";
    }
    else {
        return "Draw";
    }
}
function winsFilters(param) {
    var wins = [
        ["rock", "paper"],
        ["paper", "scissors"],
        ["scissors", "rock"],
    ];
    return wins.filter(function (_a) {
        var item = _a[0];
        return item === param;
    })[0][1];
}
function finish(winner) {
    result.innerHTML = winner;
    againButton.style.opacity = "1";
}
function again() {
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
function animation() {
    var tl = gsap.timeline();
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
        .from(".line2", {
        y: -50,
        x: -50,
        scaleX: 0,
        transformOrigin: "0% 100%",
        duration: 0.5,
    }, "party")
        .from(".flag", {
        scale: 0,
        stagger: 0.2,
        transformOrigin: "50% 0%",
        duration: 0.5,
    });
}
