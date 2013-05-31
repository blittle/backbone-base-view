Backbone BaseView
==================

A base Backbone view which others can extend to gain some more friendly functionality.

#Installation
Install Backbone BaseView most easily through BowerJS.
```
bower install backbone-baseview
```
Backbone BaseView is by default an AMD module. If your project does not use and AMD loader (ie RequireJS) BaseView
will also attach itself to the Backbone namespace, available at `Backbone.BaseView`. Install the package by either
loading it as an AMD module or by a `<script>` tag on your html page (make sure it is loaded after Backbone).

#Usage
Utilize the view by simply creating a View class that extends off of BaseView.

Make sure that the render method of the created view calls the prototype render method of SFView. 
SFView provides the following methods and attributes:
* `_template` - If this attribute is defined as an attribute of you view, SFView will automatically render your template and append it to the html element of your view. The template attribute can be either a string of html, or the return function from `_.template(yourTemplate)`.
* `serialize` - If this function is defined, when SFView automatically calls the `_template` method, the output of serialize will be passed to the _template method. Often the output of this function will simply be `model.toJSON()`
* `listenTo` - This method is not something specific to SFView, rather the newer version of Backbone. It should in most cases replace areas where we do model binding as `this.model.on('change', this.render, this)` - See the Backbone Documentation for more information.
* `createSubView` - This should not be defined on the class, rather called within the class initialize method to create subViews. Note: In order for the view to work right, you need to call the prototype render method. The method takes the parameters:
  * name (Required) - The reference variable on this to the new view.
  * selector (Optional) - A string selector which can be a custom location on the current view to append the new subview.
  * view (Required) - A Backbone.View which will be created and appended to the current view.
  * options (Optional) - An options hash which will be passed to the subView when it is created, by default the options of the parent view will be passed to the subView (ie. the same model/collection).

#Example  
```javascript
  var MyView = Backbone.BaseView.extend({
        _template: '<div class="someClass"></div>',

        initialize: function(options) {
            this.createSubView('someSubView','.someClass', Backbone.View);
            this.listenTo(this.model, "change:attr", this.render);
        },

        serialize: function() {
            return this.model.toJSON();
        },

        render: function() {
            SFView.prototype.render.call(this);
        }
  });
```
