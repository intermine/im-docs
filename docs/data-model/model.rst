Model Description
================================

A database stored using the InterMine system is object-oriented and it loads data defined by a model description.  This model description is defined in a file, <MINENAME>_model.xml.  This page describes the format of this file and its implications.

What the Model governs
-----------------------

The Model is a description of the class hierarchy that is expected to be stored in the database, so it includes a description of the classes and fields of the data that will be stored. The model will typically be used to generate Java code for those classes automatically. The auto-generated classes will be pure Java beans, with fields as described in the Model, with getters and setters. Each class can have any number of attributes (which store primitive data, like numbers, dates, and strings), references to other objects in the database, and collections of other objects in the database.

Since all objects in the database (except SimpleObjects) are instances of InterMineObject, which has a field called "id" which is unique, all objects in the database can be fetched individually by searching for that unique "id" value.

Naming conventions
-----------------------

The model expects standard Java names for classes and attributes.  That is:

classes
  start with an upper case letter and be CamelCase.  The name can't include underscores or spaces.

fields 
  (attributes, references, collections) should start with a lower case letter and be lowerCamelCase.  The name shouldn't include underscores or spaces.

It's possible to specify friendly names that will be displayed in place of the actual java-ised name in the web interface.

The Model File Format
-----------------------

The Model is defined in an XML file, with only a few different tags. The document root tag is "<model>", and contains a list of "<class>" tags, each of which describes a single class in the model. Class tags are not nested - the hierarchy is defined elsewhere, which allows multiple inheritance if necessary. All classes inherit all the fields of all its parent classes, so they should not be defined again.

The "<model>" Tag
-----------------------

 The "<model>" tag has two attributes, which are mandatory:

name
  this is the name of the model. It should match the name of the file (that is, a model called "testmodel" must be in a file called "testmodel_model.xml"). A model can be fetched by name in Java by calling Model.getInstanceByName(String name) as long as this file is in the classpath.

package
  this is a unique path that defines the model. 

The "<class>" Tag
-----------------------

name
  this is the name of the class. All the classes must be in the same Java package.

is-interface
  this must be "true" or "false". If this is true, then the class is generated as a Java interface, which will allow multiple inheritance from this class. Objects can be created which are instances of an interface, by using dynamic code generation using Java reflection, and there is surprisingly little performance cost. If this is false, then the class will be a normal Java class, and instances will be normal Java objects. However, a Java class can only have one non-interface parent class. The main FlyMine Model is entirely interface.  *In practice this field should always be set to true*

extends
  this is an optional space-separated list of other classes, specifying the parent classes of this class. Only one of these parents may be a non-interface. If this attribute is not present, then the parent of the class will be "InterMineObject", which is therefore indirectly the parent of all classes in the model (except SimpleObjects). 

Inside the "<class>" tags are tags describing the fields of the class. These are "<attribute>", "<reference>", and "<collection>", none of which enclose any other XML tags. You should not define two fields with the same name for a particular class, taking into account that classes inherit all the fields of their parent classes. The InterMineObject class (which everything except SimpleObjects inherit) has a field called "id".

The "<attribute>" Tag
-----------------------

This tag defines a field in the class for storing primitive data, like numbers, dates, and Strings. It has two attributes:

name
  this is the name of the field, as it will appear in the Java class, and in queries.

type
  this is the type of data that can be stored in the field, and must be one of the following:
  
  * boolean  or  java.lang.Boolean  - this stores a simple "true" or "false" value. The first type is a primitive value with only those two possible values, whereas the latter type is the Java Boolean Object, which can contain a third value of "null".
  *  short  or  java.lang.Short  - this stores a 16-bit signed integer value. Again, the latter type may also have a null value, as is the case with the rest of the numbers.
  *  int  or  java.lang.Integer  - this stores a 32-bit signed integer value.
  *  long  or  java.lang.Long  - this stores a 64-bit signed integer value.
  *  float  or  java.lang.Float  - this stores a 32-bit floating-point number.
  *  double  or  java.lang.Double  - this stores a 64-bit floating-point number.
  *  java.math.BigDecimal  - this stores an arbitrary-precision floating point number. There is no Java primitive equivalent, so this field type may contain a null value.
  *  java.util.Date  - this stores a date and time, with a resolution of one millisecond, or null.
  *  java.lang.String  - this stores a portion of text of arbitrary length, or null.

