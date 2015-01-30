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

This source contains a task to copy the Pathways from the proteins to the related genes. To include this, add this to the `post-processing` section of your project XML file:

.. code-block:: xml

  <post-processing>
    <post-process name="do-sources" />
    ...
  </post-processing>

See :doc:`/database/database-building/post-processing/index` for more information on post-processing.

.. index:: Reactome, pathways, biopax, genes, proteins, UniProt
