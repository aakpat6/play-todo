requirejs.config({
  baseUrl: '/assets/javascripts/vendor',

  paths: {
    app: '..',

    jquery: [
    '//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min',
    'jquery-1.9.0.min'
    ],

    bootstrap: 'bootstrap.min',

    underscore: 'underscore-min',

    mustache: 'mustache',

    templates: '../templates'
  },

  shim: {
    bootstrap: {
      exports: '$',
      deps: ['jquery']
    },

    underscore: {
      exports: '_'
    },

    templates: {
      exports: 'Templates'
    }
  }
});


define(['bootstrap', 'underscore', 'mustache', 'templates'],
  function($, _, Mustache, Templates) {
    var reloadTasks = function() {
      $.ajax('/tasks', {
        method: 'get',
        success: function(result) {
          var data = JSON.parse(result);
          console.log(result);
          var tasksHtml = '';
          _.each(data, function(task) {
            tasksHtml += Mustache.render(Templates.task, task);
            console.log(task);
          });
          $('.tasks').html(tasksHtml);
          $('.btn-delete').click(function() {
            var self = this;
            $.ajax('/tasks/delete', {
              method: 'post',
              data: {id: $(self).data('id')},
              success: function() {
                $(self).closest('.task').remove();
              }
            });
          });
        }
      });

    };

    var createTask = function(label) {
      $.ajax('/tasks', {
        method: 'post',
        data: {
          label: label
        },
        success: function() {
          reloadTasks();
        }
      });
    };


    $('.form-add').submit(function(event) {
      event.preventDefault();
      createTask($('input[name="label"]').val());
      $(this).find('input[name="label"]').val('');
    });

    reloadTasks();
  }
  );
