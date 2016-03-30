

angular.module('MyApp', [])
	.config(function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
	})
	.factory('someFactory', function($http) {
		return {someMeth: function(url, request, $scope) {
			return $http({
				method: 'JSONP',
				url: url,
				params: request
				}).then(function(response) {
					$scope.results = response.data.data;
					$scope.loading = false;
					return 'hello there'
				},
				function(response) {
					$scope.error = true;
					$scope.loading = false;
				})
		}};
	})
	.controller('MyController', function($scope, $http, $q, $timeout, someFactory) {
		
		function wait() {
			var defer = $q.defer();
			$timeout(function(){
				defer.resolve();
			}, 0);
			return defer.promise;
		}

		

		var searchInstagram = function() {
			
			$scope.loading = true;
			$scope.error = false;
			$scope.errorMsg = "Oops. Try again please.";
			$scope.complete = false;

			wait().then(function() {

				$scope.keyword = $scope.searchForm.keyword.$viewvalue;

				var url = "https://api.instagram.com/v1/tags/" + "pemiloop" + "/media/recent";

				var request = {
					callback: 'JSON_CALLBACK',
					client_id: '541fd0be5de2463aa359f64e029722cd',
					count: 12
				};
				
				someFactory.someMeth(url, request, $scope)
					.then(function(obj1) {
						$scope.complete = true;
					}, function() {})

			}, function() {
				$scope.loading = false;
				$scope.error = true})
		};

		searchInstagram();

	});