var ReflowHTMLCleaner = function(htmlcontent, jQuery) {
	this.htmldoc =  document.implementation.createHTMLDocument('');
	this.jQuery = jQuery;

	this.jQuery.fn.changeElementType = function(newType) {
		var newElements = [];

		$(this).each(function() {
		    var attrs = {};

		    $.each(this.attributes, function(idx, attr) {
		        attrs[attr.nodeName] = attr.nodeValue;
		    });

		    var newElement = $("<" + newType + "/>", attrs).append($(this).contents());

		    $(this).replaceWith(newElement);

		    newElements.push(newElement);
		});

		return $(newElements);
	};
	this.htmldoc.open();
	this.htmldoc.write(htmlcontent);
	this.htmldoc.close();


	this.removeClearFixes = function () {
		$(".clearfix",this.htmldoc).each(function( index ) {
			$(this).removeClass( "clearfix" );
			if ($(this).attr("class").length == 0){
				$(this).removeAttr("class");
			}
		});
	};

	this.removeTextSpans = function () {
		$("[id^=textspan]",this.htmldoc).each(function( index ) {
		  $(this).removeAttr("id");
		});
	};

	this.trimWhitespace= function () {
		$("*",this.htmldoc).each(function( index ) {
		  $(this).innerhtml = $.trim($(this).innerhtml);
		});
	};

	this.changeIDToElement= function (type) {
		var el = this.jQuery("[id^= " + type +  "]" , this.htmldoc);
		el.removeAttr("id");
		el.changeElementType(type);
	};

	this.processHTML= function () {
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
	}


};