const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplay = document.querySelector(".container__quote-display--text");
const quoteInput = document.querySelector(".container__quote-display--input");
const timerElement = document.querySelector(".container__timer");

quoteInput.addEventListener("input", () => {
  const arrayQuote = document.querySelectorAll(
    ".container__quote-display--text > span"
  );

  let correct = true;
  const arrayValue = quoteInput.value.split("");
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];

    if (character == null) {
      correct = false;
      characterSpan.classList.remove("incorrect");
      characterSpan.classList.remove("correct");
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      correct = false;
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
    }
  });

  if (correct) renderNextQuote();
});

const getRandomQuote = async () => {
  const response = await fetch(RANDOM_QUOTE_API_URL);
  const data = await response.json();
  return data.content;
};

const renderNextQuote = async () => {
  const quote = await getRandomQuote();
  quoteDisplay.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
  startTimer();
};

let startTime;
const startTimer = () => {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerElement.innerText = getTimerTime();
  }, 1000);
};

const getTimerTime = () => {
  return Math.floor((new Date() - startTime) / 1000);
};

renderNextQuote();
