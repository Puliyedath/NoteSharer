'use strict';

angular.module('users')
    .controller('AuthenticationController',
		['$scope', '$http', '$location', 'Authentication','toaster',
		 function($scope, $http, $location, Authentication, toaster) {
		     $scope.authentication = Authentication;

		     //If user is signed in then redirect back home
		     if ($scope.authentication.user) $location.path('/hareesh');

		     $scope.signup = function() {
			 $http.post('/auth/signup', $scope.credentials).success(function(response) {
			     //If successful we assign the response to the global user model
			     $scope.authentication.user = response;
			     success(true);
			     //And redirect to the index page
			     $location.path('/hareesh');
			 }).error(function(response) {
			     $scope.error = response.message;
			     success(false);
			 });
		     };

		     function success(flag){
			 if(flag){
			     console.log($scope.authentication.user);
			     toaster.pop('success', '','Logging in as ' +  $scope.authentication.user.username);
			 }else{
			     toaster.pop('error', '',$scope.error);
			 }
		     }

		     $scope.signin = function() {
			 $http.post('/auth/signin', $scope.credentials).success(function(response) {

			     //If successful we assign the response to the global user model
			     $scope.authentication.user = response;
			     success(true);
			     //And redirect to the index page
			     $location.path('/hareesh');
			 }).error(function(response) {
			     $scope.error = response.message;
			     success(false);
			 });
		     };
		 }
		]);
