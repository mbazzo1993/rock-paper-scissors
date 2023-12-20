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
    P1_WIN : 'Player 1 wins!',
    P2_WIN : 'Player 2 wins!'
}

let p1_choice;
let p2_choice;

let score = {
    p1_score : 0,
    p2_score : 0
}

let p1_btn_menu = document.getElementById("p1_btn_menu");
let rnd_result = document.getElementById("rnd_result");
let score_disp = document.getElementById("score_disp");

/**
 * REGISTER EVENT LISTENERS
 */

p1_btn_menu.addEventListener('click', playRound);


/**
 * SUPORTING FUNCTIONS
 */

function getP1Choice(event) {
    p1_choice = event.target.value;
}

function getP2Choice() {
    // assign player 2 a random choice
    p2_choice = CHOICES_ARR[Math.floor(Math.random()*CHOICES_ARR.length)];
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

function printScore() {
    console.log(`\nScore:\nPlayer 1 : ${score.p1_score}\nPlayer 2 : ${score.p2_score}`)
}

function playRound(event) {
    getP1Choice(event);
    getP2Choice();
    rnd_result.textContent =  evalWinner();
    score_disp.textContent = printScore();
}

function resetChoices() {
    p1_choice = null;
    p2_choice = null;
}

function gameOver() {
    
}