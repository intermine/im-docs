Treefam
================================


Data 
-----

ftp://ftp.sanger.ac.uk/pub/treefam/release-7.0/MySQL

Download two tables:

* `genes.txt.table`
* `ortholog.txt.table`


Project XML
------------

.. code-block:: xml

    <source name="treefam" type="treefam">
      <property name="src.data.dir" location="/DATA/treefam"/>
      <property name="src.data.dir.includes" value="ortholog.txt.table"/>
      <property name="geneFile" value="/DATA/treefam/genes.txt.table"/>
      <property name="treefam.organisms" value="7227 6239 7165 4932"/> 
      <property name="treefam.homologues" value="9606 10090 10116 7955"/> 
    </source>

* '''treefam.organisms''' - all genes from the listed organisms will be processed
* '''treefam.homologues''' (optional) - genes will *only* be loaded into the database if they are a homologue of an organism of interest

.. index:: TreeFam
