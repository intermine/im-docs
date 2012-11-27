GFF3
================================

InterMine comes with a GFF parser which loads GFF3 data files into your mine - without writing any Perl or Java code. This isn't a source itself but genome annotation from gff files can be loaded easily by creating a new source of type gff.  See redfly, malaria-gff and tiffin for examples.

Configuration is added to the `project.properties` file and an optional handler can be added to deal with data in the attributes section of the gff file.


Types of data loaded
--------------------

sequence features

How to download the data 
---------------------------

N/A - will parse any file in GFF3 format

How to load the data into your mine
--------------------------------------

#. place valid GFF3 files into a directory
#. add entry to project XML file
#. run build

.. code-block:: properties

	# example GFF3 file
	MAL1    ApiDB   gene    183057  184457  .       -       .       ID=gene.46311;description=hypothetical%20protein;Name=PFA0210c
	MAL1    ApiDB   mRNA    183057  184457  .       +       .       ID=mRNA.46312;Parent=gene.46311

If you follow the above steps with this data file, the following will happen:

#. gene and mRNA objects created
#. "MAL1" will be the identifier
#. start = 183057, end = 184457
#. gene will be located in -1 strand, mRNA will be located on the 1 strand.

To do more processing or access the attributes, eg. the "ID=mRNA.46312;Parent=gene.46311" string, you will have to write your own GFF3 parser.  See below for details.

Project XML
~~~~~~~~~~~~~~~~~~~~~~~~~~

Here is an example GFF3 entry in the project XML file:

.. code-block:: xml

	# add to project.xml file
	# NOTE: update the "type" if you are using your own custom GFF3 parser

    <source name="example-gff3" type="gff3">
      <property name="gff3.taxonId" value="7227"/>
      <property name="gff3.seqClsName" value="MRNA"/>
      <property name="src.data.dir" location="/DATA/*.gff3"/>
    </source>

Here are the descriptions of the properties available:

======================  =============================  ===========================================================================================================
property                example                        definition
======================  =============================  ===========================================================================================================
gff3.seqClsName         Chromosome                     the ids in the first column represent Chromosome objects, e.g. MAL1
gff3.taxonId            36329                          taxon id of malaria
gff3.dataSourceName     PlasmoDB                       the data source for features and their identifiers, this is used for the DataSet (evidence) and synonyms.
gff3.seqDataSourceName  PlasmoDB                       the source of the seqids (chromosomes) is sometimes different to the features described
gff3.dataSetTitle       PlasmoDB P. falciparum genome  a DataSet object is created as evidence for the features, it is linked to a  DataSource (PlasmoDB)
======================  =============================  ===========================================================================================================


Writing a custom GFF parser
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can extend the generic parser by writing your own Java code to process the GFF3 data.

Make Source script
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Create your custom source by running the create source script:

.. code-block:: bash

	$ ./bio/scripts/make_source mouse-cdna gff
	created /home/USER_NAME/git/bio/sources/mouse-cdna directory for mouse-cdna

The script has created a new source for you in the `bio/sources` directory.

Java code
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Java file you now want to edit is here: `bio/sources/SOURCE_NAME/main/src/org/intermine/bio/dataconversion`

The `process()` method is called for every line of GFF3 file(s) being read.  Features and their locations are already created but not stored so you can make changes here.  Attributes are from the last column of the file are available in a map with the attribute name as the key.   For example:

.. code-block:: java

	Item feature = getFeature();
	String symbol = record.getAttributes().get("symbol");
	feature.setAttribute("symbol", symbol);

Any new Items created can be stored by calling addItem().  For example:

.. code-block:: java

	String geneIdentifier = record.getAttributes().get("gene");
	gene = createItem("Gene");
	gene.setAttribute("primaryIdentifier", geneIdentifier);
	addItem(gene);

You should make sure that new Items you create are unique, i.e. by storing in a map by some identifier. 

It may be helpful to look at current GFF3 parsers:

#. `LongOligoGFF3RecordHandler.java`
#. `MirandaGFF3RecordHandler.java`
#. `RedFlyGFF3RecordHandler.java`
#. `FlyRegGFF3RecordHandler.java`
#. `DrosDelGFF3RecordHandler.java`

See :doc:`/get-started/tutorial` for more information on how to run a GFF source.

.. index:: GFF3, sequence features
