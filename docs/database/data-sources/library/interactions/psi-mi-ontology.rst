PSI-MI Ontology
================================

Include this source when loading `psi` data to fill in details of ontology terms used. Should be loaded if you are loading interaction data.

Types of data loaded
--------------------

ontology terms

How to download the data 
---------------------------

http://psidev.sourceforge.net/mi/psi-mi.obo psi-mi.obo 

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="psi-mi-ontology" type="psi-mi-ontology">
      <property name="src.data.file" location="/data/psi/psi-mi.obo"/>
    </source>
