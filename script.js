var topStripDiv = document.getElementById("top-strip");
var contentDiv = document.getElementById("content");
var titleDiv = document.getElementById("title");

var resultsDiv = document.getElementById("results");
var resultsExit = document.getElementById("results-exit");
var resultsMode = document.getElementById("results-mode");
var resultsTime = document.getElementById("results-time");
var timeInfo = "";

var currentWord = "";
var upcomingWord1 = "";
var upcomingWord2 = "";
var upcomingWord3 = "";
var upcomingWord4 = "";

var currentWordDiv = document.getElementById("current-word");
var upcomingWord3Div = document.getElementById("upcoming-word-3");
var upcomingWord2Div = document.getElementById("upcoming-word-2");
var upcomingWord1Div = document.getElementById("upcoming-word-1");

var currentWordArray = [];
var upcomingWord4Array = [];
var upcomingWord3Array = [];
var upcomingWord2Array = [];
var upcomingWord1Array = [];

var option1 = document.getElementById("option-1");
var option2 = document.getElementById("option-2");
var option3 = document.getElementById("option-3");
var option4 = document.getElementById("option-4");
var option5 = document.getElementById("option-5");

var pb1 = ""; var pb2 = ""; var pb3 = ""; var pb4 = "";
var pb200 = ""; var pb1k = ""; var pb10k = ""; var pbDict = "";

var pb200Div = document.getElementById("option-1-pb");
var pb1kDiv = document.getElementById("option-2-pb");
var pb10kDiv = document.getElementById("option-3-pb");
var pbDictDiv = document.getElementById("option-4-pb");

pb200Div.innerHTML = localStorage.getItem("pb200");
pb1kDiv.innerHTML = localStorage.getItem("pb1k");
pb10kDiv.innerHTML = localStorage.getItem("pb10k");
pbDictDiv.innerHTML = localStorage.getItem("pbDict");

var remainingWordsDiv = document.getElementById("remaining-words");
var remainingWords = 0;
var letterNum = 0;
var selectedWordList = [];
var selectedMode = ""

var pauseButton = document.getElementById("pause-button");
var pauseContainer = document.getElementById("pause-container");
var pauseMenu = document.getElementById("pause-menu");

var timerInterval = 0;
var ms = 0;
var sec = 0;
var min = 0;
var hr = 0;
var timerState = "off";
var newTotalMs1 = 0; var newTotalMs2 = 0; var newTotalMs3 = 0; var newTotalMs4 = 0;
var totalMs1 = Infinity; var totalMs2 = Infinity; var totalMs3 = Infinity; var totalMs4 = Infinity; 

var msDiv = document.getElementById("ms");
var secDiv = document.getElementById("sec");
var minDiv = document.getElementById("min");
var hrDiv = document.getElementById("hr");

/* - - - - - */

function onloadTransitions() {
    titleDiv.classList.add("title-transition");
    option1.classList.add("option-1-transition");
    option2.classList.add("option-2-transition");
    option3.classList.add("option-3-transition");
    option4.classList.add("option-4-transition");
    option5.classList.add("option-5-transition");
}

function transitionToTest1() {
    titleDiv.classList.remove("title-transition");
    option1.classList.remove("option-1-transition");
    option2.classList.remove("option-2-transition");
    option3.classList.remove("option-3-transition");
    option4.classList.remove("option-4-transition");
    option5.classList.remove("option-5-transition");
    topStripDiv.classList.add("move-from-ns");
    contentDiv.classList.add("move-from-ns");
    beginTest();
}

function transitionToTest2() {
    titleDiv.classList.remove("title-transition");
    option1.classList.remove("option-1-transition");
    option2.classList.remove("option-2-transition");
    option3.classList.remove("option-3-transition");
    option4.classList.remove("option-4-transition");
    option5.classList.remove("option-5-transition");
    topStripDiv.classList.add("move-from-ns");
    contentDiv.classList.add("move-from-ns");
    continueTest();
}

option1.onclick = function() {selectOption1()};
option2.onclick = function() {selectOption2()};
option3.onclick = function() {selectOption3()};
option4.onclick = function() {selectOption4()};
option5.onclick = function() {selectOption5()};
    
