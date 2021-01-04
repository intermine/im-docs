# InterPro

InterMine has two InterPro data sources. One that loads the protein domains, e.g. name and description and one that loads the relationship between the proteins and domains.

### Types of data loaded

protein domains, e.g. name and description

### How to download the data

[ftp://ftp.ebi.ac.uk/pub/databases/interpro/interpro.xml.gz](ftp://ftp.ebi.ac.uk/pub/databases/interpro/interpro.xml.gz)

### How to load the data into your mine

project XML example

```markup
<source name="interpro" type="interpro">
  <property name="src.data.dir" location="/data/interpro"/>
</source>
```

## InterPro to protein

This source queries for proteins already in the database and loads related protein domains. So this source must be run after UniProt.

### Types of data loaded

protein domains, their relationship to the protein and protein domain region

### How to download the data

[ftp://ftp.ebi.ac.uk/pub/databases/interpro/protein2ipr.dat.gz](ftp://ftp.ebi.ac.uk/pub/databases/interpro/protein2ipr.dat.gz) [ftp://ftp.ebi.ac.uk/pub/databases/interpro/match\_complete.dat.gz](ftp://ftp.ebi.ac.uk/pub/databases/interpro/match_complete.dat.gz)

### How to load the data into your mine

project XML example

```markup
<!-- has to be after UniProt because only loads protein domains for loaded proteins -->
<source name="protein2ipr" type="protein2ipr">
    <property name="src.data.dir" location="/data/interpro"/>
    <property name="src.data.dir.includes" value="protein2ipr.dat"/>
    <property name="protein2ipr.organisms" value="9606"/>
    <property name=”osAlias” value=”os.production”/>
</source>
```

