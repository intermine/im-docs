Link redirects
================================

You can add a property to WebProperties to have links in results forward the user to a URL instead of the InterMine report page.

config
-------

Add the following to your WebProperties file:

{{{
# used to redirect links in webapp
webapp.linkRedirect=org.intermine.bio.web.BioLinkRedirectManager

# links to intermine report pages will be replaced with these URLs
externallink.[uniqueID].[class].[taxonId].[field].url = [full URL]
}}}

 * "'''externallink'''" 
 * '''uniqueId''' - any string, should be different for each entry, internal use only
 * '''class''' - class of Object to redirect, eg. Gene or Protein
 * '''taxonId''' - taxon ID or * if config should apply to all
 * '''field''' - which identifier field to pass to the URL
 * "'''url'''"
 * '''full URL''' - full http address, eg. http://www.google.co.uk/#q=monkey

All columns in the results for the configured class will be links to the external URL.  
 

examples
--------

In results pages, all dmel genes will link to FlyBase with Gene.primaryIdentifier instead of the Mine report page:
{{{
externallink.flybaseResults.Gene.7227.primaryIdentifier.url=http://www.flybase.org/.bin/fbidq.html?<<attributeValue>>
}}}

In results pages, all probesets will link to Google instead of the Mine report page:
{{{
externallink.foo.ProbeSet.*.primaryIdentifier.url=http://www.google.com?q=<<attributeValue>>
}}}

Next to the value in the column will be a small icon indicating an external link

