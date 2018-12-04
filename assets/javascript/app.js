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

var questionIndex = 0;
    currentQuestion = '';
    userGuess = '';

var questionsArr = [];
    randomFive = [];

var trivia = [
    {
        question: "Before being convicted of 33 counts of murder, John Wayne Gacy Jr. often performed at children's hospitals and parades as:",
        options: ['Pogo the Clown', 'Magnus the Magician', 'Johnny the Puppeteer'],
        answerIndex: 0,
        bonus: 'Also known as "The Killer Clown," Gacy also performed at Democratic party functions.'
    },
    {
        question: 'Though murdered before an official diagnosis, Dee Dee Blanchard was suspected of having this mental disorder based on the way she treated her daughter, Gypsy Rose.',
        options: ['Hypochondriasis', 'Munchausen syndrome by proxy', 'Ganser syndrome'],
        answerIndex: 1,
        bonus: "At her mother's insistence, Gypsy Rose was subjected to several unnecessary surgeries, confined to an unneeded wheelchair, and forced to shave her head to appear as if she were undergoing chemotherapy."
    },
    {
        question: 'Herbert William Mullin murdered 13 people in California in the 1970s because he believed the killings would prevent:',
        options: ['forest fires', 'the apocalypse', 'earthquakes'],
        answerIndex: 2,
        bonus: 'Mullin was actually voted "Most Likely to Succeed" by his San Lorenzo Valley High School classmates less than a decade before his first murder.'
    },
    {
        question: 'After his murder spree in the Pacific Northwest and before two successful escapes from jail, Ted Bundy enrolled in what program at the University of Utah?',
        options: ['Business School', 'Master of Public Policy Program', 'Law School'],
        answerIndex: 2,
        bonus: "Bundy's murders took place in Washington, Oregon, Utah, Colorado, Idaho, and Florida, where he was eventually captured, convicted, and killed."
    },
    {
        question: 'The Visalia Ransacker, the East Area Rapist, and the Original Night Stalker were finally identified thanks to familial DNA matching by which DNA service?',
        options: ['Ancestry', 'GEDMatch', '23 and Me'],
        answerIndex: 1,
        bonus: 'Despite three distinctive periods of crime, the Visalia Ransacker, the East Area Rapist, and the Original Night Stalker are all the same person, better known as the Golden State Killer.'
    },
    {
        question: 'Ed Gein, notorious murder and grave digger, served as partial inspiration for the main character which novel?',
        options: ['It Had to Be Murder by Cornell Woolrich', "D'entre les Morts by Boileau-Narcejac", 'Psycho by Robert Bloch'],
        answerIndex: 2,
        bonus: "Much like Norman Bates, Gein hoped to become his mother. Gein hoped to do so by creating a suit of women's flesh."
    },
    {
        question: 'How did Theodore Edward Coneys elude capture for nine months after the murder of Philip Peters?',
        options: ['Hiding in the Peters’ attic', 'Fleeing the state of Colorado', 'Assuming Peters’ identity'],
        answerIndex: 0,
        bonus: "Coneys was able to remain in the Peters’ attic even after initial police investigation because they believed that no normal-sized person could fit through the attic's trapdoor."
    },
    {
        question: "A murder investigation was opened when Australian boxer Jim Smith's severed arm was found where?",
        options: ['at the base of Ayers Rock', "in a Nando's dumpster", 'the stomach of a tiger shark'],
        answerIndex: 2,
        bonus: "Smith's arm had been devoured by a smaller tiger shark which was then eaten by a larger shark, before being regurgitated in front of a small crowd at Coogee Aquarium Baths."
    },
    {
        question: "38 members of Heaven's Gate committed mass suicide by ingesting phenobarbital mixed with:",
        options: ['grape Kool-Aid', 'apple sauce and vodka', 'lemon-lime Gatorade'],
        answerIndex: 1,
        bonus: '"Drinking the Kool-Aid" is often attributed to the 1978 Jonestown deaths, but Jim Jones actually poisoned his cult with the cheaper Flavor Aid.'
    },
    {
        question: "This suspicious purchase established premeditation in Jodi Arias' murder of Travis Alexander.",
        options: ['.25 caliber pistol', 'digital camera', 'gas cans'],
        answerIndex: 2,
        bonus: "It is thought that Arias purchased the gas cans to avoid detection in gas station surveillance footage, allowing her to lie about her whereabouts."
    },
    {
        question: "Before deploying two bombs that killed Steven Christensen and Kathy Sheets, Mark Hoffman gained acclaim for successfully forging what kind of documents?",
        options: ['Religious artifacts', 'Literary correspondence ', 'Foreign currency'],
        answerIndex: 0,
        bonus: 'Hoffman created documents pertaining to the history of the Latter-Day Saint movement, including the infamous "Salamander letter" which claimed that a white salamander, not an angel, appeared to Mormon prophet Joseph Smith.'
    },
    {
        question: "John George Haigh, also known as the Acid Bath Murderer, destroyed his victim's bodies in part because he misunderstood which legal term?",
        options: ['ex post facto', 'actori incumbit onus probatio', 'corpus delicti'],
        answerIndex: 2,
        bonus: 'Corpus delicti insists that a crime must be proven before a person can be convicted. Haigh initially believed that if authorities could not find the bodies of his victims, they would be unable to prove he committed any crime.'
    },
    {
        question: "JonBenét Ramsey's ransom note is regarded with suspicion for many reasons, but not because:",
        options: ['it was two pages long', "it was in her brother Burke's handwriting", "it demanded the exact amount of her father's most recent bonus"],
        answerIndex: 1,
        bonus: "This infamous ransom letter was not in JonBenét's brother's handwriting, but is thought to be penned in her mother Patsy's handwriting. The pad of paper the note was written on was also found in the Ramsey home."
    },
    {
        question: "Sixteen-year-old Brenda Spencer explained her motivation for the Grover Cleveland Elementary School shooting, where she killed Principal Burton Wragg and Mike Suchar, by saying:",
        options: ["I don't like Mondays.", "I didn't want to get blood all over myself.", "I finally decided to take a risk."],
        answerIndex: 0,
        bonus: "Spencer's assertion inspired Bob Geldof of the Boomtown Rats to write the song 'I Don't Like Mondays.'"
    },
    {
        question: "Alexander Yuryevich Pichuskin, thought to have killed between 48 and 60 people in Moscow, said he aimed to eventually kill 64 people because:",
        options: ['64 is both a perfect square and cube', 'his grandfather died at age 64', 'there are 64 squares on a chessboard'],
        answerIndex: 2,
        bonus: 'Pichushkin frequently played chess in the park where he committed most of his murders and is also known as "The Chessboard Killer."'
    },
    {
        question: "After systematically murdering his entire family in their home, John Emil List cut his own picture out of every family photograph and evaded identification for 18 years until:",
        options: ['he was caught on CCTV in France', "his 1971 driver's license was found in JFK", "a clay bust of his likeness was broadcast on America's Most Wanted"],
        answerIndex: 2,
        bonus: "The age-progressed clay bust of List was sculpted by forensic artist Frank Bender and was so accurate that it led to List's arrest less than two weeks after the AMW broadcast."
    },
    {
        question: "After turning himself in twice for two separate murder sprees, Ed Kemper has now spent over 5,000 hours in prison doing what?",
        options: ['painting and selling circus scenes', 'narrating audiobooks', 'pursuing a PhD in Criminal Psychology'],
        answerIndex: 1,
        bonus: "Some of Kemper's audiobook credits include novelizations of the original Star Wars trilogy and Flowers in the Attic by V.C. Andrews."
    }
];

