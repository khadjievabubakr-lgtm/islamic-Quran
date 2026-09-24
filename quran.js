var surahList = document.getElementById("surahList");
var search = document.getElementById("search");
var loading = document.getElementById("loading");

var allSurahs = [];

fetch("https://api.alquran.cloud/v1/surah")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        allSurahs = data.data;

        loading.style.display = "none";

        showSurahs(allSurahs);
    })
    .catch(function(error) {

        loading.textContent =
            "Не удалось загрузить суры. Проверь интернет.";

        loading.className = "error";

        console.log(error);
    });


function showSurahs(surahs) {

    surahList.innerHTML = "";

    surahs.forEach(function(surah) {

        var card = document.createElement("div");

        card.className = "surah-card";


        var number = document.createElement("div");
        number.className = "surah-number";
        number.textContent = surah.number;


        var info = document.createElement("div");
        info.className = "surah-info";


        var name = document.createElement("div");
        name.className = "surah-name";
        name.textContent = surah.englishName;


        var meaning = document.createElement("div");
        meaning.className = "surah-meaning";
        meaning.textContent =
            surah.englishNameTranslation;


        var arabic = document.createElement("div");
        arabic.className = "surah-arabic";
        arabic.textContent = surah.name;


        info.appendChild(name);
        info.appendChild(meaning);

        card.appendChild(number);
        card.appendChild(info);
        card.appendChild(arabic);


        card.onclick = function() {
            openSurah(surah.number);
        };


        surahList.appendChild(card);
    });
}


search.addEventListener("input", function() {

    var text = search.value.toLowerCase();

    var filtered = allSurahs.filter(function(surah) {

        return (
            surah.name.toLowerCase().includes(text) ||
            surah.englishName.toLowerCase().includes(text) ||
            surah.englishNameTranslation
                .toLowerCase()
                .includes(text)
        );

    });

    showSurahs(filtered);
});


function openSurah(number) {

    window.location.href =
        "surah.html?number=" + number;
}