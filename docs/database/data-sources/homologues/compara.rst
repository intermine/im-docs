Ensembl Compara
================================

Download data from BioMart
----------------------------

#. [http://www.biomart.org/biomart/martview]
#. select database for primary organism, eg. `Ensembl Genes`
#. select dataset for primary organism, eg. `Drosophila melanogaster features (BDGP5.25)`
#. select FILTERS

  #. click on "FILTERS" on the left panel in BioMart (this will populate the main panel with filter options)
  #. select `MULTI SPECIES COMPARISONS`
  #. check the checkbox next to `Homolog filters`
  #. select the organism of interest in the dropdown

    #. eg. `Orthologous Caenorhabditis elegans Genes`
    #. make sure that next to the dropdown, `Only` is checked

#. select ATTRIBUTES

  #. check the `Homologs` radio button at the top of the center panel
  #. uncheck the `Ensembl Transcript ID` option, `Ensembl Gene ID` is now the only output
  #. click on `ORTHOLOGS (Max select 3 orthologs):` to open that section of the form
  #. select on the Gene ID for the organism of interest, eg. Drosophila Ensembl Gene ID 

#. Run query

  #. select the `[Results]` button at the top of the page
  #. create `TSV` file, check box next to `Unique results only`
  #. when prompted, save file as `TAXONID1_TAXONID2`

Add entry to project XML file
------------

.. code-block:: xml

    <source name="ensembl-compara" type="ensembl-compara">
      <property name="src.data.dir" location="/DATA/ensembl/compara"/>
      <property name="ensemblcompara.organisms" value="7227"/>
      <property name="ensemblcompara.homologues" value="6239"/>
    </source>

Run build
------------

Data file 
~~~~~~~~~~~~~~

Tab-delimited files should be named <TAXON ID>_<TAXON ID>, eg. 9606_10090 for a file with human genes and mouse orthologues.

===============  ==================
Gene ID          Homologue ID
===============  ==================
ENSG00000253023  ENSMUSG00000088328
ENSG00000238364  ENSMUSG00000088728
===============  ==================

Download script
~~~~~~~~~~~~~~~~~

When you have created your query, you can export the Perl script or XML so you can run the query automatically next time, eg:

.. code-block:: xml

  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE Query>
  <Query  virtualSchemaName = "default" formatter = "TSV" header = "0" uniqueRows = "0" count = "" datasetConfigVersion = "0.6" >
        
    <Dataset name = "hsapiens_gene_ensembl" interface = "default" >
      <Filter name = "with_dmelanogaster_homolog" excluded = "0"/>
      <Attribute name = "ensembl_gene_id" />
      <Attribute name = "drosophila_ensembl_gene" />
    </Dataset>
  </Query>
