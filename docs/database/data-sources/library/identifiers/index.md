# Identifier Data Sources

You can load MODs ids into your mine using identifier data sources.

## Types of data loaded

genes

## How to download the data

**flybase-identifiers**

[http://flybase.org/downloads/archivedata](http://flybase.org/downloads/archivedata) - you can download different versions

**zfin-identifiers**

[http://zfin.org/downloads/ensembl\_1\_to\_1.txt](http://zfin.org/downloads/ensembl_1_to_1.txt)

**sgd-identifiers**

[http://downloads.yeastgenome.org/curation/chromosomal\_feature/SGD\_features.tab](http://downloads.yeastgenome.org/curation/chromosomal_feature/SGD_features.tab)

**wormbase-identifiers**

query wormbase biomart webservice

**mgi-identifiers**

[ftp://ftp.informatics.jax.org/pub/reports/MGI\_Coordinate.rpt](ftp://ftp.informatics.jax.org/pub/reports/MGI_Coordinate.rpt)

**rgd-identifiers**

[ftp://rgd.mcw.edu/pub/data\_release/GENES\_RAT.txt](ftp://rgd.mcw.edu/pub/data_release/GENES_RAT.txt)

## How to load the data into your mine

project XML example

```markup
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
```

