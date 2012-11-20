Homologue Data Sources
================================

InterMine comes with several data converter for homologue data, e.g. !TreeFam, PANTHER, OrthoDB, Homlogene, etc.  Follow the instructions below to include these datasets in your InterMine.

=== !TreeFam ===
 1. Get the data from !TreeFam
    * [ftp://ftp.sanger.ac.uk/pub/treefam/release-7.0/MySQL/]
      * download two tables:
        * `genes.txt.table`
        * `ortholog.txt.table`
 1. Add !TreeFam to your project.xml file
    {{{
    <source name="treefam" type="treefam">
      <property name="src.data.dir" location="/DATA/treefam"/>
      <property name="src.data.dir.includes" value="ortholog.txt.table"/>
      <property name="geneFile" value="/DATA/treefam/genes.txt.table"/>
      <property name="treefam.organisms" value="7227 6239 7165 4932"/> 
      <property name="treefam.homologues" value="9606 10090 10116 7955"/> 
    </source>
}}}
    * '''treefam.organisms''' - all genes from the listed organisms will be processed
    * '''treefam.homologues''' (optional) - genes will *only* be loaded into the database if they are a homologue of an organism of interest
 1. Run a build

=== Other Sources ===
1. Data
||Source||Data URL||
||panther||ftp://ftp.pantherdb.org/ortholog/current/RefGenomeOrthologs.tar.gz (gunzip to RefGenomeOrthologs.txt)||
||orthodb||ftp://cegg.unige.ch/OrthoDB5/OrthoDB5_ALL_tabtext.gz (gunzip to OrthoDB5_ALL_tabtext)||
||homologene||ftp://ftp.ncbi.nih.gov/pub/HomoloGene/current/homologene.data||

2. project.xml
{{{
    <source name="panther" type="panther">
      <property name="src.data.dir" location="/DATA/panther"/>
      <property name="panther.organisms" value="7227 9606 10090 10116 7955 6239 4932"/>
    </source>
    
    <source name="homologene" type="homologene">
      <property name="src.data.dir" location="/DATA/homologene"/>
      <property name="homologene.organisms" value="7227 9606 10090 10116 7955 6239 4932"/>
    </source>
    
    <source name="orthodb" type="orthodb">
      <property name="src.data.dir" location="/DATA/orthodb"/>
      <property name="orthodb.organisms" value="7227 9606 10090 10116 7955 6239 4932"/>
    </source>
}}}

=== Identifiers ===

The default rule for bio-InterMine is to put the MOD identifiers (eg. MGI:XXX or ZDB-GENE-XXX) in the primaryIdentifier field. This is tricky because some homologue sources use the Ensembl identifiers (Ensembl identifiers belong in the Gene.crossReferences collection). 

To solve this problem, each homologue source uses the NCBI identifier resolver. This resolver takes the Ensembl ID and replaces it with the corresponding MOD identifier.

To use the NCBI gene resolver, see example on [wiki:IdResolver#a1.UsingIDResolversinInterMinedataconverters IdResolver] page which also provides more information on how ID resolvers work in InterMine.

---- 

See:  BioSources