The "<reference>" and "<collection>" Tags
----------------------------------------------

The "<reference>" tag defines a field in the class for storing a reference to another object in the database. The "<collection>" tag defines a field in the class for storing a collection of references to other objects in the database. Both of these relationships may be unidirectional or bidirectional. If they are bidirectional, that means that there is an equivalent relationship in the referenced class that points in the reverse direction, and two relationships will agree on their contents. All referenced objects must be in the database for the references and collections to be valid. Both of these tags have several attributes:

name 
  this is the name of the field, as it will appear in the Java class, and in queries.

referenced-type
  this is the class name of the class of object that is referenced by the reference, or present in the collection.

reverse-reference
  this is an optional name of a reference or collection in the referenced-type that is the reverse of this relationship. Specifying this turns the relationship into a bidirectional relationship.

There are effectively two types of reference and two types of collection, depending on the type or presence of a reverse relationship:

One to one relationship 
  this is where a reference has a reverse-relationship that is also a reference. Use of these is discouraged, because they suffer from performance and consistency problems, and can possibly be better modelled by combining the two classes into one.

Many to one relationship
  this is where a reference has a reverse-relationship that is a collection, or where a reference does not have a reverse-relationship.

One to many relationship
  this is where a collection has a reverse-relationship that is a reference. This kind of relationship is a side-effect of a many to one relationship, and cannot be written to from this end. All alterations should be made on the many to one relationship instead.

Many to many relationship
  this is where a collection has a reverse-relationship that is a collection, or where a collection does not have a reverse-relationship. This type of collection can be altered from either side, and the changes will be observed from both sides.

A short example
-----------------------

.. code-block:: xml

  <?xml version="1.0"?>
  <model name="testing" package="org.intermine.model.bio">

    <class name="Protein>" is-interface="true">
      <attribute name="name" type="java.lang.String"/>
      <attribute name="extraData" type="java.lang.String"/> 
      <collection name="features"  referenced-type="NewFeature" reverse-reference="protein"/>  
    </class>

    <class name="NewFeature" is-interface="true">
      <attribute name="identifier" type="java.lang.String"/>  
      <attribute name="confidence" type="java.lang.Double"/>
      <reference name="protein" referenced-type="Protein" reverse-reference="features"/>
    </class>
  </model>

For a more complete example, see `FlyMine <http://www.flymine.org/flymine/service/model>`_ which covers all the features available in the model.

The Model defines the set of data that is  searchable  in the database. Other data can be written to the database, but only the classes and attributes that are defined in the model are searchable. So you may, if you wish, compile a Java class which inherits InterMineObject (to allow it to stored in the database) or some other class in the model, with extra fields, and store instances of that class in the database, but you will not be able to search for instances of that class, or for instances with a particular value for the field that is not in the model. 

Global Additons File
-----------------------

Previously the data model was merged from all data sources' additions XML file (plus the SO terms, core and genomic additons). This is no longer true. Since each source is in its own JAR now, the data model is self-contained. Therefore if you reference a class in your data parser, it must be present in the additions file. Alternatively, you can specify a single data model file that will be merged into each source:

.. code-block:: sh

    // [in bio/sources/build.gradle]
    // uncomment to specify an extra additions file for your bio-sources
    // this file will be merged with the additions file for each data source
    // and included in each source JAR.
    //bioSourceDBModelConfig {
    //    extraAdditionsFile = "MY-MINE_additions.xml"
    //}


.. index:: model, data model, additions file, global additions file