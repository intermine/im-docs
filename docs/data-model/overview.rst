Data Model Overview
================================

InterMine uses an object-oriented data model, classes in the model and relationships between them are defined in an XML file. Depending on which data types you include you will need different classes and fields in the model, so the model is generated from a core model XML file and any number of additions files. These additions files can define extra classes to be added to the model and define extra fields for additional classes.

* Elements of the model are represented by Java classes and references between them.
* These Java classes map automatically to tables in the database schema.
* The object model is defined as an XML file, that defines classes, their attributes and references between classes.
* The Java classes and database schema are automatically generated from an XML file.

You can easily adapt InterMine to include your own data by creating new additions files, see the tutorial for a detailed walk though on how to do this.

Data source and Data set
--------------------------

Most data types in the InterMine core model have a reference to a "data set" and a corresponding "data source".

Data source
	The origin of the data. Usually an organisation, e.g. UniProt, InterPro

Data set
	 A set of results or data from a data source. e.g. InterPro GO Annotation data set

These data are meant to enable your users to easily trace the provenance of your data.

Organism
----------

Include the :doc:`/database/data-sources/library/organism` data source in your build. Many of the tools available in InterMine assume this source will be loaded and expect a populated organism table.

Chromosome location 
----------------------------

InterMine uses the -1 / 1 convention for strands.

Identifiers
----------------------------

All sequence features must have a non-NULL, unique identifier set for their `primaryIdentifier` field.

Sequence Ontology term
----------------------------

All sequence features should have a reference to the appropriate `sequence ontology term <http://www.sequenceontology.org>`_. The Java data parsers do this for you automatically.

so_terms
----------------------------

Adding sequence ontology terms to the `so_terms` text file will add these classes to your data model.

* There is a mechanism for automatically generating a set of class definitions that reflect the structure of the SO.

  * Is-a relationships in the SO become subclass relationships in the model.
  
  * Part-of/member relationships in the SO become many-to-one or many-to-many relationships in the model (determined by the configs at the bottom of `so_terms`).
  
* Only the terms listed in `so_terms` become classes in the model. 

  * In particular, a descendant class D and an ancestor class A may be included while none of the intervening classes (B and C) are. 
  
  * The class generator takes care to make sure that D becomes a direct subclass of A and that it has whatever references/collections it would have inherited had B and C been included. 
  
  * A particular example is transcript, which is four levels below sequence_feature in the SO, but Transcript is a direct subclass of SequenceFeature in the model. In addition, Transcript has a reference to Gene, inherited from the intervening SO term gene_member_region, which is omitted from the model.
  
* The model generated from `so_term` is augmented by the contents of intermine/bio/model/core.xml and intermine/bio/model/genomic_additions.xml (e.g., core.xml is where SequenceFeature is made a subclass of BioEntity).
 
* The generated model can be further augmented in the usual way by a source's source_additions.xml file and the global additions file. 

Global Additions File
-----------------------

Previously the data model was merged from all data sources' additions XML file (plus the SO terms, core and genomic additons). This is no longer true. Since each source is in its own JAR now, the data model is self-contained for each data source. Therefore if you reference a class in your data parser, it must be present in the additions file. Alternatively, you can specify a single data model file that will be merged into each source:

.. code-block:: sh

    // [in bio/sources/build.gradle]
    // uncomment to specify an extra additions file for your bio-sources
    // this file will be merged with the additions file for each data source
    // and included in each source JAR.
    //bioSourceDBModelConfig {
    //    extraAdditionsFile = "MY-MINE_additions.xml"
    //}


Model Merging
-----------------------

The InterMine build system generates the data model by merging the following data files:

* core.xml
* genomic_additions.xml
* so_terms (see above)
* SOURCE_additions files for each data source listed in your project XML file
* `extraAdditionsFile` if specified (see above)

See :doc:`/database/database-building/model-merging/` for details.

.. index:: data source, data set, data model overview, data model, organism, organism name, chromosome location, strand
