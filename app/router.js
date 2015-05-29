import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('user', { path: '/user/:userLogin' });
  this.route('website', { path: '/website/:url' });
});

export default Router;
