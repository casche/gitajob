#!/usr/bin/env node

'use strict';

angular.module('app').factory('Scrapes', ['$resource',
  function($resource) {
    return $resource('Scrapes');
  }
]);