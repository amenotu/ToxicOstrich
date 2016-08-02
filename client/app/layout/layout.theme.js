(function(){
  'use strict';

  var theme = angular.module('JournalApp.layout', ['ngMaterial']);

  theme.config(configure);

  function configure($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('orange');
  }
})();