---
title: GO OBO
---

Loads the Gene Ontology term ids, names and definitions, and the relationships between terms. Should be loaded if the go-annotation source is used.

## Types of data loaded

GO terms

## How to download the data

From [http://www.geneontology.org](http://www.geneontology.org)

## How to load the data into your mine

Project XML example

```markup
<source name="go" type="go">
  <property name="src.data.file" location="/data/go-annotation/go-basic.obo"/>            
</source>
```

`go-basic.obo` should load in a few minutes. `go.obo` is much more complex and takes a few hours and lots of memory.

Optional parameter: &lt;property name="ontologyPrefix" value="FBbt"/&gt;

This parameter causes the data parser to only load ontology terms with that prefix. Some OBO files have cross references that include ontology terms from other ontologies. Unfortunately the file doesn't include which terms correspond to which ontologies so we have to set the prefix.

Optional parameter: &lt;property name="licence" value="[https://creativecommons.org/licenses/by/4.0/%22/](https://creativecommons.org/licenses/by/4.0/%22/)&gt;

This parameter will update the DataSet.licence field with the value you specify.
