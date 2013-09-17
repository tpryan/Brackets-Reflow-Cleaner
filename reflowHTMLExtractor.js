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

	this.changeIDToElement = function (type) {
		var el = this.jQuery("[id^= " + type +  "]", this.htmldoc);
		el.removeAttr("id");
		el.changeElementType(type);
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
	};


};