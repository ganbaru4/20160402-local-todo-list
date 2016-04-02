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

  var item = localStorage.getItem('item');
  var text = document.createTextNode(item);
  todoList.appendChild(text);
//  var type = typeof item;
//  console.log(type);
}

