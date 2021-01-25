// массивы для сортировки
let nameArray = [];
let scoreArray = [];
let filename = 'gameFindAnimal_Score';
let type = 'txt';

// цвет темы
let styleGame = localStorage.getItem('styleImportantField');
if (styleGame == 1) {
    document.getElementById('body').style.backgroundImage = 'url(' + 'картинки/mainDarckLvl.png' + ')';
} else {
    document.getElementById('body').style.backgroundImage = 'url(' + 'картинки/mainLightLvl.png' + ')';
}

for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key) || key.indexOf('ImportantField') != -1) {
        continue;
    }
    console.log(key);
    console.log(key.substr(0, key.length - 1));
    if (key.substr(0, key.length - 1) == localStorage.getItem('userNameImportantField')) {
        if (localStorage.getItem(localStorage.getItem('userNameImportantField')) == null) {
            localStorage.setItem(localStorage.getItem('userNameImportantField'), localStorage.getItem(key));
        } else {
            localStorage.setItem(localStorage.getItem('userNameImportantField'), Number(localStorage.getItem(key)) + Number(localStorage.getItem(localStorage.getItem('userNameImportantField'))));
        }
        localStorage.removeItem(key);
    }
    // if(key.substr(key.length) localStorage.getItem('userNameImportantField'))
    // nameArray.push(`${key}`);
    // scoreArray.push(Math.round(Number(`${localStorage.getItem(key)}`)));
}

for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key) || key.indexOf('ImportantField') != -1) {
        continue;
    }
    nameArray.push(`${key}`);
    scoreArray.push(Math.round(Number(`${localStorage.getItem(key)}`)));
}

BubbleSort(scoreArray, nameArray);

function BubbleSort(Aray, Name) {
    let n = Aray.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (Aray[j + 1] > Aray[j]) {
                let n = Name[j + 1];
                let s = Aray[j + 1];
                Aray[j + 1] = Aray[j];
                Name[j + 1] = Name[j];
                Aray[j] = s;
                Name[j] = n;
            }
            if (Aray[j + 1] == Aray[j] && Name[j + 1].substr(0, 1).toLowerCase() < Name[j].substr(0, 1).toLowerCase()) {
                let n = Name[j + 1];
                Name[j + 1] = Name[j];
                Name[j] = n;
            }
        }
    }
    // for (let i = 0; i < n - 1; i++) {
    //     for (let j = 0; j < n - 1 - i; j++) {
    //         //console.log(Name[j + 1].substr(0, 1).toLowerCase());
    //         if (Aray[j + 1] == Aray[j] && Name[j + 1].substr(0, 1).toLowerCase() < Name[j].substr(0, 1).toLowerCase()) {
    //             let n = Name[j + 1];
    //             Name[j + 1] = Name[j];
    //             Name[j] = n;
    //         }
    //     }
    // }
}

// for (let i = 0; i < nameArray.length; i++) {
//     console.log(nameArray[i].substr(0, 1).toLowerCase());
// }

let Numb
if (nameArray.length <= 10) {
    Numb = nameArray.length;
} else {
    Numb = 10;
}

for (let i = 0; i < Numb; i++) {
    let element = document.getElementById('firsttable');
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    if (i % 2 == 0) {
        tr.className = 'class1';
    }
    element.append(tr);
    td1.innerHTML = nameArray[i];
    tr.append(td1);
    td2.innerHTML = scoreArray[i];
    tr.append(td2);
}

function returnGame() {
    window.location.href = 'index.html';
}

function download() {
    let data = "Результаты:";
    for (let i = 0; i < nameArray.length; i++) {
        data += "\n" + nameArray[i] + ":  " + scoreArray[i];
    }
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}