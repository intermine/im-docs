# PubMed

Data from pubmed. Entire file is downloaded, only taxon IDs set in project.xml will be loaded. If nothing is configured, processes all entries.

## Types of data loaded

genes, publications

## How to download the data files

* [ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/gene2pubmed.gz](ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/gene2pubmed.gz)
* [ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/gene\_info.gz](ftp://ftp.ncbi.nlm.nih.gov/gene/DATA/gene_info.gz)

## How to load the data into your mine

project XML example

```markup
<source name="pubmed-gene" type="pubmed-gene">
  <property name="src.data.dir" location="DATA_DIR/pubmed/" />
  <property name="pubmed.organisms" value="7227"/>
  <property name="src.data.dir.includes" value="gene2pubmed"/>
</source>
```

