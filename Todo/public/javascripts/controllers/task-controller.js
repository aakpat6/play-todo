define(function(require) {
  function TaskController() {
    this.tasks = [];
    this.loadTasks();
  }

  TaskController.prototype.loadTasks = function() {
    var self = this;
    $.ajax('/tasks', {
      method: 'get',
      success: function(result) {
        self.tasks = JSON.parse(result);
        $('.tasks').html(self.generateHtml());
        $('.btn-delete').click(function() {
          var t = $(this).closest('.task');
          self.deleteTask($(this).data('id'), function() {
            t.remove();
          });
        });
      }
    });
  };

  TaskController.prototype.deleteTask = function(id, callback) {
    var self = this;
    $.ajax('/tasks/delete', {
      method: 'post',
      data: {id: id},
      success: function() {
        self.loadTasks();
        callback();
      }
    });
  };

  TaskController.prototype.createTask = function(label) {
    var self = this;
    $.ajax('/tasks', {
      method: 'post',
      data: {label: label},
      success: function() {
        self.loadTasks();
      }
    });
  };

  TaskController.prototype.generateHtml = function() {
    var self = this;
    var tasksHtml = '';
    var Templates = require('templates');
    _.each(self.tasks, function(task) {
      tasksHtml += Mustache.render(Templates.task, task);
    });
    return tasksHtml;
  };

  return TaskController;
});
