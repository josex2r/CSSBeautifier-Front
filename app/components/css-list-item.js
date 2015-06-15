import Ember from 'ember';

export default Ember.Component.extend({
  item: null,

  isLoading: false,

  index: 0,

  isCompleted: Ember.computed.alias('item.isCompleted'),

  didInsertElement: function () {
    var index = this.get('index');
    var $el = this.$().find('md-item-content');
    setTimeout(function(){
      $el.addClass('relocateCssListItem');
    }, index * 200);
  },

  flipIcon: function(){
    var $icon = this.$().find('.flip > .card');
    if(!this.get('isLoading') && !this.get('isCompleted')){
      $icon.removeClass('flipped');
    }else if(this.get('isLoading') && !this.get('isCompleted')){
      $icon.addClass('flipped');
    }else{
      $icon.find('.unknown-icon').removeClass('unknown-icon').addClass('css-icon');
      $icon.removeClass('flipped');
    }
  }.observes('isLoading'),

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
