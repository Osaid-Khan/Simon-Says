let body = document.querySelector("body");
let h2 = document.querySelector("h2");
let h1 = document.querySelector("h1");
let allBtns = document.querySelectorAll(".btn");
let high = document.createElement("h4");
high.innerText = "High Score : 0";
let highScore = [];
let started = true;
h1.append(high);
body.addEventListener("keydown", function () {
    if (started) {
        levelUp();
    }
    started = false;
});

let gameSeq = [];
let userSeq = [];
let gameLevel = 0;



function checkSequence(i){
  if (userSeq[i] == gameSeq[i]){
    if(i == gameSeq.length - 1){
        setTimeout(levelUp, 1000);
    }
  }
  else{
    h2.innerHTML = `Game Over!! Your score was <b>${gameLevel}</b> <br>Press any key to continue`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(()=>{
        document.querySelector("body").style.backgroundColor = "white"
    },150)
    highScore.push(gameLevel);
    let Hscore = Math.max(...highScore);
    high.innerText = `High Score : ${Hscore}`;
    reset();
    
  }
}


function levelUp(){
    userSeq = [];
    gameLevel++;
    h2.innerText = `Level ${gameLevel}`;
    let random = generateRandom();
    gameSeq.push(random);
    flashButton(random);
    for(btn of allBtns){
        btn.addEventListener("click", btnPress);
    }
}

function generateRandom() {
    return Math.floor(Math.random() * 4);
}

function transitionColor(original, element) {
    element.style.backgroundColor = "white";
    setTimeout(() => {
        element.style.backgroundColor = original;
    }, 250)
}

function flashButton(a) {
    if (a == 0) {
        transitionColor("#d95980", allBtns[a]);
    } else if (a == 1) {
        transitionColor("#f99b45",allBtns[a]);

    } else if (a == 2) {
        transitionColor("#63aac0",allBtns[a])
    } else {
        transitionColor("#819ff9",allBtns[a]);
    }


}

function btnPress(){
    let a;
    if (this.classList.contains("red")){
        a = 0;
    } else if (this.classList.contains("yellow")){
        a = 1;
    }else if (this.classList.contains("green")){
        a = 2;
    }else{
        a = 3;
    }
    flashButton(a);
    userSeq.push(a);
    checkSequence(userSeq.length-1);

}

function reset(){
    started = true;
    for(btn of allBtns){
        
        btn.removeEventListener("click", btnPress);
    }
    gameSeq = [];
    userSeq = [];
    gameLevel = 0;

}
