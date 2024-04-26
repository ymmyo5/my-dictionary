/* 高さをウィンドウサイズにする */
$(document).ready(function () {
    hsize = $(window).height();
    $("ul").css("height", hsize)
})

$(document).ready(function () {
    hsize = $(window).height();
    $("textarea").css("height", hsize)
})

function saveFormData() {
    var wordInput = document.getElementById("word");
    var textInput = document.getElementById("textarea");
    localStorage.setItem("word", wordInput.value);
    localStorage.setItem("textarea", textInput.value);
}

document.addEventListener("DOMContentLoaded", () => {
    var wordOutput = localStorage.getItem("word");
    output.textContent = wordOutput;
})