import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var api = this.api;
    var website = this.modelFor('website');
    var aCss = website.get('css');
    var css = aCss.filter(function(el){
      return el.get('id') === params.id;
    }).shift();

    return css;
  },

  afterModel: function(model){
    if(!model.get('isCompleted')){
      //Get css data
      var api = this.api;
      var website = model.get('website');
      var getCssUrl = "%@css/%@".fmt(api.getApiUrl(), model.get('id'));
      return new Ember.RSVP.Promise(function(resolve, reject) {
        Ember.$.ajax({
          url: getCssUrl,
          type: 'get',
          dataType: 'json',
          data: {
            token: website.get('token')
          }
        }).done(function(response){
          //Save css data into store
          model.set('created', response.created || '');
          model.set('original', response.original || '');
          model.set('originalCompressed', response.original_compressed || '');
          model.set('beauty', response.beauty || '');
          model.set('beautyCompressed', response.beauty_compressed || '');
          model.set('isCompleted', true);
          model.save();//Finish request
          resolve(model);
        }).fail(function(){
          console.log(response);
          reject(response);
        });
      });
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