function selectOption1() {
    for (var i = 0; i < document.getElementsByClassName("option").length; i++) {
        document.getElementsByClassName("option")[i].classList.add("no-pointer-events");
    }
    selectedWordList = Array.from(words200);
    selectedMode = "Top 200 Words";
    remainingWords = 200;
    transitionToTest1();
}

function selectOption2() {
    for (var i = 0; i < document.getElementsByClassName("option").length; i++) {
        document.getElementsByClassName("option")[i].classList.add("no-pointer-events");
    }
    selectedWordList = Array.from(words1k);
    selectedMode = "Top 1,000 Words";
    remainingWords = 999;
    transitionToTest1();
}

function selectOption3() {
    for (var i = 0; i < document.getElementsByClassName("option").length; i++) {
        document.getElementsByClassName("option")[i].classList.add("no-pointer-events");
    }
    selectedWordList = Array.from(words10k);
    selectedMode = "Top 10,000 Words";
    remainingWords = 9960;
    transitionToTest1();
}

function selectOption4() {
    for (var i = 0; i < document.getElementsByClassName("option").length; i++) {
        document.getElementsByClassName("option")[i].classList.add("no-pointer-events");
    }
    selectedWordList = Array.from(wordsDict);
    selectedMode = "Type the Dictionary";
    remainingWords = 451743;
    remainingWords = 10;
    transitionToTest1();
}

function selectOption5() {
    for (var i = 0; i < document.getElementsByClassName("option").length; i++) {
        document.getElementsByClassName("option")[i].classList.add("no-pointer-events");
    }
    selectedWordList = (localStorage.getItem("pausedWordList")).split(",");
    selectedMode = localStorage.getItem("pausedSelectedMode");
    remainingWords = localStorage.getItem("pausedWordsRemaining");

    msDiv.innerHTML = localStorage.getItem("pausedMsDiv");
    secDiv.innerHTML = localStorage.getItem("pausedSecDiv");
    minDiv.innerHTML = localStorage.getItem("pausedMinDiv");
    hrDiv.innerHTML = localStorage.getItem("pausedHrDiv");

    ms = parseInt(localStorage.getItem("pausedMs"));
    sec = parseInt(localStorage.getItem("pausedSec"));
    min = parseInt(localStorage.getItem("pausedMin"));
    hr = parseInt(localStorage.getItem("pausedHr"));

    transitionToTest2();
}

function beginTest() {
    var rNum3 = Math.floor(Math.random() * selectedWordList.length);
    upcomingWord3 = selectedWordList[rNum3];
    upcomingWord3Array = upcomingWord3.split("");
    selectedWordList.splice(rNum3, 1);
    for (var i = 0; i < upcomingWord3Array.length; i++) {
        var charDiv = document.createElement("div");
        charDiv.innerHTML = upcomingWord3Array[i];
        upcomingWord3Div.appendChild(charDiv)
    }

    var rNum2 = Math.floor(Math.random() * selectedWordList.length);
    upcomingWord2 = selectedWordList[rNum2];
    upcomingWord2Array = upcomingWord2.split("");
    selectedWordList.splice(rNum2, 1)
    for (var i = 0; i < upcomingWord2Array.length; i++) {
        var charDiv = document.createElement("div");
        charDiv.innerHTML = upcomingWord2Array[i];
        upcomingWord2Div.appendChild(charDiv)
    }

    var rNum1 = Math.floor(Math.random() * selectedWordList.length);
    upcomingWord1 = selectedWordList[rNum1];
    upcomingWord1Array = upcomingWord1.split("");
    selectedWordList.splice(rNum1, 1)
    for (var i = 0; i < upcomingWord1Array.length; i++) {
        var charDiv = document.createElement("div");
        charDiv.innerHTML = upcomingWord1Array[i];
        upcomingWord1Div.appendChild(charDiv)
    }

    var rNum0 = Math.floor(Math.random() * selectedWordList.length);
    currentWord = selectedWordList[rNum0];
    currentWordArray = currentWord.split("");
    selectedWordList.splice(rNum0, 1);
    for (var i = 0; i < currentWordArray.length; i++) {
        var charDiv = document.createElement("div");
        charDiv.innerHTML = currentWordArray[i];
        currentWordDiv.appendChild(charDiv)
    }

    remainingWordsDiv.innerHTML = "Words Remaining: " + remainingWords;

    document.addEventListener("keydown", detectKey);
}

