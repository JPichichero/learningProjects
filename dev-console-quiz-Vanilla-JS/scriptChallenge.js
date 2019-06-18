/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct,  add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

(function() {
    //IIFE for security
})();

let Question = function(quizQuestion, possibleAnswer, correctAnswer) {
    this.quizQuestion = quizQuestion;
    this.possibleAnswer = possibleAnswer;
    this.correctAnswer = correctAnswer;
}

let question0 = new Question('Favorite ice cream?', ['0: Chocolate', '1: Strawberry', '2: Vanilla'], 2);
let question1 = new Question('Favorite adult beverage?', ['0: Beer', '1: Vodka', '2: Whiskey'], 2);
let question2 = new Question('Favorite day of the week?', ['0: Monday', '1: Thursday', '2: Saturday'], 1);
let question3 = new Question('Favorite HP book?', ['0: PoA', '1: GoF', '2: HBP'], 0);

let questionBank = [question0, question1, question2, question3];

Question.prototype.getQuestion = function() {
    console.log(this.quizQuestion);
    for (let i = 0; i < this.possibleAnswer.length; i ++) {
        console.log(this.possibleAnswer[i]);
    }
}; 

/*function randomQuestion() {
    return 'question' + Math.floor(Math.random() * questionBank.length);
    // this did not work because it's not calling the actual question from the array. It was not equal references in memory only equal values, which is not how the objects are accessed. AKA I wasn't actually making a pointer. or reference, but rather two different variables.
}*/

let randomQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];

let runQuizAgain = function() {
    randomQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
    randomQuestion.getQuestion();
    compareAnswer()
};

let userScore = 0;
let tellScore = function() {
    console.log('Your score is: ' + userScore + '\n__________________________' + '\n__________________________')
}

let compareAnswer = function() {
    let userAnswer = prompt('Please enter your answer. Enter the number that corresponds with the option you think is correct.');
        if (userAnswer == 'exit') {
            console.log('Okay, thanks for playing!');
        } else if (userAnswer == randomQuestion.correctAnswer) {
            console.log('The answer is correct!');
            userScore++;
            tellScore();
            runQuizAgain();
        } else {
            console.log('Incorrect, bummer!');
            tellScore();
            runQuizAgain();
        };
};

randomQuestion.getQuestion();
compareAnswer();


