toDoApp.controller('ToDoController', ['ToDoService', "ToDoFactory", function(ToDoService, ToDoFactory) {
  // this.todos = [];
  var self = this;

  ToDoService.getAll().then(function(todos){
    self.todos = todos;
  });

  this.addTodo = function(todoText) {
    this.todos.push(new ToDoFactory(todoText));
  };

  this.removeTodo = function() {
    this.todos.pop();
  };
}]);