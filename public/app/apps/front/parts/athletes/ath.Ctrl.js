angular.module('bigbodies').controller('athCtrl', function($scope, $http){
	$scope.athletes = [];

	$http.get('/ath/all').success(function(data){
		data.forEach(function(athlete){
			athletes.push(athlete);
		});
	});
})
angular.module('bigbodies').controller('athCtrl1', function($scope, $http, $state, $stateParams){
	$scope.athlete = {};
	$scope.fbPage = {};
	$scope.scMedia = [];
	$scope.shows = [];
	$http.get('/ath/' + $stateParams.athId).success(function(data){
		console.log(data);
		$scope.athlete = data;
		angular.forEach(data.social, function(account, key){
			// Facebook page link
			if(account.service === 'public Facebook' && account.link.length){
				//$scope.service === 'facebook-square'
				$scope.fbPage = account;
			};
			// Social Classes
			if(account.link.length){
				if(account.service === 'personal Facebook'){
					account.service = 'facebook';
					$scope.scMedia.push(account);
				}else if(account.service === 'personal Facebook'){
					account.service = 'facebook-official';
					$scope.scMedia.push(account);
				}else if(account.service === 'google plus'){
					account.service === 'google-plus';
					$scope.scMedia.push(account);
				}else if(account.service === 'web1' || account.service === 'web2'){
					account.service = 'globe';
					$scope.scMedia.push(account);
				}else{
					$scope.scMedia.push(account);
				}
			}else{}
			
		});
	});
	$http.get('/record/ath/' + $stateParams.athId).success(function(data){
		console.log(data);
		data.forEach(function(show){
			console.log(show);
			$scope.shows.push(show);
		})
	})


});