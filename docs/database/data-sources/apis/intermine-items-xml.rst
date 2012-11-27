InterMine Items XML Format
====================================

The InterMine system has a file format for storing objects, which can be used to transfer data from one place to another. This document describes the file format.

The Data File Format 
------------------------------

The data is described in an XML file, with very few defined tags, and very little hierarchy. The document root tag is "<items>", which contains no attributes. The entire of the rest of the document is a list of "<item>" tags, each describing a single object to be stored in the file. The "<item>" tag has two attributes:

* `id` - this is a String, which must be unique to each individual item.
* `class` - this is the class name of the object.

The "<item>" tag has sub-elements corresponding to the values of the object's fields. These are "<attribute>", "<reference>", and "<collection>".

The "<attribute>" tag
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This tag describes a value of an attribute in the object. The tag has two attributes:

* `name` - this is the name of the attribute in the object.
* `value` - this is the value of the attribute in the object.

The "<reference>" tag
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This tag describes a value of a reference in the object. The tag has two attributes:

* `name` - this is the name of the reference in the object.
* `ref_id` - this contains the ID of the object that is referenced by this reference. The ID is the value that is set in the "<item>" tag's "id" attribute for the object being referenced.

The "<collection>" tag
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This tag describes a value of a collection in the object, which contains references to multiple objects. The tag has only one attribute:

* `name` - this is the name of the collection in the object.

The "<collection>" tag has sub-elements which are "<reference>" tags. These tags are identical to the "<reference>" tags defined above, except they do not have a "name" attribute - that is already defined by the "<collection>" tag.

A short example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: xml

	<?xml version="1.0"?>
	<items>
  		<item id="1" class="Person">
    		<attribute name="name" value="Fred"/>
    		<reference name="address" ref_id="2"/>
  		</item>
  		<item id="2" class="Address">
    		<attribute name="address" value="Somewhere"/>
  		</item>
	</items>

A fuller example file is our RedFly testing objects file at `bio/sources/flymine/redfly/test/resources/RedFlyGFF3RecordHandlerTest.xml`.

Generating InterMine XML
--------------------------------

With have a set of Perl modules to assist in the creation of InterMine XML.

.. index:: XML, intermine items XML, items XML, Perl Items API