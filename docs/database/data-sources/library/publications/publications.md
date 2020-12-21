---
title: Publications
---

All publications are referred to by PubMed id by other sources. This
source should be included at the end of the build. It will query all
PubMed ids from the database (where the [title]{.title-ref},
[year]{.title-ref}, or [first author]{.title-ref} columns are NULL),
fetch details from the Entrez web service and fill in Publication
objects.

Types of data loaded
====================

None, the publciation records already in the database are updated.

How to download the data
========================

Data is fetched from the NCBI web site for publication records already
in the InterMine database.

How to load the data into your mine
===================================

project XML example

``` {.xml}
<source name="update-publications" type="update-publications" dump="true">
  <property name="src.data.file" location="publications.xml"/>
  <!-- <property name="loadFullRecord" value="true"/> -->
</source>
```

properties:

1.  loadFullRecord - load MeSH terms and abstract, value
    \"true\"/\"false\"

::: {.index}
NCBI
:::
