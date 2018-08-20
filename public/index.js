// DATA AND METHODS THAT CHANGE DATA => SPECIFIC

var todoList = {
  todos: [],
  addTodo: function(todoText) {
    if (todoText) {
      this.todos.push({
        todoText: todoText,
        completed: false
      });
    } else {
      console.log(`Please enter a valid todo`);
    }
  },
  changeTodo: function(oldTodo, newTodo) {
    this.todos.forEach(todo => {
      if (todo.todoText === oldTodo) {
        todo.todoText = newTodo;
      }
    });
  },
  toggleCompleted: function(completedTodo) {
    this.todos.forEach(todo => {
      if (todo.todoText === completedTodo) {
        todo.completed = !todo.completed;
      }
    });
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    // Get completed todos using forEach
    this.todos.forEach(todo => {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    // If completedTodos === totalTodos make everything false
    if (completedTodos === totalTodos) {
      this.todos.forEach(todo => {
        todo.completed = false;
      });

      // Otherwise make everything true;
    } else {
      this.todos.forEach(todo => {
        todo.completed = true;
      });
    }
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  }
};

// HANDLERS OBJECT FOR `HANDLING` USER INTERACTION

const handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    views.displayTodos();
  },
  addTodo: function() {
    let addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    views.displayTodos();
  },
  changeTodo: function() {
    let changeTodoCurrentText = document.getElementById("changeTodoCurrentText");
    let changeTodoNewText = document.getElementById("changeTodoNewText");
    todoList.changeTodo(changeTodoCurrentText.value, changeTodoNewText.value);
    changeTodoCurrentText.value = "";
    changeTodoNewText.value = "";
    views.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    views.displayTodos();
  },
  toggleCompleted: function() {
    let completedTodoText = document.getElementById("completedTodoText");
    todoList.toggleCompleted(completedTodoText.value);
    completedTodoText.value = "";
    views.displayTodos();
  }
};

// RESPONSIBLE FOR THINGS VIEWER SEES (NO LOGIC => JUST VIEWS)

const views = {
  displayTodos: function() {
    let todosUl = document.getElementById(`todo-list`);
    //  Clears list so we don't end up with duplicate lists
    todosUl.innerHTML = "";

    //  Refactor from for loop to forEach
    todoList.todos.forEach((todo, i) => {
      let todoLi = document.createElement(`li`);
      let todoText = ``;

      if (todo.completed === false) {
        todoText = `[ ] ${todoList.todos[i].todoText}`;
      } else {
        todoText = `[X] ${todoList.todos[i].todoText}`;
      }
      todoLi.id = i;
      todoLi.textContent = todoText;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    });
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement(`button`);
    deleteButton.textContent = `Delete`;
    deleteButton.className = `delete-button`;
    return deleteButton;
  },
  // Event delegation add listener to parent element => hears clicks on all elements
  eventListenerSetup: function() {
    var todosUl = document.querySelector(`ul`);
    todosUl.addEventListener(`click`, e => {
      var clickedElement = e.target;
      if (clickedElement.className === `delete-button`) {
        handlers.deleteTodo(parseInt(clickedElement.parentNode.id));
      }
    });
  }
};

// Allows our event listeners to run
views.eventListenerSetup();
