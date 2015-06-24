import Ember from 'ember';

export default Ember.Mixin.create({

  afterModel: function(model){
    var lang  = this.controllerFor('application').get('lang');
    this.set('i18n.locale', lang);
    this._super(model);
  },

  actions: {
    refresh: function(){
      window.location.reload();
		}
	}

});
