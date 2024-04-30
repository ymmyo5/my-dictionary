// 高さをウィンドウサイズにする
$(document).ready(function () {
    hsize = $(window).height();
    $("ul").css("height", hsize)
})

$(document).ready(function () {
    hsize = $(window).height();
    $("textarea").css("height", hsize)
})

// 単語と説明を保存する
function saveFormData() {
    var wordIn = document.getElementById("word").value;
    var textIn = document.getElementById("textarea").value;

    localStorage.setItem(wordIn, textIn);
    addList();
}

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