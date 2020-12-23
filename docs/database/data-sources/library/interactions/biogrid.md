BioGRID
=======

Loads interactions data from BioGRID

Types of data loaded
--------------------

genes, proteins, interactions

How to download the data
------------------------

From the download section of the BioGRID website:
<http://thebiogrid.org>

Download the file named:
[BIOGRID-ORGANISM-\[version\].psi25.zip]{.title-ref}.

How to load the data into your mine
-----------------------------------

### project XML example

``` {.xml}
<source name="biogrid" type="biogrid">
  <property name="src.data.dir" location="/DATA/biogrid"/>
  <property name="src.data.dir.includes" value="*psi25.xml"/>
  <property name="biogrid.organisms" value="7227 6239 4932"/>
</source>
```

### biogrid_config.properties

Determines which gene identifiers are set. organisms - If none are
configured, all interactions are stored.

This is what the gene looks like in biogrid

``` {.xml}
<names>
    <shortLabel>CG1111</shortLabel>
</names>
<xref>
   <primaryRef db="FLYBASE" id="FBgn001" />
```

[shortLabel]{.title-ref}

To set your gene.identifier to be the shortLabel in the biogrid XML, use
this config:

``` {.properties}
<TAXON_ID>.<GENE_IDENTIFIER_FIELD>=shortLabel
```

[xref]{.title-ref}

To set your gene.identifier field to be a value from an xref entry, use
this syntax:

``` {.properties}
<TAXON_ID>.xref.<GENE_IDENTIFIER_FIELD> = <XREF_DB_VALUE>
```

::: {.note}
::: {.title}
Note
:::

xref \"db\" value is not case sensitive, case seems to vary from file to
file.
:::

::: {.index}
BioGRID
:::