var timer = {
    time: 150, // in tenths of a second
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

function questionsArray() {
    for (var j = 0; j < trivia.length; j++) {
        questionsArr.push(j);
    };

    console.log(questionsArr);
};

function generateFiveQuestions() {

        for (var k = 0; randomFive.length < 5; k++) {
        var randomNum = Math.floor(Math.random() * trivia.length);

        if (randomFive.indexOf(randomNum) === -1) {
            randomFive.push(randomNum);
        }
    };

    console.log(randomFive);

};

function askQuestions() {

    generateFiveQuestions();

    $('#question').empty().removeClass("big emphasis");
    $('#options').empty().removeClass("big");

    var currentQuestion = trivia[randomFive[questionIndex]];

    console.log(currentQuestion);

    $('#question').text(currentQuestion.question).addClass("big");

    $('#question').prepend('<div id="countdown">');

    timer.time = 150;
    timer.starter();

    $('#options').append('<ul class="options">');

    for (var i = 0; i < trivia[questionIndex].options.length; i++) {

        $('.options').append('<li class="listOptions">' + trivia[randomFive[questionIndex]].options[i]) + '</li>';

    }
    
    collectAnswer();

};

function nextQuestion() {

    questionIndex++;

    if (questionIndex < randomFive.length) {
        askQuestions();
    }
    else {
        endGame();
    }

};

function collectAnswer() {

    $('li.listOptions').on('click', function() {

        userGuess = $('li.listOptions').index(this);

        evaluateGuess();

    });

};

function evaluateGuess() {

    timer.running = false;

    $('#question').empty();
    $('#options').empty();

    if (timer.time === 0) {
    
        timeOut++;
        $('#question').text('Too slow!').addClass("emphasis");   
        
    }
    else if (userGuess === trivia[randomFive[questionIndex]].answerIndex) {

        correct++;
        $('#question').text('Correct!').addClass("emphasis");

    }
    else {
    
        incorrect++;
        $('#question').text('Wrong!').addClass("emphasis");
    
    }

    $('#options').text(trivia[randomFive[questionIndex]].bonus).addClass("big");

    setTimeout(function() {
        nextQuestion();
    }, 6000);

};

function endGame() {

    $('#question').empty();
    $('#options').empty().addClass("typed");

    console.log('game over');

    $('#question').text('Game over!');

    $('#options').html(
    '<p>Correct Answers: <strong>' + correct + '</strong></p>' + 
    '<p>Incorrect Answers: <strong>' + incorrect + '</strong></p>' + 
    '<p>Unanswered Questions: <strong>' + timeOut + '</strong></p>'   
    );

    questionIndex = 0;
    correct = 0;
    incorrect = 0;
    timeOut = 0;
    randomFive = [];

    $('#options').append('<button id="restartBtn">Reopen Investigation ⯈</button>');

    $('#restartBtn').on('click', function() {
        askQuestions();
    });

}

$(document).ready(function() {

    questionsArray();

    $('#startBtn').on('click', function() {
        askQuestions();
    });

});