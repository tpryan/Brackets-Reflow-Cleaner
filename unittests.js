/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 150 */
/*global define, describe, it, expect, ReflowCSSExtractor*/

define(function (require, exports, module) {
    "use strict";
    
    require("reflowCSSExtractor");
    var main = require("main");
    
    describe("Brackets Reflow Cleaner", function () {
        
        var cssToTest = ".test{color:#ffffff; font-family: Helvetica;} " + "\n" +
                        " .test2{color:#ffffff; font-family: Helvetica;} " + "\n" +
                        " .test{color:#ffffff; font-family: Arial;}";
        
        it("should expose a handleReflowClean method", function () {
            expect(main.handleReflowClean).not.toBeNull();
        });
        it("should extract colors from a css document.", function () {
            var reflowCSSExtractor = new ReflowCSSExtractor(cssToTest);
            var result = reflowCSSExtractor.findColors();
            expect(result).not.toBeNull();
        });
        it("should count colors from a css document.", function () {
            var reflowCSSExtractor = new ReflowCSSExtractor(cssToTest);
            var result = reflowCSSExtractor.findColors();
            expect(result["#ffffff"].count).toBe(3);
        });
        it("should convert #FFFFFF to white.", function () {
            var reflowCSSExtractor = new ReflowCSSExtractor(cssToTest);
            var result = reflowCSSExtractor.findColors();
            expect(result["#ffffff"].name).toBe("white");
        });
        it("should convert #FFFFFF to rgb(255,255,255).", function () {
            var reflowCSSExtractor = new ReflowCSSExtractor(cssToTest);
            var result = reflowCSSExtractor.findColors();
            expect(result["#ffffff"].rgb.r).toBe(255);
            expect(result["#ffffff"].rgb.g).toBe(255);
            expect(result["#ffffff"].rgb.b).toBe(255);
        });
        it("should count 2 Helveticas", function () {
            var reflowCSSExtractor = new ReflowCSSExtractor(cssToTest);
            var result = reflowCSSExtractor.findFonts();
            expect(result.Arial.count).toBe(1);
            expect(result.Helvetica.count).toBe(2);
        });
        
    });
    
    
    
    
});