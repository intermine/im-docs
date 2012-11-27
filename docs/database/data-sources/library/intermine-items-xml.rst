InterMine items XML
================================

Use this source to load :doc:`/database/data-sources/apis/intermine-items-xml` conforming to the data model directly into the production database.


intermine-items-xml-file
	Use this source to load :doc:`/database/data-sources/apis/intermine-items-xml` conforming to the data model directly into the production database.

intermine-items-large-xml-file
	Use this source to load :doc:`/database/data-sources/apis/intermine-items-xml` conforming to the data model into the production database, this uses an intermediate database to allow it to cope with very large files that would otherwise cause memory problems.


Types of data loaded
--------------------

Any

How to load the data into your mine
--------------------------------------

Use the :doc:`/database/data-sources/apis/perl-items-api` to generate an :doc:`/database/data-sources/apis/intermine-items-xml` file. Add an entry to your project XML file pointing to this new data file.

project XML example

.. code-block:: xml

    <source name="arbeitman-items-xml" type="arbeitman-items-xml">
      <property name="src.data.file" location="/data/arbeitman/arbeitman-tgt-items.xml"/>
    </source>
