---
---

Export
======

Default exporters in bio project

-   tab/csv - tab or comma separated
-   GFF3
-   FASTA
-   BED
-   Galaxy - export data in tab or BED format to Galaxy server

Appears on these pages:

-   Query results page
-   List analysis page
-   Genomic Region Search results page

Create a custom exporter
------------------------

You can add additional export options to your InterMine by creating a
custom exporter.

1.  Write Java classes to handle the data

    > see [BEDHttpExporter.java]{.title-ref} and
    > [BEDExporter.java]{.title-ref}

2.  Add the class to your webconfig-model.xml file:

``` {.xml}
<tableExportConfig id="bed" className="org.intermine.bio.web.export.BEDHttpExporter"/>
```

3.  update Struts config

``` {.xml}
# struts-config-model.xml
<action path="/bedExportAction" name="bedExportForm" type="org.intermine.web.struts.TableExportAction" parameter="method"/>

# tiles-defs-model.xml
<definition name="bedExportOptions.tile" path="/model/bedExportOptions.jsp" controllerUrl="/initSequenceFeatureExportOptions.do" />

# struts-config-model-form.xml
<form-bean name="bedExportForm" type="org.intermine.bio.web.struts.BEDExportForm"/>
```

Customisation
-------------

By default, SequenceFeature and Protein can be exported as FASTA format

``` {.properties}
fasta.export.classes = SequenceFeature,Protein
```

Exporter description

``` {.properties}
exporter.galaxy.description = Export to Galaxy
exporter.sequence.description=Export in FASTA format
exporter.gff3.description=Export in GFF3 format
exporter.bed.description=Export in BED format
```

::: {.index}
export
:::
