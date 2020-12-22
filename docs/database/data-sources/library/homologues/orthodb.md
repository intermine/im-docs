OrthoDB
=======

Data

<ftp://cegg.unige.ch/OrthoDB6/OrthoDB6_ALL_FUNGI_tabtext.gz>,
<ftp://cegg.unige.ch/OrthoDB6/OrthoDB6_ALL_METAZOA_tabtext.gz>

Unzip the files and put them in the same directory.

Project XML

``` {.xml}
<source name="orthodb" type="orthodb">
  <property name="src.data.dir" location="/DATA/orthodb"/>
  <property name="orthodb.organisms" value="7227 9606 10090 10116 7955 6239 4932"/>
</source>
```

::: {.index}
OrthoDB
:::
