import Ember from 'ember';
import LocaleControllerMixin from '../mixins/locale-controller';
import BaseControllerMixin from '../mixins/base-controller';

export default Ember.Controller.extend(LocaleControllerMixin, BaseControllerMixin, {

  websiteUrl: '',

  searchDisabled: Ember.computed.empty('websiteUrl'),

  inputDisabled: false,

  showSpinner: false,

  actions: {
    goToWebsite:function(){
      var self = this;
      var $outlet = Ember.$('#appOutlet');
      this.set('showSpinner', true);
      this.set('inputDisabled', true);
      this.transitionTo('website', this.get('websiteUrl')).then(function(){
        $outlet.show();
        self.set('showSpinner', false);
        self.set('inputDisabled', false);
      }, function(){
        $outlet.show();
        self.set('showSpinner', false);
        self.set('inputDisabled', false);
      });
    },

    searchWebsite: function(){
      var self = this;
      //SlideUp outlet
      var $outlet = Ember.$('#appOutlet');
      if($outlet.children()){
        $outlet.fadeOut('slow').promise().done(function(){
          self.send('goToWebsite');
        });
      }else{
        self.send('goToWebsite');
      }
    }
  }

});
