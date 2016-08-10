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
	$scope.ig = {};
	$scope.galleries = [
		{
			_id: "1234567",
			images: 
				{
					url: 'https://cdn.filepicker.io/api/file/TmDbqka7TlWD9fHmhAVq'
				},
			galleryName: 'First Gallery',
			description: 'This is just an example gallery'
		},
		{
			_id: "1234567",
			images: 
				{
					url: 'http://www.bodybuilding.com/fun/images/2015/5-reasons-to-date-a-bodybuilder-graphics-1.jpg'
				},
			galleryName: 'This guy',
			description: 'Photoshoot I did with Ulrich'
		},
		{
			_id: "1234567",
			images: 
				{
					url: 'http://iluvesports.com/wp-content/uploads/2015/02/40-Insane-Arnold-Schwarzenegger-Bodybuilding-Pictures5-600x480.jpg'
				},
			galleryName: 'Arnold Schwarzenegger',
			description: 'My inspiration in everything I do'
		},
		{
			_id: "1234567",
			images: 
				{
					url: 'http://media1.santabanta.com/full1/Sports/Bodybuilding/bodybuilding-181a.jpg'
				},
			galleryName: 'Magazine Shoot',
			description: 'I did this photoshoot with a magazine person'
		},
		{
			_id: "1234567",
			images: 
				{
					url: 'https://cdn.filepicker.io/api/file/TmDbqka7TlWD9fHmhAVq'
				},
			galleryName: 'First Gallery',
			description: 'This is just an example gallery'
		}
	];
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
					$scope.scMedia.push(account);
				}
			}else{
				console.log(account.service + 'has nothing')
			}
			
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