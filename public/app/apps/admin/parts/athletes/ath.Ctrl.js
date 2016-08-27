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
                    $http.delete('/ath/' + id).success(function(message){
						swal("Deleted", "Athlete has been deleted", "success");
						console.log(message);
						location.reload();
					}).error(function(err){
						consolee.log(err);
						console.log('could not delete atlete')
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
					if(item.year.length < 1 && item.federation.length < 1 && item.show.length < 1 && item.division.length < 1 && item.class.length < 1 && item.place.length < 1 ){
						console.log('This competition has no information, not adding it.')
					}else{
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
					}
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

// Athlete detail and edit page
angular.module('manager').controller('athCtrl2', function($scope, $http, $stateParams, filepickerService, $state){
	$scope.athlete = {};
	$scope.$state = $state;
	$scope.$stateParams = $stateParams;
	$scope.records = [];
	$scope.newVideo = {};
	// Dealing with records
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
		};
		$scope.records.push(record);
	};
	$scope.removeRecord = function(){
		var lastItem = $scope.records.length - 1;
		$scope.records.splice(lastItem);
	};

	// Galleries
	$scope.newPictures = [];
	$scope.deleteList = {};
	$scope.toBeDeleted = [];
	$scope.deleteGallery = function(id){
		console.log('looking to delete this gallery');
		swal({  title: "Delete Gallery?",
            	    text: "You are requesting to delete this Gallery",
            	    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true,
                },function(){
                    $http.delete('/ath/' + $scope.athlete._id + '/gallery/' + id).success(function(athlete){
						swal("Deleted", "Gallery has been deleted", "success");
						location.reload();
					});
                });
	};
	$scope.addPictures = function(){
		filepickerService.pickMultiple({
			mimetype: 'image/*',
			language: 'en',
			maxFiles: 15,
			services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
			openTo: 'COMPUTER'
		},function(Blob){
			console.log('uploaded image')
			console.log(JSON.stringify(Blob));
			$scope.newPictures = Blob;
			$scope.$apply();
		});
	};
	$scope.addToList = function(){

	};
	$scope.deleteImages = function(album){
		angular.forEach($scope.deleteList, function(value, key){
			if(key == true){
				console.log(value);
				$scope.toBedeleted.push(value);
				console.log($scope.toBedeleted)
			}
		});
		$http.delete('/ath/' + $scope.athlete._id + '/deleteFromAlbum/' + album, $scope.deleteList)
	};
	$scope.cancelNewPix = function(){
		swal({  title: "Cancel?",
            	    text: "You are requesting to cancel adding new pictures. This will delete anything you've uploaded.",
            	    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Yes, Cancel",
                    closeOnConfirm: true,
                },function(){
                    $scope.newPictures = [];
                });
	};
	$scope.saveNewPix = function(album){
		$http.post('/ath/' + $scope.athlete._id + '/addToAlbum/' + album, $scope.newPictures).success((data)=>{
			angular.forEach($scope.newPictures, function(item){
				angular.forEach($scope.athlete.galleries, function(gallery){
					if(gallery._id == album){
						gallery.images.push(item);
					}
				})
			})
			$scope.newPictures = [];

		})
	};
	// Updating Profile picture
	$scope.newPicture = function(){
		filepickerService.pick({
			mimetype: 'image/*',
			language: 'en',
			services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
			openTo: 'COMPUTER'
		},function(Blob){
			console.log(angular.toJson(Blob));
			$scope.athlete.profile.picture = Blob;
			$scope.$apply();
		});
	};
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

	$scope.updateRecord = function(id){
		if(id){
			// find the record and update it
		}else{
			//create a brand new record.
		}
	}
	$scope.updateAthlete = function(){
		console.log('about to update this athlete')
	};

	// Add video

	$scope.addVideo = function(){
		console.log('adding video');
		swal({
            title: 'Paste the link to a Youtube Video in here',
            html: '<p>YouTube Videos ONLY.</p><div class="form-group"><input id="videoLink" class="form-control" placeholder="https://www.youtube.com/watch?v=63rJrBa8s_8">',
            showCancelButton: true,
            closeOnConfirm: false,
            allowOutsideClick: false
            },
            function() {
            	$scope.newVideo.link = $('#videoLink').val();
            	$scope.newVideo.thumb = $.jYoutube($scope.newVideo.link, 'big');
            	console.log($scope.newVideo)

            	$http.post('/ath/' + $stateParams.id + '/addVideo', $scope.newVideo).success((video)=>{
            		console.log('successfully added the video');
            		swal({ html: 'You successfully added the video.' });
            		location.reload();
            	})
            })

	};

	// function to create/update Athlete
	$scope.updateAth = function(){
		console.log('updating this athlete...');
		//addSocial($scope.personalFB); addSocial($scope.publicFB); addSocial($scope.twitter); addSocial($scope.instagram); addSocial($scope.youtube); addSocial($scope.gPlus); addSocial($scope.web1); addSocial($scope.web2); 
		//addCountries($scope.primaryCountry); addCountries($scope.secondaryCountry);		
		//$scope.newAthlete.countries = $scope.countries;
		//$scope.newAthlete.social = $scope.socials;
		console.log($scope.user);
		console.log($scope.athlete);
		// Create this athlete
		$http.post('/ath/update/' + $stateParams.id, $scope.athlete)
			.success(function(data){
				console.log(angular.toJson(data));
				var athId = data._id;				
				swal("Athlete Updated", "Athlete has been successfully updated", "success")
			})
			.error(function(data){
				console.log('could not save the athlete');
				console.log(data);
			})
	}
	// end function to create/update athlete
});

