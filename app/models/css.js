import DS from 'ember-data';

var Css = DS.Model.extend({
  url: DS.attr('string'),
  website: DS.belongsTo('website'),
  created: DS.attr('date'),
  original: DS.attr('string'),
  originalCompressed: DS.attr('string'),
  beauty: DS.attr('string'),
  beautyCompressed: DS.attr('string'),
  isCompleted: DS.attr('boolean', {defaultValue: false})
});

Css.reopenClass({
  FIXTURES: [

  ]
});

export default Css;
