var mock = require('protractor-http-mock');

beforeEach(function(){
  mock([{
    request: {
      path: 'http://quiet-beach-24792.herokuapp.com/todos.json',
      method: 'GET'
    },
    response: {
      data: [{text: "ToDo1", completed: true}, {text: "ToDo2", completed: false}]
    }
  }]);
});

afterEach(function(){
  mock.teardown();
});

describe("app", function() {
  it("should get home page title", function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual("Todos App");
  });
});

describe('add a todo', function() {
  it('adds a todo to the page', function() {
    browser.get('/');
    $('input').sendKeys('ToDo3');
    element(by.id('add')).click();
    var list = $$('ul li');
    expect(list.last().getText()).toContain("ToDo3: not completed");
  });
});

describe('removes a todo', function() {
  it('removes todo from the page', function() {
    browser.get('/');
    $('input').sendKeys('ToDo3');
    element(by.id('add')).click();
    var list = $$('ul li');
    element(by.id('remove')).click();
    element(by.id('remove')).click();
    element(by.id('remove')).click();
    expect(list.count()).toEqual(0);
  });
});

describe('complete a todo', function() {
  it('completes a todo from the page', function() {
    browser.get('/');
    $('input').sendKeys('ToDo3');
    element(by.id('add')).click();
    var list = $$('ul li');
    list.last().element(by.id('complete')).click();
    expect(list.last().getText()).toContain("ToDo3: completed");
  });
});

describe('show ToDos which are not completed', function() {
  it('leaves the not compelted todos', function() {
    browser.get('/');
    element(by.id('incomplete-filter')).click();
    var list = $$('ul li');
    expect(list.getText()).toMatch("ToDo2: not completed");
  });
});

describe('show ToDos which are completed', function() {
  it('leaves the compelted todos', function() {
    browser.get('/');
    element(by.id('complete-filter')).click();
    var list = $$('ul li');
    expect(list.getText()).toMatch("ToDo1: completed");
  });
});
