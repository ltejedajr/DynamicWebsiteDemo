"use strict";

window.onload = init;

const jokesContainer = document.getElementById("jokesContainer");
const categoriesSelect = document.getElementById("categoriesSelect");

function init() {
    const showMeTheJokesBtn = document.getElementById("showMeTheJokesBtn");
    showMeTheJokesBtn.onclick = showMeTheJokesBtnClicked;

    popularCategoriesDropdown();

}

function popularCategoriesDropdown() {
    // populate categories with distinct categories from the jokes array
    let categories = getCategoriesArray();

    for (let category of categories) {
        let newOption = new Option(category, category);
        categoriesSelect.appendChild(newOption);
    }


}

function getCategoriesArray() {
    let categories = [];
    for (let dadJoke of jokes.dadJokes) {
        if (categories.includes(dadJoke.category) != true) {
            categories.push(dadJoke.category);
        }
    }

    // now that I have my categories, lets sort them...

    categories.sort();

    return categories;
}

function addJokeToContainer(joke) {
    // {
    //     "id": 1,
    //     "setup": "I'm reading a book on anti-gravity.",
    //     "punchline": "It's impossible to put down!",
    //     "category": "Science"
    //   }


    let accordionItemDiv = document.createElement("div");
    accordionItemDiv.className = "accordion-item";

    jokesContainer.appendChild(accordionItemDiv);

    let accordionHeader = document.createElement("h2");
    accordionHeader.className = "accordion-header";

    accordionItemDiv.appendChild(accordionHeader);

    let btn = document.createElement("button");
    btn.className = "accordion-button collapsed";
    btn.type = "button";
    btn.setAttribute("data-bs-toggle", "collapse");

    let targetId = "flush-collapse-" + joke.id;

    btn.setAttribute("data-bs-target", "#" + targetId);
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", targetId);

    let btnTextNode = document.createTextNode(joke.setup);
    btn.appendChild(btnTextNode);

    accordionHeader.appendChild(btn);

    let flushCollapseDiv = document.createElement("div");
    flushCollapseDiv.id = targetId;
    flushCollapseDiv.className = "accordion-collapse collapse";
    flushCollapseDiv.setAttribute("data-bs-parent", "#jokesContainer");

    let accordionBody = document.createElement("div");
    accordionBody.className = "accordion-body";

    let accordionBodyTextNode = document.createTextNode(joke.punchline);

    accordionBody.appendChild(accordionBodyTextNode);

    flushCollapseDiv.appendChild(accordionBody);

    accordionItemDiv.appendChild(flushCollapseDiv);

}


function showMeTheJokesBtnClicked() {
    jokesContainer.innerHTML = "";
    // identify the selected catergory and loop through and show those jokes

    let selectedCategory = categoriesSelect.value;

    for (let dadJoke of jokes.dadJokes) {
        if (dadJoke.category == selectedCategory) {
            addJokeToContainer(dadJoke);
        }
    }

}