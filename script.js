window.onload = load;

function load() {
  showItem();
  var addBtn = document.getElementById('addBtn');
  addBtn.addEventListener('click', function () {
    saveItem();
    showItem();
  });
}

function saveItem() {

  var koumoku = document.getElementById('koumoku');
  localStorage.setItem('item', koumoku.value);
  koumoku.value = '';
}

function showItem() {
  var todoList = document.getElementById('todoList');

  //子要素削除（リストを消す）
  if(todoList.hasChildNodes()){
    todoList.removeChild(todoList.childNodes[0]);
  }
  //ストレージデータ取得
  var item = localStorage.getItem('item');
  var text = document.createTextNode(item);

  //削除ボタン生成
  var delBtn = document.createElement('input');
  delBtn.value = '削除';
  delBtn.type = 'button';
  delBtn.addEventListener('click', function(){
    localStorage.removeItem('item');
    showItem();
  });

  //pタグ生成後に追加
  var pWrap = document.createElement('p');
  pWrap.appendChild(text);
  pWrap.appendChild(delBtn);
  todoList.appendChild(pWrap);

//  var type = typeof item;
//  console.log(type);
}

