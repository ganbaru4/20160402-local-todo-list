(function(){

  'use strict';

  //データ保管配列、いったんnull確認
  var todos = localStorage.getItem('todos');
  if(todos){
    todos = JSON.parse(todos);
  }else{
    todos = [];
  }

  var todoWrap      = document.getElementById('todo-wrap');
  var todoList      = document.getElementById('todo-list');
  var todoForm      = document.getElementById('todo-form');
  var todoKoumoku   = document.getElementById('todo-koumoku');
  var todoDelAllBtn = document.getElementById('todo-delAllBtn');

  // 編集時
  var editModal     = document.getElementById('edit-modal');
  var modalBody     = document.getElementById('modal-body');
  var modalClose    = document.getElementById('modal-close');
  var overlay       = document.getElementById('overlay');

  /////////////////////////////////////////////////////////////////////////////
  // delAllItem
  function delAllItem(){
    if(window.confirm('すべての項目を削除しますか？')){
      localStorage.clear();
      todoList.innerHTML = '';
      todos = [];
    }else{
      return;
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  // addItem
  function addItem(event){
    event.preventDefault();

    if(todoKoumoku.value == ''){
      window.alert('項目を入力してください');
      return;
    }
    var todo = {
      koumoku : todoKoumoku.value,
      done : false
    };
    todos.push(todo);

    todoKoumoku.value = '';
    render();
  }

  /////////////////////////////////////////////////////////////////////////////
  // render
  function render(){
    todoList.innerHTML = '';
    modalBody.innerHTML = '';
    editModal.style.display = 'none';
    overlay.style.display = 'none';

    for(var i = 0; i < todos.length; i++){
      (function(){
        //スコープ用
        var index = i;

        var list = document.createElement('li');
        var todo = todos[index];

        // 編集ボタン
        var editBtn = document.createElement('input');
        editBtn.value = '編集';
        editBtn.type = 'button';

        editBtn.addEventListener('click',function(event){
          editModal.style.display = 'block';
          overlay.style.display = 'block';

          var editInput = document.createElement('input');
          editInput.type = 'text';
          editInput.value = todo.koumoku;

          // 更新ボタン
          var confirmBtn = document.createElement('input');
          confirmBtn.type = 'button';
          confirmBtn.value = '更新';
          confirmBtn.addEventListener('click',function(){
            todos.splice(keyIndex,1,{koumoku:editInput.value,done:checkBox.checked});
            render();
          });

          var keyIndex = todos.indexOf(todo);
          modalBody.appendChild(editInput);
          modalBody.appendChild(confirmBtn);
        });

        // 削除ボタン
        var delBtn   = document.createElement('input');
        delBtn.value = '削除';
        delBtn.type  = 'button';
        delBtn.addEventListener('click',function(event){
          deleteItem(todo);
        });

        var span = document.createElement('span');
        span.textContent = todos[index].koumoku;

        // チェックボックス
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todo.done;
        checkBox.addEventListener('change', function(event){
          todo.done = this.checked;
          render();
        });

        var label = document.createElement('label');
        label.appendChild(checkBox);
        label.appendChild(span);

        list.appendChild(label);
        list.appendChild(editBtn);
        list.appendChild(delBtn);

        todoList.appendChild(list);
      }());
    }//for

    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));

  }//function render

  /////////////////////////////////////////////////////////////////////////////
  // deleteItem
  function deleteItem(todo){
    var keyIndex = todos.indexOf(todo);
    todos.splice(keyIndex,1);
    render();
  }

  /////////////////////////////////////////////////////////////////////////////
  // 最後に
  todoForm.addEventListener('submit', addItem);
  todoDelAllBtn.addEventListener('click', delAllItem);
  modalClose.addEventListener('click', render);

  render();
}());
