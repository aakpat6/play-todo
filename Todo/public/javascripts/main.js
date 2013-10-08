requirejs.config({
  baseUrl: '/assets/javascripts',

  paths: {
    app: '.',

    templates: 'templates',

    taskController: 'controllers/task-controller'
  },

  shim: {
  }
});


define(function(require) {
  var TaskController = require('taskController');

  var taskController = new TaskController();

  $('.form-add').submit(function(event) {
    event.preventDefault();
    taskController.createTask($('input[name="label"]').val());
    $(this).find('input[name="label"]').val('');
  });
}
);
