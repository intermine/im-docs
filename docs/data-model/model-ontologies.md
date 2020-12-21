---
title: Decorating your model with ontologies
---

It is possible to add ontolgy terms to the data types in your data
model.

Why would you do this? Where is this used?
==========================================

Adding an ontology term to a class will facilitate cross InterMine
querying.

It can also enable cross-database analysis. Is the "gene" data type in
MouseMine the same one as in the EBI?

We will use these ontologies in the future when we generate RDF.

How do you chose an ontology term?
==================================

We used an ontology search, then selected the most specific and accurate
term available.

This is the search we used: <https://bioportal.bioontology.org/search>

We ended up selecting terms that were in the following ontologies:

-   [Sequence Ontology](http://www.sequenceontology.org/)
-   [Semantic Science](https://bioportal.bioontology.org/ontologies/SIO)
-   [EDAM](https://bioportal.bioontology.org/ontologies/EDAM)
-   [MeSH](https://bioportal.bioontology.org/ontologies/MESH)
-   [Dublin Core](https://bioportal.bioontology.org/ontologies/DC)
-   [National Cancer Institute Thesaurus (US
    NIH)](https://bioportal.bioontology.org/ontologies/NCIT)

How do you add an ontology term to the data model?
==================================================

We\'ve already added the terms to the core InterMine data model, and
data types in the sequence ontology are updated automatically. You\'ll
need to add ontology terms only to classes and attributes that you have
added to your mine.

Once you have selected the correct ontology term, use the attribute
[term]{.title-ref} and add it to your data model. See the example below

An example additions.xml snippet with an ontology term
======================================================

``` {.xml}
<?xml version="1.0"?>
<model name="testing" package="org.intermine.model.bio">
  <class name="Protein" is-interface="true" term="http://semanticscience.org/resource/SIO_010043">
    <attribute name="name" type="java.lang.String" term="http://edamontology.org/data_2099"/>
  </class>
</model>
```

For a more complete example, see
[FlyMine](http://www.flymine.org/flymine/service/model) which covers
many data types.

For a detailed description of the data model, see
`/data-model/model`{.interpreted-text role="doc"}.

::: {.index}
model with ontology terms, data model with ontology terms
:::
