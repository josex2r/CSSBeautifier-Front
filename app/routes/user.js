import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('user', params.userLogin);
  },

  serialize: function(model) {
    alert(model)
    return {userLogin: model.get('login') };
  }
});
