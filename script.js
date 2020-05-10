const question = document.querySelector(".question");
const quesNumber = document.querySelector(".ques-num-value");
const totalQues = document.querySelector(".total-ques");
const totalQues2 = document.querySelector(".total-ques2");
const correctAnswers = document.querySelector(".correct-answer");
const percentage = document.querySelector(".percentage");
const options = document.querySelector(".options").children;
const answerPanel = document.querySelector(".answer-tracker");
const op1 = document.querySelector(".option1");
const op2 = document.querySelector(".option2");
const op3 = document.querySelector(".option3");
const op4 = document.querySelector(".option4");
let questionIndex;
let index = 0;
let myArray = [];
let myArr = [];
let score = 0;

// Assigning questions, options and correct answer
const questions = [
  {
    q: 'Capital of Sri Lanka',
    opt: ['Colombo', 'Jaffna', 'Kandy', 'Gampaha'],
    result: 0
  },
  {
      q: 'President of Sri Lanka',
      opt: ['Mahinda','Gottabaya','Ranil','Sajith'],
      result:1
  }, 
  {
      q: 'Captain of Indian cricket team',
      opt: ['Ganguly','Kohli','Dhoni','Rohit'],
      result:1
  },
  {
      q:'Leading Run scorer in World Cricket',
      opt: ['Kohli','Lara','Ponting','Sachin'],
      result:3
  },
  {
      q:'Founder of Microsoft',
      opt: ['Mark Zuckerberk','Bill Gates','Osama Binledan','Dorick Wilson'],
      result:1
  },
  {
      q:'The latest pandemic situation in the world',
      opt:['COVID-19','AH1NI','HIV','Ebola'],
      result:0
  }
];

// Chech for the right option selected
function check(element){
    if(element.id == questions[questionIndex].result){
        element.classList.add("correct");
        updateAnswerTracker("correct")
        score++;
    }
    else{
        element.classList.add("wrong");
        updateAnswerTracker("wrong")
    }
    disableOptions();

}

// Disable the options after user clicked one option for a question
function disableOptions(){
    for(let i=0; i<options.length; i++){
        options[i].classList.add("disabled");
        if(options[i].id == questions[questionIndex].result){
            options[i].classList.add("correct");
        }
    }
}

// Enable the four options when passing from one question to another
function enableOptions(){
    for(let i=0; i<options.length; i++){
        options[i].classList.remove('disabled','correct','wrong');
    }
}

// Show the enough number of answer tracking circles
function answerTracker(){
    for(let i=0; i<questions.length; i++){
        const divv = document.createElement("div");
            answerPanel.appendChild(divv);
    }
}

// Check whether an option is selected or not before going to next question
function Validate(){
    if(!options[0].classList.contains("disabled")){
        alert("Please select one option");
    }
    else{
        randomNumber();
        enableOptions();
    }
}

// Going to the next question
function next(){
    Validate();
}

// displaying question number, total no.of questions, question and four options
totalQues.innerHTML = questions.length;
function load(){
    quesNumber.innerHTML = index+1;
    question.innerHTML = questions[questionIndex].q;
    op1.innerHTML = questions[questionIndex].opt[0];
    op2.innerHTML = questions[questionIndex].opt[1];
    op3.innerHTML = questions[questionIndex].opt[2];
    op4.innerHTML = questions[questionIndex].opt[3];
    index++;
}

// Generate a random question and also check whether the quiz ended or not
function randomNumber(){
    let randomNum = Math.floor(Math.random()*questions.length);
    let duplicate = 0;
    if(index==questions.length){
        console.log("Quiz");
        quizOver();
    }
    else{
        if(myArray.length>0){
            for(let i=0;i<myArray.length;i++){
                if(myArray[i]==randomNum){
                    duplicate = 1;
                    break;
                }
            }
            if(duplicate==1){
                randomNumber();
            }
            else{
                questionIndex = randomNum;
                load();
                myArr.push(questionIndex);
            }
        }
        if(myArray.length==0){
            questionIndex = randomNum;
            load();
            myArr.push(questionIndex);
        }
            myArray.push(questionIndex);
    }

}

// Update the answer tracker circles with correct or wrong
function updateAnswerTracker(classNam){
    answerPanel.children[index-1].classList.add(classNam);
}

// validate whether the quiz is over or not
function quizOver(){
    document.querySelector(".quiz-over").classList.add("show");
    correctAnswers.innerHTML = score;
    totalQues2.innerHTML = questions.length;
    percentage.innerHTML = Math.round((score/questions.length)*100);
}

// Try again button in scorecard
function tryAgain(){
    window.location.reload();   // Redirect to the same page and also will reload it
}

// default function which will be called automatically in the webpage
window.onload = function(){
    randomNumber();
    answerTracker();
}