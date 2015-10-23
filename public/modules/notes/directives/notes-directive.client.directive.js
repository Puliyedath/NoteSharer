'use strict';


angular.module('notes').directive('notesDirective', ['toaster',
    function(toaster) {
	return {
	    scope:{
		visible: '@visible',
		onSubmit: '&',
		note: '=?note' //this makes the attribute optional
	    },
	    templateUrl: '/modules/notes/views/create-note.client.view.html',
	    restrict: 'E',
	    replace: true,
	    link: function($scope, element, attrs){
		$scope.show = attrs.show;
	    },
	    controller: function($scope){
		$scope.toggle = function(){
		    this.onSubmit({note: $scope.note});
		};

		$scope.update  = function(){
		    $scope.note.update = true;
		    this.submit();
		};

		$scope.delete = function($event){
		    $event.stopPropagation();
		    $scope.note.delete = true;
		    this.onSubmit({note: $scope.note});
		};

		$scope.hoverIn = function(){
		    $scope.hover = true;
		};
		
		$scope.hoverOut = function(){
		    $scope.hover = false;
		};

	    }
	};
    }
]);
