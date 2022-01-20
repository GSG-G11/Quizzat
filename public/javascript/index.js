let btn = document.getElementById('next');
let username = window.location.search.substr(1).split("=")[1];
let temp = JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [];
let arr = [...temp];
let p = document.getElementById('question');
let question = 0;
let questions = [
    {
        question: 'what is my name?',
        a: 'saleh',
        b: 'sophi',
        c: 'sohail',
        d: 'ismail',
        correct_answer: 'a'
    }, {
        question: 'what is my last name?',
        a: 'marouf',
        b: 'monther',
        c: 'rayyan',
        d: 'al ashqar',
        correct_answer: 'a'
    }, {
        question: 'what is my tall?',
        a: '160',
        b: '190',
        c: '180',
        d: '120',
        correct_answer: 'c'
    }, {
        question: 'what is my age?',
        a: '20',
        b: '33',
        c: '27',
        d: '23',
        correct_answer: 'd'
    },
];
let result = 0;


renderQuestion(questions[question], question);

btn.addEventListener('click', (e) => {
    e.preventDefault();
    p.innerHTML = ' ';
    if (question < questions.length-1) {
        renderQuestion(questions[question+1], question+1);
        document.getElementById('next').setAttribute('disabled' , true)
        let btns = document.getElementsByClassName('answer');
        corrector(btns, questions[question+1]);
        question++

    } else {
        renderResult(p, username, result);
        arr.push({ username: username, score: result })
        localStorage.setItem("users", JSON.stringify(arr));
        question = 0;
        result = 0;
    }
});
let ans = document.getElementsByClassName('answer');
for (let i = 0; i < ans.length; i++) {
    ans[i].addEventListener('change', (e) => {
        console.log("dfsfsd",e.target.value)
        document.getElementById('next').removeAttribute('disabled')
    });
}

function renderQuestion(question, index) {
    p.innerHTML += ` <h1 class="question"> Q${index + 1}: ${question.question} </h1>
    <form>
 <div class="select">
    <input  type="radio" name="ans" class="answer" id="${question.a}" value="a">${question.a} 
 </div>
 <div class="select">
    <input type="radio" name="ans" class="answer" id="${question.b}" value="b">${question.b} 
  </div>
  <div class="select">
    <input type="radio" name="ans" class="answer" id="${question.c}" value="c">${question.c} 
   </div>
   <div class="select"> 
    <input type="radio" name="ans" class="answer" id="${question.d}" value="d">${question.d} 
   </div>
   </form>
`;
}

function corrector(radios, qustion) {
    let l = radios.length;
    for (let i = 0; i < l; i++) {
        console.log(radios[i].checked);
        radios[i].addEventListener('click', (e) => {
                document.getElementById('next').removeAttribute('disabled')
            if (e.target.value === qustion.correct_answer) {
                result += 1
            } else {
                console.log(false);
            }

        })
    }
}
function renderResult(p, username, result) {
    if (result > 5) {
        p.innerHTML = `
           <div class="col-1">
            <h1 class="header">Oh God..!</h1>
            <h2 class="sub-header">You are So genius..!</h2>
            <h1 class="header"> ${username}'s result ${result} </h1>
            <a href="./high-score">see high scorre</a>
        </div>
        `;
    }
    else {
        p.innerHTML = `
           <div class="col-1">
            <h1 class="header">Oh No..!</h1>
            <h2 class="sub-header">You are So stupid..!</h2>
            <h1 class="header"> ${username}'s result ${result} </h1>
             <h2 class="sub-header">try again!</h2>
             <a href="./high-score.html">see high scorre</a>
        </div>
        `;
    }
}
function highScore(element) {
    console.log(JSON.parse(localStorage.getItem('users')).length)
    element.innerHTML = JSON.parse(localStorage.getItem('users')).toString() || [];

}