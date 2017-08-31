define(	["dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin",
				"dojo/text!./AuthorWidget/templates/AuthorWidget.html",
				"dojo/dom-style", "dojo/_base/fx", "dojo/_base/lang"],
		function(declare, WidgetBase, TemplatedMixin, template, domStyle,
				baseFx, lang) {
			return declare([WidgetBase, TemplatedMixin], {
				// Some default values for our author
				// These typically map to whatever you're handing into the
				// constructor
				name : "No Name",
				// Using dojo.moduleUrl, we can get a path to our AuthorWidget"s
				// space
				// and we want to have a default avatar, just in case
				avatar : require.toUrl("custom.AuthorWidget",
						"images/defaultAvatar.png"),
				bio : "",
				// Our template - important!
				templateString : template,
				// A class to be applied to the root node in our template
				baseClass : "authorWidget",
				// A reference to our background animation
				mouseAnim : null,
				// Colors for our background animation
				baseBackgroundColor : "#fff",
				mouseBackgroundColor : "#def",
				// postCreate is called once our widget's DOM is ready,
				// but BEFORE it's been inserted into the page!
				// This is far and away the best point to put in any special
				// work.
				postCreate : function() {
					// Get a DOM node reference for the root of our widget
					var domNode = this.domNode;
					// Run any parent postCreate processes - can be done at any
					// point
					this.inherited(arguments);
					// Set our DOM node's background color to white -
					// smoothes out the mouseenter/leave event animations
					domStyle.set(domNode, "backgroundColor",
							this.baseBackgroundColor);
					// Set up our mouseenter/leave events - using
					// dijit._Widget's connect
					// means that our callback will execute with `this` set to
					// our widget
					this.connect(domNode, "onmouseenter", function(e) {
								this
										._changeBackground(this.mouseBackgroundColor);
							});
					this.connect(domNode, "onmouseleave", function(e) {
								this
										._changeBackground(this.baseBackgroundColor);
							});
				},
				// This method is automatically invoked anytime anyone calls
				// myWidget.set('avatar', someValue)
				_setAvatarAttr : function(av) {
					// We only want to set it if it's a non-empty string
					if (av != "") {
						// Save it on our widget instance - note that
						// we're using _set, to support anyone using
						// our widget's Watch functionality, to watch values
						// change
						this._set("avatar", av);
						// Using our avatarNode attach point, set its src value
						this.avatarNode.src = av;
					}
				},
				_changeBackground : function(toCol) {
					// If we have an animation, stop it
					if (this.mouseAnim) {
						this.mouseAnim.stop();
					}
					// Set up the new animation
					this.mouseAnim = baseFx.animateProperty({
								node : this.domNode,
								properties : {
									backgroundColor : toCol
								},
								onEnd : lang.hitch(this, function() {
											// Clean up our mouseAnim property
											this.mouseAnim = null;
										})
							}).play();
				}
			});
		});