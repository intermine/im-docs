# Organisms

All other sources refer to organisms only by their NCBI taxonomy id. This source should be included at the end of the build. It will select the taxonIds loaded into the Organism class, fetch details via the Entrez web service and fill in the organism names in the database.

## Types of data loaded

update organism entries

## How to download the data

N/A - source uses NCBI's web services

## How to load the data into your mine

project XML example

```markup
<source name="entrez-organism" type="entrez-organism">
  <property name="src.data.file" location="build/organisms.xml"/>
</source>
```

