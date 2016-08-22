// Athlete home controller
angular.module('bigbodies').controller('postCtrl', function($scope, posts){
	$scope.posts = posts.posts;
});

// View 
angular.module('bigbodies').controller('postCtrl2', function($scope, $http, $state, $stateParams, $sce){
	$scope.article = {};
	//$scope.content = {};
	$http.get('/editorial/' + $stateParams.id).success((data)=>{
		console.log('applying')
		$scope.article = data;
	});
	
});