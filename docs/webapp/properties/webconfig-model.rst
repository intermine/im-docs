Data and Widget Configuration
==========================================

The `webconfig-model.xml` file configures aspects of how data appears on the InterMine webapp.

NB:  This file allows for inheritance - a subclass will inherit the 'long displayers' from its parent class, but only if that subclass has no long displayers set.  Configuration settings for the parent class do not overwrite settings for the subclass.

See: !FlyMine's [source:trunk/flymine/webapp/resources/webapp/WEB-INF/webconfig-model.xml webconfig-model.xml], !MalariaMine's [source:trunk/bio/tutorial/malariamine/webapp/resources/webapp/WEB-INF/webconfig-model.xml webconfig-model.xml]

Field Configuration
----------------------

You can configure which fields are displayed on report and result pages for each class in your model.  

||'''attribute name'''||'''purpose'''||'''required?'''||'''default'''||
||fieldExpr||field name||yes||-||
||label||human readable name||no||generated automagically||
||showInInlineCollection||show field in inline collection (on report pages)||no||true||
||showInSummary||add field to query when user clicks on 'Summary' button in !QueryBuilder||no||true||
||showInResults||show field in results table||no||true||
||doNotTruncate||don't truncate display||no||false||
||fieldExporter||specify class to export file field||no||-||
||sectionOnRight||show on the right side of the page||no||false||
||sectionTitle||if sectionOnRight="true", title for section on right||no||-||
||openByDefault||if sectionOnRight="true", whether or not this section should be open||no||false||

For example:

{{{
	  <class className="org.flymine.model.genomic.Protein">
 	    <fields>
 	      <fieldconfig fieldExpr="primaryIdentifier"/>
 	      <fieldconfig fieldExpr="primaryAccession"/>
 	      <fieldconfig fieldExpr="organism.name"/>
 	      <fieldconfig fieldExpr="length" displayer="/model/sequenceShortDisplayerWithField.jsp" />
 	    </fields>
 	    <longdisplayers>
 	     <!-- attribute links can now be displayed on protein report pages -->
 	     <displayer src="attributeLinkDisplayer.tile"/>
 	    </longdisplayers>
 	    <bagdisplayers>
 	     <!-- attribute links can now be displayed on protein list analysis pages -->
 	     <displayer src="attributeLinkDisplayer.tile"/>
 	    </bagdisplayers>
 	  </class>
}}}


Displaying Data on Report pages
--------------------------------------------

ReportDisplayers allow custom display of particular data types on report pages, typically to replace default tables with more appropriate presentation of data. 

{{{
    <reportdisplayer javaClass="org.intermine.bio.web.displayer.CytoscapeNetworkDisplayer"
                     jspName="model/cytoscapeNetworkDisplayer.jsp"
                     replacesFields="interactions"
                     placement="Interactions"
}}}

Export Configuration
----------------------

Users can export data from InterMine in comma or tab-delimited files and in MS Excel format.  InterMine also allows for the addition of custom exporters.  To add a custom exporter, create a Java class to format the data and add an entry to the web config file, for example:

{{{
  <tableExportConfig id="sequenceExporter" actionPath="/exportAction?type=sequenceExporter"
                     className="org.intermine.bio.web.export.SequenceHttpExporter"/>
  <tableExportConfig id="gff3Exporter" actionPath="/exportAction?type=gff3Exporter"
                     className="org.intermine.bio.web.export.GFF3HttpExporter"/>
}}}

Widget Configuration
----------------------

At the bottom of the config file are the configuration entries for widgets.  Please see [wiki:Widgets] for detailed information about how to configure widgets.
{{{
      <enrichmentwidgetdisplayer id="publication_enrichment"
                                 title="Publication Enrichment"
                                 description="Publications enriched for genes in this list."
                                 label="Publication"
                                 startClass="Gene"
                                 startClassDisplay="primaryIdentifier"
                                 enrich="publications.title"
                                 enrichIdentifier="publications.pubMedId"
                                 constraints="organism.name=[list],primaryIdentifier != null"
                                 typeClass="org.intermine.model.bio.Gene"
                                 views="secondaryIdentifier, symbol, organism.name,
                                       publications.title, publications.firstAuthor,
                                       publications.journal, publications.year, publications.pubMedId"
                                 externalLink="http://www.ncbi.nlm.nih.gov/entrez/query.fcgi?cmd=Retrieve&amp;db=PubMed&amp;dopt=Abstract&amp;list_uids="/>
}}}
