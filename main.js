/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, ReflowHTMLExtractor, ReflowCSSExtractor */

/** Simple extension that converts Reflow generated HTML and CSS into a decent starting point for handcode. */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    require("jscssp");
    require("reflowHTMLExtractor");
    require("reflowCSSExtractor");
    
    
    // Function to run when the menu item is clicked
    function handleReflowClean() {
        var editor = EditorManager.getFocusedEditor();

        if (editor) {
            var editorContent = editor.document.getText();
            var newEditorContent  = "";
            var extension = editor.document.file.name.split('.').pop();
            console.log(editor);
            console.log(extension);

            if (extension === "css") {
                var reflowCSSExtractor = new ReflowCSSExtractor(editorContent);
                var report = reflowCSSExtractor.createReport();
                var breakpoints = reflowCSSExtractor.createBreakPointsCode();
                newEditorContent  = report + breakpoints;

                editor.document.setText(newEditorContent);

            } else if (extension === "html") {
                var reflowHTMLExtractor = new ReflowHTMLExtractor(editorContent, $);
                reflowHTMLExtractor.processHTML();
                var doc = reflowHTMLExtractor.htmldoc;
                newEditorContent = "<!DOCTYPE html>" + '\n' + "<html>" + '\n' +  doc.documentElement.innerHTML + '\n' + "</html>";
                editor.document.setText(newEditorContent);
            }


        }
    }
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "reflowcleaner.writehello";   // package-style naming to avoid collisions
    CommandManager.register("Extract from Reflow Content", MY_COMMAND_ID, handleReflowClean);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    if (typeof menu !== "undefined") {
        menu.addMenuItem(MY_COMMAND_ID);
        exports.handleReflowClean = handleReflowClean;
    }
    
});