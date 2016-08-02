// Federation home controller
angular.module('manager').controller('fedCtrl', function($scope, federations){
	$scope.homeMessage = "Now on Federations Page"
	$scope.federations = federations.federations;
	
})


// Federation home controller
angular.module('manager').controller('fedCtrl1', function($scope, $stateParams, $state, $http){
	$scope.federation = {}
	

	$http.get('/federation/' + $stateParams.id).success(function(data){
		$scope.federation = data
	});
	
})
