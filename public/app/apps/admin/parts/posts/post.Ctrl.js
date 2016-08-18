// Athlete home controller
angular.module('manager').controller('postCtrl', function($scope, posts){
	$scope.posts = posts.posts;
})

// Create Post Ctrl
angular.module('manager').controller('postCtrl1', function($scope, $http, filepickerService, $state, $stateParams){
	$scope.newPost = {};
	$scope.newPost.mainImg = {};

	$scope.uploadMainImg = function(){
		filepickerService.pick({
			mimetype: 'image/*',
			language: 'en',
			services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
			openTo: 'COMPUTER'
		}, function(Blob){
			console.log(angular.toJson(Blob));
			$scope.newPost.mainImg = Blob;
			$scope.$apply();
		})	
	}

	$scope.savePost = function(){
		$http.post('/editorial/new', $scope.newPost).success((err,newpost)=>{			
			if(err){console.log(err); console.log('could not create post')}
			else{
				console.log(newpost); 
				console.log('successfully created');
				$state.go('posts')
			}
		})
	}

})

// view and edit post
angular.module('manager').controller('postCtrl2', function($scope, $http, filepickerService, $state, $stateParams){
	$scope.post = {};

	$scope.updated = false;

	$http.get('/editorial/' + $stateParams.id).success((data)=>{
		//console.log(err || data);
		console.log('applying')
		$scope.post = data;
	});


	$scope.updatePost = function(){
		console.log('about to update this one');
		console.log($scope.post);
		$http.post('/editorial/update/' + $stateParams.id, $scope.post).success((data)=>{
			console.log('successfully updated');
			console.log(data);
			$scope.post = data;
			$scope.updated = true;
		})
	}
})