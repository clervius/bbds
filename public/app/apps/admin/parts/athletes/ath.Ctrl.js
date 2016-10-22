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
	$scope.personalFB = { service: 'personal Facebook', account: 'facebook-square'};
	$scope.publicFB = { service: 'public Facebook', account: 'facebook' };
	$scope.twitter = { service: 'twitter', account: 'twitter' };
	$scope.instagram = { service: 'instagram', account: 'instagram' };
	$scope.youtube = { service: 'youtube', account: 'youtube-play' };
	$scope.gPlus = { service: 'google plus', account: 'google-plus' };
	$scope.web1 = { service: 'web1', account: 'globe' };
	$scope.web2 = { service: 'web2', account: 'globe' };
	var addSocial = function(account){	
			if(account.link !== ''){
				$scope.socials.push(account);
			}	
	}
	// Countries
	$scope.countryList = [{ value : "AF", label: "Afghanistan"},
						{ value : "AX", label: "Åland Islands"},
						{ value : "AL", label: "Albania"},
						{ value : "DZ", label: "Algeria"},
						{ value : "AS", label: "American Samoa"},
						{ value : "AD", label: "Andorra"},
						{ value : "AO", label: "Angola"},
						{ value : "AI", label: "Anguilla"},
						{ value : "AQ", label: "Antarctica"},
						{ value : "AG", label: "Antigua and Barbuda"},
						{ value : "AR", label: "Argentina"},
						{ value : "AM", label: "Armenia"},
						{ value : "AW", label: "Aruba"},
						{ value : "AU", label: "Australia"},
						{ value : "AT", label: "Austria"},
						{ value : "AZ", label: "Azerbaijan"},
						{ value : "BS", label: "Bahamas"},
						{ value : "BH", label: "Bahrain"},
						{ value : "BD", label: "Bangladesh"},
						{ value : "BB", label: "Barbados"},
						{ value : "BY", label: "Belarus"},
						{ value : "BE", label: "Belgium"},
						{ value : "BZ", label: "Belize"},
						{ value : "BJ", label: "Benin"},
						{ value : "BM", label: "Bermuda"},
						{ value : "BT", label: "Bhutan"},
						{ value : "BO", label: "Bolivia"},
						{ value : "BA", label: "Bosnia and Herzegovina"},
						{ value : "BW", label: "Botswana"},
						{ value : "BV", label: "Bouvet Island"},
						{ value : "BR", label: "Brazil"},
						{ value : "IO", label: "British Indian Ocean Territory"},
						{ value : "BN", label: "Brunei Darussalam"},
						{ value : "BG", label: "Bulgaria"},
						{ value : "BF", label: "Burkina Faso"},
						{ value : "BI", label: "Burundi"},
						{ value : "KH", label: "Cambodia"},
						{ value : "CM", label: "Cameroon"},
						{ value : "CA", label: "Canada"},
						{ value : "CV", label: "Cape Verde"},
						{ value : "KY", label: "Cayman Islands"},
						{ value : "CF", label: "Central African Republic"},
						{ value : "TD", label: "Chad"},
						{ value : "CL", label: "Chile"},
						{ value : "CN", label: "China"},
						{ value : "CX", label: "Christmas Island"},
						{ value : "CC", label: "Cocos (Keeling) Islands"},
						{ value : "CO", label: "Colombia"},
						{ value : "KM", label: "Comoros"},
						{ value : "CG", label: "Congo"},
						{ value : "CD", label: "Congo, The Democratic Republic of The"},
						{ value : "CK", label: "Cook Islands"},
						{ value : "CR", label: "Costa Rica"},
						{ value : "CI", label: "Cote D'ivoire"},
						{ value : "HR", label: "Croatia"},
						{ value : "CU", label: "Cuba"},
						{ value : "CY", label: "Cyprus"},
						{ value : "CZ", label: "Czech Republic"},
						{ value : "DK", label: "Denmark"},
						{ value : "DJ", label: "Djibouti"},
						{ value : "DM", label: "Dominica"},
						{ value : "DO", label: "Dominican Republic"},
						{ value : "EC", label: "Ecuador"},
						{ value : "EG", label: "Egypt"},
						{ value : "SV", label: "El Salvador"},
						{ value : "GQ", label: "Equatorial Guinea"},
						{ value : "ER", label: "Eritrea"},
						{ value : "EE", label: "Estonia"},
						{ value : "ET", label: "Ethiopia"},
						{ value : "FK", label: "Falkland Islands (Malvinas)"},
						{ value : "FO", label: "Faroe Islands"},
						{ value : "FJ", label: "Fiji"},
						{ value : "FI", label: "Finland"},
						{ value : "FR", label: "France"},
						{ value : "GF", label: "French Guiana"},
						{ value : "PF", label: "French Polynesia"},
						{ value : "TF", label: "French Southern Territories"},
						{ value : "GA", label: "Gabon"},
						{ value : "GM", label: "Gambia"},
						{ value : "GE", label: "Georgia"},
						{ value : "DE", label: "Germany"},
						{ value : "GH", label: "Ghana"},
						{ value : "GI", label: "Gibraltar"},
						{ value : "GR", label: "Greece"},
						{ value : "GL", label: "Greenland"},
						{ value : "GD", label: "Grenada"},
						{ value : "GP", label: "Guadeloupe"},
						{ value : "GU", label: "Guam"},
						{ value : "GT", label: "Guatemala"},
						{ value : "GG", label: "Guernsey"},
						{ value : "GN", label: "Guinea"},
						{ value : "GW", label: "Guinea-bissau"},
						{ value : "GY", label: "Guyana"},
						{ value : "HT", label: "Haiti"},
						{ value : "HM", label: "Heard Island and Mcdonald Islands"},
						{ value : "VA", label: "Holy See (Vatican City State)"},
						{ value : "HN", label: "Honduras"},
						{ value : "HK", label: "Hong Kong"},
						{ value : "HU", label: "Hungary"},
						{ value : "IS", label: "Iceland"},
						{ value : "IN", label: "India"},
						{ value : "ID", label: "Indonesia"},
						{ value : "IR", label: "Iran, Islamic Republic of"},
						{ value : "IQ", label: "Iraq"},
						{ value : "IE", label: "Ireland"},
						{ value : "IM", label: "Isle of Man"},
						{ value : "IL", label: "Israel"},
						{ value : "IT", label: "Italy"},
						{ value : "JM", label: "Jamaica"},
						{ value : "JP", label: "Japan"},
						{ value : "JE", label: "Jersey"},
						{ value : "JO", label: "Jordan"},
						{ value : "KZ", label: "Kazakhstan"},
						{ value : "KE", label: "Kenya"},
						{ value : "KI", label: "Kiribati"},
						{ value : "KP", label: "Korea, Democratic People's Republic of"},
						{ value : "KR", label: "Korea, Republic of"},
						{ value : "KW", label: "Kuwait"},
						{ value : "KG", label: "Kyrgyzstan"},
						{ value : "LA", label: "Lao People's Democratic Republic"},
						{ value : "LV", label: "Latvia"},
						{ value : "LB", label: "Lebanon"},
						{ value : "LS", label: "Lesotho"},
						{ value : "LR", label: "Liberia"},
						{ value : "LY", label: "Libyan Arab Jamahiriya"},
						{ value : "LI", label: "Liechtenstein"},
						{ value : "LT", label: "Lithuania"},
						{ value : "LU", label: "Luxembourg"},
						{ value : "MO", label: "Macao"},
						{ value : "MK", label: "Macedonia, The Former Yugoslav Republic of"},
						{ value : "MG", label: "Madagascar"},
						{ value : "MW", label: "Malawi"},
						{ value : "MY", label: "Malaysia"},
						{ value : "MV", label: "Maldives"},
						{ value : "ML", label: "Mali"},
						{ value : "MT", label: "Malta"},
						{ value : "MH", label: "Marshall Islands"},
						{ value : "MQ", label: "Martinique"},
						{ value : "MR", label: "Mauritania"},
						{ value : "MU", label: "Mauritius"},
						{ value : "YT", label: "Mayotte"},
						{ value : "MX", label: "Mexico"},
						{ value : "FM", label: "Micronesia, Federated States of"},
						{ value : "MD", label: "Moldova, Republic of"},
						{ value : "MC", label: "Monaco"},
						{ value : "MN", label: "Mongolia"},
						{ value : "ME", label: "Montenegro"},
						{ value : "MS", label: "Montserrat"},
						{ value : "MA", label: "Morocco"},
						{ value : "MZ", label: "Mozambique"},
						{ value : "MM", label: "Myanmar"},
						{ value : "NA", label: "Namibia"},
						{ value : "NR", label: "Nauru"},
						{ value : "NP", label: "Nepal"},
						{ value : "NL", label: "Netherlands"},
						{ value : "AN", label: "Netherlands Antilles"},
						{ value : "NC", label: "New Caledonia"},
						{ value : "NZ", label: "New Zealand"},
						{ value : "NI", label: "Nicaragua"},
						{ value : "NE", label: "Niger"},
						{ value : "NG", label: "Nigeria"},
						{ value : "NU", label: "Niue"},
						{ value : "NF", label: "Norfolk Island"},
						{ value : "MP", label: "Northern Mariana Islands"},
						{ value : "NO", label: "Norway"},
						{ value : "OM", label: "Oman"},
						{ value : "PK", label: "Pakistan"},
						{ value : "PW", label: "Palau"},
						{ value : "PS", label: "Palestinian Territory, Occupied"},
						{ value : "PA", label: "Panama"},
						{ value : "PG", label: "Papua New Guinea"},
						{ value : "PY", label: "Paraguay"},
						{ value : "PE", label: "Peru"},
						{ value : "PH", label: "Philippines"},
						{ value : "PN", label: "Pitcairn"},
						{ value : "PL", label: "Poland"},
						{ value : "PT", label: "Portugal"},
						{ value : "PR", label: "Puerto Rico"},
						{ value : "QA", label: "Qatar"},
						{ value : "RE", label: "Reunion"},
						{ value : "RO", label: "Romania"},
						{ value : "RU", label: "Russian Federation"},
						{ value : "RW", label: "Rwanda"},
						{ value : "SH", label: "Saint Helena"},
						{ value : "KN", label: "Saint Kitts and Nevis"},
						{ value : "LC", label: "Saint Lucia"},
						{ value : "PM", label: "Saint Pierre and Miquelon"},
						{ value : "VC", label: "Saint Vincent and The Grenadines"},
						{ value : "WS", label: "Samoa"},
						{ value : "SM", label: "San Marino"},
						{ value : "ST", label: "Sao Tome and Principe"},
						{ value : "SA", label: "Saudi Arabia"},
						{ value : "SN", label: "Senegal"},
						{ value : "RS", label: "Serbia"},
						{ value : "SC", label: "Seychelles"},
						{ value : "SL", label: "Sierra Leone"},
						{ value : "SG", label: "Singapore"},
						{ value : "SK", label: "Slovakia"},
						{ value : "SI", label: "Slovenia"},
						{ value : "SB", label: "Solomon Islands"},
						{ value : "SO", label: "Somalia"},
						{ value : "ZA", label: "South Africa"},
						{ value : "GS", label: "South Georgia and The South Sandwich Islands"},
						{ value : "ES", label: "Spain"},
						{ value : "LK", label: "Sri Lanka"},
						{ value : "SD", label: "Sudan"},
						{ value : "SR", label: "Suriname"},
						{ value : "SJ", label: "Svalbard and Jan Mayen"},
						{ value : "SZ", label: "Swaziland"},
						{ value : "SE", label: "Sweden"},
						{ value : "CH", label: "Switzerland"},
						{ value : "SY", label: "Syrian Arab Republic"},
						{ value : "TW", label: "Taiwan, Province of China"},
						{ value : "TJ", label: "Tajikistan"},
						{ value : "TZ", label: "Tanzania, United Republic of"},
						{ value : "TH", label: "Thailand"},
						{ value : "TL", label: "Timor-leste"},
						{ value : "TG", label: "Togo"},
						{ value : "TK", label: "Tokelau"},
						{ value : "TO", label: "Tonga"},
						{ value : "TT", label: "Trinidad and Tobago"},
						{ value : "TN", label: "Tunisia"},
						{ value : "TR", label: "Turkey"},
						{ value : "TM", label: "Turkmenistan"},
						{ value : "TC", label: "Turks and Caicos Islands"},
						{ value : "TV", label: "Tuvalu"},
						{ value : "UG", label: "Uganda"},
						{ value : "UA", label: "Ukraine"},
						{ value : "AE", label: "United Arab Emirates"},
						{ value : "GB", label: "United Kingdom"},
						{ value : "US", label: "United States"},
						{ value : "UM", label: "United States Minor Outlying Islands"},
						{ value : "UY", label: "Uruguay"},
						{ value : "UZ", label: "Uzbekistan"},
						{ value : "VU", label: "Vanuatu"},
						{ value : "VE", label: "Venezuela"},
						{ value : "VN", label: "Viet Nam"},
						{ value : "VG", label: "Virgin Islands, British"},
						{ value : "VI", label: "Virgin Islands, U.S."},
						{ value : "WF", label: "Wallis and Futuna"},
						{ value : "EH", label: "Western Sahara"},
						{ value : "YE", label: "Yemen"},
						{ value : "ZM", label: "Zambia"},
						{ value : "ZW", label: "Zimbabwe"}];

	$scope.primaryCountry = { classify: 'Resides In' }
	$scope.primaryCountry.countryName = $('#')
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

	//Dealing with Editorials
	$scope.addPost = function(){
		newItemNo = $scope.athlete.published.length + 1;
		var post = {
			id: 'post' + newItemNo,
			link: '',
			title: ''
		};
		$scope.athlete.published.push(post);
	};
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
	// Galleries
	$scope.newPictures = [];
	$scope.deleteList = [];
	$scope.deleteListUrls = [];
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
                    $http.post('/ath/' + $scope.athlete._id + '/delGallery/' + id).success(function(athlete){
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
	$scope.addToList = function(album,image){
		console.log('removing image:' + image +'from album:' + album)
		angular.forEach($scope.athlete.galleries, function(gallery){
			if(gallery._id == album){
				console.log('found the album')
				var item = gallery.images[image];
				$scope.deleteList.push(item);
				$scope.deleteListUrls.push({'url' : item.url});
				gallery.images.splice(image, 1);
				console.log($scope.deleteListUrls)			
			}
		});
	};
	$scope.removeFromList = function(album,image){
		console.log('Putting back image:' + image +'from album:' + album);
		angular.forEach($scope.athlete.galleries, function(gallery){
			if(gallery._id == album){
				console.log('found the album');
				var item = gallery.images[image];
				gallery.images.push({item});
				$scope.deleteList.splice(image,1)
			}
		});
	};
	$scope.deleteImages = function(album){
		console.log(album)
		console.log($scope.deleteListUrls);
		angular.forEach($scope.deleteListUrls, function(url){
			console.log('deleting: ' + url.url)
			$http.post('/ath/' + $scope.athlete._id + '/deleteFromAlbum/' + album, url).success(function(data){
				console.log('success')
			});
		});
		swal({  title: "Pictures Deleted",
            	    text: "Pictures have been deleted",
            	    type: "success",
                    showCancelButton: false,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Okay",
                    closeOnConfirm: true,
                },function(){
                   location.reload();
                });
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

	// Competition functions
	$scope.updateRecord = function(id){
		angular.forEach($scope.records, function(record){
			if(record._id == id){
				$http.post('/record/' + id + '/update', record).success(function(data){
					console.log('successfully updated this record');
					swal("Updated Record", "This record has been successfully updated", "success");
					// comment out the following line later.
					location.reload();
				});
			}
		});
	};
	$scope.deleteRecord = function(id){
		console.log('deleting this record')
		angular.forEach($scope.records, function(record){
			if(record._id == id){
				swal({ title: "Delete Record",
            	    text: "Are you sure you want to delete this record?",
            	    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn btn-success btn-fill",
                    confirmButtonText: "Yes",
                    closeOnConfirm: true,
				}, function(){
					$http.delete('/record/' + id + '/delete').success(function(data){
						console.log('record has been deleted');
						console.log(data);
						location.reload();
					})
				})
			}
		})
	};
	$scope.createRecord = function(one){
		console.log('creating record');
		angular.forEach($scope.records, function(record, key){
			if(one == key){
				record.athlete = $scope.athlete._id;
				delete record.id;
				console.log(record);
				$http.post('/record/new', record).success(function(record){
					console.log('record has been created. now needs to add to athlete');
					console.log(record);
					$http.post('/ath/addRecord', record).success(function(data){
						$scope.records.splice(one,1);
						swal("success", "record has been successfully created", "success");
						$scope.records.push(record);
					});				
				});
			}
		});
	};
	// Video Functions
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
	$scope.deleteVideo = function(videoId){
		swal({  title: "Delete this video?",
            	text: "Are you sure you want to delete this video?",
            	type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-success btn-fill",
                confirmButtonText: "Delete Video",
                closeOnConfirm: true,
            },function(){
               $http.delete('/ath/' + $stateParams.id + '/deleteVideo/' + videoId).success(function(data){
               		console.log('successfully deleted this video');
               		location.reload();
                });
            });
	};
	// function to create/update Athlete
	$scope.updateAth = function(){
		console.log('updating this athlete...');
		console.log($scope.user);
		console.log($scope.athlete);
		// Create this athlete
		$http.post('/ath/update/' + $scope.athlete._id, $scope.athlete)
			.success(function(data){
				console.log(angular.toJson(data));		
				swal("Athlete Updated", "Athlete has been successfully updated", "success");
				location.reload();
			})
			.error(function(data){
				console.log('could not save the athlete');
				swal("error", "Athlete not updated", "warning")
				console.log(data);
			});
	};
	// end function to create/update athlete
});

// New Album Controller
angular.module('manager').controller('athCtrl3', function($scope, $http, $stateParams, filepickerService, $state){
	$scope.newAlbum = {};
	$scope.newAlbum.images = [];
	$scope.newAlbum.athlete = $stateParams.id;

	$scope.close = function(){
		console.log('you clicked to close new album form');
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
			console.log('uploaded image');
			console.log(JSON.stringify(Blob));
			$scope.newAlbum.images = Blob;
			$scope.$apply();
		});
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
		});
	};
	
});

// Controller to edit albums.
angular.module('manager').controller('athCtrl4', function($scope, $http, $stateParams, filepickerService, $state){
	$scope.album = {};
	$scope.$stateParams = $stateParams;
	$http.get('/ath/' + $stateParams.id).success((data)=>{
		console.log('got the athlete')
		angular.forEach(data.galleries, function(gallery, key){
			console.log('looking for the album')
			if(gallery._id === $stateParams.galId){
				console.log('got the album');
				$scope.album = gallery;
			}
		});
	});
	$scope.close = function(){
		parent.history.back();
	}
	$scope.deleteImages = function(){};
	$scope.updateAlbum = function(){
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