import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Mixin.create({

  afterModel: function(){
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  afterRenderEvent : function(){

  },

  lang: function(){
    var lang = window.localStorage.getItem('locale');
    if(!lang){
      lang = ENV.i18n.defaultLocale;
    }
    return lang;
  }.property(),

  esLocale: function(){
    return this.get('lang') === 'es';
  }.property('lang'),

  enLocale: function(){
    return this.get('lang') === 'en';
  }.property('lang')

});
