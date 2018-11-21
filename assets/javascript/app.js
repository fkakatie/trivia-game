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

var timer = {
    time: 50, // in tenths of a second
    running: false,

    startBtn: $('#startBtn'),

    starter: function() {
        if (!this.running) {
            this.running = true;
            timer.decrement();
        }
    },

    stopper: function() {
        if (this.time < 1) {
            this.running = false;
            $('#countdown').text("00:00");
        }
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

                // console.log(Number(timer.time));

                timer.decrement();

                timer.stopper();

            }, 100);
        }
    }
};

$('#startBtn').on('click', function() {
    timer.starter();

    console.log("the button works at least");
});