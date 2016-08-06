angular.module('bigbodies').config(function($stateProvider, $urlRouterProvider, $locationProvider, filepickerProvider){

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/client/app/apps/front/parts/home/index',
			controller: 'homeCtrl'
		})
		.state('athletes', {
			url: '/athletes',
			templateUrl: '/client/app/apps/front/parts/athletes/index',
			controller: 'athCtrl'
		})
	
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise('/');
	filepickerProvider.setKey('ASnewwz6T3qiMff59c3ngz');
});