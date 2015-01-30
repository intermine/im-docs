Reactome
================================


Types of data loaded
--------------------

proteins, genes, pathways

How to download the data 
---------------------------

http://www.reactome.org/download/current/UniProt2Reactome_All_Levels.txt

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="reactome" type="reactome">
      <property name="src.data.dir" location="/data/reactome" />
      <property name="reactome.organisms" value="9606 10090" />
    </source>

.. index:: Reactome
