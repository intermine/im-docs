# IntAct - complexes

Loads complex interaction data from IntAct

## Types of data loaded

genes, interactions, complexes, publications

## How to download the data

[ftp://ftp.ebi.ac.uk/pub/databases/intact/complex/current/psi25/](ftp://ftp.ebi.ac.uk/pub/databases/intact/complex/current/psi25/)

## How to load the data into your mine

### project XML example

```markup
<source name="psi-complexes" type="psi-complexes">
  <property name="src.data.dir" location="/DATA/psi/intact/complexes/current"/>
  <property name="complexes.source" value="sgd"/>
</source>
```

There is also a corresponding displayer for these data.

