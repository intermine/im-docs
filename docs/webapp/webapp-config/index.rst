List of customisable features by web page
========================================================

.. toctree::
    :maxdepth: 4

    data-categories/index
    help/index
    homepage/index
    keyword-search/index
    lists/index
    query-results/index
    region-search/index
    report-page/index
    template-queries/index


[[PageOutline]]


= Webapp Configuration =

You can update the look and feel of your mine and change some functionality through both config files and tagging.  Below is a list of each page in your mine along with what can be configured.


'''config files'''

You can customise your mine by updating these four configuration files:

 * WebConfigModel - how data appears in webapp
 * WebProperties - properties needed by the code, eg. external link URLs
 * ModelProperties - text displayed in webapp
 * InterMineProperties - mine-specific properties that may change for each release or shouldn't be in the source control repository, eg. usernames, passwords, email addresses



= 1 Header =


'''logo'''


Logo is located here: [source:/trunk/flymine/webapp/resources/webapp/model/images webapp/resources/webapp/model/images/logo.png].  

See: [wiki:Themes]


'''tabs''' 


The tabs are set in InterMine's internationalisation file:  [source:/trunk/intermine/webapp/main/resources/webapp/WEB-INF/classes/InterMineWebApp.properties InterMineWebApp.properties].

Each page has a name and a tab, for example:

{{{
mymine.tab = mymine
}}}

In addition to InterMine's file, each mine has its own internationalisation file:  [source:http://intermine.org/browser/trunk/flymine/webapp/resources/model.properties webapp/resources/model.properties].

If you want to add a tab specific to your mine, add an entry to this file.  Properties set in this file overwrite the ones set in [source:/trunk/intermine/webapp/main/resources/webapp/WEB-INF/classes/InterMineWebApp.properties InterMineWebApp.properties].


'''keyword search'''


||''' '''||'''property'''||'''file'''||
||'''example'''||quickSearch.identifiers||WebProperties||

This search box queries the search index created in the postprocess `create-search-index`.  See KeywordSearch for details on how to configure the search index.

Other properties:

||''' '''||'''property'''||'''file'''||
||'''link'''||project.sitePrefix||InterMineProperties||
||'''name of mine'''||project.title||InterMineProperties||
||'''version'''||project.releaseVersion||InterMineProperties|| 
||'''subtitle'''||project.subTitle||InterMineProperties||
||'''links in upper right corner'''||header.links||WebProperties||
[[BR]]


= 2 Footer =
 

||''' '''||'''property'''||'''file'''||
||'''recipient email address for contact form'''||feedback.destination||InterMineProperties||
||'''"funded by" text'''||funding||ModelProperties||

[[BR]]


= 3 Home page =


See HomepageConfig for details on how to configure your InterMine home page.

To use your own home page, create a JSP file in your /webapp directory named "begin.jsp".  You can overwrite any JSP using this method.


= 4 Templates page =

To have templates appear on the templates page, create a template as a SuperUser and [wiki:Tagging tag] the template with the "im:public" tag.

The templates are sorted by most popular first.  If the user is logged in the user's most popular templates are shown first.

See DataCategories for information on how to add categories.

= 5 Lists page =

To have lists appear on the lists page, lists a template as a SuperUser and [wiki:Tagging tag] the list with the "im:public" tag.

The lists are sorted by most recent first.

= 6 !QueryBuilder =

''Select a Data Type to Begin a Query''

