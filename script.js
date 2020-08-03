let todoList = [];

(function() {
  document.querySelector('input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
      console.log(this.value);
    }
  });
})();
 let newTodo = {
     todo: this.value,
     check: false,
     important: false
 };

 todoList.push(newTodo)
 function displayMessages();
 console.log(newTodo);

 function displayMessages(){
 
    todoList.forEach(function(item, i){
    console.log(item);
 }};