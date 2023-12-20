/**
 * GLOBAL VARIABLES
 */
const CHOICES = {
    ROCK : 'r',
    PAPER : 'p',
    SCISSORS : 's'
}
const CHOICES_ARR = [CHOICES.ROCK,CHOICES.PAPER,CHOICES.SCISSORS];
const CHOICES_STR = {
    'r' : 'rock',
    'p' : 'paper',
    's' : 'scissors'
}
const RND_RSLTS = {
    DRAW : `Draw!`,
    P1_WIN : 'You win!',
    P2_WIN : 'Computer wins!'
}
const CHOICES_IMG_MAP = {
    'r' : './rock_choice.png',
    'p' : './paper_choice.png',
    's' : './scissors_choice.png'
}
const NO_CHOICE_IMG = './no_choice.png'
const GAME_OVER_MSG = 'Game Over!'

let p1_choice;
let p2_choice;

let score = {
    p1_score : 0,
    p2_score : 0
}

// Refernces to DOM nodes
let p1_choice_img = document.getElementById("p1_choice_img");
let p2_choice_img = document.getElementById("p2_choice_img");
let p1_btn_menu = document.getElementById("p1_btn_menu");
let p2_btn_menu = document.getElementById("p2_btn_menu");
let p1_btn_shoot = document.getElementById("p1_btn_shoot");
let p1_score_disp = document.getElementById("p1_score_disp");
let p2_score_disp = document.getElementById("p2_score_disp");
let rnd_result = document.getElementById("rnd_result");

/**
 * REGISTER EVENT LISTENERS
 */
p1_btn_menu.addEventListener('click', getP1Choice);
p1_btn_shoot.addEventListener('click', playRound);


/**
 * SUPORTING FUNCTIONS
 */
function getP1Choice(event) {
    p1_choice = event.target.value;
    // manage button select state for p1
    for (const button of event.currentTarget.children) {
        if (button.id === event.target.id) {
            button.classList.add("btn-selected");
        } else {
            button.classList.remove("btn-selected");
        }
    }
    p1_choice_img.src = CHOICES_IMG_MAP[p1_choice];
    p2_choice_img.src = NO_CHOICE_IMG;
}

function getP2Choice() {
    // assign player 2 a random choice
    p2_choice = CHOICES_ARR[Math.floor(Math.random()*CHOICES_ARR.length)];
    p2_choice_img.src = CHOICES_IMG_MAP[p2_choice];
    // manage button select state for p2
    for (const button of p2_btn_menu.children) {
        if (button.value === p2_choice) {
            button.classList.add("btn-selected");
        } else {
            button.classList.remove("btn-selected");
        }
    }
}

function evalWinner() {
    // check if draw
    if (p1_choice === p2_choice) {
        score.p1_score += 1;
        score.p2_score += 1;
        return RND_RSLTS.DRAW; 
    }

    // check if p1 wins
    if (p1_choice === 'r') {
        if(p2_choice === 's') {
            score.p1_score += 1;
            return RND_RSLTS.P1_WIN
        }
    } else if (p1_choice === 'p') {
        if(p2_choice === 'r') {
            score.p1_score += 1;
            return RND_RSLTS.P1_WIN
        }
    } else if (p1_choice === 's') {
        if(p2_choice === 'p') {
            score.p1_score += 1;
            return RND_RSLTS.P1_WIN
        }
    }
    
    // otherwise p2 wins
    score.p2_score += 1;
    return RND_RSLTS.P2_WIN;
}

function playRound() {
    getP2Choice();
    rnd_result.textContent =  evalWinner();
    p1_score_disp.textContent = score.p1_score;
    p2_score_disp.textContent = score.p2_score;

    if (score.p1_score === 5 || score.p2_score === 5) {
        gameOver()
    }
}

function resetChoices() {
    p1_choice = null;
    p2_choice = null;
}

function gameOver() {
    // display game over message
    rnd_result.textContent =  `${GAME_OVER_MSG} ${
        score.p1_score > score.p2_score ? RND_RSLTS.P1_WIN :
            score.p1_score === score.p2_score ? RND_RSLTS.DRAW : RND_RSLTS.P2_WIN}`;

    // disable shoot
    p1_btn_shoot.disabled = true;
}