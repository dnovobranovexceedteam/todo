const todoList = document.querySelector("#todoList");
const input = document.querySelector("#input");
const checkAll = document.querySelector("#checkAll");

let taskList = [];

// $(".text-span").click(() =>
//   console.log("aaaaaaaaaaaaAAAAAAAAAAAaaaAAAAaaaaaaaaaaaaaaaaaa")
// );

function addItem(text) {
  // $('#todoList').append(`
  // <li class="">
  // 	<input type="checkbox">
  // 	<span>
  // 		${text}
  // 	</span>
  // 	<span>
  // 		X
  // 	</span>
  // </li>
  // `)
  let checkAll = document.createElement("input");
  checkAll.type = "checkbox";
  input.appendChild(checkAll);
  checkAll.addEventListener("click", function () {});

  $("#checkAll").click(function (event) {
    if (this.checked) {
      $(":checkbox").each(function () {
        li.classList.toggle("done");

        this.checked = true;
      });
    } else {
      $(":checkbox").each(function () {
        this.checked = false;
        li.classList.toggle("done");
      });
    }
   
  });

  const li = document.createElement("li");
  todoList.append(li);


  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  li.appendChild(checkbox);
  checkbox.addEventListener("click", function () {
    li.classList.toggle("done");
    get doneTasks(){
      return this.done.length;
    }
  });

  let span = document.createElement("span");
  span.innerHTML = text;
  this.value = "";
  li.appendChild(span);

  span.addEventListener("click", function func(e) {
    let input = document.createElement("input");
    input.value = this.innerHTML;
    this.innerHTML = "";
    this.appendChild(input);
	// $(input).focus()
    this.removeEventListener('click', func);

    let self = this;
    input.addEventListener("keydown", function (e) {
      if (e.keyCode == 13) {
        self.innerHTML = this.value;
       
      }
    
    });
  });

  let remove = document.createElement("a");
  remove.innerHTML = "X";
  remove.href = " ";
  li.appendChild(remove);
  remove.addEventListener("click", function (event) {
    li.parentElement.removeChild(li);

    event.preventDefault();
  });
}
// let showAll = document.createElement("a");
// showAll.innerHTML = "All";

input.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    addItem(input.value);

    let newTodo = {
      todo: input.value,
      checked: false,
    };
    input.value = "";
    taskList.push(newTodo);
    console.log(taskList);
  }
});

