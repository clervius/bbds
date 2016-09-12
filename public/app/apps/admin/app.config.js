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
			ncyBreadcrumb: {
				label: 'Dashboard',
			},
			data: {
				pageTitle: 'Dashboard'
			}
		})
		.state('athletes', {
			url: '/athletes',
			templateUrl: '/client/app/apps/admin/parts/athletes/home',
			controller: 'athCtrl',
			ncyBreadcrumb: {
				label: 'Athletes',
				parent: 'dashboard'
			},
			data: {
				pageTitle: 'Athletes'
			}
		})
		.state('athlete', {
			url: '/athlete/:id',
			templateUrl: '/client/app/apps/admin/parts/athletes/detail',
			controller: 'athCtrl2',
			ncyBreadcrumb: {
				label: 'Single Athlete',
				parent: 'athletes'
			},
			data: {
				pageTitle: 'Single Athlete'
			}
		})
		.state('athlete.addAlbum', {
			url: '/gallery/:id',
			templateUrl: '/client/app/apps/admin/parts/athletes/newAlbum',
			controller: 'athCtrl3',
			ncyBreadcrumb: {
				label: 'Create Album',
				parent: 'athlete'
			},
			data: {
				pageTitle: 'Create Album'
			}
		})
		.state('athlete.editAlbum', {
			url: '/editGallery/:id/:galId',
			templateUrl: '/client/app/apps/admin/parts/athletes/editAlbum',
			controller: 'athCtrl4',
			ncyBreadcrumb: {
				label: 'Edit Album',
				parent: 'athlete'
			},
			data: {
				pageTitle: 'Edit Album'
			}
		})
		.state('newAthlete', {
			url: '/athletes/add',
			templateUrl: '/client/app/apps/admin/parts/athletes/newNew',
			controller: 'athCtrl1',
			ncyBreadcrumb: {
				label: 'Create Athlete',
				parent: 'athletes'
			},
			data: {
				pageTitle: 'Add Athlete'
			}
		})
		.state('federations', {
			url: '/federations',
			templateUrl: '/client/app/apps/admin/parts/federations/home',
			controller: 'fedCtrl',
			ncyBreadcrumb: {
				label: 'Federations',
				parent: 'dashboard'
			},
			data: {
				pageTitle: 'Federations'
			}
		})
		.state('federation', {
			url: '/federations/:id',
			templateUrl: '/client/app/apps/admin/parts/federations/detail',
			controller: 'fedCtrl1',
			ncyBreadcrumb: {
				label: 'Single Federation',
				parent: 'federations'
			},
			data: {
				pageTitle: 'Single Federation'
			}
		})
		.state('federation.addDivision', {
			url: '/div/:id',
			templateUrl: '/client/app/apps/admin/parts/federations/newDivision',
			controller: 'fedCtrl3',
			ncyBreadcrumb: {
				label: 'Create Division',
				parent: 'federation'
			},
			data: {
				pageTitle: 'Create Division'
			}
		})
		.state('createfederation', {
			url: '/create/federation',
			templateUrl: '/client/app/apps/admin/parts/federations/newfederation',
			controller: 'fedCtrl2',
			ncyBreadcrumb: {
				label: 'Create Federation',
				parent: 'federation'
			},
			data: {
				pageTitle: 'New Federation'
			}
		})
		.state('posts', {
			url:'/posts',
			templateUrl: '/client/app/apps/admin/parts/posts/home',
			controller: 'postCtrl',
			ncyBreadcrumb: {
				label: 'Editorials',
				parent: 'dashboard'
			},
			data: {
				pageTitle: 'Articles'
			}
		})
		.state('newPosts', {
			url:'/create/post',
			templateUrl: '/client/app/apps/admin/parts/posts/new',
			controller: 'postCtrl1',
			ncyBreadcrumb: {
				label: 'Create Editorial',
				parent: 'posts'
			},
			data: {
				pageTitle: 'New Article'
			}
		})
		.state('post', {
			url: '/post/:id',
			templateUrl: 'client/app/apps/admin/parts/posts/detail',
			controller: 'postCtrl2',
			ncyBreadcrumb: {
				label: 'Single Article',
				parent: 'posts'
			},
			data: {
				pageTitle: 'Single Post'
			}
		})
	$locationProvider.hashPrefix('!');
	$urlRouterProvider.otherwise('/');

	filepickerProvider.setKey('ASnewwz6T3qiMff59c3ngz');
})