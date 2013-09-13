var	reflowCleaner =  {
		

		removeClearFixes: function (htmldoc) {
			$(".clearfix",htmldoc).each(function( index ) {
				$(this).removeClass( "clearfix" );
				if ($(this).attr("class").length == 0){
					$(this).removeAttr("class");
				}
			});

			return htmldoc;
		},

		removeTextSpans : function (htmldoc) {

			$("[id^=textspan]",htmldoc).each(function( index ) {
			  $(this).removeAttr("id");
			});
			return htmldoc;
		},

		trimWhitespace: function (htmldoc) {
			$("*",htmldoc).each(function( index ) {
			  $(this).innerhtml = $.trim($(this).innerhtml);
			  
			});

			return htmldoc;
		},

		changeIDToElement: function (htmldoc, type) {
			var el = $("[id^= " + type +  "]" , htmldoc);
			
			el.removeAttr("id");
			el.changeElementType(type);
			return htmldoc;
		},

		processHTML: function (htmldoc) {
			htmldoc = changeIDToElement(htmldoc, "header");
			htmldoc = changeIDToElement(htmldoc, "footer");
			htmldoc = changeIDToElement(htmldoc, "ul");
			htmldoc = changeIDToElement(htmldoc, "li");
			htmldoc = changeIDToElement(htmldoc, "h1");
			htmldoc = changeIDToElement(htmldoc, "h2");
			htmldoc = changeIDToElement(htmldoc, "article");
			htmldoc = changeIDToElement(htmldoc, "section");
			htmldoc = changeIDToElement(htmldoc, "time");
			htmldoc = removeClearFixes(htmldoc);
			htmldoc = trimWhitespace(htmldoc);
			htmldoc = removeTextSpans(htmldoc);
			return htmldoc;
		}

	}