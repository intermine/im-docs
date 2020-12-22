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

3. Download the identifier file for humans - http://www.flymine.org/download/idresolver/humangene to another directory, eg. /DATA_DIR/human/identifiers

4. Create a sub directory `/DATA_DIR/idresolver/` as file root path and add symbolic links to the two files.

.. code-block:: bash

  $ cd /DATA_DIR/idresolver/
  $ ln -s /DATA_DIR/ncbi/gene_info entrez 
  $ ln -s /DATA_DIR/human/identifiers humangene 

5. Add the root path to the file in `~/.intermine/MINE.properties`

.. code-block:: properties

  resolver.file.rootpath=/DATA_DIR/idresolver/

See :doc:`/database/data-sources/id-resolvers` for details on how ID resolvers work in InterMine.

.. warning:: 

	The entrez identifiers file appears to only have the sequence identifier for worm instead of the WBgene identifier

Alternately you can load identifier sources.

Here are the download scripts we use here at InterMine:

`Data Download <https://github.com/intermine/intermine-scripts/tree/master/bio/DataDownloader>`_

We use WormMart but are happy to hear of a better source for worm identifiers.

Here are the project XML entries used by FlyMine:

`FlyMine Project XML <https://github.com/intermine/flymine/blob/master/project.xml>`_

.. index:: homologues, orthologues, paralogues, id resolver
