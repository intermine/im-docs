QueryBuilder
==============

Select a Data Type to Begin a Query
--------------------------------------

types in bold
	Tag types with `im:preferredBagType` tag.  Use the model browser to tag classes, eg. http://www.flymine.org/query/tree.do

intro text
	Most text in InterMine can be set in model.properties, see :doc:`/webapp/properties/model-properties`.

help text
	Set in `classDecriptions.properties` file

query builder
-------------------

SUMMARY
	Which columns appear when you click on SUMMARY button are set in WebConfigModel.

autocomplete
	Add fields to the :doc:`/database/database-building/post-processing/objectstore-summary-properties` file to have their form fields autocomplete.

Hiding fields
-------------

In your ``webconfig-model.xml``, set a property ``showInQB`` for a ``<fieldconfig />`` to ``true`` to hide a field from a Class.

An example of hiding an attribute field:

.. code-block:: xml

      <class className="org.intermine.model.testmodel.Manager">
          <fields>
              <fieldconfig fieldExpr="age" showInQB="false"/>
          </fields>
      </class>

An example of hiding a Reference or a Collection field:

.. code-block:: xml

      <class className="org.intermine.model.testmodel.Manager">
          <fields>
              <fieldconfig fieldExpr="address" showInQB="false"/>
          </fields>
      </class>

.. index:: querybuilder, summary, autocomplete, hide