function continueTest() {
    currentWordDiv.innerHTML = localStorage.getItem("pausedCurrentWord");
    upcomingWord1Div.innerHTML = localStorage.getItem("pausedUpcomingWord1");
    upcomingWord2Div.innerHTML = localStorage.getItem("pausedUpcomingWord2");
    upcomingWord3Div.innerHTML = localStorage.getItem("pausedUpcomingWord3");

    remainingWordsDiv.innerHTML = "Words Remaining: " + remainingWords;
    document.addEventListener("keydown", detectKey);
}

function checkForCompletion() {
    if (currentWordDiv.children.length == document.getElementsByClassName("correct-color").length) {
        letterNum = 0;
        remainingWords -= 1;
        getNewWord();
        currentWordDiv.classList.add("scroll-down");
        upcomingWord3Div.classList.add("upcoming-word");
        upcomingWord2Div.classList.remove("upcoming-word");
    }
    if (remainingWords == 0) {
        endTest();
    }
}

function getNewWord() {
    var rNum4 = Math.floor(Math.random() * selectedWordList.length);
    upcomingWord4 = selectedWordList[rNum4];
    var upcomingWord4Div = document.createElement("div");
    if (selectedWordList.length > 0) {
        upcomingWord4Array = upcomingWord4.split("");
        selectedWordList.splice(rNum4, 1);
        for (var i = 0; i < upcomingWord4Array.length; i++) {
            var charDiv = document.createElement("div");
            charDiv.innerHTML = upcomingWord4Array[i];
            upcomingWord4Div.appendChild(charDiv);
        }
    }

    if (upcomingWord4Div.innerHTML === undefined) {
        upcomingWord4Div.innerHTML = "";
    }

    upcomingWord4Div.id = "upcoming-word-3";
    upcomingWord3Div.id = "upcoming-word-2";
    upcomingWord2Div.id = "upcoming-word-1";
    upcomingWord1Div.id = "current-word"

    upcomingWord4Div.classList.add("uw-div");
    upcomingWord1Div.classList.remove("uw-div");

    contentDiv.prepend(upcomingWord4Div);
    currentWordDiv.remove();

    currentWordDiv = document.getElementById("current-word");
    upcomingWord3Div = document.getElementById("upcoming-word-3");
    upcomingWord2Div = document.getElementById("upcoming-word-2");
    upcomingWord1Div = document.getElementById("upcoming-word-1");

    remainingWordsDiv.innerHTML = "Words Remaining: " + remainingWords;
}

