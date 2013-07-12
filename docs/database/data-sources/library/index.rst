Data Source Library
================================


This page lists the current sources available for use in InterMine.  All the sources here are found in `bio/sources`.  Look at `flymine/project.xml` for examples of how to use these sources.  

You can also add your own sources to load custom file formats, see :doc:`/database/data-sources/custom/index` for more information.  In addition, the :doc:`/get-started/tutorial/index` contains detailed steps on creating sources for a variety of different data formats.

Most of the configuration done in the config files is optional, if no config entry exists the default behaviour is followed.  There are exceptions to this rule, however.

Core InterMine sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These are commonly used sources that you may want to use to load data into your own InterMine instance.

.. toctree::
    :maxdepth: 2

    go/index
    homologues/index
    interactions/index
    pathways/index
    proteins/index
    publications/index
    variation/index
    
.. toctree::
    :maxdepth: 1

    chado
    ensembl-core
    fasta
    gff
    identifiers/index
    intermine-items-xml
    omim
    organism
    so
    uberon


FlyMine Specific sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These are sources that load Drosophila specific data sets into FlyMine, we don't expect you will re-use these unless you are creating a Drosophila warehouse.  All of these sources are located in `bio/sources/fly`.

* affy-probes                         
* anoest                       
* anopheles-identifiers                   
* anoph-expr               
* arbeitman-items-xml                      
* bdgp-clone                       
* bdgp-insitu                                
* drosdel-gff                       
* drosophila-homology    
* fly-anatomy-ontology
* flyatlas 
* fly-development-ontology
* fly-fish
* fly-misc-cvterms
* flyreg
* flyrnai-screens
* homophila
* long_oligo
* protein_structure
* redfly
* rnai
* tiffin
* tiffin-expression
* tiling_path

See FlyMine for more information about these datasets.  Look at `flymine/project.xml` for examples of how to use these sources.
 
Other loaders
~~~~~~~~~~~~~~

These loaders were written by InterMine users.

* CHEBI
* Disease ontology
* haem-atlas
* HGNC
* HuGE
* Mammalian phenotypes
* pride
* stitch
* huge gwas
