define(function (require, exports, module) {
    "use strict";

    var main = require("main");
    
    describe("Minimum Requirement", function () {
        it("should expose a handleReflowClean method", function () {
            expect(main.handleReflowClean).not.toBeNull();
        });
    });
});