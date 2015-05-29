import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var host = this.store.adapterFor('application').get('host');
    var namespace = this.store.adapterFor('application').get('namespace');
    var uri = "%@/%@/website/".fmt(host, namespace);
    var store = this.store;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url: uri,
        type: 'post',
        dataType: 'json',
        data: {website: params.url},
        success: function(response){
          //Save data into store
          var website = store.createRecord('website', response);
          website.save();
          resolve(response);
        },
        error: function(response){
          console.log(response);
          reject(response);
        }
      });
    });
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
