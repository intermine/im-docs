# Region Search

## Configuration

`struts-config-model.xml`

```markup
<action path="/initGenomicRegionSearchOptions" type="org.intermine.bio.web.struts.GenomicRegionSearchOptionsController"/>
<action path="/genomicRegionSearch" forward="genomicRegionSearchOptions.page"/>
<action path="/genomicRegionSearchResults" forward="genomicRegionSearchResults.page"/>
<action input="/genomicRegionSearchOptionsBase.jsp" path="/genomicRegionSearchAction" name="genomicRegionSearchForm" scope="request" type="org.intermine.bio.web.struts.GenomicRegionSearchAction" >
  <forward name="genomicRegionSearchResults" path="/genomicRegionSearchResults.do" redirect="false"/>
  <forward name="genomicRegionSearchOptions" path="/genomicRegionSearch.do" redirect="true"/>
</action>
<action path="/genomicRegionSearchAjax" type="org.intermine.bio.web.struts.GenomicRegionSearchAjaxAction"/>
```

`tiles-defs-model.xml`

```markup
<definition name="genomicRegionSearchOptions.page" extends="layout.template">
  <put name="body" value="genomicRegionSearchOptions.tile" />
  <put name="pageName" value="genomicRegionSearch" />
</definition>
<definition name="genomicRegionSearchOptions.tile" path="/model/genomicRegionSearchOptionsBase.jsp"  controllerUrl="/initGenomicRegionSearchOptions.do" />
<definition name="genomicRegionSearchResults.page" extends="layout.template">
  <put name="body" value="/model/genomicRegionSearchResultsBase.jsp" />
  <put name="pageName" value="genomicRegionSearchResults" />
</definition>
```

`struts-config-form-model.xml`

```markup
<form-bean name="genomicRegionSearchForm" type="org.intermine.bio.web.struts.GenomicRegionSearchForm">
  <form-property name="organism" type="java.lang.String"/>
  <form-property name="featureTypes" type="java.lang.String[]"/>
  <form-property name="pasteInput" type="java.lang.String"/>
  <form-property name="fileInput" type="org.apache.struts.upload.FormFile"/>
  <form-property name="whichInput" type="java.lang.String"/>
  <form-property name="dataFormat" type="java.lang.String" initial="isNotInterBaseCoordinate"/>
  <form-property name="extendedRegionSize" type="java.lang.String"/>
</form-bean>
```

`model.properties`

```text
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
```

`web.properties`

```text
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
## 10,000 is the default value, only set if you want a different value
genomicRegionSearch.initBatchSize = 10000
```

* Update defaultOrganisms property as needed
* to disable genomic region search, set `genomicRegionSearch.display =`

  `false`

* also add `genomicRegionSearch` to `layout.fixed`, e.g.

```text
layout.fixed = begin,template,templates,bag,customQuery,query,error,api,genomicRegionSearch
```

* add to '''genomic\_precompute.properties''', **note: do not duplicate the query number**

```text
precompute.query.30 = SELECT a3_.shortName AS a1_, a4_.class AS a2_ FROM org.intermine.model.bio.Organism AS a3_, org.intermine.model.bio.SequenceFeature AS a4_ WHERE a4_.organism CONTAINS a3_

precompute.query.31 = SELECT a4_.class AS a1_, a5_.name AS a2_, a5_.description AS a3_ FROM org.intermine.model.bio.SequenceFeature AS a4_, org.intermine.model.bio.SOTerm AS a5_ WHERE a4_.sequenceOntologyTerm CONTAINS a5_
```

## Region Search V2

**Search page**

This page can be kept as it is, but the query can be constructed and sent to the server side by webservice. The Structs elements can be removed.

**GenomicRegionSearchService**

This class has the methods to:

> * generate data \(JSON\) for search page
> * parse search form and valid input
> * generate search queries \(one region with one query\)
> * generate results table and download/galaxy links

This class can be basically replaced by webservices + html

Update IQL query to pathquery

> Currently, region query is constructed by lQL \(Intermine Query Language\) due to lack of implementation on range constraint in pathquery at the time we developed it. Update IQL to pathqueries and send by webserive, the output will be a list of results tables or a single results table grouped by region.

See `GenomicRegionSearchUtil.java#L270-497`

Query fields:

> In the IQL
>
> > See `GenomicRegionSearchUtil.java#L318-323`
>
> In ResultRow
>
> > See `GenomicRegionSearchQueryRunner.java#L186-212`
>
> In Results table
>
> > See `GenomicRegionSearchService.java#L1106-1112`

Polling

> We created a synchronizedMap to hold all the query results and put it in an http request. On the results page, there is a checker \(javascript\) checking the size of the map, so a progress bar will be updating. The results table will be generated once 10 results return, the pager will be updated dynamically. The whole part will be replaced by InterMine results table.

See GenomicRegionSearchQueryRunner.java\#L129-223

Results table and download links. Replaced by InterMine results table.

## Adding the strand specific search option

Since InterMine 1.7, there is an additional feature on the Region Search page to restrict searches to a specific strand. The user activates this by ticking a checkbox. For example, Chr1:12345-23456 indicates a region on the + strand; Chr1:23456-12345 indicates a region on the - strand. One situation in which this is useful is when you have a series of BLAST-generated regions on which you'd like to search for upstream gene flanking regions. In this case, there is no point in matching with gene flanking regions on the opposite strand.

However, adding this feature to the Region Search page requires a new entry in an InterMine installation's `struts-config-form-model.xml` file. A new InterMine installation will have this entry but existing updated InterMine installations will not. Therefore, to add this feature for an existing InterMine installation, the steps are to

1. Add a strandSpecific form property to the installations Region Search form in $MINE/webapp/resources/struts-config-form-model.xml

   ```markup
   <form-bean name="genomicRegionSearchForm" type="org.intermine.bio.web.struts.GenomicRegionSearchForm">
       ...
       <form-property name="strandSpecific" type="java.lang.Boolean"/>
   </form-bean>
   ```

2. Activate this by setting the following property in `web.properties`

   ```text
   genomicRegionSearch.enableStrandSpecificSearch = true
   ```

If this feature is not present or the checkbox is unchecked, then the default behaviour remains, i.e. to search both strands.

