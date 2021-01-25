// буквы подобраны таким образом, чтобы как можно чаще встречались слова, которае их содержат
let symbol = ['е', 'н', 'и', 'о', 'в', 'р', 'а'];
let resolution = 1; // параметр, если равен единице, можно выбирать слова, если нет (после проверки) - слова выбирать нельзя
let trygame = 0; // количество попыток
let mistake = 0;
let timer;
let windowIndex;

let position = [];
let container = document.getElementById('container');
let symid = document.getElementById('symbol');
let addbut = document.getElementById('button-box');

let userName = localStorage.getItem('userNameImportantField');
let styleGame = localStorage.getItem('styleImportantField');

// цвет темы
if (styleGame == 1) {
    document.getElementById('body').style.backgroundImage = 'url(' + 'картинки/mainDarckLvl.png' + ')';
} else {
    document.getElementById('body').style.backgroundImage = 'url(' + 'картинки/mainLightLvl.png' + ')';
}

function showWords() {
    if (trygame > 2 || resolution == 0) {
        return;
    }
    trygame++;
    StartTimer();
    resolution = 1;
    mistake = 0;
    position = [];
    choose = [];
    for (let i = 0; i < text.length; i++) {
        position[i] = i;
    }
    let N = position.length;
    for (let i = N - 1; i > 0; i--) {
        let rnd = Math.floor(Math.random() * (N));
        if (rnd != i) {
            t = position[i];
            position[i] = position[rnd];
            position[rnd] = t;
        }
    }
    if (trygame == 1) {
        createWords();
    }
    chooseSymbol();
    createOneWord();
    let rnd = Math.floor(Math.random() * (12));
    for (let i = 0; i < 12; i++) {
        let elem = document.getElementById('word' + (i + 1));
        elem.style.backgroundColor = "#ffffff";
        elem.style.color = "#000000";
        if (position[i] == windowIndex) {
            let t = position[i];
            position[i] = position[i + 1];
            position[i + 1] = t;
        }
        if (i == rnd) {
            position[i] = windowIndex;
        }
        elem.innerHTML = text[position[i]];
    }
    container.style.opacity = 100;
}

function createWords() {
    let box = document.getElementById('box');
    for (let i = 0; i < 12; i++) {
        let words = document.createElement('div');
        words.className = 'word';
        words.id = 'word' + (i + 1);
        box.appendChild(words);
    }
}

function chooseSymbol() {
    let rnd;
    rnd = Math.floor(Math.random() * (symbol.length));
    symid.innerHTML = symbol[rnd];
}

function createOneWord() {
    for (let i = 0; i < text.length; i++) {
        if (text[i].indexOf(symid.innerHTML) != -1) {
            windowIndex = i;
            break;
        }
    }
}

function checkWords() {
    if (resolution == 0) {
        return;
    }
    if (container.style.opacity != 100) {
        alert("Сначала начните игру!");
        return;
    }
    localStorage.setItem('startGameImportantField', 1);
    StopTimer();
    countWords();
    resolution = 0;
    if (mistake == 0) {
        nextLvl();
    } else {
        backMain();
    }
}

function countWords() {
    let lost = []; // массив слов, которые не были найдены
    let extra = []; // массив слов, которые не должны быть найдены 
    let find = symid.innerHTML;
    let result = [];
    for (let i = 0; i < 12; i++) { // проходимся только по словам, которые выведены на экран!!!
        if (text[position[i]].indexOf(find) != -1) {
            result.push(i + 1); // так как нумерация div идет с 1
        }
    }
    lost = diff(result, choose);
    extra = diff(choose, result);
    colorGreen();
    if (lost.length > 0) {
        colorRed(lost);
        mistake = 1;
    }
    if (extra.length > 0) {
        colorRed(extra);
        mistake = 1;
    }
    countResult();

    function diff(a, b) {
        return a.filter(function(i) { return b.indexOf(i) < 0; });
    };

    function colorGreen() {
        for (let i = 0; i < choose.length; i++) {
            let chooseword = choose[i];
            for (let j = 0; j < result.length; j++) {
                if (chooseword == result[j]) {
                    // меняем цвет правильных элементов
                    document.getElementById('word' + (choose[i])).style.backgroundColor = '#43a047';
                    document.getElementById('word' + (choose[i])).style.color = '#ffffff';
                }
            }
        }
    }

    function colorRed(array) {
        for (let i = 0; i < array.length; i++) {
            // меняем цвет неправильных элементов
            document.getElementById('word' + array[i]).style.backgroundColor = '#f44336';
            document.getElementById('word' + array[i]).style.color = '#ffffff';
        }
    }

    function countResult() {
        let maxscore;
        if (trygame == 1) {
            maxscore = 20;
        }
        if (trygame == 2) {
            maxscore = 10;
        }
        if (trygame == 3) {
            maxscore = 5;
        }
        let countresult;
        countresult = (12 - extra.length - lost.length) / 12 * maxscore;
        localStorage.setItem(userName + "1", countresult);
    }
}

function nextLvl() {
    if (document.getElementById('next') != null) {
        return;
    }
    let butnextlvl = document.createElement('button');
    butnextlvl.innerHTML = 'Следующий уровень';
    butnextlvl.id = "next";
    butnextlvl.onclick = function() {
        localStorage.setItem('startGameImportantField', 0);
        window.location.href = 'page2.html';
    }
    addbut.appendChild(butnextlvl);
}

function backMain() {
    if (document.getElementById('next') != null) {
        return;
    }
    let butScore = document.createElement('button');
    butScore.innerHTML = 'Таблица результатов';
    butScore.onclick = function() {
        window.location.href = 'page4.html';
    }
    addbut.appendChild(butScore);
    setTimeout(() => alert("Увы, вы проиграли. Можно вернуться на главную страницу, чтобы начать сначала"), 500);
}

function StartTimer() {
    let userInput = 90;
    userInput++;
    let time = userInput;
    if (typeof(timer) != "undefined") {
        timer.stop();
    }
    timer = new Timer('timer', time);
    timer.start();
}

function StopTimer() {
    timer.stop();
}

function Timer(selector, time) {
    let elem = document.getElementById(selector);
    let timer = 0;
    let object = this;

    this.start = function() {
        timer = setInterval(object.tick, 1000);
    }

    this.stop = function() {
        clearInterval(timer);
    }

    this.tick = function() {
        if (time > 0) {
            time--;
            let minutes = Math.floor(time / 60);
            let seconds = time - minutes * 60;
            let text;
            if (minutes == 0) {
                text = minutes + seconds + ' секунд';
            } else {
                text = minutes + ' минута ' + seconds + ' секунд';
            }
            elem.innerHTML = text;
        } else {
            object.stop();
            checkWords();
        }
    }
}