// New Album Controller
angular.module('manager').controller('athCtrl3', function($scope, $http, $stateParams, filepickerService, $state){
	$scope.newAlbum = {};
	$scope.newAlbum.images = [];
	$scope.newAlbum.athlete = $stateParams.id;

	$scope.close = function(){
		$state.go('athlete', {'id': $stateParams.id} );
	};

	$scope.addPictures = function(){
		filepickerService.pickMultiple({
			mimetype: 'image/*',
			language: 'en',
			maxFiles: 15,
			services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
			openTo: 'COMPUTER'
		},function(Blob){
			console.log('uploaded image')
			console.log(JSON.stringify(Blob));
			$scope.newAlbum.images = Blob;
			$scope.$apply();
		})
	};

	// Create Album
	$scope.createAlbum = function(){
		console.log('Adding this gallery');
		console.log($scope.newAlbum.images);
		$http.post('/ath/addGallery', $scope.newAlbum).success(function(data){
			console.log('successfully added this album')
			console.log(data);
			$state.go('athlete', {'id': $stateParams.id} );
			swal({  title: "Album Saved",
            	    text: "You have successfully created this album.",
            	    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Okay",
                    closeOnConfirm: true,
                },function(){
                    location.reload();
                });
		})
	};
	
});

// Controller to edit albums.
angular.module('manager').controller('athCtrl4', function($scope, $http, $stateParams, filepickerService, $state){
	$scope.album = {};
	$scope.newPictures = [];
	$scope.numPics = '';
	$scope.$stateParams = $stateParams;
	$http.get('/ath/' + $stateParams.id).success((data)=>{
		console.log('got the athlete')
		angular.forEach(data.galleries, function(gallery, key){
			console.log('looking for the album')
			if(gallery._id === $stateParams.galId){
				console.log('got the album');
				$scope.album = gallery;
				$scope.numPics = gallery.images.length;
			}
		});
	});


	$scope.addPictures = function(){
		filepickerService.pickMultiple({
			mimetype: 'image/*',
			language: 'en',
			maxFiles: 15,
			services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
			openTo: 'COMPUTER'
		},function(Blob){
			console.log('uploaded image')
			console.log(JSON.stringify(Blob));
			$scope.newPictures = Blob	
			$scope.$apply();
		})
	};
	$scope.close = function(){
		parent.history.back();
	}
	$scope.deleteImages = function(){};
	$scope.updateAlbum = function(){
		if($scope.newPictures.length > 0){
			angular.forEach($scope.newPictures, function(picture, key){
				$scope.album.images.push(picture);

			});
		}
		console.log('going to update this album');
		console.log($scope.album);
		$http.post('/ath/' + $stateParams.id + '/editAlbum/' + $scope.album._id, $scope.album).success((athlete)=>{
			console.log('successfully edited album');
			parent.history.back();
			swal({  title: "Album Saved",
            	    text: "You have successfully updated this album.",
            	    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Okay",
                    closeOnConfirm: true,
                },function(){
                    location.reload();
                });
		})
	};
});