function endTest() {
    stopTimer();
    document.removeEventListener("keydown", detectKey);
    topStripDiv.classList.remove("move-from-ns");
    contentDiv.classList.remove("move-from-ns");
    resultsMode.innerHTML = "Mode: " + selectedMode;
    if (hr == 0) {
        if (min == 0) {
            timeInfo = sec + "s " + ms + "0" + "ms";
            resultsTime.innerHTML = "Time Elapsed: " + timeInfo;
        }
        else {
            timeInfo = min + "m " + sec + "s " + ms + "0" + "ms";
            resultsTime.innerHTML = "Time Elapsed: " + timeInfo;
        }
    }
    else {
        timeInfo = hr + "h " + min + "m " + sec + "s " + ms + "0" + "ms";
        resultsTime.innerHTML = "Time Elapsed: " + timeInfo;
    }
    if (selectedMode == "Top 200 Words") {
        newTotalMs1 = ms + (sec * 100) + (min * 6000) + (hr * 360000)
        if (localStorage.getItem("totalMs200") == undefined) {
            totalMs1 = Infinity;
        }
        else {
            totalMs1 = localStorage.getItem("totalMs200");
        }
        if (newTotalMs1 < totalMs1) {
            pb1 = timeInfo;
            totalMs1 = newTotalMs1;
        }
        else {
            pb1 = localStorage.getItem("pb1");
        }
        pb200 = pb1;
        localStorage.setItem("pb1", pb200);
        localStorage.setItem("pb200", "PB: " + pb200);
        localStorage.setItem("totalMs200", totalMs1);
        pb200Div.innerHTML = localStorage.getItem("pb200");
    }
    if (selectedMode == "Top 1,000 Words") {
        newTotalMs2 = ms + (sec * 100) + (min * 6000) + (hr * 360000)
        if (localStorage.getItem("totalMs1k") == undefined) {
            totalMs2 = Infinity;
        }
        else {
            totalMs2 = localStorage.getItem("totalMs1k");
        }
        if (newTotalMs2 < totalMs2) {
            pb2 = timeInfo;
            totalMs2 = newTotalMs2;
        }
        else {
            pb2 = localStorage.getItem("pb2");
        }
        pb1k = pb2;
        localStorage.setItem("pb2", pb1k);
        localStorage.setItem("pb1k", "PB: " + pb1k);
        localStorage.setItem("totalMs1k", totalMs2);
        pb1kDiv.innerHTML = localStorage.getItem("pb1k");
    }
    if (selectedMode == "Top 10,000 Words") {
        newTotalMs3 = ms + (sec * 100) + (min * 6000) + (hr * 360000)
        if (localStorage.getItem("totalMs10k") == undefined) {
            totalMs3 = Infinity;
        }
        else {
            totalMs3 = localStorage.getItem("totalMs10k");
        }
        if (newTotalMs3 < totalMs3) {
            pb3 = timeInfo;
            totalMs3 = newTotalMs3;
        }
        else {
            pb3 = localStorage.getItem("pb3");
        }
        pb10k = pb3;
        localStorage.setItem("pb3", pb10k);
        localStorage.setItem("pb10k", "PB: " + pb10k);
        localStorage.setItem("totalMs10k", totalMs3);
        pb10kDiv.innerHTML = localStorage.getItem("pb10k");
    }
    if (selectedMode == "Type the Dictionary") {
        newTotalMs4 = ms + (sec * 100) + (min * 6000) + (hr * 360000)
        if (localStorage.getItem("totalMsDict") == undefined) {
            totalMs4 = Infinity;
        }
        else {
            totalMs4 = localStorage.getItem("totalMsDict");
        }
        if (newTotalMs4 < totalMs4) {
            pb4 = timeInfo;
            totalMs4 = newTotalMs4;
        }
        else {
            pb4 = localStorage.getItem("pb4");
        }
        pbDict = pb4;
        localStorage.setItem("pb4", pbDict);
        localStorage.setItem("pbDict", "PB: " + pbDict);
        localStorage.setItem("totalMsDict", totalMs4);
        pbDictDiv.innerHTML = localStorage.getItem("pbDict");
    }
    setTimeout(function() {
        clearTimer();
    }, 1000);
    setTimeout(function() {
        resultsDiv.classList.add("show-results");
    }, 1000);

    localStorage.setItem("pausedMs", 0);
    localStorage.setItem("pausedSec", 0);
    localStorage.setItem("pausedMin", 0);
    localStorage.setItem("pausedHr", 0);
    localStorage.setItem("pausedWordsRemaining", 0);
    localStorage.setItem("pausedWordList", []);

    checkContinueButton();
}

resultsExit.onclick = function() {exitResults()};

function exitResults() {
    resultsDiv.classList.remove("show-results");
    for (var i = 0; i < document.getElementsByClassName("option").length; i++) {
        document.getElementsByClassName("option")[i].classList.remove("no-pointer-events");
    }
    setTimeout(function() {
        titleDiv.classList.add("title-transition");
        option1.classList.add("option-1-transition");
        option2.classList.add("option-2-transition");
        option3.classList.add("option-3-transition");
        option4.classList.add("option-4-transition");
        option5.classList.add("option-5-transition");
    }, 200);
}

pauseButton.onclick = function() {showPauseMenu()};

