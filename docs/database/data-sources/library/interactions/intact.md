IntAct
======

Loads binary interactions data from IntAct

Types of data loaded
--------------------

genes, interactions

How to download the data
------------------------

<ftp://ftp.ebi.ac.uk/pub/databases/IntAct/current/psi25/species/>

How to load the data into your mine
-----------------------------------

### project XML example

``` {.xml}
<source name="psi-intact" type="psi" dump="true">
  <property name="src.data.dir" location="/data/intact"/>
  <property name="intact.organisms" value="7227"/>
</source>
```

### psi-intact_config.properties

Determines which gene identifiers are set. organisms - If none are
configured, all interactions are stored.

::: {.index}
IntAct
:::
