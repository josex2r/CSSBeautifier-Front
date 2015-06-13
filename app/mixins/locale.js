import Ember from 'ember';

export default Ember.Mixin.create({

  locale: localStorage.locale,

  model: function(params) {
    this._super(params);
  },

  afterModel: function(model){
    this.set('i18n.locale', this.get('locale'));
    this._super(model);
  }

});
