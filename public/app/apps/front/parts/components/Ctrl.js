angular.module('bigbodies').controller('sidebar', function($scope, athletes, $http){
	// This needs to pull in data from the database in the future
	$scope.popularPosts = [
		{
			_id: '1234567',
			title: 'This is a BigBodies Post',
			img:{ url: 'http://cdn-maf1.heartyhosting.com/sites/muscleandfitness.com/files/bodybuilder_0.jpg'},
			summary: 'This is an example of a post for the sidebar, will add others and make sure that we can go through them. This is not from the database'
		},
		{
			_id: '12354516',
			title: 'Another Post By Somone nice',
			img:{ url: 'http://cdn-maf1.heartyhosting.com/sites/muscleandfitness.com/files/bodybuilder_0.jpg'},
			summary: 'No words can explain the way Im missing you. Told me not to cry when you were gone,. BUt the feeling is overwhelming and much too strong.'

		},
		{
			_id: '1234464',
			title: 'Yes I do, I Believe',
			img:{ url: 'http://cdn-maf1.heartyhosting.com/sites/muscleandfitness.com/files/bodybuilder_0.jpg'},
			summary: 'Can I lay by your side. Next to you. And make sure youre alright. Ill take care of you, and i dont want to be here if I cant be with you tonight.'

		},
		{
			_id: '1238436653',
			title: 'Your Touch, Your Skin Where Do',
			img:{ url: 'http://cdn-maf1.heartyhosting.com/sites/muscleandfitness.com/files/bodybuilder_0.jpg'},
			summary: 'Im reaching out to you and I realize how. this hurt that ive been through, im missing you like crazy. You told me not to cry when you were gone. But the feeling is overwhelming and much too strong.'

		}
	];

	$scope.recentAthletes = athletes.athletes;
});