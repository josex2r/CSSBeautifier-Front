import Ember from 'ember';

export default Ember.Controller.extend({

  queryParams: ['fileType'],

  fileType: 'original',

  cssContent: null,

  counter: 0,

  setCssContent: function(){
    var paramName = 'model.%@'.fmt(this.get('fileType'));
    this.set('cssContent', this.get(paramName));
    this.incrementProperty('counter');
  },

  changedFileType: function() {
    if(this.get('model')){
      this.setCssContent();
    }
  }.observes('fileType'),

  loadedModel: function(){
    this.setCssContent();
  }.observes('model.id'),

  actions: {
    goToWebsite: function(){
      this.transitionToRoute('website', this.get('model.website'));
    }
  }

});
