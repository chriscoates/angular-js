toDoApp.controller('ToDoController', ['ToDoService', "ToDoFactory", function(ToDoService, ToDoFactory) {
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

  self.incompleteFilter = function() {
    ToDoService.getAll();
    self.todos = self.todos.filter(function(todo) {
      return todo.completed === false
    });
  };

  self.completeFilter = function() {
    ToDoService.getAll();
    self.todos = self.todos.filter(function(todo) {
      return todo.completed === true
    });
  };

}]);