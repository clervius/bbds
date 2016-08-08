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
				if(!account.link.match(/^[a-zA-Z]+:\/\//)){
					account.link = 'http://' + account.link;
				}

				var makeLink = function(link){
					if(!link.match(/^[a-zA-Z]+:\/\//)){
						link = 'http://' + link
					} else{
						link = link;
					}
				}

				if(account.service === 'personal Facebook'){
					makeLink(account.link);
					account.service = 'facebook-square';
					$scope.scMedia.push(account);
				}else if(account.service === 'public Facebook'){
					makeLink(account.link);
					account.service = 'facebook-official';
					$scope.scMedia.push(account);
				}else if(account.service === 'google plus'){
					makeLink(account.link);
					account.service === 'google-plus';
					$scope.scMedia.push(account);
				}else if(account.service === 'web1' || account.service === 'web2'){
					makeLink(account.link);
					account.service = 'globe';
					$scope.scMedia.push(account);
				}else{
					makeLink(account.link);
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