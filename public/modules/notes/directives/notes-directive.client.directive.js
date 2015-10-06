'use strict';

angular.module('notes').directive('notesDirective', [
	function() {
		return {
			scope:{
				visible: '@visible',
				onSubmit: '&',
				note: '=?note' //this makes the attribute optional
			},
			templateUrl: '/modules/notes/views/create-note.client.view.html',
			restrict: 'E',
			link: function($scope, element, attrs){
				$scope.note = $scope.note || {};
				$scope.show = attrs.show;
				
				console.log($scope.note);
			},
			controller: function($scope){
				$scope.submit = function(){
					//pass name and descriptoin to the parent scop
					//this.onSubmit({note:{name: $scope.name, description: $scope.description}});
					this.onSubmit({note: $scope.note});
				};
			},
			replace: true
		};
	}
]);
