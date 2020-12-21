---
title: Data Sets
---

Load an XML file with details of your data sets and associated
information, e.g. description and URL

Types of data loaded
====================

Update data source and data set entries

How to download the data
========================

Create your own datasets.xml file with your data in InterMine items XML
format and put in your mine\'s [dbmodel/resources]{.title-ref} directory
so that it\'s on your classpath.

``` {.xml}
<?xml version="1.0"?>
<items>
<item id="09" class="" implements="DataSource">
    <attribute name="name" value="NCBI"/>
    <attribute name="description" value="National Centre for Biotechnology Information"/>
    <attribute name="url" value="https://www.ncbi.nlm.nih.gov"/>
</item>
<item id="10" class="" implements="DataSet">
    <attribute name="name" value="Homo sapiens genome sequence"/>
    <attribute name="description" value="Release GRCh38 of the Homo sapiens genome sequence"/>
    <attribute name="version" value="GRCh38.p12"/>
    <attribute name="url" value="https://www.ncbi.nlm.nih.gov"/>
    <reference name="dataSource" ref_id="09"/>
</item>
</items>
```

How to load the data into your mine
===================================

project XML example

``` {.xml}
<source name="flymine-static" type="flymine-static">
  <property name="src.data.file" location="/data/datasets.xml"/>
</source>
```

::: {.index}
data sources, data sets, provenance
:::
