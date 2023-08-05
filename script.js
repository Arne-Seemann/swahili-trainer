const input = document.querySelectorAll(".input");
const yourLanguageInput = document.getElementById("your-language");
const swahiliInput = document.getElementById("swahili");
const button = document.querySelector(".add");
const vocabList = JSON.parse(localStorage.getItem("Vocabulary")) || [];

button.addEventListener("click", addWord);

function addWord() {
  if (yourLanguageInput.value === "" || swahiliInput.value === "") {
    alert("you must add text to both fields!");
  } else {
    vocabList.push({
      origin: yourLanguageInput.value,
      swahili: swahiliInput.value,
    });
    localStorage.setItem("Vocabulary", JSON.stringify(vocabList));
    createNewWord(vocabList[vocabList.length - 1]);
    yourLanguageInput.value = "";
    swahiliInput.value = "";
  }
}

function createNewWord(element) {
  const newWord = document.createElement("div");
  newWord.className = "item-container";
  newWord.id = element.origin;
  const yourLanguageWord = document.createElement("span");
  const txt = `${element.origin}`;
  yourLanguageWord.append(txt);

  const swahiliWord = document.createElement("span");
  const txt2 = `${element.swahili}`;
  swahiliWord.append(txt2);

  newWord.appendChild(yourLanguageWord);
  newWord.appendChild(swahiliWord);

  document.querySelector(".list-container").appendChild(newWord);
}

function renderList() {
  vocabList.forEach((element) => {
    createNewWord(element);
  });
}

document.querySelector(".switch").addEventListener("click", () => {
  document.querySelector("main").classList.toggle("main-dark");
  document
    .querySelector(".input-container")
    .classList.toggle("input-container-dark");
  document.querySelector("header").classList.toggle("header-dark");
  document.querySelector(".switch").classList.toggle("switch-dark");
});

document.querySelector(".list-container").addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN" && e.target.childElementCount === 0) {
    const popUp = document.createElement("div");
    popUp.className = "popUp";
    const popUpInput = document.createElement("input");
    popUpInput.className = "edit";
    popUpInput.setAttribute("placeholder", "...edit");
    const popUpButtonEdit = document.createElement("button");
    popUpButtonEdit.className = "edit-button";
    popUpButtonEdit.textContent = "Edit";
    popUp.appendChild(popUpButtonEdit);
    const popUpButton = document.createElement("button");
    popUpButton.className = "delete";
    popUpButton.textContent = "delete";

    popUp.appendChild(popUpInput);
    popUp.appendChild(popUpButton);
    e.target.appendChild(popUp);

    const element = e.target;

    popUpButtonEdit.addEventListener("click", () => {
      popUp.parentElement.textContent = popUpInput.value;
    });
    popUpButton.addEventListener("click", () => {
      for (i = 0; i < vocabList.length; i++) {
        if (vocabList[i].origin === element.parentElement.id) {
          vocabList.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("Vocabulary", JSON.stringify(vocabList));
      element.parentElement.remove();
    });
  } else if (e.target.childElementCount > 0) {
    document.querySelector(".popUp").remove();
  }
});

renderList();
