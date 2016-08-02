angular.module('manager', ['ui.router', 'angular-filepicker']).run(function($rootScope, $state, $stateParams){
	$rootScope.$on("$stateChangeError", console.log.bind(console));

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});