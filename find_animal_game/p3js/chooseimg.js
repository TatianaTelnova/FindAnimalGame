let box = document.getElementById('pictures-box');
let choose = [];

box.onclick = function(event) {
    if (resolution == 0) {
        return;
    }

    let wordcl = document.getElementById(event.target.id);
    let number = Number(event.target.id.substr(3, 1));

    if (!isNaN(number)) {
        if (wordcl.style.borderColor == 'rgb(0, 0, 255)') {
            if (styleGame == 1) {
                wordcl.style.borderColor = 'rgb(0, 0, 0, 0)';
            } else {
                wordcl.style.borderColor = 'rgb(148, 184, 206, 0)';
            }
        } else {
            wordcl.style.borderColor = 'rgb(0, 0, 255)';
        }
        if (choose.indexOf(number) == -1) {
            choose.push(number);
        } else {
            choose.splice(choose.indexOf(number), 1);
        }
    }
};