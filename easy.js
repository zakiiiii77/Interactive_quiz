// Questions and answers data
const questions = [
  {
    question: "What does CPU stand for?",
    answers: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"],
    correctAnswer: "Central Processing Unit",
  },
  {
    question: "What is the binary representation of the number 9?",
    answers: ["1001", "1010", "1100", "1111"],
    correctAnswer: "1001",
  },
  {
    question: "Which programming language is known for its use in web development?",
    answers: ["Python", "Java", "JavaScript", "C++"],
    correctAnswer: "JavaScript",
  },
  {
    question: "What does HTML stand for?",
    answers: ["HyperText Markup Language", "HyperText Modeling Language", "Home Tool Markup Language", "Highly Typed Markup Language"],
    correctAnswer: "HyperText Markup Language",
  },
  {
    question: "What is the purpose of a compiler?",
    answers: ["To convert high-level code into machine code", "To execute code line by line", "To debug code", "To store data"],
    correctAnswer: "To convert high-level code into machine code",
  },
  {
    question: "ُEvery HTML document should have what?",
    answers: ["A head section, and within it a title, followed by a body","A head section, and within it a header, followed by a body","A body and header","None of these"],
    correctAnswer: "A head section, and within it a title, followed by a body",
  },
  {
    question:"A head section is visible to a person viewing the Web page.",
    answers: ["True","False"],
    correctAnswer: "False",
  },
  {
    question:"H1 is a larger size text than H2.",
    answers: ["True","False"],
    correctAnswer: "True",
  },
  {
    question:"Which tag begins a new paragraph?",
    answers: ["pg","pp","Li","p"],
    correctAnswer: "p",
  },
  {
    question:"How would you add the background color yellow?",
    answers: ["background-color:yellow","color addition=background-color:yellow","body style=background-color:yellow;","yellow=color"],
    correctAnswer: "body style=background-color:yellow;",
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