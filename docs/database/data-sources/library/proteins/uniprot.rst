UniProt
================================


Types of data loaded
--------------------

genes, proteins, GO annotation, protein domains, publications, UniProt features, comments, synonyms, cross references, EC numbers, components

How to download the data 
---------------------------

This source loads data from the UniProt website here: ftp://ftp.uniprot.org/pub/databases/uniprot/current_release 

The UniProt source expects the data files to be in a special format:

.. code-block:: properties

	TAXONID_uniprot_sprot.xml
	TAXONID_uniprot_trembl.xml
	
To download a single taxon, you can use this URL:

http://www.uniprot.org/uniprot/?format=xml&query=taxonomy%3A9606+AND+reviewed%3Ayes&compress=yes 

================================= =================================
parameter                         value
================================= =================================
taxonomy                          e.g. 9606 for human
reviewed                          yes for swiss prot, no for trembl
compress                          if yes, zipped
================================= =================================

How to load the data into your mine
--------------------------------------

Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~

Gene identifier fields
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can specify which gene fields are assigned when UniProt data is loaded.  An example entry:

.. code-block:: properties

	10116.uniqueField = primaryIdentifier
	10116.primaryIdentifier.dbref = RGD
	10116.secondaryIdentifier.dbref = Ensembl
	10116.symbol.name = primary

The format for the file is:

`<TAXON_ID>.<IDENTIFIER_FIELD> = <VALUE>`

An example
""""""""""""""

A rat uniprot entry: http://www.uniprot.org/uniprot/Q923K9.xml

The second line of that configuration would set the ID value as the gene.primaryIdentifier:

.. code-block:: xml

	<dbReference type="RGD" id="619834" key="33">
		<property type="gene designation" value="Acf"/>
	</dbReference>

The third line would set this ID value as gene.secondaryIdentifier:

.. code-block:: xml

	<dbReference type="Ensembl" id="ENSRNOG00000033195" key="30">
		<property type="organism name" value="Rattus norvegicus"/>
	</dbReference>

The last line would set the value between the <name/> tags as gene.symbol:

.. code-block:: xml

	<gene>
		<name type="primary">A1cf</name>
		<name type="synonym">Acf</name>
		<name type="synonym">Asp</name>
	</gene>

The values for symbol.name can be primary, ORF or ordered locus.

Protein feature types
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can also configure which protein features to load.

To load specific feature types only, specify them like so:

.. code-block:: properties

	# in uniprot_config.properties
	feature.types = helix

To load NO feature types:

.. code-block:: properties

	# in uniprot_config.properties
	feature.types = NONE

To load ALL feature types, do not specify any feature types, remove that line from this config file.  Loading all feature types is the default behaviour.



Project.xml
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

    <source name="uniprot" type="uniprot" >
      <property name="uniprot.organisms" value="7227 9606"/>
      <property name="src.data.dir" location="/data/uniprot"/>
      <property name="creatego" value="true"/>
      <property name="creategenes" value="true"/>
      <property name="allowduplicates" value="false"/>
      <property name="loadfragments" value="false"/>
      <property name="loadtrembl" value="true"/>
    </source>

===============  ========================================================================  =========
property         description                                                               default
===============  ========================================================================  =========
creategenes      if TRUE, process genes                                                    true
creatego         if TRUE, process GO annotation                                            false 
allowduplicates  if TRUE, allow proteins with duplicate sequences to be processed          false 
loadfragments    if TRUE, load all proteins even if isFragment = true                      false 
loadtrembl       if FALSE, not load trembl data for given organisms, load sprot data only  true 
===============  ========================================================================  =========

FASTA
-------------

This source loads FASTA data for isoforms. The UniProt entry is does not contain the sequences for isoforms.

ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/uniprot_sprot_varsplic.fasta.gz

.. code-block:: xml

    <source name="uniprot-fasta" type="fasta">
      <property name="fasta.taxonId" value="7227 9606"/>
      <property name="fasta.className" value="org.intermine.model.bio.Protein"/>
      <property name="fasta.classAttribute" value="primaryAccession"/>
      <property name="fasta.dataSetTitle" value="UniProt data set"/>
      <property name="fasta.dataSourceName" value="UniProt"/>
      <property name="src.data.dir" location="/data/uniprot/current"/>
      <property name="fasta.includes" value="uniprot_sprot_varsplic.fasta"/>
      <property name="fasta.sequenceType" value="protein" />
      <property name="fasta.loaderClassName" value="org.intermine.bio.dataconversion.UniProtFastaLoaderTask"/>
    </source>

UniProt keywords
------------------------

Loads the names for the UniProt keywords contained in the main UniProt converter.

ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/complete/docs

.. code-block:: xml

    <source name="uniprot-keywords" type="uniprot-keywords">
      <property name="src.data.dir" location="/data/uniprot/current"/>
      <property name="src.data.dir.includes" value="keywlist.xml"/>
    </source>


.. index:: UniProt, protein domains, GO, keywords, components, isoforms, FASTA, proteins, protein features
