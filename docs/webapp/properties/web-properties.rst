Features
========================================================

The `web.properties` file configures several attributes for the InterMine web application.

attributeLink
	Used to configure hyperlinks, generally to external dbs.  See "External Links" section below

bag.example.identifiers
	Text present in the list upload form.  See "List upload examples" section below

externallink
	Redirect links in query results.  See :doc:`/webapp/query-results/redirects`

galaxy
	See :doc:`/webapp/third-party-tools/galaxy`

genomicRegionSearch
	See :doc:`/webapp/region-search/index`

header.links
	links at upper right corner

meta.keywords
	will populate meta tag for keywords

meta.description
	will populate meta tag for description.  Google uses this in their search results, I think

portal.welcome
	the message to show when a user arrives at the webapp via the portal action (eg. <something>/portal.do)

quickSearch.identifiers
	Text displayed in search box

theme
	Colour scheme for the webapp.  Available options are:  blue, bright_blue, gold, green, grey, brown, ecoli_blue, metabolic, modmine, ratmine and purple 

xrefLink
	Used to configure hyperlinks for CrossReferences.  See below

Home page
-----------

Search box (first box on the left)

===========================  ============================================
begin.searchBox.title        title of box on left
begin.searchBox.description  text in the box on the left 
begin.searchBox.example      text in the form field 
textarea.identifiers         text present on list upload on home page 
===========================  ============================================

List upload box (middle box)

=========================  =========================
begin.listBox.title        Title of box 
begin.listBox.description  Text in box 
begin.listBox.example      Text in form field 
=========================  =========================

Third box

===========================  ============================================
begin.thirdBox.title         Title of box if user is new 
begin.thirdBox.visitedTitle  Title of box if user has visited before 
begin.thirdBox.description   Text in box 
begin.thirdBox.linkTitle     Text for large button 
begin.thirdBox.link          URL for large button 
===========================  ============================================

Tabs
-----------

Templates tagged with each category will appear under the appropriate tab. 

===========================  ================================
begin.tabs.1.id              Name of category, eg. Genes
begin.tabs.1.description     Text for that tab
===========================  ================================

List upload examples
----------------------

Using the `bag.example.identifiers` key, one can provide a list of keyword examples on the list create/upload page. This could lead to a mixed list of items being updated and only, say Protein or Gene, identifiers being uploaded.

If one wants to provide different example identifiers per different types, like Genes, Proteins, SNPs, you can do so by using the following key:

`bag.example.identifiers.gene`, `bag.example.identifiers.protein` etc.

Then, when the user selects a Genes from a dropdown select box for type and choose the Example list link, the text box will be populated keywords associated only with `bag.example.identifiers.gene` key in the config file.

External links
----------------------

You can add links to other websites by adding entries to the `web.properties` file.  

The format for this property is:

.. code-block:: properties

	# on the report page - a single identifier
 	'attributelink' + unique_name + class + taxonId + attributeName + (url|imageName|text)

	# on the list analysis page - a list of identifiers
 	'attributelink' + unique_name + class + taxonId + attributeName + 'list' + (url|imageName|text)


unique_name
	used to distinguish between multiple configurations for the same attribute/organism/class combination

class 
	class of object to link, eg. Protein

taxonId 
	either a proper id or '*' when no assumptions is made regarding the organism

list 
	indicates the link will have a list of identifiers

url 
	url to link to

imageName 
	name of logo (optional), must be in /model directory

text 
	text that will appear next to the logo

The value of the attribute (for the current object) is substituted anywhere the string "<<attributeValue>>" occurs in the text or the url

example:

.. code-block:: properties

 	attributelink.flybase.Gene.7227.primaryIdentifier.url=http://www.flybase.org/.bin/fbidq.html?<<attributeValue>>
	attributelink.flybase.Gene.7227.primaryIdentifier.text=FlyBase: <<attributeValue>>

In this case `Gene` pages for Drosophila melanogaster will have a link that uses the `organismDbId` field.

A list example:

.. code-block:: properties

 	attributelink.flymine.Gene.*.primaryIdentifier.list.url=http://www.flymine.org/query/portal.do?externalid=<<attributeValue>>&class=Gene
 	attributelink.flymine.Gene.*.primaryIdentifier.list.text=FlyMine
 	attributelink.flymine.Gene.*.primaryIdentifier.list.imageName=flymine_logo_link.gif

Only if a taxonId is specified the code will check if the link to the external db is relevant.

Settings for the xrefLink property
--------------------------------------------

You can configure the URLs for querying CrossReference from external sources by adding entries to the {{{web.properties}}} file.  

The format for this property is:

.. code-block:: properties

	# on the report page
 	'xreflink' + dataSource_name + (url|imageName)

dataSource_name 
	the name of the external database

url 
	url to link to

imageName 
	name of logo (optional), must be in /model directory

example:

.. code-block:: properties

	xreflink.PFAM.url=http://pfam.sanger.ac.uk/family?
	xreflink.PIRSF.url=http://pir.georgetown.edu/cgi-bin/ipcSF?id=


Cross references represent identifiers used in external databases, eg. FlyBase, UniProt. An object in InterMine which has CrossReference will have a identifier and data source for that cross reference. In order to find the cross reference in that data source, a url is required to link to and the full path should look like url+identifier, e.g. ''http://pfam.sanger.ac.uk/family?PF00001''. In web.properties, the first part of the full path could be configured as in "url", and identifier will be added programmatically to the rear of it. The dataSource_name should be consistent with the source name of the CrossReferences in the InterMine database.



Overriding properties
---------------------------------

* `intermine/webapp/main/resources/webapp/WEB-INF/global.web.properties` - used by all mines.  Properties set here will be available to everyone, even the test model mine.
* `bio/webapp/resources/webapp/WEB-INF/bio.web.properties` - used by all bio-mines.  Properties set here will be available to all mines that use the bio layer.  so not the test model model. Can overwrite properties in the global.web.properties file.
* `flymine/webapp/resources/web.properties` - used by a mine.  Properties set here will be available to only that specific mine.  Can create mine-specific properties or overwrite properties in the above two files.


.. index:: web properties, cross reference links, attribute links, link outs, list upload examples, header links, meta keywords, meta description, portal welcome message, keyword search examples