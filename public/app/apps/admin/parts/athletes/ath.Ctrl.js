// Athlete home controller
angular.module('manager').controller('athCtrl', function($scope, athletes, $http){
	$scope.homeMessage = "Now on Athlete Page"
	$scope.athletes = athletes.athletes;
	$scope.delete = function(id){
		swal({  title: "Delete Athlete?",
            	    text: "You are requesting to delete this Athlete",
            	    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true,
                },function(){
                    $http.delete('/ath/' + id).success(function(athlete){
						swal("Deleted", "Athlete has been deleted", "success");
						$('#' + id).remove();
					})
                })
		
	}
	
});


// Controller for adding athletes
angular.module('manager').controller('athCtrl1', function($scope, federations, filepickerService, $http, $state){
	$scope.federations = federations.federations;
	$scope.newAthlete = {};
	$scope.newAthlete.profile = {};
	$scope.socials = [];
	$scope.countries = [];
	$scope.editorials = [ {id: 'post1', link: '', title: ''} ]
	$scope.records = [ {id: 'record1', year: '', federation: '', show:'', division: '', class: '', place: '', _creator: $scope.user} ]
	$scope.newPicture = function(){
		filepickerService.pick({
			mimetype: 'image/*',
			language: 'en',
			services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
			openTo: 'IMAGE_SEARCH'
		},function(Blob){
			console.log(angular.toJson(Blob));
			$scope.newAthlete.profile.picture = Blob;
			$scope.$apply();
		});
	};

	// Social profiles code
	$scope.personalFB = { service: 'personal Facebook' };
	$scope.publicFB = { service: 'public Facebook' };
	$scope.twitter = { service: 'twitter' };
	$scope.instagram = { service: 'instagram' };
	$scope.youtube = { service: 'youtube' };
	$scope.gPlus = { service: 'google plus' };
	$scope.web1 = { service: 'web1' };
	$scope.web2 = { service: 'web2' };
	var addSocial = function(account){		
			$scope.socials.push(account);
	}
	// Countries
	$scope.primaryCountry = { classify: 'primary' }
	$scope.secondaryCountry = { classify: 'secondary' }
	var addCountries = function(input){
			$scope.countries.push(input)
	}

	// editorial publishings
	$scope.addPost = function(){
		newItemNo = $scope.editorials.length + 1;
		var post = {
			id: 'post' + newItemNo,
			link: '',
			title: ''
		}
		$scope.editorials.push(post)
	}
	// competition records
	$scope.addRecord = function(){
		var newItemNo = $scope.records.length + 1;
		var record = {
			id: 'record' + newItemNo,
			year: '',
			federation: '',
			show:'',
			division: '',
			class: '',
			place: '',
			_creator: $scope.user
		}
		$scope.records.push(record);
	};
	$scope.removeRecord = function(){
		var lastItem = $scope.records.length - 1;
		$scope.records.splice(lastItem);
	};
	$scope.saveRecord = function(record){
		console.log('adding: ' + angular.toJson(record) + 'to records array.');
	};

	$scope.newAthlete.countries = $scope.countries;
	$scope.newAthlete.published = $scope.editorials;
	$scope.newAthlete._creator = $scope.user;
	$scope.createAthlete = function(){
		console.log('creating this athlete...');
		addSocial($scope.personalFB); addSocial($scope.publicFB); addSocial($scope.twitter); addSocial($scope.instagram); addSocial($scope.youtube); addSocial($scope.gPlus); addSocial($scope.web1); addSocial($scope.web2); 
		addCountries($scope.primaryCountry); addCountries($scope.secondaryCountry);		
		$scope.newAthlete.countries = $scope.countries;
		$scope.newAthlete.social = $scope.socials;
		console.log($scope.user);
		console.log($scope.newAthlete);
		// Create this athlete
		$http.post('/ath/new', $scope.newAthlete)
			.success(function(data){
				console.log(angular.toJson(data));
				var athId = data._id;
				// Add this athlete into the records objects
				angular.forEach($scope.records, function(item, key){
					item.athlete = athId; 
					console.log(item);
					console.log('going to create the above record');
					$http.post('/record/new', item)
						.success(function(data){
							console.log('successfully created the record as: '  + angular.toJson(data));
							// need to now add this record back into the athlete.
							$http.post('/ath/addRecord', data)
								.success(function(data){
									console.log('successfully added record into athlete');
									console.log(angular.toJson(data))
								})
								.error(function(data){
									console.log('could not add that record back into athlete');
									console.log(angular.toJson(data))
								})
						})
						.error(function(data){
							console.log('did not create the record');
							console.log(angular.toJson(data))
						});
				});
				$scope.newAthlete = {};
				$scope.records = [ {id: 'record1', year: '', federation: '', show:'', division: '', class: '', place: '', _creator: $scope.user} ]
				swal({  title: "Athlete Saved",
            	    text: "You have successfully created the athlete " + data.profile.firstName,
            	    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Go to Athlete Page",
                    closeOnConfirm: true,
                },function(){
                    $state.go('athlete', {'id': data._id} );
                });

			})
			.error(function(data){
				console.log('could not create the athlete');
				console.log(data);
			})
	}
});

// Athlete detail page
angular.module('manager').controller('athCtrl2', function($scope, $http, $stateParams){
	$scope.athlete = {};
	$scope.records = [];


	$http.get('/ath/' + $stateParams.id).success(function(data){
		$scope.athlete= data;
	});
	
	$http.get('/record/ath/' + $stateParams.id).success(function(data){
		console.log(data);
		data.forEach(function(record){
			console.log(record);
			$scope.records.push(record);
		})
	})
	

});

// New Album Controller
angular.module('manager').controller('athCtrl3', function($scope, $http, $stateParams, filepickerService){
	$scope.newAlbum = {};
	$scope.newAlbum.images = [];
	$scope.newAlbum.athlete = $stateParams.id;

	$scope.addPictures = function(){
		filepickerService.pickMultiple({
			mimetype: 'image/*',
			language: 'en',
			maxFiles: 10,
			services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
			openTo: 'COMPUTER'
		},function(Blob){
			console.log('uploaded image')
			console.log(JSON.stringify(Blob));
			$scope.newAlbum.images = Blob;
			$scope.$apply();
		})
	};


	$scope.createAlbum = function(){
		console.log('Adding this gallery');
		console.log($scope.newAlbum.images);
		$http.post('/ath/addGallery', $scope.newAlbum).success(function(data){
			console.log('successfully added this album')
			console.log(data);
			$scope.newAlbum = {};
		})
	};
});