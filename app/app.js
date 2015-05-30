import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;
Ember.LOG_VIEW_LOOKUPS = true;
Ember.LOG_TRANSITIONS = true;
Ember.LOG_BINDINGS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  Resolver: Resolver
});

//Register global api
var api = Ember.Object.extend({
  host: 'http://dev.beautycss.com',
  namespace: 'api',
  getApiUrl: function(){
    return "%@/%@/".fmt(this.host, this.namespace);
  }
});
Ember.Application.initializer({
  name: 'api',

  initialize: function(container, application) {
    application.register('api:main', api, {singleton: true});
    application.inject('controller', 'api', 'api:main');
    application.inject('route', 'api', 'api:main');
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
