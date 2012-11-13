Region Search
================================

[[PageOutline]]

= Genome Region Search =

== Introduction ==

Since InterMine instances such as [http://intermine.modencode.org/ modMine], [http://www.flymine.org/ FlyMine], [http://www.metabolicmine.org/ metabolicMine] host a huge amount of genomic sequence data such as genes, exons, etc. we'd like provide users the tool to query those features within a list of genomic regions/intervals of users' interests.

== BiosegInstallation ==

You must have Bioseg installed to use the region search.  See BiosegInstallation for details.

== Upgrade ==

Following configurations are for fresh upgrade, to update from [http://intermine.org/wiki/GenomeRegionSearch097 0.97], compare and update the different parts.

 * add to '''struts-config-model.xml'''
   {{{
#!xml
<!-- Beginning of Genomic Region Search configuration -->

<action path="/initGenomicRegionSearchOptions"
        type="org.intermine.bio.web.struts.GenomicRegionSearchOptionsController"/>

<action path="/genomicRegionSearch" forward="genomicRegionSearchOptions.page"/>

<action path="/genomicRegionSearchResults" forward="genomicRegionSearchResults.page"/>

<action input="/genomicRegionSearchOptionsBase.jsp" path="/genomicRegionSearchAction" name="genomicRegionSearchForm" scope="request" type="org.intermine.bio.web.struts.GenomicRegionSearchAction" >
    <!-- Not use redirect="true". here it is doing a forward, not redirecting. Redirecting causes the browser to make a new request, and that's why the things I put in the request aren't there anymore. -->
    <forward name="genomicRegionSearchResults" path="/genomicRegionSearchResults.do" redirect="false"/>
    <forward name="genomicRegionSearchOptions" path="/genomicRegionSearch.do" redirect="true"/>
</action>

<action path="/genomicRegionSearchAjax" type="org.intermine.bio.web.struts.GenomicRegionSearchAjaxAction"/>

<!-- End of Genomic Region Search configuration -->
}}}
 * add to '''tiles-defs-model.xml'''
   {{{
#!xml
<definition name="genomicRegionSearchOptions.page" extends="layout.template">
  <put name="body" value="genomicRegionSearchOptions.tile" />
  <put name="pageName" value="genomicRegionSearch" />
</definition>

<definition name="genomicRegionSearchOptions.tile" path="/model/genomicRegionSearchOptionsBase.jsp"
  controllerUrl="/initGenomicRegionSearchOptions.do" />

<definition name="genomicRegionSearchResults.page" extends="layout.template">
  <put name="body" value="/model/genomicRegionSearchResultsBase.jsp" />
  <put name="pageName" value="genomicRegionSearchResults" />
</definition>
}}}
 * add to '''struts-config-form-model.xml''', this is default and minimum setting, if any new properties are added, please change this configuration and the html elements accordingly.
   {{{
#!xml
<form-bean name="genomicRegionSearchForm" type="org.intermine.bio.web.struts.GenomicRegionSearchForm">
  <form-property name="organism" type="java.lang.String"/>
  <form-property name="featureTypes" type="java.lang.String[]"/>
  <form-property name="pasteInput" type="java.lang.String"/>
  <form-property name="fileInput" type="org.apache.struts.upload.FormFile"/>
  <form-property name="whichInput" type="java.lang.String"/>
  <form-property name="dataFormat" type="java.lang.String" initial="isNotInterBaseCoordinate"/>
  <form-property name="extendedRegionSize" type="java.lang.String"/>
</form-bean>
}}}
 * add to '''model.properties'''
   {{{
# Genomic Region Search
genomicRegionSearch.title = Overlap features search from a new list of Genomic Regions
genomicRegionSearch.isNotMultipart = The request is not a file upload request
genomicRegionSearch.spanMisformatted = {0} is in a wrong format
genomicRegionSearch.spanFieldSelection = Please select some {0}
genomicRegionSearch.noSpanPaste = You need to type/paste in some genomic regions
genomicRegionSearch.noSpanFile = You need to type/paste in some genomic regions or select a file to upload
genomicRegionSearch.isNotText = {0} is an invalid file type - file must be in plain text format
genomicRegionSearch.noSpanFileOrEmpty = The file you specified does not exist or is empty
genomicRegionSearch.spanInWrongformat = {0} is in a wrong format
genomicRegionSearch.spanInputType = Input type can't be solved
genomicRegionSearch.allRegionInvalid = All regions are invalid. Please do a new search.
genomicRegionSearch.organismEmpty = Organism is empty, please check the data is loaded.

genomicRegionSearchOptions.tab = genomicRegionSearch
genomicRegionSearchOptions.title = Genomic Regions Search
genomicRegionSearchResults.tab = genomicRegionSearch
genomicRegionSearchResults.title = Genomic Regions Search Results

menu.genomicRegionSearch = Regions
menu.genomicRegionSearchOptions = Genomic Region Search
menu.genomicRegionSearchResults = Genomic Region Search Results
}}}
 * add to '''web.properties'''
   {{{
# Genomic Region Search
## enable region search, different from 0.97
genomicRegionSearch.display = true
genomicRegionSearch.service =
genomicRegionSearch.optionsJavascript =
genomicRegionSearch.resultsJavascript =
genomicRegionSearch.optionsCss =
genomicRegionSearch.resultsCss =
## Make sure pre-defined organisms have chromosome location information in the database
genomicRegionSearch.defaultOrganisms = D. melanogaster
## Exclude feature types for all organisms, comma separated
genomicRegionSearch.featureTypesExcluded.global = GeneFlankingRegion,YouNameItClass
## Exclude feature types for specified organism, semi-colon separated
genomicRegionSearch.featureTypesExcluded.byOrganism = D. melanogaster:GeneFlankingRegion,YouNameItClass;
genomicRegionSearch.defaultSpans = 2L:14615455..14619002\\n2R:5866646..5868384\\n3R:2578486..2580016
genomicRegionSearch.caption = Search for features that overlap a list of genome coordinates you enter or upload, e.g. <b>2L:11334..12296</b>

genomicRegionSearch.howTo = <ul>\
                                <li>Genome regions in the following formats are accepted:\
                                    <ul>\
                                        <li><b>chromosome:start..end</b>, e.g. <i>2L:11334..12296</i></li>\
                                        <li><b>chromosome:start-end</b>, e.g. <i>2R:5866746-5868284</i> or <i>chrII:14646344-14667746</i></li>\
                                        <li><b>tab delimited</b></li>\
                                    </ul>\
                                <li>Both <b>base coordinate</b> (e.g. BLAST, GFF/GFF3) and <b>interbase coordinate</b> (e.g. UCSC BED, Chado) systems are supported, users need to explicitely select one. By default, the base coordinate is selected.</li>\
                                <li>Each genome region needs to take a <b>new line</b>.</li>\
                            </ul>

## Query fields when export results as csv/tsv
genomicRegionSearch.query.Gene.views = {0}.primaryIdentifier,{0}.symbol,{0}.chromosomeLocation.locatedOn.primaryIdentifier,{0}.chromosomeLocation.start,{0}.chromosomeLocation.end,{0}.organism.shortName
genomicRegionSearch.query.Gene.sortOrder = {0}.chromosomeLocation.start asc

}}} 
   * update defaultOrganisms property as needed
   * to disable genomic region search, set `genomicRegionSearch.display = false`
   * also add `genomicRegionSearch` to `layout.fixed`, e.g. 
     {{{
layout.fixed = begin,template,templates,bag,customQuery,query,error,api,genomicRegionSearch
}}}
 * add to '''genomic_precompute.properties''', note: do not duplicate the query number
   {{{
# genomic region search
precompute.query.30 = SELECT a3_.shortName AS a1_, a4_.class AS a2_ FROM org.intermine.model.bio.Organism AS a3_, org.intermine.model.bio.SequenceFeature AS a4_ WHERE a4_.organism CONTAINS a3_

precompute.query.31 = SELECT a4_.class AS a1_, a5_.name AS a2_, a5_.description AS a3_ FROM org.intermine.model.bio.SequenceFeature AS a4_, org.intermine.model.bio.SOTerm AS a5_ WHERE a4_.sequenceOntologyTerm CONTAINS a5_ 
}}}
== Customization ==
=== web.properties ===
Configurations in '''web.properties'''

||'''parameter'''||'''purpose'''||'''required?'''||'''options'''||'''default'''||
||display||enable region search||yes||true/false||true||
||service||GenomicRegionSearchService java class name||no||GenomicRegionSearchService by default or mine specific service class, e.g. MetabolicMineGenomicRegionSearchService||-||
||optionsJavascript||javascript for options page||no||genomic_region_search_options_default by default or user customized, e.g. genomic_region_search_options_metabolicmine||-||
||resultsJavascript||javascript for results page||no||genomic_region_search_results_default by default or user customized, e.g. genomic_region_search_results_metabolicmine||-||
||optionsCss||css for options page||no||genomic_region_search_results_default by default or user customized, e.g. genomic_region_search_results_metabolicmine||-||
||resultsCss||css for results page||no||genomic_region_search_results_default by default or user customized, e.g. genomic_region_search_results_metabolicmine||-||
||defaultOrganisms||prioritize default organisms at the top of organism selection on options page||no||use organism short name, multiple names separated by comma||-||
||featureTypesExcluded.global||remove certain sequence features for all organism||no||separated by comma||-||
||featureTypesExcluded.byOrganism||remove certain sequence features by organism||no||organism1:feature1,feature2;organism2:feature1||-||
||defaultSpans||genomic region examples||yes||use regions for only one organism||-||
||caption||title on options page||yes||include a region example||-||
||howTo||region search help text||yes||replace the region examples for a different mine||-||
||query.SequenceFeature.views||the pathquery view for results page for specific feature types||no||replace "SequenceFeature" with any feature type, e.g. for "Gene", the view will be "genomicRegionSearch.query.Gene.views = ...(the query view)"; this only applies when single feature type is selected from options page. Settings for multiple feature types supported. Also support to overwrite default views and sortOrder for "SequenceFeature" which is preset in Java class. Leave it empty or remove it (for sortOrder as well) if only use default views for all feature types.||-||
||query.SequenceFeature.sortOrder||the pathquery sort order||always set when query.SequenceFeature.views is availiable||e.g. "genomicRegionSearch.query.Gene.sortOrder = ...(the query sortOrder)"||-||
||liftOver||enable liftOver service, so far, metabolicMine only||yes||true/false||false||
||liftOver.url||liftOver service url||yes if liftOver is true||-||-||
||exportChromosomeSegment||export sequence by chromosome coordinates||yes||true/false||false||

{{{
# Genomic Region Search
genomicRegionSearch.display = true
genomicRegionSearch.service =
genomicRegionSearch.optionsJavascript =
genomicRegionSearch.resultsJavascript =
genomicRegionSearch.optionsCss =
genomicRegionSearch.resultsCss =
# Make sure pre-defined organisms have chromosome location information in the database
genomicRegionSearch.defaultOrganisms = P. falciparum 3D7
# Exclude feature types for all organisms, comma separated
genomicRegionSearch.featureTypesExcluded.global = YouNameItClass
# Exclude feature types for each specific organism
genomicRegionSearch.featureTypesExcluded.byOrganism = P. falciparum 3D7:YouNameItClass;
genomicRegionSearch.defaultSpans = MAL1:29733..37349\\nMAL1:393758..394189\\nMAL9:1495567..1503324
genomicRegionSearch.caption = Search for features that overlap a list of genome coordinates you enter or upload, e.g. <b>MAL1:29733..37349</b>

genomicRegionSearch.howTo = <ul>\
                                <li>Genome regions in the following formats are accepted:\
                                    <ul>\
                                        <li><b>chromosome:start..end</b>, e.g. <i>MAL1:29733..37349</i></li>\
                                        <li><b>chromosome:start-end</b>, e.g. <i>MAL1:29733-37349</i></li>\
                                        <li><b>tab delimited</b></li>\
                                    </ul>\
                                <li>Both <b>base coordinate</b> (e.g. BLAST, GFF/GFF3) and <b>interbase coordinate</b> (e.g. UCSC BED, Chado) systems are supported, users need to explicitely select one. By default, the base coordinate is selected.</li>\
                                <li>Each genome region needs to take a <b>new line</b>.</li>\
                            </ul>

genomicRegionSearch.query.Gene.views = {0}.primaryIdentifier,{0}.symbol,{0}.chromosomeLocation.locatedOn.primaryIdentifier,{0}.chromosomeLocation.start,{0}.chromosomeLocation.end,{0}.organism.shortName
genomicRegionSearch.query.Gene.sortOrder = {0}.chromosomeLocation.start asc
# if liftOver is true, don't forget to add liftOver relevant properties to struts-config-form-model.xml
genomicRegionSearch.liftOver = false
genomicRegionSearch.liftOver.url =
genomicRegionSearch.exportChromosomeSegment = false
}}}

=== model.properties ===
You can also customise text for general purposes at different places on webpages (set in '''model.properties'''):
 * On Genomic Region Search options page
  * title
{{{
genomicRegionSearch.title = Overlap features search from a new list of Genomic Regions
}}}
  * error messages
{{{
genomicRegionSearch.isNotMultipart = The request is not a file upload request
genomicRegionSearch.spanMisformatted = {0} is in a wrong format
genomicRegionSearch.spanFieldSelection = Please select some {0}
genomicRegionSearch.noSpanPaste = You need to type/paste in some genomic regions
genomicRegionSearch.noSpanFile = You need to type/paste in some genomic regions or select a file to upload
genomicRegionSearch.isNotText = {0} is an invalid file type - file must be in plain text format
genomicRegionSearch.noSpanFileOrEmpty = The file you specified does not exist or is empty
genomicRegionSearch.spanInWrongformat = {0} is in a wrong format
genomicRegionSearch.spanInputType = Input type can't be solved
}}}

 * Page titles on browser, as encoded in HTML: <head><title>My web page</title></head>

{{{
genomicRegionSearchOptions.tab = genomicRegionSearch
genomicRegionSearchOptions.title = Genomic Regions Search
genomicRegionSearchResults.tab = genomicRegionSearch
genomicRegionSearchResults.title = Genomic Regions Search Results
}}}

 * Menu toolbar on top of each page

{{{
menu.genomicRegionSearch = Regions
menu.genomicRegionSearchOptions = Genomic Region Search
menu.genomicRegionSearchResults = Genomic Region Search Results
}}}

Config
------

= web-model.xml =

This file configures model specific routes. It is used to set up webservices that are
not needed for every mine installation.

== Genomic Services ==

The current genomic services offered are GFF3 and FASTA query results. These can be enabled by inserting the following xml stanzas into 
web-model.xml:

{{{
#!xml

<!-- this comment is here to prevent ant from setting model.web to null -->

<!-- GFF3 WEB SERVICES -->
<servlet>
  <servlet-name>gff3-query</servlet-name>
  <servlet-class>org.intermine.bio.webservice.GFF3QueryServlet</servlet-class>
  <init-param>
     <param-name>debug</param-name>
     <param-value>true</param-value>
  </init-param>
</servlet>

<servlet-mapping>
  <servlet-name>gff3-query</servlet-name>
  <url-pattern>/service/query/results/gff3</url-pattern>
</servlet-mapping>

<servlet>
  <servlet-name>gff3-lists</servlet-name>
  <servlet-class>org.intermine.bio.webservice.GFF3ListServlet</servlet-class>
  <init-param>
     <param-name>debug</param-name>
     <param-value>true</param-value>
  </init-param>
</servlet>

<servlet-mapping>
  <servlet-name>gff3-lists</servlet-name>
  <url-pattern>/service/list/results/gff3</url-pattern>
</servlet-mapping>

<!-- FASTA WEB SERVICES -->
<servlet>
  <servlet-name>fasta-query</servlet-name>
  <servlet-class>org.intermine.bio.webservice.FastaQueryServlet</servlet-class>
  <init-param>
     <param-name>debug</param-name>
     <param-value>true</param-value>
  </init-param>
</servlet>

<servlet-mapping>
  <servlet-name>fasta-query</servlet-name>
  <url-pattern>/service/query/results/fasta</url-pattern>
</servlet-mapping>
}}}

In addition to this, the webapp should be informed that these services are available. 
Add the following two lines to the file `web.properties`:

{{{
# The paths that optional webservice servlets are configured to
resource.path.query.gff3 = /query/results/gff3
resource.path.query.fasta = /query/results/fasta
}}}




