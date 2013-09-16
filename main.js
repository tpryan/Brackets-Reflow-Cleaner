/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Simple extension that converts Reflow generated HTML and CSS into a decent starting point for handcode. */
define(function (require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        EditorManager  = brackets.getModule("editor/EditorManager"),
        Menus          = brackets.getModule("command/Menus");

    require("reflowHTMLExtractor");
    
    // Function to run when the menu item is clicked
    function handleReflowCleanHTML() {
        var editor = EditorManager.getFocusedEditor();

        if (editor) {
            var htmlContent = editor.document.getText();
            var reflowHTMLExtractor = new ReflowHTMLExtractor(htmlContent, $); 
            reflowHTMLExtractor.processHTML();
            var doc = reflowHTMLExtractor.htmldoc;
            var newEditorContent = "<!DOCTYPE html>" + '\n' + "<html>" + '\n' +  doc.documentElement.innerHTML + '\n' + "</html>";
            editor.document.setText(newEditorContent);
        }
    }
    
    
    // First, register a command - a UI-less object associating an id to a handler
    var MY_COMMAND_ID = "reflowcleaner.writehello";   // package-style naming to avoid collisions
    CommandManager.register("Clean Reflow HTML", MY_COMMAND_ID, handleReflowCleanHTML);

    // Then create a menu item bound to the command
    // The label of the menu item is the name we gave the command (see above)
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuItem(MY_COMMAND_ID);

    exports.handleReflowCleanHTML = handleReflowCleanHTML;
});