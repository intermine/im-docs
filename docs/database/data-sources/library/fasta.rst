FASTA
================================


Types of data loaded
--------------------

features and their sequences. Will create a feature for each entry in a fasta file and set the sequence, the class of the feature to create is set for the whole file.

How to download the data 
---------------------------

N/A - will parse any file in FASTA format

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="flybase-dmel-gene-fasta" type="fasta">
      <property name="fasta.taxonId" value="7227"/>
      <property name="fasta.dataSetTitle" value="FlyBase fasta data set for Drosophila melanogaster"/>
      <property name="fasta.dataSourceName" value="FlyBase"/>
      <property name="fasta.className" value="org.intermine.model.bio.Gene"/>
      <property name="fasta.classAttribute" value="primaryIdentifier"/>
      <property name="fasta.includes" value="dmel-all-gene-*.fasta"/>
      <property name="src.data.dir" location="/DATA/flybase/fasta/current"/>
    </source>


