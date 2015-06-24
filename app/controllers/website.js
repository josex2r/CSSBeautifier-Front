import Ember from 'ember';
import AppController from './application';

export default AppController.extend({

  currentFileType: 'original',

  afterRenderEvent: function(){
    Ember.$('md-content').addClass('colorize');
    this._super();
  },

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
