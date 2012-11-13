Help
================================

This page lists how you can update the help sections of your !InterMine. 

=== Add links to the top of your site ===

To add help links to the top of your website, add an entry to `web.properties` listing the links:
{{{
header.links=link1, link2
}}}

Then specify the URLs:
{{{
header.links.link1=http://www.mysite.com/link1
header.links.link2=http://www.mysite.com/link2
}}}

For example, see [source:/trunk/flymine/webapp/resources/web.properties FlyMine's web.properties] file:
{{{
# web.properties
header.links=help,FAQ,about,cite,software
header.links.FAQ=http://trac.flymine.org/wiki/FlyMineFAQ
header.links.about=http://blog.flymine.org/?page_id=35
header.links.cite=http://blog.flymine.org/?page_id=37
header.links.help=http://blog.flymine.org/?page_id=45
header.links.software=http://blog.flymine.org/?page_id=39
}}}


=== Take a tour link ===

The tour link is set in `headMenu.jsp` as:
{{{
<project.helpLocation>/tour/start
}}}

Set `project.helpLocation` property in your mine.properties file.  If you don't have help pages set up, link to FlyMine's pages:
   {{{
project.helpLocation=http://www.flymine.org/help
}}}

=== Contextual help, the `?` on each page ===

 1. Set the URL in your properties file
    1. On each page is a ? that links to help pages.  Specify the main URL that this question mark should link to by setting the `project.helpLocation` property in your mine.properties file.  
    1. If you don't have help pages set up, link to FlyMine's pages:
       {{{
project.helpLocation=http://www.flymine.org/help
}}}
 1. Set the context
    1. If the user is on a webpage defined in the properties file, then when they click the help link they will be forwarded to the help section for the page they were viewing.  
    1. If the page they are on is not specified in the properties file, they will be forwarded to the first page of the help document.
    1. The context is determined by parsing the URL and taking the name of the current webpage, minus the `.do`.  For example, go to FlyMine and click on the 'templates' tab, this is the URL:  http://www.flymine.org/release-19.0/templates.do.  The parsed name of that webpage is "templates".  
    1. Below are the mappings from parsed webpage name to anchor names on the help page.
       {{{
help.page.<parsed webpage name> = <anchor in help.html file>

# global.web.properties
help.page.begin=begin
help.page.templates=templates
help.page.bag=lists
help.page.bag.upload=lists:upload
help.page.bag.view=lists:view
help.page.customQuery=customQuery
help.page.mymine.lists=mymine:lists
help.page.mymine.history=mymine:queryHistory
help.page.mymine.saved=mymine:savedQueries
help.page.mymine.templates=mymine:savedTemplates
help.page.mymine.password=mymine:changePassword
help.page.dataCategories=data
help.page.objectDetails=reportPage
help.page.template=template
help.page.results=results
help.page.bagDetails=listAnalysis
help.page.bagUploadConfirm=buildList
help.page.query=query
help.page.importQueries=importQueries
help.page.importTemplates=importTemplates
help.page.tree=tree
help.page.aspect=dataCategory
}}}

Your mine's web.properties file is merged with this web.properties file, so entries you add to web.properties will overwrite the values listed above.

=== Data definitions ===

Update these in the [source:/trunk/bio/webapp/resources/webapp/WEB-INF/classDescriptions.properties classDescriptions.properties] file.

