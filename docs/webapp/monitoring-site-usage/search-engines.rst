Search engines
================================

This document discusses the relationship between your InterMine-based website and search engines.

'''Introduction'''

If you launch your website, eventually your site will be found and indexed by Google or other search engines.  

Being listed on the search engines is beneficial as it will drive traffic to your site.  However being listed can result in unintended consequences, like exposing "hidden" parts of your site.  InterMine provides an easy way to control which parts of the website are indexed by the search engines.

=== SEO ===

To use each of the search engines' webmaster tools, you need to include a `CODE` in a meta tag on your website.  You can do this by updating your properties file like so, replacing `CODE` with the value that Google/Microsoft/Yahoo provide:

{{{
# MINE.properties

# http://www.google.com/analytics
google.analytics.id=CODE

# http://www.google.com/webmasters
searchengines.google=CODE

# http://siteexplorer.search.yahoo.com
searchengines.yahoo=CODE

# http://www.bing.com/webmaster
searchengines.msn=CODE
}}}

.. seealso:: :doc:`google-analytics`

'''robots.txt'''

The easiest way to control what the search engines index is to use a file called robots.txt.  Robots use this file to determine which parts of the site they can visit.  This file should be located in the root of your site, ie. www.flymine.org/robots.txt

You can also specify which search engines can index your site, e.g. Google or Yahoo.  Here is an example file:

{{{
Sitemap: sitemap_index.xml

User-agent: *
Disallow: /

User-agent: Googlebot
Disallow:
Disallow: /release-8.2/
Disallow: /release-8.1/

User-agent: Slurp
Disallow:
Disallow: /release-8.2/
Disallow: /release-8.1/

User-agent: msnbot
Disallow:
Disallow: /release-8.2/
Disallow: /release-8.1/

}}}

This file bans all search engine robots except for Google, Yahoo, and MSN.  In addition this file forbids the robots to index files in the release-8.1 and release-8.2 directories.

Read more about this document on the [http://www.robotstxt.org/ robots.txt] website.

'''NOFOLLOW'''

You can restrict access to directories via the robots.txt file, but you can also configure your site to allow or forbid access to specific web pages.

To prevent the search engine robots from following links on that page, set the noFollow attribute in the [source:trunk/intermine/webapp/main/resources/webapp/WEB-INF/classes/InterMineWebApp.properties InterMineWebApp.properties] file:

{{{

# MYMINE
mymine.title = MyMine
mymine.description = Your list of saved lists and queries
mymine.tab = mymine
mymine.noFollow = true

}}}

'''Sitemaps'''

Search engines often have difficulty indexing dynamic websites.  The easiest solution for this is provide a sitemap that indicates which pages should be indexed.
