## Frictionless Specifications for InterMine

### Contents

<!--TOC-->
1. [Introduction](#1-introduction)

    a. [What are Frictionless Specifications?](#what-are-frictionless-specifications)

    b. [What's a data package?](#whats-a-data-package)

    c. [Data Package for InterMine](#data-package-for-intermine)

    d. [Frictionless Specifications used in InterMine Data Package](#frictionless-specifications-used-in-intermine-data-package)

2. [InterMine's Data Package](#2-intermines-data-package)

    a. [How to export?](#how-to-export)

    b. [Description of InterMine's Data Package Fields](#description-of-intermines-data-package-fields)

3. [Sample data package](#3-sample-data-package)

<!--TOC-->

## 1. Introduction

### What are Frictionless Specifications?

At the core of Frictionless is a set of patterns for describing data including Data Package (for datasets), Data Resource (for files) and Table Schema (for tables). 
For more info about the project as a whole, please visit [frictionlessdata.io](http://frictionlessdata.io/).

### What's a data package?

A Data Package is a simple container format used to describe and package a collection of data (a dataset).

### Data Package for InterMine

InterMine allows users to query a diverse data sources through its webapps. InterMine's new data package will help users to understand the query results in a simplified manner. It will describe the primary keys, data types of attributes/columns, descriptions and ontology links of attributes among other things. For a sample InterMine Data Package, [click here](#3-sample-data-package). 

### Frictionless Specifications used in InterMine Data Package

InterMine uses [Tabular Data Package](https://specs.frictionlessdata.io/tabular-data-package/) and [Tabular Data Resource](https://specs.frictionlessdata.io/tabular-data-resource/) since InterMine's biological data is tabular-style.

## 2. InterMine's Data Package

### How to export?

While exporting query results, there'll be a new option for Frictionless Data Package. You can use it to export the datapackage along with the results.

Please note that if you want to export the data package, it will be exported in a zip file along with the query results.

### Description of InterMine's Data Package Fields

Some of the fields in the data package are standard fields followed by frictionless specifications. These are highlighted with the keywork FIXED in the third column otherwise examples are specified.

| Key      | Description | Value/Example |
| ----------- | ----------- | ----------- |
| profile [outer level] | specifies that the specification used is tabular data package | tabular-data-package [FIXED] |
| name [outer level] | describes the name and version of the mine | flymine@v51 |
| profile [inner level] | specifies that the resource used is tabular data resource | tabular-data-resource [FIXED] |
| name [inner level] | the name of the resource, depends on the mineName | flymine-query-data-resource |
| path | exports the top 10 rows of results of query | example **[below](#3-sample-data-package)** |
| format | format of the query results file | csv/tsv/json/xml |
| schema | describes fields of query results and primary/candidate keys | example **[below](#3-sample-data-package)** |
| fields | an array of objects describing all the fields in query results | example **[below](#3-sample-data-package)** |
| name [in fields] | name of the field/column header | firstAuthor |
| type [in fields] | type of the field/column header | String/Integer/etc. |
| class path [in fields] | class path of attribute/field | Protein > Organism . Name |
| class ontology link [in fields] | ontology link for the class of attribute | http://semanticscience.org/resource/SIO_010043 |
| attribute ontology link [in fields] | ontology link for the attribute | http://edamontology.org/data_2909 |
| primaryKey | an array of candidate keys | [primaryIdentifier, primaryAccession] |
| sources | an array of objects each describing a data source | example **[below](#3-sample-data-package)** |
| title [in sources] | name/title of data source | GenomeNet |
| url [in sources] | url of the data source |  http://www.genome.jp/en/ |

## 3. Sample data package

```
{
  "profile" : "tabular-data-package",
  "name" : "biotestmine@v31",
  "resources" : [ {
    "profile" : "tabular-data-resource",
    "name" : "intermine-query-data-resource",
    "path" : "http://localhost:8080/biotestmine/service/query/results?query=%3Cquery+name%3D%22%22+model%3D%22genomic%22+view%3D%22Protein.primaryIdentifier+Protein.primaryAccession+Protein.organism.name+Protein.publications.firstAuthor+Protein.publications.title+Protein.publications.year+Protein.publications.journal+Protein.publications.volume+Protein.publications.pages+Protein.publications.pubMedId%22+longDescription%3D%22%22+sortOrder%3D%22Protein.primaryIdentifier+asc%22%3E%3Cconstraint+path%3D%22Protein.organism.name%22+op%3D%22%3D%22+value%3D%22Plasmodium+falciparum+3D7%22%2F%3E%3C%2Fquery%3E&format=tab",
    "format" : "tsv",
    "schema" : {
      "fields" : [ {
        "name" : "primaryIdentifier",
        "type" : "String",
        "class path" : "Protein > DB identifier",
        "class ontology link" : "http://semanticscience.org/resource/SIO_010043",
        "attribute ontology link" : "http://semanticscience.org/resource/SIO_000675"
      }, {
        "name" : "primaryAccession",
        "type" : "String",
        "class path" : "Protein > Primary Accession",
        "class ontology link" : "http://semanticscience.org/resource/SIO_010043",
        "attribute ontology link" : "http://edamontology.org/data_2907"
      }, {
        "name" : "name",
        "type" : "String",
        "class path" : "Protein > Organism . Name",
        "class ontology link" : "http://semanticscience.org/resource/SIO_010000",
        "attribute ontology link" : "http://edamontology.org/data_2909"
      }, {
        "name" : "firstAuthor",
        "type" : "String",
        "class path" : "Protein > Publications > First Author",
        "class ontology link" : "http://semanticscience.org/resource/SIO_000087",
        "attribute ontology link" : "http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C42781"
      }, {
        "name" : "title",
        "type" : "String",
        "class path" : "Protein > Publications > Title",
        "class ontology link" : "http://semanticscience.org/resource/SIO_000087",
        "attribute ontology link" : "http://semanticscience.org/resource/SIO_000185"
      }, {
        "name" : "year",
        "type" : "Integer",
        "class path" : "Protein > Publications > Year",
        "class ontology link" : "http://semanticscience.org/resource/SIO_000087",
        "attribute ontology link" : null
      }, {
        "name" : "journal",
        "type" : "String",
        "class path" : "Protein > Publications > Journal",
        "class ontology link" : "http://semanticscience.org/resource/SIO_000087",
        "attribute ontology link" : "http://semanticscience.org/resource/SIO_000160"
      }, {
        "name" : "volume",
        "type" : "String",
        "class path" : "Protein > Publications > Volume",
        "class ontology link" : "http://semanticscience.org/resource/SIO_000087",
        "attribute ontology link" : null
      }, {
        "name" : "pages",
        "type" : "String",
        "class path" : "Protein > Publications > Pages",
        "class ontology link" : "http://semanticscience.org/resource/SIO_000087",
        "attribute ontology link" : null
      }, {
        "name" : "pubMedId",
        "type" : "String",
        "class path" : "Protein > Publications > PubMed ID",
        "class ontology link" : "http://semanticscience.org/resource/SIO_000087",
        "attribute ontology link" : "http://edamontology.org/data_1187"
      } ],
      "primaryKey" : [ "primaryIdentifier", "secondaryIdentifier", "primaryAccession" ]
    }
  } ],
  "sources" : [ {
    "title" : "GenomeNet",
    "url" : "http://www.genome.jp/en/"
  } ]
}
```