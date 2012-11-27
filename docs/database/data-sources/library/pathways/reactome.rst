Reactome
================================


Types of data loaded
--------------------

genes, pathways

How to download the data 
---------------------------

http://reactome.org/download/current/biopax.zip

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="reactome" type="biopax">
      <property name="src.data.dir" location="/data/reactome"/>
      <property name="biopax.organisms" value="7227"/>
      <property name="biopax.datasourcename" value="Reactome"/>
      <property name="biopax.datasetname" value="Reactome data set"/>
      <property name="biopax.curated" value="false"/>
    </source>
