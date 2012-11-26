Data Source Library
================================


This page lists the current sources available for use in InterMine.  All the sources here are found in `bio/sources`.  Look at `flymine/project.xml` for examples of how to use these sources.  

You can also add your own sources to load custom file formats, see [wiki:SourceHowto 'How to create a source'] for more information.  In addition, the [wiki:GettingStarted tutorial] contains detailed steps on creating sources for a variety of different data formats.

Most of the configuration done in the config files is optional, if no config entry exists the default behaviour is followed.  There are exceptions to this rule, however.

Common sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These are commonly used sources that you may want to use to load data into your own InterMine instance.

.. toctree::
    :maxdepth: 1

    chado
    ensembl
    entrez-organism
    fasta
    gff
    go/index
    homologues/index
    identifiers/index
    interactions/index
    pathways/index
    proteins/index
    publications/index
    snp
    so






FlyMine Specific sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These are sources that load Drosophila specific data sets into FlyMine, we don't expect you will re-use these unless you are creating a Drosophila warehouse.  All of these sources are located in [source:trunk/bio/sources/flymine bio/sources/flymine].

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

See [http://www.flymine.org/dataCategories.do FlyMine] for more information about these datasets.  Look at `flymine/project.xml` for examples of how to use these sources.
 
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
 * omim
 * huge gwas

 




