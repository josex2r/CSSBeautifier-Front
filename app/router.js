import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('website', { path: '/website/:url' }, function(){
    this.route('css', { path: '/css/:id' });
  });
});

export default Router;
