'use strict';

describe('filtering_wrapper_collection', function() {
  beforeEach(function(done) {
    var that = this;
    require(['backbone', 'js/common/filtering_wrapper_collection'], function(Backbone, Entities) {
      that.Entities = Entities;
      that.underlying = new Backbone.Collection([
        {name: 'model1', datestr: '20150226'}, {name: 'model2', datestr: '20150315'}
      ]);
      done();
    });
  });

  it('can be instantiated', function() {
    var fwc = this.Entities.FilteringWrapperCollection({ collection: this.underlying });
    expect(fwc).toBeDefined();
    expect(fwc).toEqual(jasmine.any(Object));
  });

  it('filters correctly using `where`', function() {
    var fwc = this.Entities.FilteringWrapperCollection({ collection: this.underlying });
    var result = fwc.where({name: 'model1'});
    expect(result.length).toEqual(1);
    expect(result.at(0)).toEqual(this.underlying.at(0));
  });
});
