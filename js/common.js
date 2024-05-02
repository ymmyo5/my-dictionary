"use strict";

//ヘッダーの高さ分だけコンテンツを下げる
$(function() {
    var height=$(".header").height();
    $("body").css("margin-top", height + 10);//10pxだけ余裕をもたせる
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