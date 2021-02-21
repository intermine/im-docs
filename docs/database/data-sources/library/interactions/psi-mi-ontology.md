---
title: PSI-MI Ontology
---

Include this source when loading `psi` data to fill in details of ontology terms used. Should be loaded if you are loading interaction data.

## Types of data loaded

ontology terms

## How to download the data

[https://raw.githubusercontent.com/HUPO-PSI/psi-mi-CV/master/psi-mi.obo](https://raw.githubusercontent.com/HUPO-PSI/psi-mi-CV/master/psi-mi.obo)

## How to load the data into your mine

project XML example

```markup
<source name="psi-mi-ontology" type="psi-mi-ontology">
  <property name="src.data.file" location="/data/psi/psi-mi.obo"/>
</source>
```
