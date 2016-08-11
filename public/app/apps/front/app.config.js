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
		.state('singleAthlete',{
			url:'/athlete/:athId',
			templateUrl: '/client/app/apps/front/parts/athletes/detail',
			controller: 'athCtrl1'
		})
		.state('singleAthlete.photos',{
			url:'/:gallery',
			templateUrl: '/client/app/apps/front/parts/athletes/includes/photoDetail',
			controller: 'athCtrl2'
		})
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise('/');
	filepickerProvider.setKey('ASnewwz6T3qiMff59c3ngz');
});