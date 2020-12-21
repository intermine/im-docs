---
---

Link redirects
==============

You can add a property to WebProperties to have links in results forward
the user to a URL instead of the InterMine report page.

config
------

Add the following to your WebProperties file:

``` {.properties}
# used to redirect links in webapp
webapp.linkRedirect=org.intermine.bio.web.BioLinkRedirectManager

# links to intermine report pages will be replaced with these URLs
externallink.[uniqueID].[class].[taxonId].[field].url = [full URL]
```

uniqueId

:   any string, should be different for each entry, internal use only

class

:   class of Object to redirect, eg. Gene or Protein

taxonId

:   taxon ID or \* if config should apply to all

field

:   which identifier field to pass to the URL, eg. if field is
    primaryIdentifier, the value of primary identifier will be used as
    the attribute value

full URL

:   full http address, eg. <http://www.google.co.uk/#q=monkey>

All columns in the results for the configured class will be links to the
external URL.

examples
--------

In results pages, all dmel genes will link to FlyBase with
Gene.primaryIdentifier instead of the Mine report page:

``` {.properties}
externallink.flybaseResults.Gene.7227.primaryIdentifier.url=http://www.flybase.org/.bin/fbidq.html?<<attributeValue>>
```

One could also use a common URL with a common hostname and different
subdirectory names. Intermine then figures out what URL to build with
the given subdirectory name and redirects your query to that mine Report
page using the Identifier you provide as an external identifier. common
subdirectory names include:

MOUSEMINE = intermine.org/mgi

YEASTMINE = intermine.org/sgd

ZEBRAFISHMINE = intermine.org/zfin

WORMMINE = intermine.org/wormbase

RATMINE = intermine.org/rgd

METABOLICMINE = (Please update)

So an externallink to RATMINE will look like this: .. code-block::
properties

> externallink.flybaseResults.Gene.10116.primaryIdentifier.url=http://www.intermine.org/rgd/portal.do?externalids\<\<attributeValue\>\>&class=Gene&origin=Ratmine

In results pages, all probesets will link to Google instead of the Mine
report page:

``` {.properties}
externallink.foo.ProbeSet.*.primaryIdentifier.url=http://www.google.com?q=<<attributeValue>>
```

Next to the value in the column will be a small icon indicating an
external link

::: {.index}
redirects, link redirects
:::
