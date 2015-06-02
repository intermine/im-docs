GO OBO
================================

Load the Gene Ontology term ids, names and definitions, and the relationships between terms.  Should be loaded if the go-annotation source is used.

Types of data loaded
--------------------

GO terms

How to download the data 
---------------------------

From http://www.geneontology.org

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="go" type="go">
      <property name="src.data.file" location="/data/go-annotation/gene_ontology.obo"/>
    </source>

Optional parameter: <property name="ontologyPrefix" value="FBbt"/>

This parameter causes the data parser to only load ontology terms with that prefix. Some OBO files have cross references that include ontology terms from other ontologies. Unfortunately the file doesn't include which terms correspond to which ontologies so we have to set the prefix.

.. index:: GO, gene ontology, OBO
