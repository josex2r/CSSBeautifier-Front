import DS from 'ember-data';

var User = DS.Model.extend({
  login: DS.attr('string'),
  avatarUrl: DS.attr('string'),
  name: DS.attr('string'),
  createdAt: DS.attr('date')
});

User.reopenClass({
  FIXTURES: [

  ]
});

export default User;
