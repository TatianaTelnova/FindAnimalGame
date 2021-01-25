let box = document.getElementById('box');
let choose = [];

box.onclick = function(event) {
    if (resolution == 0) {
        return;
    }

    let wordcl = document.getElementById(event.target.id);
    let number = Number(event.target.id.substr(4, 2));

    if (number != 0) {
        if (wordcl.style.backgroundColor == 'rgb(0, 0, 255)') {
            wordcl.style.backgroundColor = 'rgb(255, 255, 255)';
            wordcl.style.color = 'rgb(0, 0, 0)';
        } else {
            wordcl.style.backgroundColor = 'rgb(0, 0, 255)';
            wordcl.style.color = 'rgb(255, 255, 255)';
        }
        if (choose.indexOf(number) == -1) {
            choose.push(number);
        } else {
            choose.splice(choose.indexOf(number), 1);
        }
    }
};