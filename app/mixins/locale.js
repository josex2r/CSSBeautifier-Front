import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Mixin.create({

  getLang: function(){
    var lang = window.localStorage.getItem('locale');
    if(!lang){
      lang = ENV.i18n.defaultLocale;
    }
    return lang;
  },

  setLang: function(lang){
    window.localStorage.setItem('locale', lang);
  },

  afterModel: function(model){
    this.set('i18n.locale', this.getLang());
    this._super(model);
  },

  actions: {
		switchLang: function(lang){
      this.setLang(lang);
			this.refresh();
		}
	}

});
