Homologue Data Sources
================================

InterMine comes with several data converter for homologue data, e.g. !TreeFam, PANTHER, OrthoDB, Homlogene, etc.  Follow the instructions below to include these datasets in your InterMine.

.. toctree::
    
    treefam
    homologene
    orthodb
    panther
    compara

Identifiers

The default rule for bio-InterMine is to put the MOD identifiers (eg. MGI:XXX or ZDB-GENE-XXX) in the primaryIdentifier field. This is tricky because some homologue sources use the Ensembl identifiers (Ensembl identifiers belong in the Gene.crossReferences collection). 

To solve this problem, each homologue source uses the NCBI identifier resolver. This resolver takes the Ensembl ID and replaces it with the corresponding MOD identifier.

To use the NCBI gene resolver, see example on [wiki:IdResolver#a1.UsingIDResolversinInterMinedataconverters IdResolver] page which also provides more information on how ID resolvers work in InterMine.