'''types in bold''':  [wiki:Tagging Tag] types with "im:preferredBagType".  Use the [http://www.flymine.org/query/tree.do model browser] to tag classes.

'''intro text''': Most text in InterMine can be set in ModelProperties.

'''help text''': See ClassDescriptions.

''query builder''

'''SUMMARY''':  Which columns appear when you click on SUMMARY button are set in WebConfigModel.

'''autocomplete''': Add fields to the ObjectStoreSummaryProperties file to have their form fields autocomplete.

= 7 Template forms =

'''dropdowns'''

When constraining a field instead of a text field you may see a dropdown.  This dropdown automatically appears if there are less than 200 unique possible values in the field.  

The unique values are calculated in the [wiki:PostProcessing#summarise-objectstore summarise-objectstore] post process.  

Note that dropdowns only appear for the EQUALS operator.  If the operator is LIKE, a text field will appear to enable the use of wildcards.

Multiselect - if the field has a dropdown, users can use the ONE OF operator to select more than one option

You can make templates run faster by generating precomputes.  You can also "summarise" dropdowns, eg. make it so only the relevant values appear.  See PrecomputedTables for details.

'''autocomplete'''

You can set a form field to autocomplete as the user is typing.  See ObjectStoreSummaryProperties for details on how to set these properties.  

The autocomplete index is created in the [wiki:PostProcessing#summarise-objectstore summarise-objectstore] post process.  

'''optional constraints'''

To make a template constraint optional:

   1. edit the template in the query builder
   1. click on the padlock next to the constraint
   1. select optional:
      {{{
Required - the user must supply a value
Optional: ON - optional and ON by default
Optional: OFF - optional and OFF by defaul
}}}

= 8 Query results =

'''waiting image''':  If the query takes a long time, a waiting image will appear.  This waiting page cycles through four images located in [source:/trunk/flymine/webapp/resources/webapp/model/images webapp/resources/webapp/model/images]:

||progress1.gif||progress2.gif||progress3.gif||progress4.gif||

'''export''':  See [wiki:Export] for details on exporting options.

'''column headers''':  See ClassAndFieldLabels to change column headers.

'''links''': Only unique fields (class keys) are links in results pages.  Add fields to ClassKeys to make the fields links on results pages.

Instead of linking to an intermine report page, you can set the links to redirect to external page.  See LinkRedirects

'''weird brackets''':  You may see the following in query results:  `GO:0007480 [GOTerm]`.  This happens when a column is a parent type but the individual result is a subclass.  The subclass will by in brackets.

= 9 Region search =

See GenomeRegionSearch.

= 10 Data tab =

The data tab points to this JSP file - [source:/trunk/intermine/webapp/main/resources/webapp/dataCategories.jsp dataCategories.jsp].  You can overwrite this file and display your own customised file by putting a JSP in your $MINE_NAME/webapp directory.

When the webapp is compiled, the order of projects is:

 1. intermine/webapp
 1. bio/webapp        <-- overwrites files in intermine/webapp
 1. $MINE_NAME/webapp <-- overwrites files in intermine/webapp and bio/webapp

You can overwrite any JSP in the intermine or bio/webapp projects by having a JSP of the same name in your mine's webapp directory.  The danger of this is that you will have to upgrade these JSPs manually.

= 11 Report page =

See ReportPage.

= 12 List upload =

See ListUpload.

= 13 List analysis =

'''fields displayed''':  determined by WebConfigModel[[BR]]

'''export''':  See [wiki:Export][[BR]]

'''"Convert to a different type"''':  Tag conversion template with "im:converter" tag.  See [wiki:Tagging][[BR]]

'''"Orthologues"''':  If you have orthologues loaded in your mine, you will see links in this section[[BR]]

'''"View homologues in other Mines"''':  See WebProperties[[BR]]

'''external links''' - See "External links" section of WebProperties[[BR]]

'''widgets''' - See WebConfigModel[[BR]]

'''template queries''' - Template queries will appear on the appropriate type of list analysis page, eg. Gene --> Proteins template would appear on Gene list analysis pages.[[BR]]

= 14 Keyword search =

See KeywordSearch for details on how to configure the search index.  

'''fields in the results''':  determined by WebConfigModel[[BR]]

'''type''':  class of object[[BR]]

'''score''': determined by the Lucene search, from 0 to 1[[BR]]

'''lists''':  Users can make lists from search results but only if all results are of the same type.[[BR]]

To view entire the entire index:  Navigate to search results page without search parameter, eg [http://www.flymine.org/query/keywordSearchResults.do]

= 15 Help =

See [wiki:Help] for details on how to provide help documentation for users of your mine.

= 16 General Appearance =

 * Most introduction text in InterMine can be set in ModelProperties.
 * [wiki:Favicon]
 * [wiki:Themes]
 * WebappTables show how to use HTML/CSS to produce tables for a variety of purposes
 

= 17 Web-Services =

Quote TSV results in all cases: {{{ws.tsv.quoted = true}}}
----


Back:  WebApp

