NCBI - Entrez gene
==================

Gene information from NCBI

Types of data loaded
--------------------

genes

How to download the data files
------------------------------

-   <ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/GENE_INFO/All_Data.gene_info.gz>

Be sure to unzip the file.

How to load the data into your mine
-----------------------------------

project XML example

``` {.xml}
<source name="ncbi-gene" type="ncbi-gene">
  <property name="src.data.dir" location="/DATA_DIR/ncbi" />
  <property name="organisms" value="9606" />
</source>
```

::: {.index}
NCBI, Entrez, gene
:::
