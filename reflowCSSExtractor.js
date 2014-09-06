/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 150 */
/*global define, CSSParser, jscsspStyleRule, jscsspDeclaration, jscsspVariable */


var i = 0;
var color = "";
var nameArray = [];
var colorArray = [];
var names = {};

var colors =	{
    "aqua": "#00ffff",
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "black": "#000000",
    "blue": "#0000ff",
    "cyan": "#00ffff",
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgreen": "#006400",
    "darkturquoise": "#00ced1",
    "deepskyblue": "#00bfff",
    "green": "#008000",
    "lime": "#00ff00",
    "mediumblue": "#0000cd",
    "mediumspringgreen": "#00fa9a",
    "navy": "#000080",
    "springgreen": "#00ff7f",
    "teal": "#008080",
    "midnightblue": "#191970",
    "dodgerblue": "#1e90ff",
    "lightseagreen": "#20b2aa",
    "forestgreen": "#228b22",
    "seagreen": "#2e8b57",
    "darkslategray": "#2f4f4f",
    "darkslategrey": "#2f4f4f",
    "limegreen": "#32cd32",
    "mediumseagreen": "#3cb371",
    "turquoise": "#40e0d0",
    "royalblue": "#4169e1",
    "steelblue": "#4682b4",
    "darkslateblue": "#483d8b",
    "mediumturquoise": "#48d1cc",
    "indigo": "#4b0082",
    "darkolivegreen": "#556b2f",
    "cadetblue": "#5f9ea0",
    "cornflowerblue": "#6495ed",
    "mediumaquamarine": "#66cdaa",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "slateblue": "#6a5acd",
    "olivedrab": "#6b8e23",
    "slategray": "#708090",
    "slategrey": "#708090",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "mediumslateblue": "#7b68ee",
    "lawngreen": "#7cfc00",
    "aquamarine": "#7fffd4",
    "chartreuse": "#7fff00",
    "gray": "#808080",
    "grey": "#808080",
    "maroon": "#800000",
    "olive": "#808000",
    "purple": "#800080",
    "lightskyblue": "#87cefa",
    "skyblue": "#87ceeb",
    "blueviolet": "#8a2be2",
    "darkmagenta": "#8b008b",
    "darkred": "#8b0000",
    "saddlebrown": "#8b4513",
    "darkseagreen": "#8fbc8f",
    "lightgreen": "#90ee90",
    "mediumpurple": "#9370db",
    "darkviolet": "#9400d3",
    "palegreen": "#98fb98",
    "darkorchid": "#9932cc",
    "yellowgreen": "#9acd32",
    "sienna": "#a0522d",
    "brown": "#a52a2a",
    "darkgray": "#a9a9a9",
    "darkgrey": "#a9a9a9",
    "greenyellow": "#adff2f",
    "lightblue": "#add8e6",
    "paleturquoise": "#afeeee",
    "lightsteelblue": "#b0c4de",
    "powderblue": "#b0e0e6",
    "firebrick": "#b22222",
    "darkgoldenrod": "#b8860b",
    "mediumorchid": "#ba55d3",
    "rosybrown": "#bc8f8f",
    "darkkhaki": "#bdb76b",
    "silver": "#c0c0c0",
    "mediumvioletred": "#c71585",
    "indianred": "#cd5c5c",
    "peru": "#cd853f",
    "chocolate": "#d2691e",
    "tan": "#d2b48c",
    "lightgray": "#d3d3d3",
    "lightgrey": "#d3d3d3",
    "thistle": "#d8bfd8",
    "goldenrod": "#daa520",
    "orchid": "#da70d6",
    "palevioletred": "#db7093",
    "crimson": "#dc143c",
    "gainsboro": "#dcdcdc",
    "plum": "#dda0dd",
    "burlywood": "#deb887",
    "lightcyan": "#e0ffff",
    "lavender": "#e6e6fa",
    "darksalmon": "#e9967a",
    "palegoldenrod": "#eee8aa",
    "violet": "#ee82ee",
    "azure": "#f0ffff",
    "honeydew": "#f0fff0",
    "khaki": "#f0e68c",
    "lightcoral": "#f08080",
    "sandybrown": "#f4a460",
    "beige": "#f5f5dc",
    "mintcream": "#f5fffa",
    "wheat": "#f5deb3",
    "whitesmoke": "#f5f5f5",
    "ghostwhite": "#f8f8ff",
    "lightgoldenrodyellow": "#fafad2",
    "linen": "#faf0e6",
    "salmon": "#fa8072",
    "oldlace": "#fdf5e6",
    "bisque": "#ffe4c4",
    "blanchedalmond": "#ffebcd",
    "coral": "#ff7f50",
    "cornsilk": "#fff8dc",
    "darkorange": "#ff8c00",
    "deeppink": "#ff1493",
    "floralwhite": "#fffaf0",
    "fuchsia": "#ff00ff",
    "gold": "#ffd700",
    "hotpink": "#ff69b4",
    "ivory": "#fffff0",
    "lavenderblush": "#fff0f5",
    "lemonchiffon": "#fffacd",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightyellow": "#ffffe0",
    "magenta": "#ff00ff",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "pink": "#ffc0cb",
    "red": "#ff0000",
    "seashell": "#fff5ee",
    "snow": "#fffafa",
    "tomato": "#ff6347",
    "white": "#ffffff",
    "yellow": "#ffff00"
};

