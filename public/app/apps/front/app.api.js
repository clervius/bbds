// All athletes in service
angular.module('bigbodies').factory('athletes', function($http){
	var athletes = [];
	
	$http.get('/ath/all').success(function(data){
		data.forEach(function(athlete){
			athletes.push(athlete);
		});
	});
	return {
		athletes: athletes
	}
});

// All Federations in a service
angular.module('bigbodies').factory('federations', function($http){
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