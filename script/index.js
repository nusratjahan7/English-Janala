const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then ((res) => res.json()) // promise of json data
    .then ((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then ((res) => res.json())
    .then ((data) => displayLevelWord(data.data))
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    // {
    // "id": 86,
    // "level": 1,
    // "word": "Milk",
    // "meaning": "দুধ",
    // "pronunciation": "মিল্ক"
    // }

    words.forEach((word) => {
        console.log(word);   
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white space-y-4 rounded-xl shadow-sm text-center py-10 px-5">
            <h2 class="font-bold text-2xl">${word.word}</h2>
            <p class="font-medium">Meaning / Pronunciation</p>
            <div class="font-semibold text-2xl font-bangla text-[#57575a]">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="btn text-[#374957] bg-[#1A91FF20] hover:bg-[#1A91FF70]"><i class="fa-solid fa-circle-info"></i> </button>
                <button class="btn text-[#374957] bg-[#1A91FF20] hover:bg-[#1A91FF70]"><i class="fa-solid fa-volume-high"></i> </button>
            </div>
        </div>
        `;
        wordContainer.append(card)
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
        <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `
        // 4. append into container
        levelContainer.appendChild(btnDiv);
    }
};
loadLessons();