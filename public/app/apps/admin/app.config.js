angular.module('manager').config(function($stateProvider, $urlRouterProvider){

	$stateProvider
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

	$urlRouterProvider.otherwise('/')
})