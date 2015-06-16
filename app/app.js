import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

var App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  Resolver: Resolver,
  LOG_VIEW_LOOKUPS : true,
  LOG_TRANSITIONS : true,
  LOG_BINDINGS : true
});

loadInitializers(App, config.modulePrefix);

Ember.Router.reopen({
  notifyGoogleAnalytics: function() {
    if (!ga) { return; }
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});

export default App;
