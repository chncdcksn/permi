"use strict";

var _ = require("lodash");

module.exports = _.curry(function(pattern, match) {
  pattern = pattern.split(".");
  match = match.split(".");
  if (_.last(pattern) === "*" && match.length > pattern.length) {
    pattern = pattern.concat(_.repeat("*", match.length - pattern.length).split(""));
  }
  if (_.last(match) === "*" && match.length < pattern.length) {
    match = match.concat(_.repeat("*", pattern.length - match.length).split(""));
  }
  return pattern.length === match.length && _.every(_.zip(pattern, match), function(part) {
    return _.contains(part, "*") || part[0] === part[1];
  });
}, 2);
