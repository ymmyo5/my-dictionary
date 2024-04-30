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

    // 戻るボタンのクリックイベントを追加
    var backButton = document.getElementById('back');
    backButton.addEventListener('click', function() {
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var word = urlParams.get('key');
        window.location.href = "display.html?key=" + encodeURIComponent(word);
    });
}