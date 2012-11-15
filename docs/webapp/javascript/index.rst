JavaScript
================================



.. toctree::
    :maxdepth: 4

    CDN


InterMine JavaScript Library
-----------------------------

A library that is loaded on each Webapp page immediately after jQuery. It throws Errors and displays log messages with "ƒ " prefix and its scope is restricted within the "im" variable. Following are functions as part of the library and what they are good for. Variables inside the functions will not propagate outside of their scope.

== Default Functions ==

Default functions are functions that are executed when the document is ready, on each and every page:

||= f(x) =||= Description =||
|| '''im.alternatingColors''' || this function will (in IE) attach classes to intermine tables (WebappTables) so that they show alternating colors, backgrounds and borders properly ||
|| '''im.persistentTableHeaders''' || will apply persistent table headers technique to all <div> elements of .collection-table.persistent classes ||

----

== im.alternatingColors ==

This function will '''automatically onload''' (in IE) attach classes to intermine tables (WebappTables) so that they show alternating colors, backgrounds and borders properly. The f(x) uses "jQuery.browser" property which might get removed in later versions.

== im.persistentTableHeaders ==

'''im.persistentTableHeaders(''jQuery selector'')'''
or 
'''jQuery(''jQuery selector'').persistentTableHeaders()'''

Will apply persistent table headers to a specific element. Needs to have a <table> with <thead> as a child.

== im.elementPath ==

'''im.elementPath(''jQuery selector'')'''
or 
'''jQuery(''jQuery selector'').elementPath()'''

Will log a path to the element as a string, displaying element identifiers and classes where applicable. If the element given the jQuery selector or object does not exist, a stack trace (see below) will be automatically displayed.

Example result:

{{{
ƒ a#crm.switcher.active < div < div.header < div#regulatory-regions.collection-of-collections < div#RegulationCategory.aspectBlock < div.grid_10 < div.container_12 < div#content < div < div#pagecontentcontainer.report-page < body < html
}}}

== im.log ==

'''im.log(''message'')'''
or 
'''jQuery().log(''message'')'''

IF '''Firebug console''' exists, will log message. Useful as a shorthand for debugging your application.

== im.exists ==

'''im.exists(''jQuery selector/object'')'''
or 
'''jQuery(''jQuery selector/object'').exists()'''

Returns true if a given element exists.

== im.trace ==

'''im.trace(''optional level(s) up the stack to skip'')'''

Will display a stack trace in a '''Firefox Firebug''' (for code brevity) console. Will strip ANY lines that have "jQuery" in them.

Example result:

{{{
ƒ trace:
@http://localhost:8080/flymine/js/inlinetemplate.js:56
}}}

== im.scrollTo ==

'''im.scrollTo(''jQuery selector/object'', ''speed (in ms or fast/slow)'', ''(optional) easing function name (swing)'', ''(optional) offset in px from element'', ''(optional) function to call on complete'')''' or '''jQuery(''jQuery selector/object'').scrollTo(''speed (in ms or fast/slow)'', ''(optional) easing function name (swing)'', ''(optional) offset in px from element'', ''(optional) function to call on complete'')'''

Will scroll with the window to the target element.

== im.isInView ==

'''im.isInView(''jQuery selector/object'', ''(optional) visibility of the object (partial/full)'')''' or '''jQuery(''jQuery selector/object'').isInView(''(optional) visibility of the object (partial/full)'')'''

Will return true/false if a given element is in the view either fully, or partially.

== im.highlight ==

'''im.highlight(''jQuery selector/object'')''' or '''jQuery(''jQuery selector/object'').highlight()'''

Functions in a similar fashion as jQueryUI's animate("highlight") adding a fading out yellow background to an element

== im.queue ==

'''im.queue.put(function() { ... }, this);'''

Make a delayed execution of items on a queue to prevent browser freezes on long running scripts.

== im.setCookie ==

'''im.setCookie(''key'', ''value'', ''(optional) days'');''' or '''jQuery.setCookie(''key'', ''value'', ''(optional) days'');'''

Sets a cookie value under a specific key for a number of days or "forever".

== im.getCookie ==

'''im.getCookie(''key'');''' or '''jQuery.getCookie(''key'');'''

Retrieve a cookie value under a specific key.