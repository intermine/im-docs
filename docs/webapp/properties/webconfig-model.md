# Data and Widget Configuration

The `webconfig-model.xml` file configures aspects of how data appears on the InterMine webapp.

This file allows for inheritance - a subclass will inherit from its parent class but only if that subclass has no configuration. Configuration settings for the parent class do not overwrite settings for the subclass.

## Field Configuration

You can configure which fields are displayed on report and result pages for each class in your model.

<table>
  <thead>
    <tr>
      <th style="text-align:left">attribute name</th>
      <th style="text-align:left">purpose</th>
      <th style="text-align:left">required?</th>
      <th style="text-align:left">default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left">fieldExpr</td>
      <td style="text-align:left">field name</td>
      <td style="text-align:left">yes</td>
      <td style="text-align:left">
        <ul>
          <li></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">label</td>
      <td style="text-align:left">human readable name</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">generated automagically</td>
    </tr>
    <tr>
      <td style="text-align:left">showInInlineCollection</td>
      <td style="text-align:left">show field in inline collection (on report pages)</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">true</td>
    </tr>
    <tr>
      <td style="text-align:left">showInSummary</td>
      <td style="text-align:left">add field to query when user clicks on &#x2018;Summary&#x2019; button
        in QueryBuilder</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">true</td>
    </tr>
    <tr>
      <td style="text-align:left">showInResults</td>
      <td style="text-align:left">show field in results table</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">true</td>
    </tr>
    <tr>
      <td style="text-align:left">outerInSummary</td>
      <td style="text-align:left">configure outer-joins when user clicks on &#x2018;Summary&#x2019; in QueryBuilder</td>
      <td
      style="text-align:left">no</td>
        <td style="text-align:left">false</td>
    </tr>
    <tr>
      <td style="text-align:left">doNotTruncate</td>
      <td style="text-align:left">don&#x2019;t truncate display</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">false</td>
    </tr>
    <tr>
      <td style="text-align:left">fieldExporter</td>
      <td style="text-align:left">specify class to export file field</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">
        <ul>
          <li></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="text-align:left">sectionOnRight</td>
      <td style="text-align:left">show on the right side of the page</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">false</td>
    </tr>
    <tr>
      <td style="text-align:left">sectionTitle</td>
      <td style="text-align:left">if sectionOnRight=&#x201D;true&#x201D;, title for section on right</td>
      <td
      style="text-align:left">no</td>
        <td style="text-align:left">
          <ul>
            <li></li>
          </ul>
        </td>
    </tr>
    <tr>
      <td style="text-align:left">openByDefault</td>
      <td style="text-align:left">if sectionOnRight=&#x201D;true&#x201D;, whether or not this section should
        be open</td>
      <td style="text-align:left">no</td>
      <td style="text-align:left">false</td>
    </tr>
  </tbody>
</table>

For example:

```text
<class className="org.flymine.model.genomic.Protein">
  <fields>
    <fieldconfig fieldExpr="primaryIdentifier"/>
    <fieldconfig fieldExpr="primaryAccession"/>
    <fieldconfig fieldExpr="organism.name"/>
    <fieldconfig fieldExpr="length" displayer="/model/sequenceShortDisplayerWithField.jsp" />
  </fields>
  <bagdisplayers>
   < -- attribute links can now be displayed on protein list analysis pages -->
   <displayer src="attributeLinkDisplayer.tile"/>
  </bagdisplayers>
</class>
```

## Displaying Data on Report pages

ReportDisplayers allow custom display of particular data types on report pages, typically to replace default tables with more appropriate presentation of data.

```markup
<reportdisplayer javaClass="org.intermine.bio.web.displayer.CytoscapeNetworkDisplayer"
                 jspName="model/cytoscapeNetworkDisplayer.jsp"
                 replacesFields="interactions"
                 placement="Interactions"
```

## Export Configuration

Users can export data from InterMine in comma or tab-delimited files. InterMine also allows for the addition of custom exporters. To add a custom exporter, create a Java class to format the data and add an entry to the web config file, for example:

```markup
<tableExportConfig id="sequenceExporter" actionPath="/exportAction?type=sequenceExporter"
                   className="org.intermine.bio.web.export.SequenceHttpExporter"/>
<tableExportConfig id="gff3Exporter" actionPath="/exportAction?type=gff3Exporter"
                   className="org.intermine.bio.web.export.GFF3HttpExporter"/>
```

## Widget Configuration

At the bottom of the config file are the configuration entries for widgets. Please see \[wiki:Widgets\] for detailed information about how to configure widgets.

```markup
<enrichmentwidgetdisplayer id="publication_enrichment"
                           title="Publication Enrichment"
                           description="Publications enriched for genes in this list."
                           label="Publication"
                           startClass="Gene"
                           startClassDisplay="primaryIdentifier"
                           enrich="publications.title"
                           enrichIdentifier="publications.pubMedId"
                           constraints="organism.name=[list],primaryIdentifier  = null"
                           typeClass="org.intermine.model.bio.Gene"
                           views="secondaryIdentifier, symbol, organism.name,
                                 publications.title, publications.firstAuthor,
                                 publications.journal, publications.year, publications.pubMedId"
                           externalLink="http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=Retrieve&amp;db=PubMed&amp;dopt=Abstract&amp;list_uids="/>
```

