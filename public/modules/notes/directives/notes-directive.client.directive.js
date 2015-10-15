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
	    link: function($scope, element, attrs){
		$scope.note = $scope.note || {};
		$scope.show = attrs.show;
		$scope.disabled = true;
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

		$scope.deleteNote  = function(){
		    $scope.note.delete = true;
		    $scope.disabled = true;
		    this.onSubmit({note: $scope.note});
		};

		$scope.toggle = function(){
		    if($scope.disabled){
			$scope.disabled = false;
		    }

		};

		$scope.delete = function(){
		    toaster.pop({
			type: 'warning',
			title: $scope.note.name + ' deleted',
			//body: '<a>Yes</a>',
			timeout: 2000,
			bodyOutputType: 'trustedHtml',
			showCloseButton: true
		    });

		    console.log($scope.note);

		    $scope.deleteNote();
		};

		$scope.hoverIn = function(){
		    $scope.hover = true;
		};
		
		$scope.hoverOut = function(){
		    $scope.hover = false;
		};



	    },
	    replace: true
	};
    }
]);
