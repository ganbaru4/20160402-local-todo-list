(function(){

  'use strict';

  //データ保管配列
  var todos = [
    {
      koumoku : 'テストデータ1',
      done : false
    },
    {
      koumoku : 'テストデータ2',
      done : false
    }
  ];

  var todoWrap      = document.getElementById('todo-wrap');
  var todoList      = document.getElementById('todo-list');
  var todoForm      = document.getElementById('todo-form');
  var todoKoumoku   = document.getElementById('todo-koumoku');
  var todoDelAllBtn = document.getElementById('todo-delAllBtn');

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
          console.log(todos[index].koumoku);
          var keyIndex = todos.indexOf(todos[index]);
          console.log(keyIndex);
        });

        var span = document.createElement('span');
        span.textContent = todos[index].koumoku;

        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';

        var label = document.createElement('label');
        label.appendChild(checkBox);
        label.appendChild(span);

        var list = document.createElement('li');
        list.appendChild(label);
        list.appendChild(delBtn);

        todoList.appendChild(list);
      }());
    }//for
  }//function render
  render();

  todoForm.addEventListener('submit', addItem);

}());
