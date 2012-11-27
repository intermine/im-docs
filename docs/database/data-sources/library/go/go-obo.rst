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
