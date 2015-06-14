import Ember from 'ember';

export default Ember.Controller.extend({

  currentFileType: 'original',

  actions: {
    goToCss: function(cssModel, fileType){
      this.set('currentFileType', fileType);
      this.transitionToRoute('website.css', cssModel, {
        queryParams: {
          fileType: fileType
        }
      });
    }
  }

});
