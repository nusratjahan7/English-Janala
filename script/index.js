const createElements = (arr) => {
    console.log(arr);
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    return(htmlElements.join(" "));
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then ((res) => res.json()) // promise of json data
    .then ((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then ((res) => res.json())
    .then ((data) => {
        removeActive(); // remove active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`);     
        clickBtn.classList.add("active");
        displayLevelWord(data.data);
    })
};

// {
//     "word": "Eager",
//     "meaning": "আগ্রহী",
//     "pronunciation": "ইগার",
//     "level": 1,
//     "sentence": "The kids were eager to open their gifts.",
//     "points": 1,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "enthusiastic",
//         "excited",
//         "keen"
//     ],
//     "id": 5
// }

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `<div>
            <h2 class="text-xl font-semibold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class="font-semibold">Meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-semibold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-semibold mb-1">Synonym</h2>
            <div class="">
            ${createElements(word.synonyms)}
            </div>
        </div>`
    document.getElementById("my_modal_5").showModal();
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length === 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-5 items-center">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-[#79716B] text-lg font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-[#292524] text-4xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        return;
    }

    // {
    // "id": 86,
    // "level": 1,
    // "word": "Milk",
    // "meaning": "দুধ",
    // "pronunciation": "মিল্ক"
    // }

    words.forEach((word) => {
        // console.log(word);   
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white space-y-4 rounded-xl shadow-sm text-center py-10 px-5 h-full">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium">Meaning / Pronunciation</p>
            <div class="font-semibold text-2xl font-bangla text-[#57575a]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation  ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onClick="loadWordDetail(${word.id})" class="btn text-[#374957] bg-[#1A91FF20] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i> </button>
                <button onClick=" pronounceWord('${word.word}')" class="btn text-[#374957] bg-[#1A91FF20] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i> </button>
            </div>
        </div>
        `;
        wordContainer.append(card);
        manageSpinner(false);
    });
};

const displayLesson = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    // 2. get into lessons
    for (let lesson of lessons){
        // console.log(lesson);
        // 3. create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `
        // 4. append into container
        levelContainer.appendChild(btnDiv);
    }
};
loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
        // console.log(allWords);
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
        // console.log(filterWords);
        displayLevelWord(filterWords);
    });
});