import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'div',

  didInsertElement : function(){
    this.$().css({
      margin: '0 auto',
      width: '0%'
    }).animate({
      width: '100%'
    }, 600);
  }
});
