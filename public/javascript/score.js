let heros = JSON.parse(localStorage.getItem('users'));
let divs = document.getElementById('heros');
let arr = [];


let sorted = arr.sort();
const result = heros.filter(hero => hero.score >= sorted[5] || 5);
result.forEach(element => {
    arr.push(element.score) 
});
result.forEach(element => {
    divs.innerHTML+=`<h2>${element.username } : ${element.score}</h2>` 
});