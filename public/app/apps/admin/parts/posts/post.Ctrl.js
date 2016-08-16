// Athlete home controller
angular.module('manager').controller('postCtrl', function($scope, athletes){})

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
			if(!err){console.log(newpost); console.log('successfully created')}
			else if(err){console.log(err); console.log('could not create post')}
		})
	}

})