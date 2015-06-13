export default {
  name: 'i18n',

  initialize: function(container, app) {
    app.inject('route', 'i18n', 'service:i18n');
    app.inject('controller', 'i18n', 'service:i18n');
    app.inject('model', 'i18n', 'service:i18n');
  }
};
