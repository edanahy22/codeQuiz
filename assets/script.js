// Global Variables
var timerElement = document.querySelector(".timer");
var startButton = document.querySelector(".start-button");
var questionDisplay = document.querySelector(".question");
var multOptions = document.querySelector(".options");
// var answerButton = document.getElementById('answers');


var currentQuestion = 0;
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
      timerCount--;
      timerElement.textContent = timerCount;
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        // Allows start button to be pressed again to start new round
        startButton.disabled = false;
        // loseGame();
      }
    }, 1000);
  }

function renderQuiz() {
    questionDisplay.textContent = quizQuestions[currentQuestion].question;
    multOptions.innerHTML="";
    quizQuestions[currentQuestion].answers.forEach(function (answer){
        var answerEl = document.createElement("button");
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
        if (timerCount < 0) {
            timerCount = 0;
        }
    } else {
        currentQuestion++;
        renderQuiz();
        console.log(currentQuestion);
    }
}
 function saveHighscore(){

 }

 function endQuiz(){
     
 }
  // The startQuiz function is called when the start button is clicked
function startQuiz() {
    // Timer for quiz
    timerCount = 60;

    // Prevents start button from being clicked when quiz is in progress
    startButton.disabled = true;
    startTimer();
    renderQuiz();
  }

// Event listener added to start button to call startQuiz function on click
startButton.addEventListener("click", startQuiz);