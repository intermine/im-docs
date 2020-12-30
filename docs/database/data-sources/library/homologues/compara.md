# Ensembl Compara

## Download data from BioMart

1. [http://www.ensembl.org/biomart/martview/](http://www.ensembl.org/biomart/martview/)
2. select database for primary organism, eg. \[Ensembl

   Genes\]{.title-ref}

3. select dataset for primary organism, eg. \[Drosophila melanogaster

   features \(BDGP5.25\)\]{.title-ref}

4. select FILTERS

> 1. click on \"FILTERS\" on the left panel in BioMart \(this will
>
>    populate the main panel with filter options\)
>
> 2. select \[MULTI SPECIES COMPARISONS\]{.title-ref}
> 3. check the checkbox next to \[Homolog filters\]{.title-ref}
> 4. select the organism of interest in the dropdown
>
> > 1. eg. \[Orthologous Caenorhabditis elegans Genes\]{.title-ref}
> > 2. make sure that next to the dropdown, \[Only\]{.title-ref} is
> >
> >    checked

1. select ATTRIBUTES

> 1. check the \[Homologs\]{.title-ref} radio button at the top of the
>
>    center panel
>
> 2. uncheck the \[Ensembl Transcript ID\]{.title-ref} option, \[Ensembl
>
>    Gene ID\]{.title-ref} is now the only output
>
> 3. click on \[ORTHOLOGS \(Max select 6 orthologs\):\]{.title-ref} to open
>
>    that section of the form
>
> 4. select on the Gene ID for the organism of interest, eg. Drosophila
>
>    Ensembl Gene ID

1. Run query

> 1. select the \[\[Results\]\]{.title-ref} button at the top of the page
> 2. create \[TSV\]{.title-ref} file, check box next to \[Unique results
>
>    only\]{.title-ref}
>
> 3. when prompted, save file as \[TAXONID1\_TAXONID2\]{.title-ref}

## Add entry to project XML file

```text
<source name="ensembl-compara" type="ensembl-compara">
  <property name="src.data.dir" location="/DATA/ensembl/compara"/>
  <property name="ensemblcompara.organisms" value="7227"/>
  <property name="ensemblcompara.homologues" value="6239"/>
</source>
```

## Run build

### Data file

Tab-delimited files should be named \\_\, eg. 9606\_10090 for a file with human genes and mouse orthologues.

Gene ID Homologue ID

ENSG00000253023 ENSMUSG00000088328 ENSG00000238364 ENSMUSG00000088728

### Download script

When you have created your query, you can export the Perl script or XML so you can run the query automatically next time, eg:

```text
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE Query>
<Query  virtualSchemaName = "default" formatter = "TSV" header = "0" uniqueRows = "0" count = "" datasetConfigVersion = "0.6" >

  <Dataset name = "hsapiens_gene_ensembl" interface = "default" >
    <Filter name = "with_dmelanogaster_homolog" excluded = "0"/>
    <Attribute name = "ensembl_gene_id" />
    <Attribute name = "drosophila_ensembl_gene" />
  </Dataset>
</Query>
```

::: {.index} Ensembl Compara :::

