let timer = null;
let timeLeft = 0;


// document.getElementById("start").addEventListener("click", () => {
//   const task = document.getElementById("task").value;
//   const time = parseInt(document.getElementById("time").value) * 60;

//   if (task && time) {
//     startTimer(time);
//   } else {
//     alert("Por favor, complete todos los campos");
//   }
// });

document.getElementById("start").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  startBreakTimer(25 * 60);
});


document.getElementById("break").addEventListener("click", () => {
  clearInterval(timer); 
  timer = null;
  startBreakTimer(5 * 60); 
});

document.getElementById("long").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  startlong(15 * 60);

});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  timeLeft = 0;
  updateTimerDisplay();
});

function startTimer(totalTime) {
  timeLeft = totalTime;
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      playSound();
      alert("Tiempo Concluido");
    }
  }, 1000);
}


function startBreakTimer(totalTime) {
  timeLeft = totalTime;
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      playSound();
      alert("Break time is over!");
    }
  }, 1000);
}


function startlong(totalTime) {
  timeLeft = totalTime;
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timer);
      timer = null;
      playSound();
      alert("Long time is over!");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer-display").textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function playSound() {
  const audio = new Audio("timbre.mp3");
  audio.play();
}

const input = document.querySelector("input");
const addBtn = document.querySelector(".btn-add");
const p = document.querySelector("p");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const text = input.value;

  if (text !== "") {
    p.textContent += text + "\n";
    p.style.fontWeight = "bold";
    p.appendChild(addDeleteBtn()); 
    input.value = "";
    empty.style.display = "none";
  }
});


function addDeleteBtn() {
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "Close";
  deleteBtn.className = "btn btn-sm btn-danger"; 

  deleteBtn.addEventListener("click", (e) => {
    p.textContent = ""; 
    empty.style.display = "block";
  });

  return deleteBtn;
}
