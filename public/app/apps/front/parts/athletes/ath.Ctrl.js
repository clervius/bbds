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
	$scope.shows = [
		{
		    _id : "57a62f137e71080300a7ae5c",
		    year : "2013",
		    federation : "NPC",
		    show : "SFL Championships",
		    division : "Men's Physique",
		    class : "D",
		    place : "1",
		    _creator :"57a25ea543be0203004de994",
		    athlete : "57a62f137e71080300a7ae4f",
		    createdAt : "2016-08-06T18:05:20.695Z",
		    __v : 0
		},
		{
		    _id : "57a62f137e71080300a7ae5d",
		    year : "2014",
		    federation : "NPC",
		    show : "Nationals",
		    division : "Men's Physique",
		    class : "D",
		    place : "12",
		    _creator : "57a25ea543be0203004de994",
		    athlete : "57a62f137e71080300a7ae4f",
		    createdAt : "2016-08-06T18:05:20.695Z",
		    __v : 0
		}
	]
	$http.get('/ath/' + $stateParams.athId).success(function(data){
		$scope.athlete = data;
		angular.forEach(data.social, function(account, key){
			// Facebook page link
			if(account.service === 'public Facebook' && account.link.length){
				$scope.fbPage = account;
			};
			// Social Classes
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
		});
	});


});