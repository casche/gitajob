/* global angular */
'use strict';

angular.module('app').factory('Scrapes', ['$resource',
  function($resource) {
    return $resource('scrapes');
  }
]);
