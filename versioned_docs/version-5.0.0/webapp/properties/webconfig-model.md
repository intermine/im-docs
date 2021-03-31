---
title: Data and Widget Configuration
---

The `webconfig-model.xml` file configures aspects of how data appears on the InterMine webapp.

This file allows for inheritance - a subclass will inherit from its parent class but only if that subclass has no configuration. Configuration settings for the parent class do not overwrite settings for the subclass.

## Field Configuration

You can configure which fields are displayed on report and result pages for each class in your model.

| attribute name | purpose | required? | default |
| :--- | :--- | :--- | :--- |
| fieldExpr | field name | yes | - |
| label | human readable name | no | generated automatically |
| showInInlineCollection | show field in inline collection \(on report pages\) | no | true |
| showInSummary | add field to query when user clicks on ‘Summary’ button in QueryBuilder | no | true |
| showInResults | show field in results table | no | true |

For example:

```text
  <class className="org.intermine.model.bio.Gene">
    <fields>
      <fieldconfig fieldExpr="primaryIdentifier"/>
      <fieldconfig fieldExpr="secondaryIdentifier"/>
      <fieldconfig fieldExpr="symbol"/>
      <fieldconfig fieldExpr="name"/>
      <fieldconfig fieldExpr="length"/>
      <fieldconfig fieldExpr="chromosomeLocation" showInResults="false" />
      <fieldconfig fieldExpr="chromosome.primaryIdentifier" showInInlineCollection="false" showInSummary="false" />
      <fieldconfig fieldExpr="chromosomeLocation.start" showInInlineCollection="false" showInSummary="false" />
      <fieldconfig fieldExpr="chromosomeLocation.end" showInInlineCollection="false" showInSummary="false" />
      <fieldconfig fieldExpr="organism.shortName" />
    </field
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
