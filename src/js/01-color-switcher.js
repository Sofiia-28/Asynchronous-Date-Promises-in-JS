const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerId = null;

startBtn.addEventListener("click", changeColor);
function changeColor(event) {
    timerId = setInterval(() => {
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
          };
          document.body.style.backgroundColor = getRandomHexColor();
          startBtn.setAttribute('disabled', '');
      }, 1000);
}

stopBtn.addEventListener("click", stopChangeColor);
function stopChangeColor(event) {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled', '');
}

 