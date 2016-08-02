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
		
	$urlRouterProvider.otherwise('/')
})