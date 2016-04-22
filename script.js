(function(){

  'use strict';

  //データ保管配列、いったんnull確認
  var todos = localStorage.getItem('todos');
  //データがあるか判定、あれば配列に戻して、なければカラの配列を生成（render関数内でカラのjsonオブジェクト？がストレージに登録される）
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


  function delAllItem(){
    if(window.confirm('すべての項目を削除しますか？')){
      localStorage.clear();
      todoList.innerHTML = '';
    }else{
      return;
    }
  }

  function addItem(event){
    event.preventDefault();

//    console.log(typeof todoKoumoku.value);
    if(todoKoumoku.value == ''){//「!todoKoumoku.value」だけでもいけた。string型が返ってきてるのになぜ？
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

  function render(){
    todoList.innerHTML = '';

    for(var i = 0; i < todos.length; i++){
      (function(){
        var index = i;
        var delBtn   = document.createElement('input');
        delBtn.value = '削除';
        delBtn.type  = 'button';
        delBtn.addEventListener('click',function(event){
          deleteItem(todos[index]);
        });

        var span = document.createElement('span');
        span.textContent = todos[index].koumoku;

        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.checked = todos[index].done;
        checkBox.addEventListener('change', function(event){
          todos[index].done = this.checked;
          render();
        });

        var label = document.createElement('label');
        label.appendChild(checkBox);
        label.appendChild(span);

        var list = document.createElement('li');
        list.appendChild(label);
        list.appendChild(delBtn);

        todoList.appendChild(list);
      }());
    }//for

    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));

  }//function render

  function deleteItem(todo){
    var keyIndex = todos.indexOf(todo);
    todos.splice(keyIndex,1);
    render();
  }

  todoForm.addEventListener('submit', addItem);
  todoDelAllBtn.addEventListener('click', delAllItem);

  render();
}());
