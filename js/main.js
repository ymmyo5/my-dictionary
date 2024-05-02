"use strict";

// 保存ボタンのクリックイベントを追加
var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function() {
    var newKey = document.getElementById("word").value;
    var textEdit = document.getElementById('textarea').value;

    if (newKey === "" || textEdit === "") {
        alert('内容を入力してください');
    } else {
        localStorage.setItem(newKey, textEdit);
        alert('正常に保存されました');
        addList();
    }
});

// リストに単語を追加する
function addList() {
    var ul = document.getElementById("output");
    ul.innerHTML = "";      // リストをリセットする

    for(var i = 0; i < localStorage.length; i++) {
        var list = document.createElement("li");
        list.textContent = localStorage.key(i);
        ul.appendChild(list);

        // キーをクリックしたら遷移するリンクを追加する
        list.addEventListener("click", function(event) {
            var word = event.target.textContent;
            window.location.href = "display.html?key=" + encodeURIComponent(word);
        });
    }
}

// ページ読み込み完了後に実行される
window.onload = function() {
    addList();     //　保存されているキーを表示する
}