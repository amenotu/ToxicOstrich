(function() {
  'use strict';

  angular.module('JournalApp.layout')
    .controller('FormDialog', FormDialog);

  FormDialog.$inject = ['$scope', '$mdDialog', '$mdMedia', 'DataService', 'ProcessData'];

  function FormDialog($scope, $mdDialog, $mdMedia, DataService, ProcessData) {
    var vm = this;
    $scope.entries = []; 

    DataService.getEntries().then(function(data){
      $scope.entries = data;
    });

    vm.showDeletePrompt = function(ev, entry){
      var confirm = $mdDialog.confirm()
                    .title('Delete Entry')
                    .textContent('Are you sure you want to delete this entry?')
                    .ariaLabel('Delete Entry Confirmation')
                    .targetEvent(ev)
                    .ok('Yes, delete it')
                    .cancel('Nevermind');

      $mdDialog.show(confirm).then(function(){
        //Delete logic here
        DataService.deleteEntry(entry)
        .success(function(response){
          console.log(response.message);
          DataService.getEntries().then(function(data){
            console.log(data);
            $scope.entries = data;
          });
        });
      });
    };

    vm.showEditForm = function(ev, entry){
      $scope.user = {};
      $scope.entry = DataService.getSingleEntry(entry).then(function(data){
        var text = data.text,
            date = new Date(Date.parse(data.entryDate));
        data.text = ProcessData.sanitizeText(text);
        data.entryDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return data;
      });

      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/app/layout/dialog/editDialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          locals: {
            entry: $scope.entry,
            user: $scope.user
          },
          fullscreen: useFullScreen
        })
        .then(function(editedEntry) {
          //update logic here

          // if(editedEntry.addMoods){
          //   editedEntry.moods = ProcessData.getEditedMoods(editedEntry.addMoods, editedEntry.moods);
          // }
          console.log('Current edited entry: ', editedEntry);

          DataService.updateEntry(editedEntry)
          .success(function(response){
            console.log(response.message);
          })
          .then(function(){
            DataService.getEntries().then(function(data){
              $scope.entries = data;
            });
          });
        });

        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });      
    };

    vm.showAddEntryForm = function(ev) {
      $scope.entry = {};
      $scope.user = {};
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/app/layout/dialog/dialog.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {
            entry: $scope.entry,
            user: $scope.user
          },
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        })
        .then(function(answer) {
          //add new entry logic here
          var date = answer.date,
              text = answer.text,
              temp = answer.customMood || answer.mood;

          answer.entryDate = date;
          answer.date = ProcessData.getDateObject(date);
          answer.text = ProcessData.formatText(text);

          if(answer.customMood){
            answer.customMood = ProcessData.getMoodsArray(answer);
          } else {
            answer.mood = ProcessData.getMoodsArray(answer);
          }

          DataService.saveEntry(answer)
          .success(function(response){
            console.log(response.message);
          })
          .then(function(){
            DataService.getEntries().then(function(data){
              $scope.entries = data;
            });
          })
          .catch(function(err){
            alert(err);
          });
        });

        $scope.$watch(function() {
          return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
          $scope.customFullscreen = (wantsFullScreen === true);
        });
      };

      vm.showSignUp = function(ev) {
        $scope.entry = {};
        $scope.user = {};
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/app/layout/dialog/signup.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {
            entry: $scope.entry,
            user: $scope.user
          },
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        });
      };

      function DialogController($scope, $mdDialog, entry, user) {
        $scope.entry = entry;
        $scope.user = user;
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
          $mdDialog.hide(answer);
        };
      }
    }
})();