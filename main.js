import "gardevoir";
import "./style.css";

let a = "";
let b = "";
let sign = "";
let isFinished = false;

const MAX_INT_LENGTH = 12;

// prettier-ignore
const digits = [
  "7", "8", "9",
  "4", "5", "6",
  "1", "2", "3",
  "0", ".",
]

const operations = ["*", "-", "+", "/"];

const actions = {
  clear: "C",
  equals: "=",
};

const scoreboard = document.querySelector(".scoreboard");
const buttons = document.querySelector(".buttons");

function clearAll(content = 0) {
  a = "";
  b = "";
  sign = "";
  isFinished = false;
  scoreboard.textContent = content;
}

buttons.addEventListener("click", (evt) => {
  if (!evt.target.classList.contains("btn")) return;

  const key = evt.target.textContent;

  switch (key) {
    case actions.clear:
      clearAll();
      break;
    case actions.equals:
      if (b === "") b = a;

      const numberA = Number(a);
      const numberB = Number(b);
      let result = null;

      switch (sign) {
        case "*":
          result = numberA * numberB;
          break;
        case "-":
          result = numberA - numberB;
          break;
        case "+":
          result = numberA + numberB;
          break;
        case "/":
          if ([numberA, numberB].includes(0)) {
            clearAll("Ошибка");
          } else {
            result = numberA / numberB;
          }
          break;
      }
      if (!Number.isNaN(result) && result !== null) {
        a = String(result);
        scoreboard.textContent = a;
      }
      isFinished = true;

      console.log(a, b, sign);
  }

  if (digits.includes(key)) {
    if (sign === "" && b === "") {
      if (a.length < MAX_INT_LENGTH) a += key;
      scoreboard.textContent = a;
    } else if (a !== "" && b !== "" && isFinished) {
      b = key;
      isFinished = false;
      scoreboard.textContent = b;
    } else {
      if (b.length < MAX_INT_LENGTH) b += key;
      scoreboard.textContent = b;
    }
    console.log(a, b, sign);
  }

  if (operations.includes(key)) {
    sign = key;
    scoreboard.textContent = sign;
  }
});
