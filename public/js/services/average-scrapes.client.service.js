/* global angular */
'use strict';

angular.module('app').factory('AverageScrapes', ['$resource',
  function($resource) {
    return $resource('scrapes/avg/:aggregate', {aggregate:'@aggregate'});
  }
]);
