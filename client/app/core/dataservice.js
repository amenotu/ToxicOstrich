(function() {
  'use strict';

  angular.module('JournalApp.core')
    .factory('DataService', DataService);

  function DataService($http) {
    var service = {
      //enter services that get/post/update/delete data here
      saveEntry: saveEntry,
      getEntries: getEntries,
      getSingleEntry: getSingleEntry,
      deleteEntry: deleteEntry,
      updateEntry: updateEntry
    };

    function saveEntry(entry) {
      return $http({
        method: 'POST',
        url: 'api/entries',
        data: entry
      });
    }

    function getEntries() {
      return $http({
        method: 'GET',
        url: 'api/entries'
      })
      .then(function(response){
        return response.data;
      });
    }

    function getSingleEntry(entry) {
      var params = $.param({id: entry._id});
      return $http({
        method: 'GET',
        url: 'api/entries?' + params
      })
      .then(function(response){
        return response.data;
      });
    }

    function updateEntry(entry){
      var params = $.param({id: entry._id});
      return $http({
        method: 'PUT',
        url: 'api/entries?' + params,
        data: entry
      });
    }

    function deleteEntry(entry){
      var params = $.param({id: entry._id});
      return $http({
        method: 'DELETE',
        url: 'api/entries?' + params
      });
    }

    return service;
  }
})();