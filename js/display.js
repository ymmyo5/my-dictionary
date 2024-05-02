"use strict";

// ページ読み込み完了後に実行される
window.onload = function() {
    addList();     //　保存されているキーを表示する
    // URLからキーを取得
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var key = urlParams.get('key');

    // ローカルストレージにある単語と説明を取得して表示する
    var wordDetailElement = document.getElementById("wordDisplay");
    wordDetailElement.textContent = key;

    var textValue = localStorage.getItem(key);
    var textDetailElement = document.getElementById("textDisplay");
    textDetailElement.textContent = textValue;
}

function edit() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var word = urlParams.get('key');
    window.location.href = "edit.html?key=" + encodeURIComponent(word);
}
