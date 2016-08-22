// Post home controller
angular.module('manager').controller('postCtrl', function($scope, posts, $http){
	$scope.posts = posts.posts;
	$scope.delete = function(id){
		swal({  title: "Delete Athlete?",
            	    text: "You are requesting to delete this Athlete",
            	    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true,
                },function(){
                    $http.delete('/editorial/' + id).success(function(editorial){
						swal("Deleted", "Post has been deleted", "success");
						$('#' + id).remove();
					})
                })
		
	}
})

// Create Post Ctrl
angular.module('manager').controller('postCtrl1', function($scope, $http, filepickerService, $state, $stateParams){
	$scope.newPost = {};
	$scope.newPost.mainImg = {};

	$scope.tinymceOptions = {
		plugins: '',
		toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
	};
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
		$http.post('/editorial/new', $scope.newPost).success(function(newpost){			
			console.log(newpost); 			
			console.log('successfully created');
			$scope.newPost = {};
			swal({  title: "Post Saved",
            	    text: "You have successfully created the post " + newpost.postTitle,
            	    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Go to the post",
                    closeOnConfirm: true,
                },function(){
                    $state.go('post', {'id': newpost._id} );
                });
		})
	}

})

// view and edit post
angular.module('manager').controller('postCtrl2', function($scope, $http, filepickerService, $state, $stateParams){
	$scope.post = {};
	$scope.tinymceOptions = {
		plugins: '',
		toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
	};
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