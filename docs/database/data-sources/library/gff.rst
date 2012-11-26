GFF3
================================

This isn't a source itself but genome annotation from gff files can be loaded easily by creating a new source of type gff.  See redfly, malaria-gff and tiffin for examples.

Configuration is added to the `project.properties` file and an optional handler can be added to deal with data in the attributes section of the gff file.


Types of data loaded
--------------------

sequence features

How to download the data 
---------------------------

N/A - will parse any file in GFF3 format

How to load the data into your mine
--------------------------------------

.. code-block:: xml

    <source name="long-oligo" type="long-oligo">
      <property name="gff3.taxonId" value="7227"/>
      <property name="gff3.seqClsName" value="MRNA"/>
      <property name="src.data.dir" location="/DATA/flymine/long-oligo"/>
    </source>
