GO OBO
======

Load the Gene Ontology term ids, names and definitions, and the
relationships between terms. Should be loaded if the go-annotation
source is used.

Types of data loaded
--------------------

GO terms

How to download the data
------------------------

From <http://www.geneontology.org>

How to load the data into your mine
-----------------------------------

project XML example

``` {.xml}
<source name="go" type="go">
  <property name="src.data.file" location="/data/go-annotation/go-basic.obo"/>            
</source>
```

[go-basic.obo]{.title-ref} should load in a few minutes.
[go.obo]{.title-ref} is much more complex and takes a few hours and lots
of memory.

Optional parameter: \<property name=\"ontologyPrefix\" value=\"FBbt\"/\>

This parameter causes the data parser to only load ontology terms with
that prefix. Some OBO files have cross references that include ontology
terms from other ontologies. Unfortunately the file doesn\'t include
which terms correspond to which ontologies so we have to set the prefix.

Optional parameter: \<property name=\"licence\"
value=\"<https://creativecommons.org/licenses/by/4.0/%22/>\>

This parameter will update the DataSet.licence field with the value you
specify.

::: {.index}
GO, gene ontology, OBO
:::
