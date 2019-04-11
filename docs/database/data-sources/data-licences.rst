Data Licences
==============

You are using InterMine to integrate several data sets into a single database, for ease of querying for your end users. It's important that you make it very clear to your users how the data in your mine is licenced and how it can be re-used.

DataSet.licence
----------------

In InterMine 4.0, we've added `licence` to the "data set" model as a text field. This column is meant to be a **URL** to point to the standard data licence, e.g. https://creativecommons.org/licenses/by/4.0/

.. code-block:: xml

    <!-- InterMine 4.0.0 -->
    <class name="DataSet" is-interface="true" term="http://semanticscience.org/resource/SIO_000089">
        <attribute name="description" type="java.lang.String" term="http://semanticscience.org/resource/SIO_000136"/>
        <!-- licence is a new text field -->
        <attribute name="licence" type="java.lang.String" term="http://purl.org/dc/terms/license"/>
        <attribute name="url" type="java.lang.String" term="http://edamontology.org/data_1052"/>
        <attribute name="name" type="java.lang.String" term="http://edamontology.org/data_2099"/>
        <attribute name="version" type="java.lang.String" term="http://semanticscience.org/resource/SIO_000653"/>
        <reference name="dataSource" referenced-type="DataSource" reverse-reference="dataSets"/>
        <reference name="publication" referenced-type="Publication"/>
        <collection name="bioEntities" referenced-type="BioEntity" reverse-reference="dataSets"/>
    </class>


How is this information being used?
------------------------------------

These data can be displayed prominently on the report page and in query results. We'll also use the licences in the RDF generation.

Why does it have to be a URL to a standard data licence?
------------------------------------------------------------------------

The contents of `DataSet.licence` should a URL that points to a standard data licence.

Why can't I put a URL to the fair use policy?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you put a URL to the data source's fair use policy for example, the URL might change. Also, sometimes the fair use policy is vague, contradictory or just hard to understand. 

Why can't I put a short snippet about the fair use policy for these data?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you summarise the fair use policy, there is a danger that you get it wrong, or the data policy changes.

**Providing no information about the data licence is better than having bad information about the data licence.**

How to add licence to an InterMine?
------------------------------------

If you want to add a licence to your datasets in your mine, you can do so by updating the associated data source that loads that data set.

Core data sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

InterMine core data parsers either parse a standard file type, e.g. FASTA, GFF or a specific file type from a specific data source, e.g. OMIM, UniProt

**Standard file types**

To update the data licence, add the licence information to the project XML file. An example:

.. code-block:: xml

    <!-- gff example -->
    <source name="my-gff" type="my-gff" version="4.0.0">
      <!-- add licence here -->
      <property name="gff3.licence" value="https://creativecommons.org/licenses/by-sa/3.0/" />
      ...
    </source>

FASTA

.. code-block:: xml

    <!-- FASTA example -->
    <source name="my-fasta" type="fasta">      
      <!-- add licence here -->
      <property name="fasta.licence" value="https://creativecommons.org/licenses/by/4.0/"/>
      ...
    </source>

OBO

.. code-block:: xml

    <!-- OBO example -->
    <source name="so" type="so">
      <property name="src.data.file" location="so.obo"/>
      <!-- add licence here -->
      <property name="licence" value="https://creativecommons.org/licenses/by/4.0/"/>
    </source>


**All others**

We've updated all InterMine core data sources with the correct data licence. This requires no action from you. Use the library as normal, and the data parser will populate the `DataSet.licence` field.

However, not every core data source has a data licence. About 1/3 of the data sets InterMine has libraries for have data licences. The rest only have text about fair use. We hope that as data licences become more popular and visible, this number will rise.

Your data sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

DataSet now has a licence field, so you will want to update this field in your data parser.

Here is an example using the Java API:

.. code-block:: java

    // set the licence using the Java API in your data parsers
    private static final String LICENCE = "https://creativecommons.org/licenses/by/4.0/";
    Item dataSet = createItem("DataSet");
    dataSet.setAttribute("licence", licence);

If you are using the `BioFileConverter`, you can use the constructor like so:

.. code-block:: java

    // add data licence  
    super(writer, model, DATA_SOURCE_NAME, DATASET_TITLE, "http://www.gnu.org/licenses/gpl.txt");

This will update the data set licence field for you.

None of my data sources have data licences
------------------------------------------------------

We discovered that only a minority of data sets have a licence: of the 26 core data set types that  InterMine supports, only 9 have a data set licence, although 14 had some text about fair use.

Please see our `blog posts <https://intermineorg.wordpress.com/2019/01/03/being-fair-data-licences-in-intermine/>`_ for more details.

.. index:: data licences, licence
