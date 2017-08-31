// AuthorWidget16.AuthorWidget  
dojo.provide("AuthorWidget16.AuthorWidget16");  
// 声明依赖的模块和基类  
dojo.require("dijit._Widget");  
dojo.require("dijit._Templated");  
// Create our widget!  
    dojo.declare("AuthorWidget16.AuthorWidget16", [dijit._Widget, dijit._Templated], {  
        // 设置一些默认值  
        // These typically map to whatever you're handing into the constructor  
        name: "No Name",  
        // Using dojo.moduleUrl, we can get a path to our AuthorWidget's space  
        // and we want to have a default avatar, just in case  
        avatar: dojo.moduleUrl("AuthorWidget16", "images/avatar.png"),  
        bio: "",  
       
        // 加载我们的模板 - important!  
        templateString:  
            dojo.cache("AuthorWidget16", "templates/AuthorWidget.html"),  
       
        // 将会被应用到模板根节点的css类名  
        baseClass: "authorWidget",  
       
        // 指向我们背景动画对象的引用  
        mouseAnim: null,  
       
        // 用于背景的颜色属性  
        baseBackgroundColor: "#fff",  
        mouseBackgroundColor: "#def",
        
        postCreate: function(){  
	        // Get a DOM node reference for the root of our widget  
	        var domNode = this.domNode;  
	       
	        // Run any parent postCreate processes - can be done at any point  
	        this.inherited(arguments);  
	       
	        // Set our DOM node's background color to white -  
	        // smoothes out the mouseenter/leave event animations  
	        dojo.style(domNode, "backgroundColor", this.baseBackgroundColor);  
	        // Set up our mouseenter/leave events - using dijit._Widget's connect  
	        // means that our callback will execute with `this` set to our widget  
	        this.connect(domNode, "onmouseenter", function(e) {  
	            this._changeBackground(this.mouseBackgroundColor);  
	        });  
	        this.connect(domNode, "onmouseleave", function(e) {  
	            this._changeBackground(this.baseBackgroundColor);  
	        });  
	    },
	    
	   	_changeBackground: function(toCol) {  
	        // If we have an animation, stop it  
	        if (this.mouseAnim) { this.mouseAnim.stop(); }  
	       
	        // Set up the new animation  
	        this.mouseAnim = dojo.animateProperty({  
	            node: this.domNode,  
	            properties: {  
	                backgroundColor: toCol  
	            },  
	            onEnd: dojo.hitch(this, function() {  
	                // Clean up our mouseAnim property  
	                this.mouseAnim = null;  
	            })  
	        }).play();  
	    },
	    
	    _setAvatarAttr: function(av) {  
		    // We only want to set it if it's a non-empty string  
		    if (av != "") {  
		        // Save it on our widget instance - note that  
		        // we're using _set, to support anyone using  
		        // our widget's Watch functionality, to watch values change  
		        this._set("avatar", av);  
		   
		        // Using our avatarNode attach point, set its src value  
		        this.avatarNode.src = av;  
		    }  
		}
    });   // and that's it! 