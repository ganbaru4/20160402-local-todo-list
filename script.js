window.onload = load;

function load() {
  showItem();
  var addBtn       = document.getElementById('addBtn');
  var deleteAllBtn = document.getElementById('deleteAllBtn');
  addBtn.addEventListener('click', function () {
    saveItem();
    showItem();
  });
  deleteAllBtn.addEventListener('click', function(){
    deleteAllItem();
  });
}

function deleteAllItem(){
  localStorage.clear();
  window.alert('すべてのデータが削除されました');
  showItem();
}

//使った番号を使わないようにするための変数
var keyName = 0;
function saveItem() {
  var koumoku = document.getElementById('koumoku');
  for(var i = 0; i < localStorage.length; i++){
    keyName = localStorage.key(i);
  }
  keyName++;
  if(koumoku.value != ''){
    localStorage.setItem(keyName, koumoku.value);
    koumoku.value = '';

  }else{
    window.alert('項目を入力してください');
  }
}

function showItem() {
  var todoList = document.getElementById('todoList');

  //一旦子要素を全削除（リストを消す）
  while(todoList.hasChildNodes()){
    todoList.removeChild(todoList.childNodes[0]);
  }

  if(localStorage.length > 0){

    //表示用HTML配列
    var dataArr = [];

    //ストレージデータ取得
    for( i = 0; i < localStorage.length; i++){
      var counter = i;
      (function(){
        //データ取得
        var dataKey = localStorage.key(counter);
        var listData = localStorage.getItem(dataKey);
        var text = document.createTextNode(listData);

        //1データごとに削除ボタン生成と削除イベント登録
        var delBtn = document.createElement('input');
        delBtn.value = '削除';
        delBtn.type = 'button';
        delBtn.addEventListener('click', function(){
          localStorage.removeItem(dataKey);
          showItem();
        });
        counter++;

        //divを作ってデータと削除ボタンを入れる
        var divWrap = document.createElement('div');
        divWrap.appendChild(text);
        divWrap.appendChild(delBtn);
        todoList.appendChild(divWrap);
      })();
    }

  }else{
    todoList.innerHTML = '該当するデータがありません';
  }

//  var type = typeof item;
//  console.log(type);
}
