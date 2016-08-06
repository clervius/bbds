angular.module('bigbodies', ['ui.router', 'angular-filepicker', 'ngRoute', 'ngResource']).run(function($rootScope, $state, $stateParams){
	$rootScope.$on("$stateChangeError", console.log.bind(console));

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});