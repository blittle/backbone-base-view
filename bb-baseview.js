/**
  *	Backbone BaseView  
  * Copyright Bret Little 2013
  * 
  * https://github.com/blittle/backbone-base-view
  * 
  * License BSD
  */

(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['backbone', 'underscore'], function(Backbone, _) {
			var BaseView = factory(Backbone, _);
			Backbone.BaseView = BaseView;
			return BaseView;
		}, function() {
			var BaseView = factory(root.Backbone, root._)
			root.Backbone.BaseView = BaseView;
			return BaseView;
		});
	} else {
		// Browser globals
		root.Backbone.BaseView = factory(root.Backbone, root._);
	}
}(this, function (Backbone, _) {

	"use strict";

	var SFView = Backbone.View.extend({

		createSubView: function(name, selector, SubView, options) {

			if(!this._subViews) {
				this._subViews = [];
			}

			if(selector instanceof Function) {
				options = SubView;
				SubView = selector;
				selector = null;
			}

			options = _.extend(_.clone(this.options), options);

			this._subViews.push({
				name: name,
				selector: selector
			});

			this[name] = new SubView(options);
			this[name].parent = this;
		},

		render: function() {

			var _this = this,
				html = "";

			if(typeof this._template === 'string') {
				html = this._template;
			} else if(this._template) {
				html = this._template(this.serialize ? this.serialize() : {});
			}

			this.$el.html(html);

			_.each(this._subViews, function(subViewDef) {
				var selector = subViewDef.selector,
					subView  = _this[subViewDef.name];

				if(! selector || !selector.length) {
					_this.$el.append(subView.el);
				} else {
					_this.$(selector).html(subView.el);
				}

				subView.render();
			});

			return this;
		},

		remove: function() {
			var _this = this;

			if(this._subViews) {
				_.each(this._subViews, function(subViewDef) {
					if(_this[subViewDef.name].close) _this[subViewDef.name].close();
					_this[subViewDef.name].remove();
					delete _this[subViewDef.name];
				});

				this._subViews.length = 0;
			}

			Backbone.View.prototype.remove.call(this);
			
			return this;
		}
	});

	return SFView;
}));