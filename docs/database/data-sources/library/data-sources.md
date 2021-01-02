# Data Sources

Load the official title, description and URL for data sources.

## Types of data loaded

Update data source entries

## How to download the data

[http://www.uniprot.org/docs/dbxref.txt](http://www.uniprot.org/docs/dbxref.txt)

## How to load the data into your mine

project XML example

```markup
<source name="update-data-sources" type="update-data-sources">
  <property name="src.data.file" location="datasources.xml"/>
  <property name="dataSourceFile" value="/data/uniprot/xrefs/dbxref.txt"/>
</source>
```

