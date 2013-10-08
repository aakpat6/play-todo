define(function(require) {
  function TaskController(container) {
    this.tasks = [];
    this.container = $(container);
    this.loadTasks();
  }

  TaskController.prototype.loadTasks = function() {
    var self = this;
    $.ajax('/tasks', {
      method: 'get',
      success: function(result) {
        self.tasks = JSON.parse(result);
        self.renderTasks();
      }
    });
  };

  TaskController.prototype.deleteTask = function(taskContainer, id) {
    var self = this;
    $.ajax('/tasks', {
      method: 'delete',
      data: {id: id},
      success: function(result) {
        self.tasks = JSON.parse(result);
        $(taskContainer).slideUp(function() {
          $(this).remove();
        });
      }
    });
  };

  TaskController.prototype.createTask = function(label) {
    var self = this;
    var Templates = require('templates');
    $.ajax('/tasks', {
      method: 'post',
      data: {label: label},
      success: function(result) {
        var task = JSON.parse(result);
        self.tasks.push(task);
        var taskView = $(Mustache.render(Templates.task, task)).hide();
        self.container.append(taskView);
        taskView.slideDown();
        $('.btn-delete').click(function() {
          var t = $(this).closest('.task');
          self.deleteTask(t, $(this).data('id'));
        });
      }
    });
  };

  TaskController.prototype.renderTasks = function() {
    var self = this;
    self.container.html(self.generateHtml());
    $('.btn-delete').click(function() {
      var t = $(this).closest('.task');
      self.deleteTask($(this).data('id'));
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
