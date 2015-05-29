//https://gist.github.com/marbemac/06c5040e4d71694f07b3s
import Ember from 'ember';
import DS from "ember-data";

export default DS.RESTSerializer.extend({
	// Custom json root. The API returns objects in the "data" key.
	// We need to re-assign it to the singular version of the model name.
	// So {name: foo} becomes {user: {name: foo}}
	extractSingle: function(store, primaryType, rawPayload, recordId) {
		var typeKey = primaryType.typeKey;
    var payload = {};
    payload[typeKey] = rawPayload;
		return this._super(store, primaryType, payload, recordId);
	},
	// Custom json root. The API returns objects in the "data" key.
	// We need to re-assign it to the plural version of the model name.
	// So {data: [{post1}, {post2}]} becomes {posts: [{post1},{post2}]}
	/*extractArray: function(store, primaryType, payload) {
		var pluralTypeKey = Ember.Inflector.inflector.pluralize(primaryType.typeKey);
		payload[pluralTypeKey] = payload['data'];
		delete payload['data'];

		return this._super(store, primaryType, payload);
	}*/

  attrs: {
    avatarUrl: 'avatar_url',
    createdAt: {key: 'created_at'}
  },

  keyForAttribute: function(attr, method) {
    return Ember.String.underscore(attr).camelize();
  }

});
