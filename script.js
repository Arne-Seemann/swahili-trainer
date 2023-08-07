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
  yourLanguageWord.setAttribute("tabindex", "0");

  const swahiliWord = document.createElement("span");
  const txt2 = `${element.swahili}`;
  swahiliWord.append(txt2);
  swahiliWord.setAttribute("tabindex", "0");

  newWord.appendChild(yourLanguageWord);
  newWord.appendChild(swahiliWord);

  document.querySelector(".list-container").appendChild(newWord);

  createPopUp(yourLanguageWord);
  createPopUp(swahiliWord);
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
  document
    .querySelector(".dropdown-menu")
    .classList.toggle("dropdown-menu-dark");
});

function createPopUp(word) {
  const popUp = document.createElement("div");
  popUp.className = "popUp";
  const InputEdit = document.createElement("input");
  InputEdit.className = "edit";
  InputEdit.setAttribute("placeholder", "...edit");
  const buttonEdit = document.createElement("button");
  buttonEdit.className = "edit-button";
  buttonEdit.textContent = "Edit";
  buttonEdit.addEventListener("click", (e) => {
    e.stopPropagation();
    const Word = popUp.parentElement;
    const txtNode = Word.childNodes[0];
    txtNode.nodeValue = InputEdit.value;
    InputEdit.value = "";
  });

  const buttonDelete = document.createElement("button");
  buttonDelete.className = "delete-button";
  buttonDelete.textContent = "Delete";
  buttonDelete.addEventListener("click", () => {
    const Word = popUp.parentElement;
    for (i = 0; i < vocabList.length; i++) {
      if (Word.parentElement.id === vocabList[i].origin) {
        Word.parentElement.remove();
        vocabList.splice(i, 1);
        localStorage.setItem("Vocabulary", JSON.stringify(vocabList));
        break;
      }
    }
  });

  popUp.appendChild(InputEdit);
  popUp.appendChild(buttonEdit);
  popUp.appendChild(buttonDelete);
  word.appendChild(popUp);
}

document.addEventListener("click", (e) => {
  if (e.target.matches("[data-dropdown-button]")) {
    e.target.closest("[data-dropdown]").classList.toggle("focus");
  }
  const dropdowns = document.querySelectorAll("[data-dropdown]");
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("focus");
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    e.target.classList.toggle("active");
  }
  const isPopUp = e.target.matches(".popUp");
  if (isPopUp) return;

  const popUps = document.querySelectorAll(".popUp");
  popUps.forEach((popUp) => {
    if (!popUp.parentElement.contains(e.target)) {
      popUp.parentElement.classList.remove("active");
    }
  });
});

renderList();
