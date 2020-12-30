# KEGG

Link genes to KEGG pathways that they operate in.

## Types of data loaded

genes, pathways

## How to download the data

[http://www.genome.jp/kegg](http://www.genome.jp/kegg)

## How to load the data into your mine

### project XML example

```text
<source name="kegg-pathway" type="kegg-pathway">
  <property name="src.data.dir" location="/data/kegg"/>
  <property name="kegg.organisms" value="7227"/>
</source>
```

### kegg\_config.properties

Decides which gene identifier fields are populated, mapping from organism taxonId to abbreviation. Only taxonIds specified in project.xml file are downloaded, if no taxonIds are configured, all are loaded. For example:

```text
# bacteria
eco.taxonId = 511145
```

::: {.index} KEGG :::

