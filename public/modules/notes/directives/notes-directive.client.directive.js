'use strict';

angular.module('notes').directive('notesDirective', [
	function() {
		return {
			scope:{
				visible: '=visible'
			},
			templateUrl: '/modules/notes/views/create-note.client.view.html',
			restrict: 'E',
			replace: true
		};
	}
]);
