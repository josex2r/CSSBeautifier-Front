import Ember from 'ember';
import DS from 'ember-data';

export default DS.FixtureAdapter.extend({

  findOrFetch: function(modelType, arg){
    var self = this;
    
    switch(modelType){
      case 'website':
        return new Ember.RSVP.Promise(function(resolve, reject) {
          self.store.find('website').then(function(results){
            //Find website in the store
            var website = results.content.filter(function(el){
              return el.get('url') === arg;
            }).shift();

            if(website){
              resolve(website);
            }else{
              //If website is not stored, fetch from the API
              resolve(self.cssApi.fetchFullWebsite(arg));
            }
          });
        });
    }
  }

});