function showPauseMenu() {
    if (timerInterval !== 0) {
        stopTimer();
        pauseContainer.classList.add("show-pause-container");
        pauseContainer.classList.remove("no-pointer-events");
        pauseMenu.classList.add("show-pause-menu");
        pauseContainer.onclick = function() {hidePauseMenu()};

        localStorage.setItem("pausedMsDiv", msDiv.innerHTML);
        localStorage.setItem("pausedSecDiv", secDiv.innerHTML);
        localStorage.setItem("pausedMinDiv", minDiv.innerHTML);
        localStorage.setItem("pausedHrDiv", hrDiv.innerHTML);
        localStorage.setItem("pausedMs", ms);
        localStorage.setItem("pausedSec", sec);
        localStorage.setItem("pausedMin", min);
        localStorage.setItem("pausedHr", hr);
        localStorage.setItem("pausedWordsRemaining", remainingWords);
        localStorage.setItem("pausedWordList", selectedWordList);
        localStorage.setItem("pausedSelectedMode", selectedMode);
        localStorage.setItem("pausedCurrentWord", currentWordDiv.innerHTML);
        localStorage.setItem("pausedUpcomingWord1", upcomingWord1Div.innerHTML);
        localStorage.setItem("pausedUpcomingWord2", upcomingWord2Div.innerHTML);
        localStorage.setItem("pausedUpcomingWord3", upcomingWord3Div.innerHTML);
    }
}

function hidePauseMenu() {
    pauseContainer.classList.remove("show-pause-container");
    pauseContainer.classList.add("no-pointer-events");
    pauseMenu.classList.remove("show-pause-menu");
}

function checkContinueButton() {
    if (localStorage.getItem("pausedWordList") !== null) {
        if (localStorage.getItem("pausedWordList").length > 0) {
            option5.classList.remove("display-none");
        } 
    }
    else {
        option5.classList.add("display-none");
    }
}

function beginTimer() {
    timerInterval = setInterval(setMs, 10)
}

function stopTimer() {
    clearInterval(timerInterval);
    timerState = "off";
}

function clearTimer() {
    ms = 0; sec = 0; min = 0; hour = 0;
    msDiv.innerHTML = "00";
    secDiv.innerHTML = "00";
    minDiv.innerHTML = "00";
    hrDiv.innerHTML = "00";
}
    
function setMs() {
    ms += 1;
    if (ms == 100) {
        ms = 0;
        setSec();
    }
    if (ms < 10) {
        msDiv.innerHTML = "0" + ms;
    } 
    else {
        msDiv.innerHTML = ms;
    }
}

function setSec() {
    sec += 1;
    if (sec >= 60) {
        sec = 0;
        setMin();
    }
    if (sec < 10) {
        secDiv.innerHTML = "0" + sec;
    }
    else {
        secDiv.innerHTML = sec;
    }
}

function setMin() {
    min += 1;
    if (min >= 60) {
        min = 0;
        setHour();
    }
    if (min < 10) {
        minDiv.innerHTML = "0" + min;
    }
    else {
        minDiv.innerHTML = min;
    }
}

function setHour() {
    hr += 1;
    if (hr < 10) {
        hrDiv.innerHTML = "0" + hr;
    }
    else {
        hrDiv.innerHTML = hr;
    }
}

/* - - - - - */

checkContinueButton();

var detectKey = function(event) {
    var pressedChar = event.key;
    if (event.code >= "KeyA" && event.code <= "KeyZ" || event.code == "Quote") {
        if (timerState == "off") {
            timerState = "on";
            beginTimer();
        }
        if (letterNum < currentWordDiv.children.length) {
            if (pressedChar == currentWordDiv.children[letterNum].innerHTML) {
                currentWordDiv.children[letterNum].classList.add("correct-color");
            }
            else {
                currentWordDiv.children[letterNum].classList.add("incorrect-color");
            }
            letterNum += 1;
        }
    }
    else if (event.code == "Backspace") {
        if (letterNum > 0) {
            letterNum -= 1;
            currentWordDiv.children[letterNum].classList.remove("correct-color")
            currentWordDiv.children[letterNum].classList.remove("incorrect-color")
        }
    }
    checkForCompletion();
}