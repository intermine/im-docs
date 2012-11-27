Identifier Data Sources
================================


Types of data loaded
--------------------

genes, proteins, interactions 

How to download the data 
---------------------------

Genetic and protein interaction data from BioGRID  

How to load the data into your mine
--------------------------------------

project XML example

== Identifier Source ==

You can load MODs ids into your mine using identifier data sources.

1. Data
Download datasets and put them in a any local directory. Replace '''/DATA/''' in project.xml with your data path (absolute path)
||Source||URL||
||flybase-identifiers||[http://flybase.org/static_pages/downloads/FB2012_04/synonyms/fb_synonym_fb_2012_04.tsv.gz http://flybase.org/static_pages/downloads/FB20XX_XX/synonyms/fb_synonym_fb_FB20XX_XX.tsv.gz] - where FB20XX_XX = the current !FlyBase release||
||zfin-identifiers||http://zfin.org/downloads/ensembl_1_to_1.txt||
||sgd-identifiers||http://downloads.yeastgenome.org/curation/chromosomal_feature/SGD_features.tab||
||wormbase-identifiers||query wormbase biomart webservice||
||mgi-identifiers||ftp://ftp.informatics.jax.org/pub/reports/MGI_Coordinate.rpt||
||rgd-identifiers||ftp://rgd.mcw.edu/pub/data_release/GENES_RAT.txt||

2. project.xml

{{{
    <source name="flybase-identifiers" type="flybase-identifiers">
      <property name="src.data.dir" location="/DATA/flybase-identifiers"/>
    </source>   
   
    <source name="zfin-identifiers" type="zfin-identifiers">
      <property name="src.data.dir" location="/DATA/zfin-identifiers"/>
    </source> 
   
    <source name="sgd-identifiers" type="sgd-identifiers">
      <property name="src.data.dir" location="/DATA/sgd-identifiers"/>
    </source> 

    <source name="wormbase-identifiers" type="wormbase-identifiers">
      <property name="src.data.dir" location="/DATA/worm-identifiers"/>
    </source>

   <source name="mgi-identifiers" type="mgi-identifiers">
      <property name="src.data.dir" location="/DATA/mgi-identifiers"/>
    </source>
   
   <source name="rgd-identifiers" type="rgd-identifiers">
      <property name="src.data.dir" location="/DATA/rgd-identifiers"/>
    </source>

}}}

3. Run a build
