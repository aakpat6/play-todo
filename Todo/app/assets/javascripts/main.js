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


define(['bootstrap', 'underscore', 'mustache', 'templates'], function($, _, Mustache, Templates) {
  $('h1').css('color', 'green');
  $.ajax('/tasks', {
    method: 'get',
    success: function(result) {
      var data = JSON.parse(result);
      var tasksHtml = '';
      _.each(data, function(label) {
        tasksHtml += Mustache.render(Templates.task, {label: label});
        console.log(Templates.task);
      });
      $('.tasks').html(tasksHtml);
    }
  });
});
