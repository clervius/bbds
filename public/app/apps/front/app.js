angular.module('bigbodies', ['ui.router', 'angular-filepicker', 'ngRoute', 'ngResource', 'ngSanitize', 'ngMeta']).run(function($rootScope, $state, $stateParams, ngMeta){
	$rootScope.$on("$stateChangeError", console.log.bind(console));
	ngMeta.init();
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});