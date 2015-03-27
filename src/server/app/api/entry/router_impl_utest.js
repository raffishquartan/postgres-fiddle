// Allow statements that are not assignments or function calls (e.g. should statements)
/* jshint -W030 */

'use strict';

require('should');
var sinon = require('sinon');

var test_lib = require('test/lib');
var router_impl = require('app/api/entry/router_impl');

var pr = {};
var req = {};
var res = {};
var next;

describe('app/api/entry/router_impl', function() {
  beforeEach(function() {
    pr = {
      pr: {
        entry: {
          entry: {
            findAll: test_lib.stub_then_done()
          },
          tag: {
            find: test_lib.stub_then_done(),
            findAll: test_lib.stub_then_done()
          }
        }
      }
    };
    req = {
      params: {}
    };
    res = {
      send: sinon.spy(),
      status: sinon.spy()
    };
  });

  describe('module.exports.get_entries', function() {
    it('calls pr.pr.entry.tag.find if req.params.tag_string is truthy', function() {
      req.params.tag_string = true;
      router_impl.get_entries(pr, req, res, next);
      pr.pr.entry.tag.find.calledOnce;
      pr.pr.entry.tag.find.calledWith({
        where: { value: req.params.tag_string },
        include: [{ model: pr.pr.entry.entry, include: [pr.pr.entry.tag] }]
      });
      res.status.calledOnce;
      res.status.calledWith(200);
      res.send.calledOnce;
    });

    it('calls pr.pr.entry.entry.findAll if req.params.tag_string is falsy', function() {
      req.params.tag_string = false;
      router_impl.get_entries(pr, req, res, next);
      pr.pr.entry.entry.findAll.calledOnce;
      res.status.calledOnce;
      res.status.calledWith(200);
      res.send.calledOnce;
    });
  });

  describe('module.exports.get_tags', function() {
    it('calls pr.pr.entry.tag.findAll', function() {
      pr.pr.entry.tag.findAll.calledOnce;
      res.status.calledOnce;
      res.status.calledWith(200);
      res.send.calledOnce;
    });
  });
});
