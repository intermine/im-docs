InterPro
================================

Loads the name and description for protein domains. The protein to domain relationship is loaded via the UniProt converter.

Types of data loaded
--------------------

protein domains

How to download the data 
---------------------------

http://www.ebi.ac.uk/interpro/interpro.xml.gz

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="interpro" type="interpro">
      <property name="src.data.dir" location="/data/interpro"/>
    </source>


.. index:: InterPro, protein domains