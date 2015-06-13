import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var website = this.modelFor('website');
    var aCss = website.get('css');
    var css = aCss.filter(function(el){
      return el.get('id') === params.id;
    }).shift();

    return css;
  },

  afterModel: function(model){
    if(!model.get('isCompleted')){
      return this.cssApi.fetchFullCssData(model);
    }
  },

  events: {
    // then this hook will be fired with the error and most importantly a Transition
    // object which you can use to retry the transition after you handled the error
    error: function(error, transition) {
      // handle the error
      console.log(error);
      // retry the transition
      //transition.retry();
    }
  }
});
