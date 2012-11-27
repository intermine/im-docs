GO Annotation
================================

Loads gene association files that link GO terms to genes or proteins.

Types of data loaded
--------------------

genes, proteins, GO terms, publications, GO evidence

How to download the data 
---------------------------

The data is available from http://www.geneontology.org

Currently we require that the gene_association file is sorted by the 'product' (gene/protein/etc) identifier in column 2.  This is to save memory while loading.  If your file isn't already sorted by column 2 you can use this command 

.. code-block:: bash

	$ sort -k 2,2 input_file > output_file

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="go-annotation" type="go-annotation">
      <property name="ontologyfile" location="/data/go-annotation/gene_ontology.obo"/>
      <property name="src.data.dir" location="/data/go-annotation"/>
    </source>

.. index:: GO, gene ontology, OBO
