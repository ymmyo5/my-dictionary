"use strict";

//ヘッダーの高さ分だけコンテンツを下げる
$(function() {
    var height = $(".header").height();
    $("body").css("margin-top", height + 2);//2pxだけ余裕をもたせる
});

$(function() {
	$('.menu-btn').click(function() {
		$('.drawer-nav').toggleClass('open');
		$('.drawer-overlay').toggleClass('open');
		$('body').toggleClass('open');
	});
	$('.drawer-nav ul li a').click(function() {
		$('.drawer-nav').removeClass('open');
		$('.drawer-overlay').removeClass('open');
		$('body').toggleClass('open');
	});
	$('.drawer-overlay').click(function() {
		$('.drawer-nav').removeClass('open');
		$('.drawer-overlay').removeClass('open');
		$('body').toggleClass('open');
	});
});


// 1.関数の定義
function setHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
// 2.初期化
setHeight();
// 3.ブラウザのサイズが変更された時・画面の向きを変えた時に再計算する
window.addEventListener('resize', setHeight);


// 保存ボタンのクリックイベントを追加
function save() {
    var newKey = document.getElementById("word").value;
    var newRuby = document.getElementById("ruby").value;
    var newText = document.getElementById('text').value;

    if (newKey === "" || newRuby === "" || newText === "") {
        alert("単語・ふりがな・説明をすべて入力してください");
    } else {
        // オブジェクトを作成し、必要なデータを格納
        var wordData = {
            word: newKey,
            ruby: newRuby,
            text: newText
        };

        localStorage.setItem(newKey, JSON.stringify(wordData));
        alert('正常に保存されました');
        addList();
        // URL が index.html の場合は reset 関数を実行
        if (window.location.pathname.includes("index.html")) {
            reset();
        } else {
            addList();
        }
    }
}

// リストに単語を追加する
function addList() {
    var uls = document.querySelectorAll(".output"); // output クラスを持つすべての要素を取得
    uls.forEach(function(ul) {
        ul.textContent = ""; // 各ul要素の中身をリセットする

        for(var i = 0; i < localStorage.length; i++) {
            var list = document.createElement("li");
            var key = localStorage.key(i);
            var wordData = JSON.parse(localStorage.getItem(key));
            list.textContent = wordData.word; // 単語のみ表示
            list.setAttribute("ruby", wordData.ruby); // ふりがなをdata属性に追加
            ul.appendChild(list); // 既存のリストに要素を追加

            // キーをクリックしたら遷移するリンクを追加する
            list.addEventListener("click", function(event) {
                var word = event.target.textContent;
                window.location.href = "display.html?key=" + encodeURIComponent(word);
            });
        }
    });
}

function reset() {
    // 入力フォームの内容をリセット
    document.getElementById("word").value = "";
    document.getElementById("ruby").value = "";
    document.getElementById("text").value = "";
}

// リストを編集する
function edit() {
    var queryString = window.location.search; // クエリ文字列を取得
    var urlParams = new URLSearchParams(queryString); // URLSearchParamsに変換
    var word = urlParams.get('key'); // keyの値を取得
    window.location.href = "edit.html?key=" + encodeURIComponent(word);
}

// リストから削除する
function erase() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var word = urlParams.get('key');

    var localKey = localStorage.getItem(word); // 指定されたキーのローカルストレージの値を取得

    if (localKey !== null) {
        // キーに関連するローカルストレージの値を削除
        localStorage.removeItem(word);
        alert('辞典から削除されました');
        reset()
    } else {
        alert('削除するデータが見つかりませんでした');
    }
}

// ページ読み込み完了後に実行される
window.onload = function() {
    addList();     // 保存されているキーを表示する
    setupSearch(); // 検索機能をセットアップ

    // URLからキーを取得して詳細を表示
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var key = urlParams.get('key');

    if (key) {
        displayWordDetail(key);
    }
}

// ページ読み込み完了後に単語の詳細を表示する関数
function displayWordDetail(key) {
    var wordDetailElement = document.getElementById("word");
    var rubyDetailElement = document.getElementById("ruby");
    var textDetailElement = document.getElementById("text");

    // ローカルストレージからJSON文字列を取得
    var json = localStorage.getItem(key);

    // JSON文字列が存在するかをチェック
    if (json) {
        // JSON文字列をオブジェクトに変換
        var array = JSON.parse(json);

        // 単語の詳細を表示する
        wordDetailElement.textContent = array.word; // 単語
        rubyDetailElement.textContent = array.ruby; // ふりがな
        textDetailElement.textContent = array.text; // テキスト
    }
}

var sort = "down"; // 初期ソート値：up

// 昇順・降順ボタンをクリックしたときの処理
var button = document.getElementById("sort");
button.addEventListener("click", function() {
    // ソート順を切り替える
    if (sort === 'down') {
        up(button);
        sort = 'up';
    } else {
        down(button);
        sort = 'down';
    }
});

// キーを配列に取得
var keys = [];
for (var i = 0; i < localStorage.length; i++) {
    keys.push(localStorage.key(i));
}

// リストを昇順に並べ替えるup関数
function up(button) {
    keys.sort((a, b) => {
        return a.localeCompare(b, 'ja');
    });

    var ul = document.getElementById("updown");
    ul.innerHTML = ""; // リストをリセットする

    for(var i = 0; i < keys.length; i++) {
        var list = document.createElement("li");
        list.textContent = keys[i];
        ul.appendChild(list);

        // キーをクリックしたら遷移するリンクを追加する
        list.addEventListener("click", function(event) {
            var word = event.target.textContent;
            window.location.href = "display.html?key=" + encodeURIComponent(word);
        });
    }

    // ボタンを↓に書き換える
    button.textContent = "↓"
}

// リストを降順に並べ替えるdown関数
function down(button) {
    keys.sort((a, b) => {
        return b.localeCompare(a, 'ja');
    });

    var ul = document.getElementById("updown");
    ul.innerHTML = ""; // リストをリセットする

    for(var i = 0; i < keys.length; i++) {
        var list = document.createElement("li");
        list.textContent = keys[i];
        ul.appendChild(list);

        // キーをクリックしたら遷移するリンクを追加する
        list.addEventListener("click", function(event) {
            var word = event.target.textContent;
            window.location.href = "display.html?key=" + encodeURIComponent(word);
        });
    }

        // ボタンを↑に書き換える
        button.textContent = "↑"
}

// 検索機能
function setupSearch() {
    // 検索フォームの要素を取得
    var searchForm = document.getElementById("searchform"); 

    // 検索結果を表示する要素を取得
    var outputList = document.querySelectorAll(".output li"); 

    // 検索フォームの入力内容が変更された時の処理
    searchForm.addEventListener("input", function() {
        var searchString = searchForm.searchbox.value.trim().toLowerCase(); // 入力された文字列を取得

        // 全てのoutput li要素をループして、入力された文字列が含まれているか確認
        outputList.forEach(function(item) {
            var listItemText = item.textContent.toLowerCase();
            var listItemRuby = item.getAttribute("ruby").toLowerCase();

            // 入力された文字列が含まれている場合は表示、それ以外は非表示にする
            if (listItemText.includes(searchString) || listItemRuby.includes(searchString)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
}