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

    if (words.length === 0){
        wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-5 items-center">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-[#79716B] text-lg font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-[#292524] text-4xl font-semibold font-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        
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
        console.log(word);   
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-white space-y-4 rounded-xl shadow-sm text-center py-10 px-5 h-full">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium">Meaning / Pronunciation</p>
            <div class="font-semibold text-2xl font-bangla text-[#57575a]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation  ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
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