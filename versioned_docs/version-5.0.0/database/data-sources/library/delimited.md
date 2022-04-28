---
title: TSV, CSV files
---

Generic data loader for TSV or CSV files.
It can load more than one class (in the example below Gene, Organism and Protein) and create one to many, many to many relations between the entities loaded.
Available from 5.0.7 release.

## Types of data loaded

TSV (Tab-Separated Values) or CSV (Comma-Separated Values) files

## How to load the data into your mine

N/A - will parse any file in TSV/CSV format

### Add delimited to the list of datasources to be integrated

Project XML example

```markup
<source name="my-data-source" type="delimited">
  <property name="delimited.dataSourceName" value="TSV Source Name"/>
  <property name="delimited.dataSetTitle" value="TSV Data Set"/>
  <property name="delimited.licence" value="http//usemydatalicence.com"/>
  <property name="delimited.hasHeader" value="true"/>
  <property name="delimited.columns" value="Gene.primaryIdentifier, Organism.taxonId, null,Protein.primaryIdentifier,Protein.primaryAccession"/>
  <property name="delimited.includes" value="test.tsv"/>
  <property name="src.data.dir" location="{directory containing delimited files}"/>
</source>
```

| attribute | content | purpose | mandatory
| :--- | :--- | :--- | :--- |
| delimited.dataSourceName | name of dataset | determines name of dataset object | yes |
| delimited.dataSetTitle | name of datasource | determines name of datasource object | yes |
| delimited.columns | name of fields | determines the fields to load, use null to skip a value | yes |
| src.data.dir | location of the TSV/CSV data file | these data will be loaded into the database | yes |
| includes | name of data file | this data file will be loaded into the database | no |
| delimited.separator | Default value is: tab. Possible values: tab/TAB/comma/COMMA | type of separator file to be loaded | no |
| delimited.hasHeader | Default value is: true. Possible values: true/false | detemines if the file has a header | no |
| licence | URL pointing to standard data licence for data | updates DataSet.licence with value | no |

