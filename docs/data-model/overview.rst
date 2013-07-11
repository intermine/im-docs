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

.. index:: data source, data set, data model overview, data model, organism, organism name, chromosome location, strand
