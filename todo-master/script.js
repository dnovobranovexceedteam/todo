$(document).ready(() => {
    let taskList = [];
    let currentIndexStart = 0;
    let currentIndexFinish = 0;
  
    const counter = () => { // counter function
      $('#check-count span').html(taskList.filter((arr) => arr.status === true).length); // check count
      $('#items-left span').html(taskList.filter((arr) => arr.status === false).length); // count left
    };
  
    const render = (arr) => { // render
      let str = '';
      arr.forEach((item, index) => {
        if (index >= currentIndexStart && index <= currentIndexFinish) {
          str = `${str}<li class='list-group-item task-item' id='${item.id}'>
                          <input type='checkbox' class='item-checkbox' ${item.status ? 'checked' : ''} id='item-checkbox-${index}'>
                          <label for='item-checkbox-${index}'></label>
                          <span class='item-id'>${item.name}</span>
                          <button class='btn btn-info' id='delete-task'>delete</button>
                      </li>`;
        }
      });
      $('.out-todo').html(str);
      $('.btn-group').removeClass('hidden');
  
      const checkAll = $('.check-all');
      if (arr.length === 0) {
        checkAll.attr('disabled', true);
      } else {
        checkAll.attr('disabled', false); // unable check-all if there is no any todos
      }
      counter(arr);
    };
  
    const onPageClick = () => { // page switching
      $('.page-container .page-button').on('click', function (event) {
        currentIndexStart = Number($(event.currentTarget).attr('data-page-start'));
        currentIndexFinish = Number($(event.currentTarget).attr('data-page-finish'));
        $('.page-button').removeClass('active');
        $(this).addClass('active');
        render(taskList);
      });
    };
  
    const renderPages = (arr) => { // rendering buttons with number of pages
      const maxPerPage = 100;
      const currentPage = Math.ceil(arr.length / maxPerPage);
      let strTabs = '';
      let indexFinish = 0;
      let indexStart = 0;
      if (arr.length > maxPerPage) {
        for (let i = 1; i <= currentPage; i += 1) {
          indexFinish = Math.min((i * maxPerPage) - 1, arr.length - 1); // 4 9 14 19.. or last page
          indexStart = i * maxPerPage - maxPerPage; // 0 5 10 15..
          strTabs = `${strTabs}<button class='btn btn-light page-button ${(i === currentPage) && 'active'}' data-page-start='${indexStart}' data-page-finish='${indexFinish}'>${i}</button>`;
        }
        currentIndexStart = indexStart;
        currentIndexFinish = indexFinish;
      } else {
        currentIndexStart = 0;
        currentIndexFinish = arr.length - 1; // one page
      }
      $('.page-container').html(strTabs);
      onPageClick();
    };
  
    const addToDo = () => { // add todo
      const nameVal = $.trim($('#input-task').val()); // check script and trim spaces
      const taskItem = {
        name: _.escape(nameVal),
        id: Math.round(Math.random() * 100000),
        status: false,
      };
  
      if (taskItem.name.length === 0) { alert('Add something!'); } else { // validation
        taskList.push(taskItem);
      }
  
      $('.check-all').prop('checked', false); // unchecked "check-all"
      $('.filter-btn').removeClass('active');
      $('.all').addClass('active');
      renderPages(taskList);
      render(taskList);
    };
  
    $(document).on('click', '.item-checkbox', function () { // check ToDo
      const id = Number($(this).parent().attr('id'));
  
      for (const i in taskList) {
        if ((taskList[i].id === id) && ($('.item-checkbox').is(':checked'))) {
          taskList[i].status = true;
          // break;
        } else if ((taskList[i].status === true) && (taskList[i].id === id)) { // 
          taskList[i].status = false;
          break;
        } else if (taskList[i].status === true) {
          $('.check-all').prop('checked', true);
        }
      }
      console.log(taskList);
    });
  
    $(document).on('click', '.check-all', function () { // check all
      if ($(this).is(':checked')) {
        $('.item-checkbox').prop('checked', true);
        taskList.forEach((item) => {
          const task = item;
          task.status = true;
        });
      } else {
        $('.item-checkbox').prop('checked', false);
        taskList.forEach((item) => {
          const task = item;
          task.status = false;
        });
      }
      render(taskList);
    });
  
    $(document).on('keypress', '#input-task', (key) => { // addToDo by Enter 
      const enterKey = 13;
      if (key.which === enterKey) {
        addToDo();
        const masId = Object.values(taskList);
        console.log(masId);
      }
    });

  
    $(document).on('click', '#delete-task', function () { // delete todo
      const id = Number($(this).parent().attr('id'));
      taskList = taskList.filter((arr) => arr.id !== id);
      renderPages(taskList);
      render(taskList);
    });
  
    $(document).on('click', '.delete-completed', () => { // delete completed
      taskList = taskList.filter((arr) => arr.status === false);
      $('.check-all').prop('checked', false);
      renderPages(taskList);
      render(taskList);
    });
  
    const filterBtn = $('.filter-btn');
  
    $(document).on('click', '.not-completed', () => { // filter not-completed
      const notCompleted = taskList.filter((arr) => arr.status === false);
      filterBtn.removeClass('active');
      $('.not-completed').addClass('active');
      renderPages(notCompleted);
      render(notCompleted);
    });
  
    $(document).on('click', '.completed', () => { // filter completed
      const completed = taskList.filter((arr) => arr.status === true);
      filterBtn.removeClass('active');
      $('.completed').addClass('active');
      renderPages(completed);
      render(completed);
    });
  
    $(document).on('click', '.all', () => { // filter all
      filterBtn.removeClass('active');
      $('.all').addClass('active');
      renderPages(taskList);
      render(taskList);
    });
  
    $(document).on('dblclick', '.item-id', function () { // create input edit todo by dblclick
      const currentName = $(this).text();
      const id = Number($(this).parent().attr('id'));
      $(this).html(`<input type="text" id="${id}" class="edit-input form-control" value="${currentName}">`);
      $('.edit-input').focus();
    });
  
    $(document).on('keypress', '.edit-input', function (key) { // edit todo
      const id = Number($(this).attr('id'));
      console.log(id);
      if (key.which === 13) {
        for (const i in taskList) {
          if (taskList[i].id === id) {
            taskList[i].name = $('.edit-input').val();
            render(taskList);
          }
        }
      } else if (key.which === 27) { render(taskList); }
    });
  });