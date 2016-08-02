(function() {
  'use strict';

  angular.module('JournalApp.core')
    .factory('ProcessData', ProcessData);

  function ProcessData() {
    var service = {
      // place data manipulating functions here
      formatDate: formatDate,
      formatText: formatText,
      getDateObject: getDateObject,
      getMoodsArray: getMoodsArray,
      sanitizeText: sanitizeText,
      // getEditedMoods: getEditedMoods
    };

    function formatDate(date) {
      var months = {
        '0': 'January',
        '1': 'February',
        '2': 'May',
        '3': 'April',
        '4': 'May',
        '5': 'June',
        '6': 'July',
        '7': 'August',
        '8': 'September',
        '9': 'October',
        '10': 'November',
        '11': 'December'
      }, 
      dateStr = '';

      return dateStr += months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
    }

    function getDateObject(date) {
      var months = {
        '0': 'January',
        '1': 'February',
        '2': 'May',
        '3': 'April',
        '4': 'May',
        '5': 'June',
        '6': 'July',
        '7': 'August',
        '8': 'September',
        '9': 'October',
        '10': 'November',
        '11': 'December'
      }, 
      dateObj = {
        month: months[date.getMonth()],
        day: date.getDate(),
        year: date.getFullYear()
      };

      return dateObj;
    }

    function formatText(text) {
      var paragraphs = text.split('\n\n');
      var formatted = paragraphs.map(function(paragraph){
        var wrapped = '<p>' + paragraph + '</p>';
        return wrapped;
      }).join('');

      return formatted;
    }

    function getMoodsArray(entryObj) {
      var moods;
      if(entryObj.mood === 'Custom Mood'){
        moods = entryObj.customMood.replace(/[,]/g, '').split(' ');
      } else {
        moods = Array(entryObj.mood);
      }

      return moods;
    }

    function sanitizeText(text) {
      var paragraphs = text.split('<p>');
      var formatted = paragraphs.map(function(paragraph, i){
        var cleaned = '';
        if(i === paragraphs.length-1){
          cleaned = paragraph.replace('</p>', '');
        } else {
          cleaned = paragraph.replace('</p>', '\n\n');
        }
        return cleaned;
      }).join('');

      return formatted;
    }
 
    // needed to add new moods on PUT requests
    // function getEditedMoods(newMoods, entryMoods) {
    //   var moods = newMoods.replace(/[,]/g, '').split(' ');
    //   return entryMoods.concat(moods);
    // }

    return service;
  }
})();