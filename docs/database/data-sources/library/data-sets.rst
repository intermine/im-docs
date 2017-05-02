Data Sets
================================

Load an XML file with details of your data sets and associated information, e.g. description and URL

Types of data loaded
--------------------

Update data source and data set entries

How to download the data 
---------------------------

Create your own datasets.xml file with your data in InterMine items XML format and put in $MINE/integrate/datasets.xml. Use FlyMine's datasets.xml as an example: https://github.com/intermine/intermine/blob/dev/flymine/integrate/datasets.xml

How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="flymine-static" type="intermine-items-xml-file">
      <property name="src.data.file" location="datasets.xml"/>
    </source>

.. index:: data sources, data sets, provenance
