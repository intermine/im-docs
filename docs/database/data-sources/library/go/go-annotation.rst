GO Annotation
================================

Loads gene association files that link GO terms to genes or proteins.

Types of data loaded
--------------------

genes, proteins, GO terms, publications, GO evidence

How to download the data 
---------------------------

The data is available from http://www.geneontology.org


Configuration file (optional)
-------------------------------

There is an optional configuration file that let's you determine which type of object you create, and which identifier field you set. If your annotation file annotates genes and uses the primary identfier, these are the default values and you do not need to update the configuration file.


=============== ================================== ==========================================================
parameter       definition                         possible values
=============== ================================== ==========================================================
typeAnnotated   class of what is being annotated   gene (default) or protein
identifier      which field to set                 primaryIdentifier (default), symbol, or primaryAccession
readcolumn*     which column to use for identifier identifier (default) or symbol
=============== ================================== ==========================================================

* See http://www.geneontology.org/GO.format.gaf-2_0.shtml for column descriptioins

.. code-block:: properties

    # an example entry
    7165.typeAnnotated=protein
    7165.identifier=primaryAccession


How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="go-annotation" type="go-annotation">
      <property name="src.data.dir" location="/data/go-annotation"/>
       <property name="ontologyPrefix" value="GO"/>
    </source>

.. index:: GO, gene ontology, OBO
