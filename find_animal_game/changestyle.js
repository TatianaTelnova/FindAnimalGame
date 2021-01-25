// localStorage.clear();
let styletheme = 0; // светлая - 0, темная - 1
let mainpict = document.getElementById('body');
localStorage.setItem('styleImportantField', styletheme);

localStorage.setItem('startGameImportantField', 0); // если 0 - можно начать уровень, если 1 - нельзя
if (styletheme == 0) {
    mainpict.style.backgroundImage = 'url(' + 'картинки/mainLight.png' + ')';
} else {
    mainpict.style.backgroundImage = 'url(' + 'картинки/mainDarck.png' + ')';
}
let nameUser = document.getElementById('name');

function changeStyle() {

    if (Number(localStorage.getItem('styleImportantField')) == 1) {
        mainpict.style.backgroundImage = 'url(' + 'картинки/mainLight.png' + ')';
        styletheme = 0;
        localStorage.setItem('styleImportantField', styletheme);
    } else {
        mainpict.style.backgroundImage = 'url(' + 'картинки/mainDarck.png' + ')';
        styletheme = 1;
        localStorage.setItem('styleImportantField', styletheme);
    }
}

function startGame() {
    if (localStorage.getItem('repeateImportantField') != null) {
        localStorage.removeItem('repeateImportantField');
    }
    localStorage.setItem('startGameImportantField', 0);
    if (isEmpty(nameUser.value) || nameUser.value.indexOf('ImportantField') != -1) {
        alert('Имя введено некорректно. Пожалуйста, введите другое');
    } else {
        localStorage.setItem('userNameImportantField', nameUser.value);
        if (localStorage.getItem(nameUser.value) != null) {
            localStorage.removeItem(nameUser.value);
        }
        window.location.href = 'page1.html';
    }

    function isEmpty(str) {
        return str.trim() == '';
    }
}