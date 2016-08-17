// Athlete home controller
angular.module('bigbodies').controller('postCtrl', function($scope, posts){
	$scope.posts = posts.posts;
});

// View and edit post
angular.module('bigbodies').controller('postCtrl2', function($scope, $http, $state, $stateParams){
	$scope.article = {};

	$scope.updated = false;

	$http.get('/editorial/' + $stateParams.id).success((data)=>{
		console.log('applying')
		$scope.article = data;
	});
});