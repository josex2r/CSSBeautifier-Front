import Ember from 'ember';

export default Ember.Object.extend({

  /*
   * API Host
   */
  host: 'http://api.cssbeautifier.com',

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

  cssListUrl: function(websiteId){
    return "%@website/%@".fmt(this.get('apiUrl'), websiteId);
  },

  cssUrl: function(){
    return "%@css/".fmt(this.get('apiUrl'));
  }.property('apiUrl'),

  cssDataUrl: function(cssId){
    return "%@%@".fmt(this.get('cssUrl'), cssId);
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
  fetchCssList: function(website){
    var self = this;
    var store = this.get('store');
    var websiteId = website.get('id');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      //Get the list
      Ember.$.ajax({
        url: self.cssListUrl(websiteId),
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
          self.fetchCssList(website).then(
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
  },

  /*
   * Retrieves website, token & css list
   */
  fetchCssData: function(css){
    var self = this;
    var cssId = css.get('id');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      //Get css data
      Ember.$.ajax({
        url: self.cssDataUrl(cssId),
        type: 'get',
        dataType: 'json',
        data: {
          token: self.get('token')
        }
      }).done(function(response){
        //Save css data into store
        css.set('created', response.created || '');
        css.set('original', response.original || '');
        css.set('originalCompressed', response.original_compressed || '');
        css.set('beauty', response.beauty || '');
        css.set('beautyCompressed', response.beauty_compressed || '');
        css.set('isCompleted', true);
        css.save();
        //Finish request
        resolve(css);
      }).fail(function(response){
        console.log(response);
        reject(response);
      });
    });
  },

  /*
   * Retrieves website, token & css list
   */
  fetchCleanedCssData: function(css){
    var self = this;
    var cssId = css.get('id');

    return new Ember.RSVP.Promise(function(resolve, reject) {
      //Get css data
      Ember.$.ajax({
        url: self.get('cssUrl'),
        type: 'post',
        dataType: 'text',
        data: {
          id: cssId,
          token: self.get('token')
        }
      }).done(function(response){
        //Finish request
        resolve(css);
      }).fail(function(response){
        console.log(response);
        reject(response);
      });
    });
  },

  /*
   * Retrieves all css data
   */
  fetchFullCssData: function(css){
    var self = this;

    return new Ember.RSVP.Promise(function(resolve, reject) {
      self.fetchCleanedCssData(css).then(
        //OK
        function(css){
          self.fetchCssData(css).then(
            //OK
            function(css){
              resolve(css);
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
  },

});
