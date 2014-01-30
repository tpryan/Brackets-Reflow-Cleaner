#Reflow Cleaner

This extension hopes to clean the HTML that Adobe Edge Reflow makes in order to provide a better starting spot for hand coded projects.

## Abilities 
Currently the project does the following:

### HTML
1. Converts id's that you mark in Reflow into elements
1. Removes Clearfix classes
1. Removes textspan id's

### CSS
1. Extracts color information from color, background-color, and background-image gradients.
1. Extracts all font families.
1. Extracts media queries.
1. Extracts gradient code. 

## Future
More stuff. I want it to do more, but I'd love feedback on what that more is. 


##Thanks

<dl>
<dt>https://github.com/bahamas10/css-color-names</dt>
<dd>For having a complete JSON map of all of the CSS color names.</dd>

<dt>http://forrst.com/posts/Find_the_closest_nearest_HEX_color_of_a_small-JDB</dt>
<dd>For giving me a way to find the closest CSS color name to a give Hex value.</dd>

<dt>http://glazman.org/JSCSSP/</dt>
<dd>For a JavaScript CSS parser.</dd>
</dl>
