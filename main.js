let view = document.getElementById('view');
computedStyle = window.getComputedStyle(view);
const backColor = computedStyle.getPropertyValue('--flap-color');

let ai = document.createElement('div');
// ai.classList.add('ai');
// ai.innerHTML = '.ai';
// view.appendChild(ai);

const amountOfFlaps = 13;
const animationSpeed = 380;
const randomBreak = 24;
div = document.querySelector('.center');
html = '';
for (let x = 0; x < amountOfFlaps; x++) {
    html +=
        '<div class=splitflap><div class="top"></div><div class="bottom"></div><div class="nextHalf"></div><div class="nextFull"></div></div>';
}

div.innerHTML = html;

main();

async function main() {
    let listStr = [];
    let txtFile = await fetch('./words.txt');
    let allText = await txtFile.text();
    listStr = allText.split('\n');
    listStr = listStr.filter((str) => str.length >= 4 && str.length <= 8);
    listStr = suffle(listStr);

    let flapStrings = listStr;
    flapStrings = sortStringsByInPlaceChanges(flapStrings);
    const exts = ['.com', '.net', '.org', '.in'];
    for (let i = 0; i < randomBreak; i++) {
        let ext = exts[Math.floor(Math.random() * exts.length)];
        flapStrings[i] += ext;
    }
    for (let i = randomBreak; i < flapStrings.length; i++) {
        flapStrings[i] += '.ai';
    }
    flapStrings = flapStrings.map((str) => prepare(str, amountOfFlaps));

    console.log(flapStrings[0].length);

    a1 = document.querySelectorAll('.top');
    a2 = document.querySelectorAll('.bottom');
    b1 = document.querySelectorAll('.nextFull');
    b2 = document.querySelectorAll('.nextHalf');

    const setAnimationSpeed = (speed) => {
        for (var x = 0; x < amountOfFlaps.length; x++) {
            a2[x].style.animationDuration = `${speed}ms`;
            b2[x].style.animationDuration = `${speed}ms`;
        }
        // console.log(document.querySelector('.flip1'));
        // document.querySelector('.flip1').style.animationDuration = `${speed}ms`;
        //document.querySelector('.flip2').style.animationDuration = `${speed}ms`;
    };

    setAnimationSpeed(animationSpeed);
    let newSpeed = animationSpeed;
    let stringIndex = 0;
    setInterval(function () {
        let i = stringIndex;
        let i2 = (stringIndex + 1) % flapStrings.length;
        for (let x = 0; x < amountOfFlaps; x++) {
            if (flapStrings[i][x] === flapStrings[i2][x]) dontFlipIt(x, stringIndex);
            else flipIt(x, stringIndex);
        }
        stringIndex = (stringIndex + 1) % flapStrings.length;
        newSpeed = Math.max(50, (newSpeed -= 4));
        setAnimationSpeed(newSpeed);
        console.log(newSpeed);
    }, animationSpeed);

    function flipIt(x, i) {
        let i2 = (i + 1) % flapStrings.length;
        a1[x].innerHTML = flapStrings[i][x];
        a2[x].innerHTML = flapStrings[i][x];
        b1[x].innerHTML = flapStrings[i2][x];
        b2[x].innerHTML = flapStrings[i2][x];

        a2[x].classList.remove('flip1');
        a2[x].offsetWidth = a2[x].offsetWidth;
        a2[x].classList.add('flip1');
        b2[x].classList.remove('flip2');
        b2[x].offsetWidth = b2[x].offsetWidth;
        b2[x].classList.add('flip2');
    }

    function dontFlipIt(x, i) {
        a2[x].classList.remove('flip2');
        a2[x].style.backgroundColor = backColor;
        b2[x].style.backgroundColor = backColor;
        a1[x].innerHTML = flapStrings[i][x];
        a2[x].innerHTML = flapStrings[i][x];
    }
}

function suffle(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let rand = Math.floor(Math.random() * arr.length);
        newArr.push(arr[rand]);
        arr.splice(rand, 1);
    }
    return newArr;
}

function prepare(str, n) {
    let len = str.length;
    let spaces = n - len;
    let newStr = '';
    for (let i = 0; i < spaces; i++) {
        newStr += ' ';
    }
    newStr += str;
    return newStr;
}

//not perfect but I don't need perfect
//DONT JUDGE ME :D
function sortStringsByInPlaceChanges(arr) {
    function countInPlaceChanges(str1, str2) {
        let changes = 0;
        for (let i = 0; i < str1.length; i++) {
            if (str1[i] !== str2[i] && str1[i] !== ' ') {
                changes++;
            }
        }
        return changes;
    }
    arr.sort((a, b) => countInPlaceChanges(a, b));

    return arr;
}
