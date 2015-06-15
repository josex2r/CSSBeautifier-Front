import Ember from 'ember';
import BaseControllerMixin from './base-controller';

export default Ember.Mixin.create({

  afterModel: function() {
    this._super();
    var controler = this.controllerFor(this.routeName);
    if(BaseControllerMixin.detect(controler)){
      controler.afterModel();
    }
  }

});
