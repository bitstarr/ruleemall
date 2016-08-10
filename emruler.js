/*!
 * @copyright Copyright (c) 2013 Sebastian Laube
 * @license   Licensed under MIT license
 *            See https://github.com/bitstarr/ruleemall
 * @version   1.1.0
 */
(function( d, w ){
    "use strict";

    // sorry no IE support
    if ( d.getElementsByTagName( 'html' )[0].className.match( /ie/ ) ) { return false; }

    /*
        We use 5em because with 1em the browser will round to full pixels.
        If body font size is 90% of 16px (16px = browser default) the correct 1em will be 14.4px.
        With 1em base measure in the .unit we will only get 14px.
    */

    var factor = 5,
        head = d.head,
        body = d.body;

    // prepare styling for later
    var rulerCSS = '#ruler .unit {float:left;width:' + factor + 'rem;text-align:right;overflow:hidden} ';
    rulerCSS+= '#ruler.js {position:absolute;overflow:hidden} ';
    rulerCSS+= '#ruler.js .unit {/*margin:0 -1px 0 0;/*border-right: 1px solid #ccc;*/box-shadow: -1px 0 0 #ccc inset; color: #aaa}' ;
    rulerCSS+= '#ruler.js span {font-family:monospace;font-size: 10px}';

    var css = d.createElement( 'style' );
    css.type = 'text/css';
    if ( css.styleSheet ) { css.styleSheet.cssText = rulerCSS; }
    else { css.appendChild( d.createTextNode( rulerCSS ) ); }
    head.appendChild( css );

    // add a example unit to get the base measure
    var measure =  d.createElement( 'div' );
    measure.id = 'ruler';
    measure.style.cssText = 'position:fixed; top:0; left:0; z-index:900';
    measure.innerHTML = '<div class="unit">0</div>';
    body.appendChild( measure );

    // get the base measure from the example unit
    var unit  = measure.querySelector( '.unit' ),
        width = unit.clientWidth;

    // calculate how many units we can show in body
    // produce the markup and append to body
    function ruler() {
        var space = w.innerWidth,
            count = Math.floor( space/width ),
            rulerSet = '';

        measure.className = 'js';
        measure.style.width = space + 'px';
        for ( var i = 1; i < count+1; i++ ) {
            rulerSet+= '<div class="unit"><span>' + i*factor + '&nbsp;</span></div>';
        }

        measure.innerHTML = rulerSet;
    }
    ruler();

    // do the dance on resize
    w.addEventListener( 'resize', ruler, false );

})( document, window );