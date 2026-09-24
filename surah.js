var params = new URLSearchParams(
    window.location.search
);

var surahNumber =
    params.get("number");


var surahName =
    document.getElementById("surahName");

var surahInfo =
    document.getElementById("surahInfo");

var verses =
    document.getElementById("verses");


if (!surahNumber) {

    surahName.textContent =
        "Сура не найдена";

    verses.innerHTML =
        "<p>Выберите суру из списка.</p>";

} else {

    loadSurah();
}


function loadSurah() {

    fetch(
        "https://api.alquran.cloud/v1/surah/" +
        surahNumber
    )

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        var surah =
            data.data;


        surahName.textContent =
            surah.name;


        surahInfo.textContent =
            surah.englishName +
            " • " +
            surah.numberOfAyahs +
            " аятов";


        verses.innerHTML = "";


        surah.ayahs.forEach(
            function(ayah) {

                var card =
                    document.createElement("div");

                card.className =
                    "ayah";


                var number =
                    document.createElement("div");

                number.className =
                    "ayah-number";

                number.textContent =
                    ayah.numberInSurah;


                var text =
                    document.createElement("div");

                text.className =
                    "ayah-text";

                text.textContent =
                    ayah.text;


                card.appendChild(number);

                card.appendChild(text);

                verses.appendChild(card);

            }
        );

    })

    .catch(function(error) {

        verses.innerHTML =
            "<p class='error'>" +
            "Не удалось загрузить Коран. " +
            "Проверь интернет." +
            "</p>";

        console.log(error);

    });
}