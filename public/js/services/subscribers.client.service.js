/* global angular */
'use strict';

angular.module('app').factory('Subscribers', ['$resource',
  function($resource) {
    return $resource('subscribers');
  }
]);
