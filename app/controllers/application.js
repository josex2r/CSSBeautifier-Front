import Ember from 'ember';

export default Ember.Controller.extend({

  websiteUrl: '',

  searchDisabled: Ember.computed.empty('websiteUrl'),

  actions: {
    searchWebsite: function(){
      this.transitionTo('website', this.get('websiteUrl'));
    }
  }

});
