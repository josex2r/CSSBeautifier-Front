import Ember from 'ember';

export default Ember.Controller.extend({

  websiteUrl: '',

  searchDisabled: Ember.computed.empty('websiteUrl'),

  inputDisabled: false,

  showSpinner: false,

  actions: {
    searchWebsite: function(){
      var self = this;
      this.set('showSpinner', true);
      this.set('inputDisabled', true);
      this.transitionTo('website', this.get('websiteUrl')).then(function(){
        self.set('showSpinner', false);
        self.set('inputDisabled', false);
      }, function(){
        self.set('showSpinner', false);
        self.set('inputDisabled', false);
      });
    }
  }

});
