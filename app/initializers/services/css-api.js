export default {
  name: 'cssApi',

  initialize: function(container, app) {
    // Make the ember-data store available in the service
    app.inject('service:css-api', 'store', 'store:main');
    app.inject('component', 'store', 'store:main');

    // Inject into all routes and controllers
    app.inject('route', 'cssApi', 'service:css-api');
    app.inject('controller', 'cssApi', 'service:css-api');
    app.inject('adapter', 'cssApi', 'service:css-api');

    app.inject('helper:api-token', 'cssApi', 'service:css-api');
  }
};
