import Ember from 'ember';

export default Ember.Mixin.create({

  setLang: function(lang){
    window.localStorage.setItem('locale', lang);
  },

  actions: {
		switchLang: function(lang){
      this.setLang(lang);
			this.send('refresh');
		}
	}

});
