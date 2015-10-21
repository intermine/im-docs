GO Annotation
================================

Loads gene association files that link GO terms to genes or proteins.

Types of data loaded
--------------------

genes, proteins, GO terms, publications, GO evidence

How to download the data 
---------------------------

The data is available from http://www.geneontology.org

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="go-annotation" type="go-annotation">
      <property name="src.data.dir" location="/data/go-annotation"/>
       <property name="ontologyPrefix" value="GO"/>
    </source>

.. index:: GO, gene ontology, OBO
