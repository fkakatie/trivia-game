// THINGS I NEED:
// - start button / start over button
// - countdown timer (resets on each new question, stops at end of game)
// - series of questions with multiple choice style answers
// - counter for correct guesses, incorrect guesses

// VARIABLES
// - correct answers, incorrect answers, unanswered questions(?)
// - timer (seconds, tenths)
// - object of questions, answers, images?
// - array for numbers if i wanna randomize the question order?

// FUNCTIONS 
// - start the game
// - ask a question, provide the answers
// - evaluate the answer? 
// - display the results
// - count correct/incorrect guesses
// - start/stop timer

var correct = 0;
    incorrect = 0;
    timeOut = 0;

var questionNumber = 0;
    currentQuestion = '';
    userGuess = '';

var trivia = [
    {
        question: "Pick 0.",
        options: ["zero", "one", "two"],
        answerIndex: 0
    },
    {
        question: "Pick 1.",
        options: ["zero", "one", "two"],
        answerIndex: 1
    },
    {
        question: "Pick 2.",
        options: ["zero", "one", "two"],
        answerIndex: 2
    }
];

var timer = {
    time: 50, // in tenths of a second
    running: false,

    starter: function() {
        if (!this.running) {
            this.running = true;
            timer.decrement();
        }
    },

    stopper: function() {
        this.running = false;
        $('#countdown').text('00:00');

        evaluateGuess();

    },

    decrement: function() {

        if (this.running) {

            setTimeout(function() {
                timer.time--;

                var secs = Math.floor(timer.time/10);
                var tenths = timer.time % 10;

                if (secs < 10) {
                    secs = "0" + secs;
                }

                $('#countdown').text(secs + ":" + "0" + tenths);

                timer.decrement();
                
                if (timer.time === 0) {
                    timer.stopper();
                };

            }, 100);
        }
    }
};

function askQuestions() {

    $('#question').empty();
    $('#options').empty();

    var currentQuestion = trivia[questionNumber];

    console.log(currentQuestion);

    $('#question').text(currentQuestion.question);

    $('#question').append('<div id="countdown">');

    timer.time = 50;
    timer.starter();

    $('#options').append('<ul class="options">');

    for (var i = 0; i < trivia[questionNumber].options.length; i++) {

        $('.options').append('<li class="listOptions">' + trivia[questionNumber].options[i]) + '</li>';

    }
    
    collectAnswer();

};

function nextQuestion() {

    questionNumber++;

    if (questionNumber < trivia.length) {
        askQuestions();
    }
    else {
        endGame();
    }

};

function collectAnswer() {

    $('li.listOptions').on('click', function() {

        userGuess = $('li.listOptions').index(this);

        console.log(userGuess);

        evaluateGuess();

    });

};

function evaluateGuess() {

    timer.running = false;

    $('#question').empty();
    $('#options').empty();

    if (timer.time === 0) {
    
        timeOut++;
        $('#question').text('Too slow!');    
        
    }
    else if (userGuess === trivia[questionNumber].answerIndex) {

        correct++;
        $('#question').text('Correct!');

    }
    else {
    
        incorrect++;
        $('#question').text('Wrong!');
    
    }

    setTimeout(function() {
        nextQuestion();
    }, 3000);

};

function endGame() {

    $('#question').empty();
    $('#options').empty();

    console.log('game over');

    $('#question').text('Game over!');

    $('#options').html(
    '<p>Correct Answers: <strong>' + correct + '</strong></p>' + 
    '<p>Incorrect Answers: <strong>' + incorrect + '</strong></p>' + 
    '<p>Unanswered Questions: <strong>' + timeOut + '</strong></p>'   
    );

    questionNumber = 0;
    correct = 0;
    incorrect = 0;
    timeOut = 0;

    $('#options').append('<button id="restartBtn">Restart Game</button>');

    $('#restartBtn').on('click', function() {
        console.log("the button works at least");
        askQuestions();
    });


}

$(document).ready(function() {

    $('#startBtn').on('click', function() {
        console.log("the button works at least");
        askQuestions();
    });

});