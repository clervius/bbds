angular.module('bigbodies').controller('sidebar', function($scope, athletes, $http, posts){
	$scope.popularPosts = posts.posts;
	$scope.recentAthletes = athletes.athletes;
});