"use strict";

var _ = require("lodash");

module.exports = _.curry(function(pattern, match) {
  if (_.isString(pattern)) {
    pattern = [pattern];
  }
  pattern = _.map(pattern, function(pattern) {
    return pattern.split(".");
  });
  if (_.isString(match)) {
    match = [match];
  }
  match = _.map(match, function(match) {
    return match.split(".");
  });
  return _.any(_.map(pattern, function(pattern) {
    return _.any(_.map(match, function(match) {
      if (_.last(pattern) === "*" && match.length > pattern.length) {
        pattern = pattern.concat(_.times(match.length - pattern.length, function() { return "*" }));
      }
      if (_.last(match) === "*" && match.length < pattern.length) {
        match = match.concat(_.times(pattern.length - match.length, function() { return "*" }));
      }
      return pattern.length === match.length && _.every(_.zip(pattern, match), function(part) {
        return _.contains(part, "*") || part[0] === part[1];
      });
    }));
  }));
}, 2);
