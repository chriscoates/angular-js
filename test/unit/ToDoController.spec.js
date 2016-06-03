describe('ToDoController', function() {
  beforeEach(module('toDoApp'));

  var ctrl, httpBackend, todo;
  var toDoData = [{text: "ToDo1", completed: true}, {text: "ToDo2", completed: false}];


  beforeEach(inject(function($httpBackend, $controller, _ToDoFactory_) {
    ctrl = $controller('ToDoController');
    ToDoFactory = _ToDoFactory_;
    httpBackend = $httpBackend;

    httpBackend.expectGET("http://quiet-beach-24792.herokuapp.com/todos.json").respond(toDoData);

    httpBackend.flush();
  }));

  it('adds a todo into todos array', function() {
    ctrl.addTodo("ToDo3");
    var todo = new ToDoFactory("ToDo3");
    expect(ctrl.todos).toContain(todo);
  });

  it('removes a todo out of the todos array', function() {
    ctrl.addTodo("ToDo3");
    ctrl.removeTodo();
    expect(ctrl.todos.length).toEqual(2);
  });

  it('filters out completed todos', function() {
    var todo1 = new ToDoFactory("ToDo1", true);
    var todo2 = new ToDoFactory("ToDo2", false);
    ctrl.incompleteFilter()
    expect(ctrl.todos).toEqual([todo2]);
  });

  it('filters out incompleted todos', function() {
    var todo1 = new ToDoFactory("ToDo1", true);
    var todo2 = new ToDoFactory("ToDo2", false);
    ctrl.completeFilter()
    expect(ctrl.todos).toEqual([todo1]);
  });
});