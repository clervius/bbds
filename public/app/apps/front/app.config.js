angular.module('bigbodies').config(function($stateProvider, $urlRouterProvider, $locationProvider){
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
		.state('posts', {
			url: '/posts',
			templateUrl: '/client/app/apps/front/parts/category/post/detail',
			controller: 'postCtrl'
		})
		.state('post',{
			url: '/post/:id',
			templateUrl: '/client/app/apps/front/parts/category/post/page',
			controller: 'postCtrl2'
		})
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise('/');
});