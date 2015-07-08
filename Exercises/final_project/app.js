angular.module('services', ['ui.router', 'ngMessages']).config(Config);

function Config($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('newtask', {
      url: '/newtask',
      templateUrl: 'templates/newContact.html',
      controller: 'NewTaskController'
    })
    .state('taskslist', {
      url: '/taskslist',
      templateUrl: 'templates/taskslist.html',
      controller: 'TasksListController'
    }).state('taskslist.single', {
      url: '/:id',
      templateUrl: 'templates/singletask.html',
      controller: 'SingleTaskController'
    }).state('login', {
      url:'/login',
      templateUrl:'templates/login.html',
      controller: 'AuthController'
    });
  $urlRouterProvider.otherwise('/login');
}
