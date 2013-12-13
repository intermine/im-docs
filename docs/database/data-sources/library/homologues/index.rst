Homologue Data Sources
================================

InterMine comes with several data converter for homologue data, e.g. TreeFam, PANTHER, OrthoDB, Homlogene, etc.  Follow the instructions below to include these datasets in your InterMine.

.. toctree::
    
    treefam
    homologene
    orthodb
    panther
    compara

Identifiers
-----------------

The default rule for bio-InterMine is to put the MOD identifiers (eg. MGI:XXX or ZDB-GENE-XXX) in the primaryIdentifier field. This is tricky because some homologue sources use the Ensembl identifiers (Ensembl identifiers belong in the Gene.crossReferences collection). 

To solve this problem, each homologue source uses the NCBI identifier resolver. This resolver takes the Ensembl ID and replaces it with the corresponding MOD identifier.

How to use an ID resolver
----------------------------

1. Download the identifier file - ftp://ftp.ncbi.nih.gov/gene/DATA/gene_info.gz
2. Unzip the file to `/DATA_DIR/ncbi/gene_info`

.. warning:: 

	Make sure permissions on the file are correct so the build process can read this file.


3. Create a sub directory `/DATA_DIR/idresolver/` as file root path and a symbolic link `entrez` to the file

.. code-block:: bash

  $ cd /DATA_DIR/idresolver/
  $ ln -s /DATA_DIR/ncbi/gene_info entrez 

4. Add the root path to the file in `~/.intermine/MINE.properties`

.. code-block:: properties

  resolver.file.rootpath=/DATA_DIR/idresolver/


To use the NCBI gene resolver, see :doc:`/database/data-sources/id-resolvers` which also provides more information on how ID resolvers work in InterMine.

.. warning:: 

	The entrez identifiers file appears to only have the sequence identifier for worm instead of the WBgene identifier


Alternately you can load identifier sources.

Here are the download scripts we use here at InterMine:

https://github.com/intermine/intermine/tree/dev/bio/scripts/DataDownloader/lib/DataDownloader/Source

We use WormMart but are happy to hear of a better source for worm identifiers.

Here are the project XML entries used by FlyMine:

https://github.com/intermine/intermine/blob/dev/flymine/project.xml#L36-L48


.. index:: homologues, orthologues, paralogues
