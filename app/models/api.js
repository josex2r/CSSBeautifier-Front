export default Ember.Object.extend({
  host: 'http://dev.beautycss.com',
  namespace: 'api',
  getApiUrl: function(){
    return "%@/%@/".fmt(this.host, this.namespace);
  }
});
