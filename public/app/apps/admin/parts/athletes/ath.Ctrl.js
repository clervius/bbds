// Athlete home controller
angular.module('manager').controller('athCtrl', function($scope, athletes){
	$scope.homeMessage = "Now on Athlete Page"
	$scope.athletes = athletes.athletes;
	
})


// Controller for adding athletes
angular.module('manager').controller('athCtrl1', function($scope){
	$scope.homeMessage = "Now on Athlete Page"
})