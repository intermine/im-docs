Sequence Ontology (SO)
================================

This source loads no data but adds a class in the data model for every term in the sequence ontology in your data model.  SO terms represent biological features such as gene, exon, 3' UTR.  You should include this source if you are loading genome annotation.

Types of data loaded
--------------------

Sequence Ontology terms

How to download the data 
---------------------------

Included in InterMine source code

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="so" type="so">
      <property name=”src.data.file” location=”so.obo” />
      <property name="licence" value="https://creativecommons.org/licenses/by/4.0/"/>
    </source>

To add or remove SO terms from your model, update your `so_terms` file in `dbmodel/resources`

.. index:: SO, sequence ontology


