'use strict';

angular.module('notes').directive('notesDirective', [
	function() {
		return {
			template: '<div></div>',
			restrict: 'E',
			link: function postLink(scope, element, attrs) {
				// Notes directive directive logic 
				// ...
				
				element.text('this is the notesDirective directive');
			}
		};
	}
]);