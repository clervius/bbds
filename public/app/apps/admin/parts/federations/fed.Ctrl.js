// Federation home controller
angular.module('manager').controller('fedCtrl', function($scope, federations){
	$scope.homeMessage = "Now on Federations Page"
	$scope.federations = federations.federations;
	
})


// Single Federation controller
angular.module('manager').controller('fedCtrl1', function($scope, $stateParams, $state, $http){
	$scope.federation = {}
	

	$http.get('/federation/' + $stateParams.id).success(function(data){
		$scope.federation = data
	});
	
})


// Create New Federation Controller
angular.module('manager').controller('fedCtrl2', function($scope, $http, filepickerService){
	$scope.federation = {};

	$scope.createFederation = function(){
		$http.post('/federation/new', $scope.federation)
			.success(function(data){
				console.log(JSON.stringify(data));
				$scope.federation = {}
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}	

	$scope.newCover = function(){
		filepickerService.pick(
			{
				mimetype: 'image/*',
				language: 'en',
				services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
				openTo: 'IMAGE_SEARCH'
			},
			function(Blob){
				console.log(JSON.stringify(Blob));
				$scope.federation.coverImage = Blob;
				$scope.$apply();
			}
			);
		}
	

	$scope.newLogo = function(){
		filepickerService.pick(
			{
				mimetype: 'image/*',
				language: 'en',
				services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'INSTAGRAM'],
				openTo: 'IMAGE_SEARCH'
			},
			function(Blob){
				console.log(JSON.stringify(Blob));
				$scope.federation.logo = Blob;
				$scope.$apply();
			}
			);
		}
	
})


// New Division controller
angular.module('manager').controller('fedCtrl3', function($scope, $stateParams, $state, $http){

	
})