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
		$scope.disabled = true;
		element.onclick = function(){
		    $scope.disabled = true;
		};
		
	    },
	    controller: function($scope){
		$scope.toggle = function(){
		    //pass name and descriptoin to the parent scop
		    this.onSubmit({note: $scope.note});
		};

		$scope.update  = function(){
		    $scope.note.update = true;
		    $scope.disabled = true;
		    this.submit();
		};

		$scope.delete  = function(){
		    $scope.note.delete = true;
		    $scope.disabled = true;
		    this.submit();
		};

		$scope.toggle = function(){
		    if($scope.disabled){
			$scope.disabled = false;
		    }

		};

	    },
	    replace: true
	};
    }
]);
