angular.module('manager').config(function($stateProvider, $urlRouterProvider, filepickerProvider){

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
		.state('athletes.add', {
			url: '/athletes/add',
			templateUrl: '/client/app/apps/admin/parts/athletes/add',
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
		
	$urlRouterProvider.otherwise('/');

	filepickerProvider.setKey('ASnewwz6T3qiMff59c3ngz');
})