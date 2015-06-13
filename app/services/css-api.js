import Ember from 'ember';

export default Ember.Object.extend({

  /*
   * API Host
   */
  host: 'http://dev.beautycss.com',

  /*
   * API namespace
   */
  namespace: 'api',

  /*
   * Current application token
   */
  token: null,

  /*
   * Full API URL
   */
  apiUrl: function(){
    return "%@/%@/".fmt(this.get('host'), this.get('namespace'));
  }.property('host', 'namespace'),

  websiteUrl: function(){
    return "%@website/".fmt(this.get('apiUrl'));
  }.property('apiUrl'),

  cssUrl:function(websiteId){
    return "%@website/%@".fmt(this.get('apiUrl'), websiteId);
  },

  /*
   * Retrieves website & token data
   */
  fetchWebsite: function(websiteUrl){
    var self = this;
    var store = this.get('store');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      //Get the website
      Ember.$.ajax({
        url: self.get('websiteUrl'),
        type: 'post',
        dataType: 'json',
        data: {
          website: websiteUrl
        }
      }).done(function(response){
        //Check to update the token
        if(response && response.token){
          self.set('token', response.token);
        }
        //Save website into store
        var website = store.createRecord('website', response);
        website.set('url', websiteUrl);
        website.save();

        resolve(website);
      }).fail(function(response){
        console.log(response);
        reject(response);
      });
    });
  },

  /*
   * Retrieves css list
   */
  fetchCss: function(website){
    var self = this;
    var store = this.get('store');
    var websiteId = website.get('id');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      //Get the list
      Ember.$.ajax({
        url: self.cssUrl(websiteId),
        type: 'get',
        dataType: 'json',
        data: {
          token: self.get('token')
        }
      }).done(function(response){
        //Check to update the token
        if(response && response.token){
          self.set('token', response.token);
        }
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
        resolve(website);
      }).fail(function(response){
        console.log(response);
        reject(response);
      });
    });
  },

  /*
   * Retrieves website, token & css list
   */
  fetchFullWebsite: function(websiteUrl){
    var self = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      self.fetchWebsite(websiteUrl).then(
        //OK
        function(website){
          self.fetchCss(website).then(
            //OK
            function(website){
              resolve(website);
            },
            //KO
            function(error){
              reject(error);
            }
          );
        },
        //KO
        function(error){
          reject(error);
        }
      );
    });
  }

});
