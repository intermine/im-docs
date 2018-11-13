Model Merging
================================

An InterMine model describes the classes available to the InterMine system and their relationships.  The model is used to generate the database tables, the Java class files and the web application.

A model can be described using a model file.  The model can be either read from one file or built up from several files using "model merging".  An example of a single file model is used in the "testmine".

Configuration
--------------

An InterMine datamine is built from sources. Each source can contribute to the data model and also provides data. When a mine is built with the `./gradlew builddb` command, the model is created from small "additions" file contributed by each source. Specifically, the model is created by reading the `project.xml` file and merging the model fragment from each addition file for each source. 

Other additions files (ie. not from sources) can be explicitly merged by setting the `extra.model.paths.start` and `extra.model.paths.end` properties in the `project.properties` of your `dbmodel` directory.  An example from FlyMine's `build.gradle` is:

.. code-block:: properties

  mineDBModelConfig {
    modelName = "genomic"
    extraModelsStart = "so_additions.xml genomic_additions.xml"
    extraModelsEnd = "flybase-chado-db_additions.xml chado-db-stock_additions.xml"
  }

Here `genomic_additions.xml` and `so_additions.xml` will be merged first and `flybase-chado-db_additions.xml' and 'chado-db-stock_additions.xml` will be merged after all other model fragments.

Note that bio-model's `core.xml` model fragment is always used as a base for the merging - everything will be merge into the classes in `core.xml`



Example
-----------

From `core.xml`:

.. code-block:: xml

  ...
  <class name="Protein" extends="BioEntity" is-interface="true">
    <attribute name="name" type="java.lang.String"/>
    <attribute name="primaryAccession" type="java.lang.String"/>
    <attribute name="length" type="java.lang.Integer"/>
    <attribute name="molecularWeight" type="java.lang.Integer"/>
    <reference name="sequence" referenced-type="Sequence"/>
    <collection name="genes" referenced-type="Gene" ordered="true" reverse-reference="proteins"/>
  </class>
  ...


From the uniprot source (`uniprot_additions.xml`):

.. code-block:: xml

  ...
  <class name="Protein" is-interface="true">
    <attribute name="description" type="java.lang.String"/>
    <attribute name="ecNumber" type="java.lang.String"/>
    <collection name="publications" referenced-type="Publication"/>
  </class>
  ...

Final, merged, model definition:

.. code-block:: xml

  ...
  <class name="Protein" extends="BioEntity" is-interface="true">
    <attribute name="description" type="java.lang.String"/>
    <attribute name="ecNumber" type="java.lang.String"/>
    <attribute name="name" type="java.lang.String"/>
    <attribute name="primaryAccession" type="java.lang.String"/>
    <attribute name="length" type="java.lang.Integer"/>
    <attribute name="molecularWeight" type="java.lang.Integer"/>
    <reference name="sequence" referenced-type="Sequence"/>
    <collection name="publications" referenced-type="Publication"/>
    <collection name="genes" referenced-type="Gene" ordered="true" reverse-reference="proteins"/>
  </class>
  ...

The resulting class has all attributes of the `Protein` from `core.xml` and from `uniprot_additions.xml`.  Note that in uniprot we don't need to declare a base class for `Protein` (like as `extends="BioEntity"`) as the base class from `core.xml` is merged into the final class.

Global Additions file
-------------------------

You can also specify an additions file, `globalAdditionsFile`, that will be merged into every source's additions file.

.. code-block:: sh

    // [in build.gradle in flymine-bio-sources]
    // uncomment to specify an extra additions file for your bio-sources
    // this file will be merged with the additions file for each data source
    // and included in each source JAR.
    //bioSourceDBModelConfig {
    //    # file should be in the root of flymine-bio-sources
    //    globalAdditionsFile = "MY-MINE_additions.xml"
    //}

.. index:: model merging, data model, extraAdditionsFile
