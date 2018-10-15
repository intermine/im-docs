Data Source Library
================================


This page lists the current sources available for use in InterMine. All the sources here are found as ready-to-use JARs in the central repository, `JCenter <https://jcenter.bintray.com/org/intermine/>`_. Look at `FlyMine <https://github.com/intermine/flymine/blob/master/project.xml>`_ for examples of how to use these sources.  

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
    
.. toctree::
    :maxdepth: 1

    chado
    fasta
    gff
    identifiers/index
    intermine-items-xml
    omim
    organism
    so
    uberon
    data-sources
    data-sets


FlyMine Specific sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These are sources that load Drosophila specific data sets into FlyMine, we don't expect you will re-use these unless you are creating a Drosophila warehouse.  All of these sources are located in https://github.com/intermine/flymine-bio-sources.

* affy-probes                         
* arbeitman-items-xml                      
* bdgp-clone                       
* bdgp-insitu                                
* drosdel-gff                       
* drosophila-homology    
* fly-anatomy-ontology
* flyatlas 
* flybase-alleles
* flybase-expression
* fly-development-ontology
* fly-fish
* fly-misc-cvterms
* flyreg
* long_oligo
* miranda
* redfly
* rnai

See `FlyMine <http://www.flymine.org>`_ for more information about these datasets. Look at `FlyMine <https://github.com/intermine/flymine/blob/master/project.xml>`_ for examples of how to use these sources.
 
HumanMine Specific sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* arrayexpress-atlas
* atlas-express
* clinvar
* ensembl-hgnc
* gtex
* hgnc
* hpo
* hpo-annotation
* huge-gwas
* human-gene
* mgi-alleles
* ncbi-summaries
* orphanet
* protein-atlas

See `HumanMine <http://www.humanmine.org>`_ for more information about these datasets. Look at `HumanMine <https://github.com/intermine/humanmine/blob/master/project.xml>`_ for examples of how to use these sources.
