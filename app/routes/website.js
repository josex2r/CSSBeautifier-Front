import Ember from 'ember';
import BaseRouteMixin from '../mixins/base-route';

export default Ember.Route.extend(BaseRouteMixin, {
  model: function(params) {
    var adapter = this.store.adapterFor('application');

    var appController = this.controllerFor('application');
    if(!appController.get('websiteUrl')){
      appController.set('websiteUrl', params.url);
    }

    return adapter.findOrFetch('website', params.url);
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
