import Ember from 'ember';
import DS from 'ember-data';

export default DS.FixtureAdapter.extend({

  findOrFetch: function(modelType, arg){
    var self = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {

      switch(modelType){
        case 'website':
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
          break;
        case 'css':
          if(arg.get('isCompleted')){
            resolve(arg);
          }else{
            //If css is not fully stored, fetch from the API
            resolve(self.cssApi.fetchFullCssData(arg));
          }
          break;
        default:
          reject('KO');
      }

    });
  }

});
