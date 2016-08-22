// Athlete home controller
angular.module('bigbodies').controller('postCtrl', function($scope, posts, ngMeta){
	$scope.posts = posts.posts;
});

// View 
angular.module('bigbodies').controller('postCtrl2', function($scope, $http, $state, $stateParams, ngMeta, $sce){
	$scope.article = {};
	//$scope.content = {};
	$http.get('/editorial/' + $stateParams.id).success((data)=>{
		console.log('applying')
		$scope.article = data;
		ngMeta.setTag('author', data.author);
		ngMeta.setTag('description', data.subtitle);
		ngMeta.setTitle(data.postTitle);
		ngMeta.setTitle('og:image', data.mainImg.url + data.mainImg.filename);
		ngMeta.setTitle('og:description', data.subtitle);
		ngMeta.setTitle('og:author', data.author);
	});
	
});