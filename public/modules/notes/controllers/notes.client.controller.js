'use strict';

// Notes controller
angular.module('notes')
    .controller('NotesController',
		['$scope', '$stateParams', '$location', 'Authentication', 'Notes','toaster',
		 function($scope, $stateParams, $location, Authentication, Notes, toaster) {

		     $scope.visible = false;
		     
		     $scope.authentication = Authentication;

		     $scope.passData = function(note){

			 if(note.delete){
			     this.remove(note);
			 }else if(note.update){
			     $scope.note = note;
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
			     toaster.pop('success', '','Note created');
			 }, function(errorResponse) {
			     $scope.error = errorResponse.data.message;
			     toaster.pop('error', '',$scope.error);
			 });

			 // Clear form fields
			 this.name = '';
			 this.note = note; //line 14 above
		     };

		     // Remove existing Note
		     $scope.remove = function(note) {
			 if (note) {
			     note.$remove(function(sucess){
				 for (var i in $scope.notes) {
				     if ($scope.notes[i] === note) {
					 $scope.notes.splice(i, 1);
				     }
				 }
			     }, function(errorResponse){
				 toaster.pop('error', '',errorResponse.data + ' to delete this note');
			     });
			 } else {
			     //$scope.note.$remove(function() {
			     //$location.path('/hareesh');
			     //});
			     alert('i am not supposed to be here');
			 }

			 //close the new note window only if the selected note is the deleted note
			 if (note._id === $scope.note._id){
			     console.log('toggle');
			     $scope.toggle();
			 }
		     };

		     // Update existing Note
		     $scope.update = function() {
			 console.log('called update');
			 var note = $scope.note;

			 note.$update(function() {
			     $location.path('/hareesh');
			     console.log(toaster);
			     toaster.pop('success', '','Note updated');
			 }, function(errorResponse) {
			     $scope.error = errorResponse.data.message;
			     toaster.pop('error', '',errorResponse.data + ' to update this note');
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
			 if(note){
			     note.update=true;
			 }
			 
			 if(!$scope.visible){
			     $scope.toggle();
			 }
			 
			 $scope.note = note;


		     };

		     $scope.toggle = function(note){
			 $scope.visible = !$scope.visible;
		     };

		     
		 }]);
