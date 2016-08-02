(function() {
  'use strict';

  angular.module('JournalApp.layout')
    .controller('OptionMenu', OptionMenu);

  OptionMenu.$inject = ['$scope', '$mdDialog'];

  function OptionMenu($scope, $mdDialog){
    var vm = this;

    $scope.moods = [
      'Positive',
      'Ambivalent',
      'Indifferent',
      'Depressed',
      'Anxious',
      'Nervous',
      'Excited',
      'Grateful',
      'Thankful',
      'Happy',
      'Confused',
      'Custom Mood'
      ];

    $scope.$watch('entry.mood', function(currentMood, newValue){
      if(currentMood !== newValue){
        if(newValue !== 'Custom Mood'){
          $scope.entry.customMood = '';
        }
      }
    });
  }
})();