'use strict';

// Notes controller
angular.module('notes')
    .controller('NotesController',
		['$scope', '$stateParams', '$location', 'Authentication', 'Notes',
		 function($scope, $stateParams, $location, Authentication, Notes) {

		     $scope.visible = false;
		     
		     $scope.authentication = Authentication;

		     $scope.passData = function(note){
			 $scope.note = note;

			 if(note.delete){
			     this.remove(note);
			 }else if(note.update){
			     this.update();
			 }else{
			     this.create();
			 }
		     };

		     // Create new Note
		     $scope.create = function() {
        		 // Create new Note object
			 var note = new Notes({
			     name: this.note.name,
			     description: this.note.description
			 });

			 // Redirect after save
			 note.$save(function(response) {
			     $location.path('/hareesh');
			     $scope.notes.unshift(note);
			     $scope.visible = false;
			 }, function(errorResponse) {
			     $scope.error = errorResponse.data.message;
			 });

			 // Clear form fields
			 this.name = '';
			 this.note =''; //line 14 above
		     };

		     // Remove existing Note
		     $scope.remove = function(note) {
			 if (note) {
			     note.$remove();
			     for (var i in $scope.notes) {
				 if ($scope.notes[i] === note) {
				     $scope.notes.splice(i, 1);
				 }
			     }
			 } else {
			     $scope.note.$remove(function() {
				 $location.path('/hareesh');
			     });
			 }
			 $scope.visible = false;

		     };

		     // Update existing Note
		     $scope.update = function() {
			 var note = $scope.note;

			 note.$update(function() {
			     $location.path('/hareesh');
			 }, function(errorResponse) {
			     $scope.error = errorResponse.data.message;
			 });

		     };

		     // Find a list of Notes
		     $scope.find = (function() {
			 $scope.notes = Notes.query();
		     }());

		     // Find existing Note
		     $scope.findOne = function() {
			 $scope.note = Notes.get({
			     noteId: $stateParams.noteId
			 });
		     };

		     $scope.display = function(note){
			 console.log('hehe');
			 if(note) {
			     //edit Mode
			     $scope.editMode = true;
			 }else{
			     //add Mode
			     $scope.editMode = false;
			 }
			 
			 $scope.note = note;
		     };

		     $scope.toggle = function(note){
			 $scope.visible = !$scope.visible;
		     };
		 }]);
