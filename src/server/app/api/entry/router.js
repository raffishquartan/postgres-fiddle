'use strict';

var pr = require('app/util/pr');

var router_impl = require('app/api/entry/router_impl');

/**
 * TODO: Extract this and other funcs like it to a separate module (app/api/helpers?)
 *
 * Returns a function with the right signature for an Express router from a router implementation function
 * @param  {Function} router_impl A router implementation function, taking pr, req, res, next
 * @param  {Object}   pr          The PR module (to be injected)
 * @return {Function}             A router function which takes res, res and next and calls the impl param func
 */
function inject_pr(route_impl_func, pr) {
  return function(req, res, next) {
    return route_impl_func(pr, req, res, next);
  };
}

var express = require('express');
var router = new express.Router();
router.get('/entry/:tag_string?', inject_pr(router_impl.get_entries, pr));
router.get('/tag', inject_pr(router_impl.get_tags, pr));

module.exports = router;
