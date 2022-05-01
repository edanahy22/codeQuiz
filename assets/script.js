// Global Variables
var timerElement = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");
var questionDisplay = document.querySelector(".question");
var multOptions = document.querySelector(".options");
var viewHighscoresEl = document.querySelector(".view-highscores");
var saveButton = document.querySelector("#save");

var scoreValue = 0
var currentQuestion = 0;
var userInitials = "";
var quizQuestions = [
    {
     question: "What is the purpose of an array?",
     answers: [
        "to delcare looping directions",
        "to store lists of ordered data",
         "to store key-value pairs and are unordered",
        "to write a function expression"
     ],
        correctAnswer: "to store lists of ordered data",
     },
     {
         question: "What is an object?",
         answers: [
             "a built-in data type for key-value pair that is unordered",
             "a list of ordered, stored data",
             "provides the flow in which statements are executed",
             "a comparison operator"
            ],
         correctAnswer: "a built-in data type for key-value pair that is unordered"
     },
     {
         question: "Which option would evaluate to true using comparison operators?",
         answers: [
            "2 > 6",
             "1 === '1'",
             "6 < 2",
             "1 === 1"
        ],
         correctAnswer: "1 === 1"
     },
     {
         question: "What are function parameters?",
         answers: [
             "inputs to a function when it is delcared that are used as variables inside of a function",
             "the value that is sent to the function when it is called",
             "they end the function execution",
             "they call the function"
         ],
         correctAnswer: "inputs to a function when it is delcared that are used as variables inside of a function"
     },
     {
         question: "What is the purpose of javaScript?",
         answers: [ 
             "to add the structure to the webpage",
             "to add design features to the webpage",
             "to make the webpage interactive",
             "to make the webpage load faster"
         ],
         correctAnswer: "to make the webpage interactive",
     }
];

var timer;
var timerCount;

function startTimer() {
    // Sets timer
    timer = setInterval(function() {
        if (timerCount <= 0) {
            timerElement.textContent = 0;
            clearInterval(timer);
            endQuiz() 
            }
            else{
                timerCount--;
                timerElement.textContent = timerCount;
            }

    }, 1000);

  }

function renderQuiz() {
    questionDisplay.textContent = quizQuestions[currentQuestion].question;
    multOptions.innerHTML="";
    quizQuestions[currentQuestion].answers.forEach(function (answer){
        var answerEl = document.createElement("button");
        answerEl.setAttribute("style", "padding:10px; margin:10px;");
        answerEl.setAttribute("value", answer);
        answerEl.textContent = answer;
        answerEl.onclick = checkAnswer;
        multOptions.appendChild(answerEl);
        
    })
}

function checkAnswer () {
    console.log(this.value);
    console.log(quizQuestions[0].correctAnswer);

    if (this.value !== quizQuestions[currentQuestion].correctAnswer) {
        timerCount -= 5;
    
        if (timerCount <= 0) {
            timerCount = 0;
            clearInterval(timer);
            endQuiz();
        }
    } else {
        currentQuestion++;
        if (currentQuestion >= quizQuestions.length){
            clearInterval(timer);
            endQuiz();
            console.log("user won!");
        } else {
            renderQuiz();
            console.log(currentQuestion);
        }
    }
}

 function saveHighscore(){
    var userInitialEl = document.getElementById("msg");
    userInitials = userInitialEl.value;

    // make data structure
    var userRecord = {
        initials: userInitials,
        score: scoreValue,
    }
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    if (!highScores){
        highScores = [userRecord];
    }
    else {
        highScores.push(userRecord); 
    }
    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log(userRecord);  
    };
  
 function renderHighscore (){
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    console.log(highScores)
    document.getElementById("endQuiz").style.display = "none";
    var scoreUl = document.getElementById('saved-scores');

    scoreUl.innerHTML = ""

    for (var i=0; i < highScores.length; i++) {
        score = highScores[i];
        var scoreLi = document.createElement("li");
        scoreLi.appendChild(document.createTextNode("User Name: " + score.initials + "\t Score: " + score.score));
        scoreUl.appendChild(scoreLi);
    }

    document.getElementById("saved-scores").style.display = "block";
    startButton.disabled = false;

}


saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveHighscore();
    renderHighscore();
    });


viewHighscoresEl.addEventListener("click", renderHighscore);

function endQuiz() {
   
    document.getElementById("questionCard").style.display = "none";
    document.getElementById("endQuiz").style.display = "block";
    var score = document.getElementById("score");
    scoreValue = timerCount;
    score.innerText = "Score: " + scoreValue;
    clearInterval(timer);
    console.log(score.innerText);

}


  // The startQuiz function is called when the start button is clicked
function startQuiz() {
    currentQuestion = 0;
    document.getElementById("questionCard").style.display = "block";
    document.getElementById("endQuiz").style.display = "none";
    document.getElementById("saved-scores").style.display = "none";
    // Timer for quiz
    timerCount = 60;

    // Prevents start button from being clicked when quiz is in progress
    startButton.disabled = true;
    startTimer();
    renderQuiz();
  }


// Event listener added to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);
startButton.setAttribute("style", "padding:10px; margin:10px; font-size:25px;");

