Configuring and Using Class and Field Labels
================================

The InterMine webapp, and to a limited extent web services, supports the use of labels for classes and fields. Unlabelled classes and fields are formatted for enhanced legibility.

The current system for determining a label is as follows:

#. If the class or field has a pre-set label, that is used
#. Otherwise the class or field name is
  #. Split from its camel case parts as specified in `Apache Commons StringUtils <http://commons.apache.org/lang/api-2.6/org/apache/commons/lang/StringUtils.html#splitByCharacterTypeCamelCase(java.lang.String)>`_ 
  #. Each part is given an initial upper-case
  #. The parts are then joined by spaces
 
Handling paths is similar, except that the dots (".") between class and field names are replaced by right angle-brackets (">").

Examples

====================== ==========================
      Before                  After             
====================== ==========================
 ChromosomeLocation       Chromosome Location   
 shortName                Short Name            
 Organism                 Organism              
 name                     Name                  
 Organism.shortName       Organism > Short Name 
====================== ==========================

Well named fields and classes thus do not need explicit labelling.

Labels can be configured however in two ways, in order of precedence:
#. Classes and fields can be configured individually. This configuration respects inheritance, and subclasses automatically inherit the field labels of their parents.
#. Translation tables can be set up for classes and fields. These are for cases where `ALL` classes/fields with a certain name should be relabelled. Examples are `url` -> `URL`, which would otherwise be rendered as ''Url''. This is especially useful for acroynms. 

Configuring classes and fields individually
-----------------------------------------------

To apply individual configuration, the file `webconfig-model.xml` needs to be edited, and a `label` attribute added to items you want to configure. eg:

.. code-block:: xml

  <class className="org.intermine.model.bio.Allele" label="SOME CLASS LABEL">
      <fields>
        <fieldconfig fieldExpr="primaryIdentifier" label="SOME FIELD LABEL"/>
        <fieldconfig fieldExpr="symbol"/>
        <fieldconfig fieldExpr="alleleClass"/>
        <fieldconfig fieldExpr="organism.name" label="Organism"/>
      </fields>
  </class>


This is most helpful in the case of compound field-expressions ("organism.name"), which can this be configured to display as just a single expression.

Configuring classes and fields globally
-----------------------------------------------

For this, the mine needs to be made aware of properties files that hold the appropriate translations. Biological mines automatically get three of these files:

`bio/webapp/resources/webapp/WEB-INF/soClassName.properties`
  used to generate readable names using the SO term a class represents

`bio/webapp/resources/webapp/WEB-INF/bioClassNames.properties`
  used to map non-SO classes to readable names

`bio/webapp/resources/webapp/WEB-INF/bioFieldNames.properties`
  uses to map field names to readable names

Additional files can be specified. Add the the following properties to your web.properties:

.. code-block:: properties

  web.config.classname.mappings.{SOME_ID}={RESOURCE_NAME}
  web.config.fieldname.mappings.{SOME_ID}={RESOURCE_NAME}

All resources should be names relative to the WEB-INF directory where they will end up.

You can have as many additional files as you wish, but:

* They should all have a different id. If they do not, all but one will be silently ignored.
* They should not have configuration for the same class/field. If they do, and exception will be thrown on initialisation, and your webapp will not start.

Using these labels in your webapp
-----------------------------------------------

A new tag library is available to help with labelling. Add the following to the top
of any jsp you write that you want to use labels in:

.. code-block:: html

  <%@ taglib uri="/WEB-INF/functions.tld" prefix="imf" %>


This library provides five functions, which expose static methods from the org.intermine.web.logic.WebUtil class: 

`formatPath(Path p, WebConfig wcf)`
     This function produces a fully configured string from an arbitrarily long path. eg: 
      `<c:out value="${imf:formatColumnName(path, WEBCONFIG)}"/>`

`formatPathStr(String s, InterMineAPI api, Webconfig wcf)`
     This function produces a fully configured string from an arbitrarily long path, where that path is represented as a string. eg:
      `<c:out value="${imf:formatColumnName(pathString, INTERMINE_API, WEBCONFIG)}"/>`

`formatField(Path p, Webconfig wcf)`
     This function produces a fully configured field name from the last field of an arbitrarily long path. eg:
      `<c:out value="${imf:formatField(path, WEBCONFIG)}"/>`

`formatFieldStr(String s, InterMineAPI api, Webconfig wcf)`
     This function produces a fully configured field name from the last field of an arbitrarily long path, where that path is represented by a string. eg: 
      `<c:out value="${imf:formatFieldStr(pathString, INTERMINE_API, WEBCONFIG)}"/>`

`formatFieldChain(String s, InterMineAPI api, Webconfig wcf)`
     This function produces a string of fully configured field names from all the fields in an arbitrarily long path, where that path is represented by a string (ie. without the root class). eg: 
      `<c:out value="${imf:formatFieldStr(pathString, INTERMINE_API, WEBCONFIG)}"/>`

The values `INTERMINE_API` and `WEBCONFIG` are automatically available within jsps at all times.

While it is possible to call the formatting methods of WebUtil directly from Java controllers, it is not advisable, from design principles, to do so. Labels are an aspect of presentation (the view) and thus not the responsibility of Java classes (the controllers). The only justifiable place to call presentation methods from is in action classes that directly return data to the user, eg. in webservices and ajax calls.

Using Labels in JavaScript
-----------------------------------------------

Pages in the InterMine webapp have a variable in the global scope named `$MODEL_TRANSLATION_TABLE`. This contains information on how all classes and their fields should be displayed.

To access its information, for classes:

.. code-block:: javascript

  var className = ??;
  var displayName = $MODEL_TRANSLATION_TABLE[className].displayName;

And for fields of this class:

.. code-block:: javascript

  var fieldName = ??;                                                                                                                                                              
  var fieldDisplayName = $MODEL_TRANSLATION_TABLE[className].fields[fieldName]
