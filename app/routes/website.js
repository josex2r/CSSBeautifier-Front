import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var adapter = this.store.adapterFor('application');

    return adapter.findOrFetch('website', params.url);
  },

  actions: {
    getCssData: function(){
      console.log(arguments)
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
      return true;
    }
  }
});
