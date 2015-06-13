import DS from 'ember-data';

var Website = DS.Model.extend({
  url: DS.attr('string'),
  css: DS.hasMany('css')
});

Website.reopenClass({
  FIXTURES: [

  ]
});

export default Website;
