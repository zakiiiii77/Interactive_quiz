// Questions and answers data
const questions = [
  {
    question: "Javascript is an _______ language?",
    answers: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
    correctAnswer: "Object_Oriented",
  },
  {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    answers: ["var", "let", "Both A and B", "None of the above"],
    correctAnswer: "Both A and B",
  },
  {
    question: "Which of the following methods is used to access HTML elements using Javascript? language is known for its use in web development?",
    answers: ["getElementByID()", "getElementByClassName()", "Both A and B", "None of the above"],
    correctAnswer: "Both A and B",
  },
  {
    question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
    answers: ["Throws an error", "Ignores the statements", "Gives a warning", "None of the above"],
    correctAnswer: "Ignores the statements",
  },
  {
    question: "Which of the following methods can be used to display data in some form using Javascript?",
    answers: ["document.write()", "console.log()", "window.alert()", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    question: "ُWhat will be the output of the following code snippet? var a = true + true + true * 3; print(a)",
    answers: ["3","0","error","5"],
    correctAnswer: "5",
  },
  {
    question:"What is the output of the following code snippet?   print(NaN === NaN);",
    answers: ["true","false","undefined", "error"],
    correctAnswer: "false",
  },
  {
    question:"What will be the output of the following code snippet?   print(typeof(NaN));",
    answers: ["Object","Number", "String", "None of the above"],
    correctAnswer: "Number",
  },
  {
    question:"The process in which an object or data structure is translated into a format suitable for transferral over a network, or storage is called?",
    answers: ["Object Serialization","Object Encapsulation","Object Inheritance","None of the above"],
    correctAnswer: "Object Serialization",
  },
  {
    question:"Which function is used to serialize an object into a JSON string in Javascript?",
    answers: ["stringify()","parse()","convert()","None of the above"],
    correctAnswer: "stringify",
  },
  // Add more questions here...
];

  
let score = 0;
let currentQuestionIndex = 0;

function displayQuestion() {
  const quizContainer = document.getElementById('quiz-container');

  // Check if there are more questions to display
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    const questionHTML = `
    <div class="question">
        <div class="questioan"><h2>Question ${currentQuestionIndex + 1} of ${questions.length}</h2></div>
        <p class="current">${currentQuestion.question}</p>
        <form>
            ${currentQuestion.answers
            .map(
                (answer, index) =>
                `<div class="choice">
                <input type="radio" name="option" id="option${index}" value="${answer}">
                <label for="option${index}">${answer}</label><br>
                </div>`
            )
            .join('')}
        </form>
        <div class="buttons">
          <button onclick="checkAnswer()">Next</button>
          <button onclick="previousQuestion()">Previous</button>
          <button onclick="skipQuestion()">Skip</button>
        </div>
    </div>
  `;

    // Update the quiz container with the current question and answer options
    quizContainer.innerHTML = questionHTML;
  } else {
    // If all questions are answered, show the final score
    showFinalScore();
  }
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (userAnswer === correctAnswer) {
      score++; // Increase score if the answer is correct
    }

    // Move to the next question
    currentQuestionIndex++;

    // Clear the selected option for the next question
    selectedOption.checked = false;

    // Display the next question or show the final score
    displayQuestion();
  } else {
    alert('Please select an answer or use the Skip button to move to the next question.');
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      displayQuestion();
  }
}

function skipQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

function showFinalScore() {
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.createElement('div');
  resultContainer.innerHTML = `
    <div class="result">
      <h2>Quiz Completed!</h2>
      <p>Your final score: ${score} out of ${questions.length}</p>
    </div>
  `;
  clearInterval(timer);
  quizContainer.innerHTML = '';
  quizContainer.appendChild(resultContainer);

            // Draw the chart and set the chart value
            function drawChart() {
              // Calculate the correct and wrong answers
              const correctAnswers = score;
              const wrongAnswers = questions.length - score;
      
              // Create a data table for the pie chart
              const data = new google.visualization.DataTable();
              data.addColumn('string', 'Answers');
              data.addColumn('number', 'Count');
              data.addRows([
                  ['Correct Answers', correctAnswers],
                  ['Wrong Answers', wrongAnswers]
              ]);
      
              // Set options for the pie chart
              const options = {
                  title: 'Answers Summary',
                  width: 550,
                  height: 400
              };
      
              // Create and draw the pie chart
              const chart = new google.visualization.PieChart(document.getElementById('piechart'));
              chart.draw(data, options);
          }
  drawChart();

}

// timer
let timer;
function startTimer() {
timer = setInterval(() => {
  if(timeLeft > 0) {
      timeLeft--;
      document.getElementById("timer").innerHTML = formatTime(timeLeft);
  }
  else {
      clearInterval(timer);
      submitform();
  }
}, 1000);
}

function formatTime(time){
let minutes = Math.floor(time/60);

let seconds = time % 60;

seconds = seconds < 10 ? '0' + seconds : seconds;

return minutes + ":" + seconds;
}

function submitform(){
document.getElementById("quiz-container").submit();
}


// Start the quiz when the page loads


document.addEventListener('DOMContentLoaded', function() {
  displayQuestion();
  startTimer();

      // Load Google Charts library
      google.charts.load('current', {'packages': ['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      


});