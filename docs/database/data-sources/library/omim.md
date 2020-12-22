OMIM
================================

Types of data loaded
--------------------

genes, diseases

How to download the data 
---------------------------

Contact OMIM for your API key. Use our `script <https://github.com/intermine/intermine-scripts/blob/master/bio/humanmine/get_omim_pubmed.py>`_ to download the data. 


How to load the data into your mine
--------------------------------------

project XML example

.. code-block:: xml

    <source name="omim" type="omim">
      <property name="src.data.dir" location="/data/omim"/>
    </source>

.. index:: OMIM, disease data
