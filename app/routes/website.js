import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var host = 'http://dev.beautycss.com';
    var namespace = 'api';
    var store = this.store;
    //Promise
    return new Ember.RSVP.Promise(function(resolve, reject) {
      //Get the website
      var getWebsitesUrl = "%@/%@/website/".fmt(host, namespace);
      Ember.$.ajax({
        url: getWebsitesUrl,
        type: 'post',
        dataType: 'json',
        data: {
          website: params.url
        }
      }).done(function(response){
        //Save website into store
        var website = store.createRecord('website', response);
        website.save();
        //Get css files
        var getCsssUrl = "%@/%@/website/%@".fmt(host, namespace, website.get('id'));
        Ember.$.ajax({
          url: getCsssUrl,
          type: 'get',
          dataType: 'json',
          data: {
            token: website.get('token')
          }
        }).done(function(response){
          //Save css files into store
          response.css.forEach(function(cssData){
            var css = store.createRecord('css', cssData);
            css.set('website', website);
            css.save();
            //Add website relation
            website.get('css').pushObject(css);
          });
          //Update the website relations
          website.save();
          //Finish request
          resolve(response);
        }).fail(function(){
          console.log(response);
          reject(response);
        });
      }).fail(function(response){
        console.log(response);
        reject(response);
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
