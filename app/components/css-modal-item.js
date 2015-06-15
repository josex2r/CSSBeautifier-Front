import Ember from 'ember';

export default Ember.Component.extend({

  item: null,

  title: '',

  shouldOpen: 0,

  _initialize: function(){
    var self = this;
    var $el = this.$().children();
    $el.modal();
    $el.on('shown.bs.modal', function(e){
      $el.find("textarea").select();
    });
    $el.on('hidden.bs.modal', function (e){
      self.sendAction('closeModal');
    });
  }.on('didInsertElement'),

  toggleModal: function(){
    var $el = this.$().children();
    $el.modal('show');
  }.observes('shouldOpen'),

  actions: {
    closeModal: function(){
      this.sendAction('closeModal');
    }
  }
});