for (color in colors) {
    if (colors.hasOwnProperty(color)) {
        colorArray.push(colors[color]);
        names[colors[color]] = color;
        nameArray.push(color);
    }
}

var ReflowCSSExtractor = function (csscontent) {
    "use strict";
    
	var parser = new CSSParser();
	var sheet = parser.parse(csscontent, false, true);
    this.sheet = sheet;
    
    this.createReportColorLine = function (colorObj) {
        var space = " ";
        var colorItem = "// ";
        var rgbString = "rgb(" + colorObj.rgb.r + "," + colorObj.rgb.g + "," + colorObj.rgb.b + ")";
        var i = 0;
        var j = 0;
        
        
        colorItem += colorObj.hex;
        
        colorItem += this.nSpaces(3);
        
        colorItem += rgbString;
        
        colorItem += this.nSpaces(18 - rgbString.length);
        
        colorItem += colorObj.name;

        colorItem += this.nSpaces(16 - colorObj.name.length);
        
        colorItem += this.nSpaces(2 - colorObj.count.toString().length);
        
        if (colorObj.count === 1) {
            colorItem += colorObj.count + " time ";
        } else {
            colorItem += colorObj.count + " times";
        }
            
        colorItem += this.nSpaces(2);


        if (colorObj.usedAsBackground) {
            colorItem += "background";
        }
        
        
        return colorItem;
    };
    
    this.extractClasses = function () {
        var rule = {};
        var i = 0;
        var j = 0;
        var classArray = [];
        var classname = "";
        var classNameArray = [];
        var selectorArray = [];
        var tempClass = "";
		for (i = 0; i < sheet.cssRules.length; i++) {
            if (sheet.cssRules[i].type === 1) {
                rule = sheet.cssRules[i];
                if (rule.mSelectorText.indexOf("_") > -1) {
                    selectorArray = rule.mSelectorText.split("_");
                
                    //start at second item because I don't care about the first part for a class
                    for (j = 1; j < selectorArray.length; j++) {
                        tempClass = selectorArray[j].replace(/\d/g,'');
                        if (!this.isPictureFormatName(tempClass) && tempClass.length > 0) {
                            if (typeof classArray[tempClass] !== "undefined") {
                                classArray[tempClass].ruleArray.push(rule);
                            } else {
                                classArray[tempClass] = {};
                                classArray[tempClass].ruleArray = [];
                                classArray[tempClass].ruleArray.push(rule);
                            }
                        }
                    }
                    
                }
            }
	    }


        for (classname in classArray) {
            var matchingClassName = this.findMatchingClassName(classname, classNameArray);


            if (matchingClassName.length > 0) {
                console.log("Rename Class", classname, matchingClassName,classArray[classname] );

            } else {
                classNameArray.push(classname);
            }
        }
        
        for (classname in classArray) {
            if (classArray.hasOwnProperty(classname)) {
                /*jslint newcap: true */
                tempClass = classArray[classname];
                tempClass.cssRule = new jscsspStyleRule();
                tempClass.cssRule.mSelectorText = "." + classname;
                
                if (tempClass.ruleArray.length === 1) {
                    tempClass.cssRule.declarations = tempClass.ruleArray[0].declarations;
                } else {
                    tempClass.cssRule.declarations = this.findCommonProperties(tempClass.ruleArray);
                }
            }
        }
		return classArray;
    };

    this.findMatchingClassName = function (className, classNameArray) {
        var matchingClassName = "";
        var i = 0;
        
        for (i = 0; i < sheet.cssRules.length; i++) {
            if (className.replace(/\d/g,'') == classNameArray[i]){
                matchingClassName = classNameArray[i];
                break;
            }
        }    

        return matchingClassName;
    };
    
    this.findCommonProperties = function (ruleArray) {
        var i = 0;
        var j = 0;
        var props = [];
        var declaration = {};
        var value = "";
        var propname = "";
        var result = [];
        
        //start with first item in array
        for (j = 0; j < ruleArray[0].declarations.length; j++) {
            declaration = ruleArray[0].declarations[j];
            props[declaration.property] = {};
            props[declaration.property].value = declaration.valueText;
            props[declaration.property].count = 1;
        }
        
        for (i = 1; i < ruleArray.length; i++) {
            for (j = 0; j < ruleArray[i].declarations.length; j++) {
                declaration = ruleArray[i].declarations[j];
                if (props.hasOwnProperty(declaration.property) &&
                        props[declaration.property].value ===  declaration.valueText) {
                    props[declaration.property].count++;
                } else {
                    delete props[declaration.property];
                }
            }
        }
        
        for (propname in props) {
            if (props.hasOwnProperty(propname) && props[propname].count > 1) {
                /*jslint newcap: true */
                declaration = new jscsspDeclaration();
                declaration.property = propname;
                value = new jscsspVariable(1, null);
                value.value = props[propname].value;
                declaration.values = [value];
                declaration.valueText = props[propname].value;
                declaration.parsedCssText = propname + ": " + props[propname].value + ";";
                result.push(declaration);
                
            }
        }
        
        
        return result;
    };
    
    this.createClassCode = function () {
        var classArray = this.extractClasses();
        var result = "";
        var classname = "";
        var classObj = {};
        var i = 0;
        
        
        for (classname in classArray){
            if (classArray.hasOwnProperty(classname)) {
                classObj = classArray[classname];
                classObj = this.shorthandProp(classObj, "margin");
                classObj = this.shorthandProp(classObj, "padding");
                
                if (typeof classObj.cssRule != 'undefined') {
                    result += "/* class: " + classname + " used ";
                    result += classObj.ruleArray.length + " times */" + "\n";
                    result += classObj.cssRule.cssText() + "\n\n";
                }
            }
        }
        
        return result;
    };
    
    this.shorthandProp = function (classObj, propertyToTarget) {
        var i = 0;
        var ruleText = "";
        var propObj = {props: []};
        var declaration = {props: []};
        var paddingdecl = {};
        var propdecl = {};
        var value = "";
        var valueArray = [];
        
        for (i = 0; i < classObj.cssRule.declarations.length; i++) {
            if(typeof classObj.cssRule.declarations[i] != 'undefined'){
                if (classObj.cssRule.declarations[i].property.indexOf(propertyToTarget + "-") === 0) {
                    propObj.props.push({prop: classObj.cssRule.declarations[i], index: i});
                }
            }
        }
        
        if (propObj.props.length === 4) {
            ruleText = "";
            valueArray = [];
            for (i = 0; i < propObj.props.length; i++) {
                ruleText += propObj.props[i].prop.valueText;
                
                if (i < 3) {
                    ruleText += " ";
                }
                
                /*jslint newcap: true */
                value = new jscsspVariable(1, null);
                value.value = propObj.props[i].prop.valueText;
                valueArray.push(value);
                
            }
            
            /*jslint newcap: true */
            propdecl = new jscsspDeclaration();
            propdecl.property = propertyToTarget;
            propdecl.values = valueArray;
            propdecl.valueText = ruleText;
            propdecl.parsedCssText = propertyToTarget + ": " + ruleText + ";";
            
            for (i = propObj.props.length - 1; i >= 0; i--) {
                delete classObj.cssRule.declarations[propObj.props[i].index];
            }
            
            classObj.cssRule.declarations = this.renumberArray(classObj.cssRule.declarations);
            classObj.cssRule.declarations.push(propdecl);
        }
        
        
        
        return classObj;
    };
    
    this.renumberArray = function (arr) {
        var index = "";
        var result = [];
        
        for (index in arr) {
            if (arr.hasOwnProperty(index)) {
                result.push(arr[index]);
            }
        }
        return result;
    };
    
    this.isPictureFormatName = function (str) {
        if ((str.indexOf("png") === 0) ||
                (str.indexOf("jpg") === 0) ||
                (str.indexOf("gif") === 0)) {
            return true;
        } else {
            return false;
        }
    };

    this.nSpaces = function (count) {
        var i = 0;
        var result = "";
        for (i = 0; i < count; i++) {
            result += " ";
        }
        return result;
    };

    this.createReport = function () {
        var colorsAndFonts = this.createColorsAndFunctionsReport();
        var breakpoints = this.createBreakPointsCode();
        var classes = this.createClassCode();
        var report = colorsAndFonts + breakpoints + classes;
        return report;
    };
    
	this.createColorsAndFunctionsReport = function () {

		var colors = this.findColors();
		var fonts = this.findFonts();
        var gradients = this.findGradients();
		var report = "";
		var space = " ";
        var color = "";
        var font = "";
        var gradient = "";
        
        var sortFunction = function (a, b) {
            if (a.count > b.count) {
                return -1;
            }
            if (a.count < b.count) {
                return 1;
            }
            return 0;
        };
        
        colors.sort(sortFunction);
        
		report += "/*"  + "\n";
		report += "****** Colors extracted from Reflow ******" + "\n";
        report += "// hex value RGB value         Closest color   Used      isBackground?" + "\n";
        report += "//---------------------------------------------------------------------" + "\n";

		for (color in colors) {
            if (colors.hasOwnProperty(color)) {
                var colorObj = colors[color];
                var colorItem = this.createReportColorLine(colorObj);
                report += colorItem + "\n";
            }
		}
		report += "\n";
        report += "// * means that color name is the closest match" + "\n";
        report += "//---------------------------------------------------------------------" + "\n";
        report += "\n";
		report += "****** Fonts extracted from Reflow ******" + "\n";
        
		for (font in fonts) {
            if (fonts.hasOwnProperty(font)) {
                var fontObj = fonts[font];
                var fontItem = "//";
                fontItem += fontObj.name + "\t";
                fontItem += fontObj.count + " times" + "\t";
                report += fontItem + "\n";
            }
			
		}


        report += "//---------------------------------------------------------------------" + "\n";
        report += "\n";
        report += "****** Gradients extracted from Reflow ******" + "\n";
        


        for (gradient in gradients) {
            var gradientObj = gradients[gradient];
            var gradientItem = "//";
            gradientItem += gradientObj.name + "\t";
            gradientItem += gradientObj.count + " times" + "\t";
            report += gradientItem + "\n";
            
        }
        report += "*/" + "\n";

		return report;
	};

	this.createBreakPointsCode = function () {

		var breakpoints = this.findBreakPoints();
		var code = "";
        var breakpoint = "";

        code += "\n";
        code += "/****** Breakpoints extracted from Reflow ******/" + "\n";
		for (breakpoint in breakpoints) {
            if (breakpoints.hasOwnProperty(breakpoint)) {
                var bpText = breakpoints[breakpoint];
                var bp = "@media " + bpText + "{" + "\n\n" + "}" + "\n\n";
                code += bp + "\n";
            }
			
		}

		code += "\n";

		return code;
	};

	this.findColors = function () {
		var results = [];
        var resultArray = [];
        var index = "";
        var i = 0;
        var k = 0;
		for (i = 0; i < sheet.cssRules.length; i++) {
            var j = 0;
            
            if (sheet.cssRules[i].type === 1) {
        
                for (j = 0; j < sheet.cssRules[i].declarations.length; j++) {
                    var rule = sheet.cssRules[i].declarations[j];
                    if (rule.property === "color" || rule.property === "background-color") {
                        var color = this.toHex(rule.valueText);
                        results = this.appendColorToArray(color, rule, results);
                        
                        
                    } else if (rule.property === "background-image" && rule.valueText.indexOf("-webkit-linear-gradient") >=0 ) {
                        var tempString = rule.valueText.replace("-webkit-linear-gradient(", "");
                        var tempArray = tempString.split("%");
                        for (k = 0; k < tempArray.length -1; k++){
                            var tempColor = "";
                            if (k == 0) {
                                tempColor = tempArray[k].split(",")[1].split(" ")[0];
                            }  else {
                                tempColor = tempArray[k].split(" ")[0].replace(",","");
                            }
                            var color = this.toHex(tempColor);
                            results = this.appendColorToArray(color, rule, results);
                        }
                    }
                }
            }
	    }
        
        //convert back to an ordered array 
        for (index in results) {
            if (results.hasOwnProperty(index)) {
                resultArray.push(results[index]);
            }
        }
        
	    return resultArray;
	};

    this.appendColorToArray = function (color, rule, colorArray) {
        if (typeof colorArray[color] !== "undefined") {
            colorArray[color].count++;
        } else {
            colorArray[color] = {};
            colorArray[color].count = 1;
            colorArray[color].usedAsBackground = false;
            colorArray[color].name = this.hexToName(color);
            colorArray[color].hex = color;
            colorArray[color].rgb = this.hexToRGB(color);
            colorArray[color].original = rule.valueText;
        }

        if (colorArray[color].usedAsBackground == false) {
            colorArray[color].usedAsBackground = (rule.property.indexOf("background") >=0 );
        }
        return colorArray;
    }

	this.findFonts = function () {
		var result = [];
        var i = 0;
        var j = 0;
		for (i = 0; i < sheet.cssRules.length; i++) {
            if (sheet.cssRules[i].type === 1) {
                for (j = 0; j < sheet.cssRules[i].declarations.length; j++) {
    
                    if (sheet.cssRules[i].declarations[j].property === "font-family") {
                        var font = sheet.cssRules[i].declarations[j].valueText;
    
                        if (typeof result[font] !== "undefined") {
                            result[font].count++;
                        } else {
                            result[font] = {};
                            result[font].count = 1;
                            result[font].name = font;
                        }
                    }
                }
            }
	    }
		return result;
	};

    this.findGradients = function () {
        var result = [];
        var i = 0;
        var j = 0;
        for (i = 0; i < sheet.cssRules.length; i++) {
            if (sheet.cssRules[i].type === 1) {
                for (j = 0; j < sheet.cssRules[i].declarations.length; j++) {
    
                    if (sheet.cssRules[i].declarations[j].property === "background-image" &&
                        sheet.cssRules[i].declarations[j].valueText.indexOf("-webkit-linear-gradient") >= 0 ){
                        var gradient = sheet.cssRules[i].declarations[j].valueText;
                        if (typeof result[gradient] !== "undefined") {
                            result[gradient].count++;
                        } else {
                            result[gradient] = {};
                            result[gradient].count = 1;
                            result[gradient].name = gradient;
                        }
                    }
                }
            }
        }

        return result;
    };

	this.findBreakPoints = function () {
		var result = [];
        var i = 0;
        var j = 0;
		for (i = 0; i < sheet.cssRules.length; i++) {
            if (sheet.cssRules[i].type === 4) {
                for (j = 0; j < sheet.cssRules[i].media.length; j++) {
                    result.push(sheet.cssRules[i].media[j]);
                }
            }
	    }
		return result;
	};
    
    this.toHex = function (color) {
        if ((color.substr(0, 4) === 'rgba')) {
            color = this.rgbaToHex(color);
        } else if ((color.substr(0, 3) === 'rgb')) {
            color = this.rgbToHex(color);
        } else if (color.substr(0, 1) !== '#') {
            color = this.nameToHex(color);
        }
        return color;
    };

	this.rgbToHex = function (color) {
	    if (color.substr(0, 1) === '#') {
	        return color;
	    }
	    var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
            r = parseInt(nums[2], 10).toString(16),
            g = parseInt(nums[3], 10).toString(16),
            b = parseInt(nums[4], 10).toString(16);
	    return "#" + (
	        (r.length === 1 ? "0" + r : r) +
	        (g.length === 1 ? "0" + g : g) +
	        (b.length === 1 ? "0" + b : b)
	    );
	};

	this.rgbaToHex = function (color) {
	    if (color.substr(0, 1) === '#') {
	        return color;
	    }
	    var colorString = color.replace("rgba(", "").replace(")", "");
	    var colorArray = colorString.split(",");

        var r = parseInt(colorArray[0], 10).toString(16),
            g = parseInt(colorArray[1], 10).toString(16),
            b = parseInt(colorArray[2], 10).toString(16);



	    return "#" + (
	        (r.length === 1 ? "0" + r : r) +
	        (g.length === 1 ? "0" + g : g) +
	        (b.length === 1 ? "0" + b : b)
	    );
	};

	this.nameToHex = function (color) {
		return colors[color];
	};

	this.hexToName = function (color) {

		var result = names[color];
		if (typeof result === "undefined") {
			result = this.priceIsRightGetColorName(color);
		}

		return result;
	};

	this.hexToRGB = function (hex) {
	    if (hex == null) {
	    	return {r: 0, g:0, b:0};
	    }
	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	    var r = parseInt(result[1], 16),
	        g = parseInt(result[2], 16),
	        b = parseInt(result[3], 16);
	    var returnResult = {};
	    returnResult.r = r;
	    returnResult.g = g;
	    returnResult.b = b;

	    return returnResult;
	};

	this.priceIsRightGetColorName = function (hexColor) {
		var c_rgb = this.hexToRGB(hexColor);
		var c_r = c_rgb.r;
		var c_g = c_rgb.g;
		var c_b = c_rgb.b;
        var color = "";

		var differenceArray = [];

		for (color in colorArray) {
            if (colorArray.hasOwnProperty(color)) {
                var bc_rgb = this.hexToRGB(colorArray[color]);
                var bc_r = bc_rgb.r;
                var bc_g = bc_rgb.g;
                var bc_b = bc_rgb.b;
                var diff = Math.sqrt((c_r - bc_r) * (c_r - bc_r) +
                                     (c_g - bc_g) * (c_g - bc_g) +
                                     (c_b - bc_b) * (c_b - bc_b));
                differenceArray.push(diff);
            }
			
		}
		
		
		Array.min = function (array) {
            return Math.min.apply(Math, array);
		};

		//Get the lowest number from the differenceArray
		var lowest = Array.min(differenceArray);

		//Get the index for that lowest number
		var index = differenceArray.indexOf(lowest);

		//Bumm, here is the closest color from the array
		return "*" + nameArray[index];

	};

};
