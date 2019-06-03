/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Declare variables
let gamePlaying, winningScore, scores, roundScore, activePlayer, dice;

// Variable definitions
function init () { 
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    winningScore = document.getElementById('winning-score').value = 50;

    document.querySelector('#dice-0').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';

    document.getElementById('score-0').textContent = '0'; 
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0'; 

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    gamePlaying = true;
}

// Reusuable functions
function nextPlayer() {
    // Go to next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    // Set player dice to zero
    document.getElementById('current-0').textContent = '0'; 
    document.getElementById('current-1').textContent = '0';

    // Change active state to current player         
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('#dice-0').style.display = 'none';
    document.querySelector('#dice-1').style.display = 'none';

}

//............. on Load
init();

// roll feature
document.querySelector('.btn-roll').addEventListener('click', function() {
    // Roll dice and get number
    if (gamePlaying) {
        // dice Object
        let dice = {
            numDice: [0, 0],
            diceResult: [],
            rollDice: function(numDice, diceResult) {
                for (let i = 0; i < numDice.length; i++) {
                    this.diceResult.push((Math.floor(Math.random() * 6) + 1));
                }
            },
            displayDice: function(diceResult) {
                let diceClass = document.getElementsByClassName('dice');
                for (let i = 0; i < diceClass.length; i++) {
                    diceClass[i].style.display = 'block';
                    diceClass[i].src = 'dice-' + diceResult[i] + '.png';
                }
            },
        };

        //roll dice
        dice.rollDice(dice.numDice);

        //display dice result on screen
        dice.displayDice(dice.diceResult);

        //update roundScore if dice roll !== a one.
        if (dice.diceResult[0] !== 1 && dice.diceResult[1] !== 1) {
            //Update Score
            roundScore = (roundScore + dice.diceResult[0] + dice.diceResult[1]);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
})

// hold feature
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('#dice-0').style.display = 'none';
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Go to next player
            nextPlayer();
        }
    }
})

// new game
document.querySelector('.btn-new').addEventListener('click', init); 


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. First challenge isn't a good add to the rules.
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined 
score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to 
    use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of 
them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first 
    one.)
*/

// Challenge 2.

function changeWinningScore() {
    let userInput = document.getElementById('winning-score').value;
    winningScore = userInput; 
};

document.querySelector('.btn-win-score').addEventListener('click', changeWinningScore);


// Challenge 3
// Above
