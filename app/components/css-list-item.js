import Ember from 'ember';

export default Ember.Component.extend({
  item: null,

  isLoading: false,

  isCompleted: Ember.computed.alias('item.isCompleted'),

  actions: {
    toggleData: function(){
      var self = this;

      this.set('isLoading', true);
      var adapter = this.store.adapterFor('application');
      adapter.findOrFetch('css', this.get('item')).then(function(){
        self.set('isLoading', false);
      });
    },

    openCssData: function(fileType){
      this.sendAction('openCssData', this.get('item'), fileType);
    }
  }
});
