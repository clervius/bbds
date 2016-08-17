angular.module('manager').config(function($stateProvider, $urlRouterProvider, filepickerProvider, $locationProvider){

	$stateProvider
		.state('signin',{
			url: '/access/signin',
			templateUrl: '/client/app/apps/admin/parts/auth/signin'
		})
		.state('signup',{
			url: '/signup',
			templateUrl: '/client/app/apps/admin/parts/auth/signup'
		})
		.state('dashboard',{
			url: '/',
			templateUrl: '/client/app/apps/admin/parts/dashboard/dashboard',
			controller: 'dashCtrl',
			data: {
				pageTitle: 'Dashboard'
			}
		})
		.state('athletes', {
			url: '/athletes',
			templateUrl: '/client/app/apps/admin/parts/athletes/home',
			controller: 'athCtrl',
			data: {
				pageTitle: 'Athletes'
			}
		})
		.state('athlete', {
			url: '/athlete/:id',
			templateUrl: '/client/app/apps/admin/parts/athletes/detail',
			controller: 'athCtrl2',
			data: {
				pageTitle: 'Single Athlete'
			}
		})
		.state('athlete.addAlbum', {
			url: '/gallery/:id',
			templateUrl: '/client/app/apps/admin/parts/athletes/newAlbum',
			controller: 'athCtrl3',
			data: {
				pageTitle: 'Create Album'
			}
		})
		.state('newAthlete', {
			url: '/athletes/add',
			templateUrl: '/client/app/apps/admin/parts/athletes/new',
			controller: 'athCtrl1',
			data: {
				pageTitle: 'Add Athlete'
			}
		})
		.state('federations', {
			url: '/federations',
			templateUrl: '/client/app/apps/admin/parts/federations/home',
			controller: 'fedCtrl',
			data: {
				pageTitle: 'Federations'
			}
		})
		.state('federation', {
			url: '/federations/:id',
			templateUrl: '/client/app/apps/admin/parts/federations/detail',
			controller: 'fedCtrl1',
			data: {
				pageTitle: 'Single Federation'
			}
		})
		.state('federation.addDivision', {
			url: '/div/:id',
			templateUrl: '/client/app/apps/admin/parts/federations/newDivision',
			controller: 'fedCtrl3',
			data: {
				pageTitle: 'Create Division'
			}
		})
		.state('createfederation', {
			url: '/create/federation',
			templateUrl: '/client/app/apps/admin/parts/federations/newfederation',
			controller: 'fedCtrl2',
			data: {
				pageTitle: 'New Federation'
			}
		})
		.state('posts', {
			url:'/posts',
			templateUrl: '/client/app/apps/admin/parts/posts/home',
			controller: 'postCtrl',
			data: {
				pageTitle: 'Articles'
			}
		})
		.state('newPosts', {
			url:'/create/post',
			templateUrl: '/client/app/apps/admin/parts/posts/new',
			controller: 'postCtrl1',
			data: {
				pageTitle: 'New Article'
			}
		}).
		state('post', {
			url: '/post/:id',
			templateUrl: 'client/app/apps/admin/parts/posts/detail',
			controller: 'postCtrl2',
			data: {
				pageTitle: 'Single Post'
			}
		})
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	filepickerProvider.setKey('ASnewwz6T3qiMff59c3ngz');
})