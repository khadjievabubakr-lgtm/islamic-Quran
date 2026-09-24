var prayers = [
    { name: "Фаджр", time: "05:26" },
    { name: "Восход", time: "06:57" },
    { name: "Зухр", time: "13:30" },
    { name: "Аср", time: "17:18" },
    { name: "Магриб", time: "19:11" },
    { name: "Иша", time: "20:24" }
];

function updateSite() {

    var now = new Date();

    // Часы
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    var clockH = h < 10 ? "0" + h : h;
    var clockM = m < 10 ? "0" + m : m;
    var clockS = s < 10 ? "0" + s : s;

    document.getElementById("clock").textContent =
        clockH + ":" + clockM + ":" + clockS;


    // Дата
    var date = now.toLocaleDateString("ru-RU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    date = date.charAt(0).toUpperCase() + date.slice(1);

    document.getElementById("date").textContent = date;


    // Ищем следующий намаз
    var currentMinutes = h * 60 + m + s / 60;

    var next = null;

    for (var i = 0; i < prayers.length; i++) {

        var parts = prayers[i].time.split(":");

        var prayerMinutes =
            Number(parts[0]) * 60 +
            Number(parts[1]);

        if (prayerMinutes > currentMinutes) {
            next = prayers[i];
            break;
        }
    }


    // Если сегодня все намазы закончились
    if (next === null) {
        next = prayers[0];
    }


    // Показываем следующий намаз
    document.getElementById("nextPrayerName").textContent =
        next.name;

    document.getElementById("nextPrayerTime").textContent =
        next.time;


    // Время следующего намаза
    var parts = next.time.split(":");

    var target = new Date();

    target.setHours(
        Number(parts[0]),
        Number(parts[1]),
        0,
        0
    );


    // Если Фаджр уже прошёл — он завтра
    if (next === prayers[0] && currentMinutes >= 20 * 60 + 24) {
        target.setDate(target.getDate() + 1);
    }


    // Разница
    var difference = target.getTime() - now.getTime();

    if (difference < 0) {
        difference = difference + 24 * 60 * 60 * 1000;
    }


    var countdownHours =
        Math.floor(difference / 3600000);

    var countdownMinutes =
        Math.floor((difference % 3600000) / 60000);

    var countdownSeconds =
        Math.floor((difference % 60000) / 1000);


    if (countdownHours < 10) {
        countdownHours = "0" + countdownHours;
    }

    if (countdownMinutes < 10) {
        countdownMinutes = "0" + countdownMinutes;
    }

    if (countdownSeconds < 10) {
        countdownSeconds = "0" + countdownSeconds;
    }


    document.getElementById("countdown").textContent =
        countdownHours + ":" +
        countdownMinutes + ":" +
        countdownSeconds;
}


// Запускаем
updateSite();

setInterval(updateSite, 1000);