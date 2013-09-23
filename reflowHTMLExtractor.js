/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, document */

var ReflowHTMLExtractor = function (htmlcontent, jQuery) {
    "use strict";
    
    this.htmldoc =  document.implementation.createHTMLDocument('');
	this.jQuery = jQuery;

	this.jQuery.fn.changeElementType = function (newType) {
		var newElements = [];

		jQuery(this).each(function () {
		    var attrs = {};

		    jQuery.each(this.attributes, function (idx, attr) {
		        attrs[attr.nodeName] = attr.nodeValue;
		    });

		    var newElement = jQuery("<" + newType + "/>", attrs).append(jQuery(this).contents());

		    jQuery(this).replaceWith(newElement);

		    newElements.push(newElement);
		});

		return jQuery(newElements);
	};
	this.htmldoc.open();
	this.htmldoc.write(htmlcontent);
	this.htmldoc.close();


	this.removeClearFixes = function () {
		jQuery(".clearfix", this.htmldoc).each(function (index) {
			jQuery(this).removeClass("clearfix");
			if (jQuery(this).attr("class").length === 0) {
				jQuery(this).removeAttr("class");
			}
		});
	};

	this.removeTextSpans = function () {
		jQuery("[id^=textspan]", this.htmldoc).each(function (index) {
            jQuery(this).removeAttr("id");
		});
	};

	this.trimWhitespace = function () {
		jQuery("*", this.htmldoc).each(function (index) {
            jQuery(this).innerhtml = jQuery.trim(jQuery(this).innerhtml);
		});
	};
    
    this.classifyImagesAndRemoveID = function () {
		this.jQuery("img", this.htmldoc).each(function (i, obj) {
            var k = 0;
            var $obj = jQuery(obj);
            var classes = $obj.attr("id").split("_");
            
            for (k = 1; k < classes.length; k++) {
                if (classes[k].indexOf("png") !== 0 &&
                        classes[k].indexOf("jpg") !== 0 &&
                        classes[k].indexOf("gif") !== 0) {
                    $obj.addClass(classes[k]);
                }
            }
            $obj.removeAttr("id");
            $obj.removeClass("image");
            
            if ($obj.attr("class").length === 0) {
                $obj.removeAttr("class");
            }
            
        });
	};

	this.changeIDToElement = function (type) {
		this.jQuery("[id^= " + type +  "]", this.htmldoc).each(function (i, obj) {
        
            var k = 0;
            var $obj = jQuery(obj);
            var original_id = $obj.attr("id");
            
            //preserve classes
            if (original_id.indexOf("_") > -1) {
                var classes = original_id.split("_");
                for (k = 1; k < classes.length; k++) {
                    $obj.addClass(classes[k]);
                }
            }
            
            $obj.removeAttr("id");
            $obj.changeElementType(type);
        });
	};

	this.processHTML = function () {
		this.changeIDToElement("header");
		this.changeIDToElement("footer");
		this.changeIDToElement("ul");
		this.changeIDToElement("li");
		this.changeIDToElement("h1");
		this.changeIDToElement("h2");
		this.changeIDToElement("h3");
		this.changeIDToElement("h4");
		this.changeIDToElement("h5");
		this.changeIDToElement("h6");
		this.changeIDToElement("article");
		this.changeIDToElement("section");
		this.changeIDToElement("time");
		this.removeClearFixes();
		this.trimWhitespace();
		this.removeTextSpans();
        this.classifyImagesAndRemoveID();
	};


};