import Ember from 'ember';

export default Ember.Mixin.create({

  afterModel: function(){
    Ember.run.scheduleOnce('afterRender', this, this.afterRenderEvent);
  },

  afterRenderEvent : function(){
    
  }

});
