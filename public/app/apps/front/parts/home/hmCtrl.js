angular.module('bigbodies').controller('homeCtrl', function($scope, athletes){
	$scope.athletes = athletes.athletes;
	$scope.homeMessage = "This will be the last page that is built. Currently building Athlete detail page, Athletes home page, Article Detail page, Category Page. All of that data will then feed into this page."
})

angular.module('bigbodies').controller('hmSlider', function($scope){
	
});