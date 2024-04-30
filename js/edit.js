"use strict";

// ページ読み込み完了後に実行される
window.onload = function() {
    addList();     // 保存されているキーを表示する
    // URLからキーを取得
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var key = urlParams.get('key');

    // ローカルストレージにある単語と説明を取得して編集できるようにする
    var wordDetailElement = document.getElementById("wordEdit");
    wordDetailElement.textContent = key;

    var textValue = localStorage.getItem(key);
    var textDetailElement = document.getElementById("textEdit");
    textDetailElement.textContent = textValue;

    // 保存ボタンのクリックイベントを追加
    var saveButton = document.getElementById('save');
    saveButton.addEventListener('click', function() {
        var textEdit = document.getElementById('textEdit').value;
        localStorage.setItem(key, textEdit);
        alert('正常に保存されました');
    });
}