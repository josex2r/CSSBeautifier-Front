import DS from 'ember-data';

var Css = DS.Model.extend({
  url: DS.attr('string'),
  website: DS.belongsTo('website')
});

Css.reopenClass({
  FIXTURES: [

  ]
});

export default Css;
