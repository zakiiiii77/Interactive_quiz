// Questions and answers data
const questions = [
  {
    question: "Linear search is also called",
    answers: ["Random Search", "Sequential Search", "Perfect Search", "None"],
    correctAnswer: "Sequential Search",
  },
  {
    question: "Which of the following is correct recurrence for worst case of Binary Search",
    answers: ["T(n) = 2T(n/2) + O(1) and T(1) = T(0) = O(1)", "T(n) = T(n-1) + O(1) and T(1) = T(0) = O(1)", "T(n) = T(n-2) + O(1) and T(1) = T(0) = O(1)", "T(n) = T(n/2) + O(1) and T(1) = T(0) = O(1)"],
    correctAnswer: "T(n) = T(n/2) + O(1) and T(1) = T(0) = O(1)",
  },
  {
    question: "Given a sorted array of integers, what can be the minimum worst-case time complexity to find ceiling of a number x in given array? The ceiling of an element x is the smallest element present in array which is greater than or equal to x. Ceiling is not present if x is greater than the maximum element present in array. For example, if the given array is {12, 67, 90, 100, 300, 399} and x = 95, then the output should be 100.wn for its use in web development?",
    answers: ["O(loglogn)", "O(n)", "O(log(n))", "O(log(n)*log(n))"],
    correctAnswer: "O(log(n))",
  },
  {
    question: "The increasing order of performance  of the searching algorithms are:?",
    answers: ["linear search  <  jump search  <  binary search", "linear search  >  jump search  <  binary search", "linear search  <  jump search  >  binary search", "linear search  >  jump search  >  binary search"],
    correctAnswer: "linear search  <  jump search  <  binary search",
  },
  {
    question: "The average number of key comparisons done in a successful sequential search in a list of length n is",
    answers: ["log n", "(n-1)/2", "n/2", "(n+1)/2"],
    correctAnswer: "(n+1)/2",
  },
  {
    question: "ُWhich of the following is the correct recurrence for the worst case of Ternary Search?",
    answers: ["T(n) = T(n/3) + 4, T(1) = 1","T(n) = T(n/2) + 2,  T(1) = 1","T(n) = T(n + 2) + 2,  T(1) = 1","T(n) = T(n - 2) + 2,  T(1) = 1"],
    correctAnswer: "T(n) = T(n/3) + 4, T(1) = 1",
  },
  {
    question:"Suppose there are 11 items in sorted order in an array. How many searches are required on the average, if binary search is employed and all searches are successful in finding the item?",
    answers: ["3.00","3.46","2.81","3.33"],
    correctAnswer: "3.00",
  },
  {
    question:"The necessary condition for using binary search in an array is :-",
    answers: ["The array should not be too long","The array should of more size","The array should be sorted","None of these"],
    correctAnswer: "The array should be sorted",
  },
  {
    question:"Number of comparisons required for an unsuccessful search of an element in a sequential search, organized, fixed length, symbol table of length L is",
    answers: ["L","L/2","(L+1)/2","2L"],
    correctAnswer: "L",
  },
  {
    question:"What is the time complexity for performing Jump search?",
    answers: ["O(LogN)","O(N)","O(N^2)","O(√N)"],
    correctAnswer: "O(√N)",
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