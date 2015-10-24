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
			     $scope.note = note;
			     console.log($scope.note);
			 }, function(errorResponse) {
			     $scope.error = errorResponse.data.message;
			     toaster.pop('error', '',$scope.error);
			 });

		     };

		     // Remove existing Note
		     $scope.remove = function(note) {
			 note.$remove(function(sucess){
			     for (var i in $scope.notes) {
				 if ($scope.notes[i] === note) {
				     $scope.notes.splice(i, 1);
				 }
			     }

			     // upon successfull deletion - close the new note window only if the selected note is the deleted note
			     if ($scope.note && $scope.note._id && (note._id === $scope.note._id)){
				 $scope.toggle();
			     }
			 }, function(errorResponse){
			     toaster.pop('error', '',errorResponse.data + ' to delete this note');
			 });


		     };

		     //share the note with other users
		     $scope.share = function(flag){
			 $scope.note.public = flag;
			 $scope.note.$update(function(){
			     toaster.pop('success', '','Note shared');
			     console.log($scope.note);
			 }, function(errorResponse){
			     $scope.error = errorResponse.data.message;
			     toaster.pop('error', '',errorResponse.data + ' to share this note');
			     $scope.note.public = false;
			 });
		     };

		     $scope.isOwner = function(){

			 if($scope.note){

			     //if the note is not attached to the user - this means the note belongs to the usre in the current session
			     if(!$scope.note.user){
				 return true;
			     }

			     //when the user creates a note the user object is attached as as string
			     if($scope.note.user === $scope.authentication.user._id){
				 return true;
			     }

			     return ($scope.note.user._id === $scope.authentication.user._id);
			 }
			 return false;
		     };

		     // Update existing Note
		     $scope.update = function(note) {
			 //var note = $scope.note;

			 //creating a note
			 if(!note.$update){
			     $scope.create();
			     return;
			 }

			 note.$update(function() {
			     $location.path('/hareesh');
			     toaster.pop('success', '','Note updated');
			     console.log($scope.note);
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
