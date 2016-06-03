describe('ToDoController', function() {
  beforeEach(module('toDoApp'));

  var ctrl, httpBackend, todo;

  var toDoData = [{text: "ToDo1", completed: true}, {text: "ToDo2", completed: false}];


  beforeEach(inject(function($httpBackend, $controller, _ToDoFactory_) {
    ctrl = $controller('ToDoController');
    todo = new _ToDoFactory_("ToDo3");
    httpBackend = $httpBackend;

    httpBackend.expectGET("http://quiet-beach-24792.herokuapp.com/todos.json").respond(toDoData);

    httpBackend.flush();

  }));

  it('initialises with an empty array', function() {
    expect(ctrl.todos).toEqual([]);
  });

  it('adds a todo into todos array', function() {
    ctrl.addTodo("ToDo3");
    expect(ctrl.todos).toContain(todo);
  });

  it('removes a todo out of the todos array', function() {
    ctrl.addTodo("ToDo3");
    ctrl.removeTodo();
    expect(ctrl.todos.length).toEqual(0);
  });
});
