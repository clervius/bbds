// All athletes in service
angular.module('manager').factory('athletes', function($http){
	var athletes = [];
	
	$http.get('/ath/all').success(function(data){
		data.forEach(function(athlete){
			athletes.push(athlete);
			console.log(athlete)
		});
	});

	return {
		athletes: athletes
	}
});

// All Federations in a service
angular.module('manager').factory('federations', function($http){
	var federations = [];
	var _this = this;

	$http.get('/federation/all').success(function(data){
		data.forEach(function(federation){
			federations.push(federation);
		});
	});

	var federation = function(id){
		$http.get('federation/' + id).success(function(data){
			return data
		})
	}
	return {
		federations: federations,

		federation : function(id){
			$http.get('federation/' + id).success(function(data){
				return data
			})
		}

	}
});

// All Posts in service
angular.module('manager').factory('posts', function($http){
	var posts = [];
	
	$http.get('/editorial/all').success(function(data){
		data.forEach(function(post){
			posts.push(post);
			console.log(post);
		});
	});

	return {
		posts: posts
	}
});

