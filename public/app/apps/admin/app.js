angular.module('manager', ['ui.router', 'angular-filepicker', 'ngRoute', 'ngResource', 'ui.tinymce', 'ncy-angular-breadcrumb', 'checklist-model']).run(function($rootScope, $state, $stateParams){
	$rootScope.$on("$stateChangeError", console.log.bind(console));

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});


