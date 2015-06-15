import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',

  didInsertElement : function(){
    this.$().hide();
    this.$().slideDown();
  },
  
  willDestroyElement : function(){
    var clone = this.$().clone();
    this.$().parent().append(clone);
    clone.slideUp();
  }
});
