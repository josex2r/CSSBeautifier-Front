import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value, options){
  var cssApi = this.container.lookup('service:css-api');
  return cssApi.get('token');
});
