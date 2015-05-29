import DS from 'ember-data';

var Website = DS.Model.extend({
  token: DS.attr('string')
});

Website.reopenClass({
  FIXTURES: [

  ]
});

export default Website;
