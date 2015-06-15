import Ember from 'ember';
import BaseControllerMixin from '../mixins/base-controller';

export default Ember.Controller.extend(BaseControllerMixin, {

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
