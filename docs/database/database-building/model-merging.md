Model Merging
=============

An InterMine model describes the classes available to the InterMine
system and their relationships. The model is used to generate the
database tables, the Java class files and the web application.

A model can be described using a model file. The model can be either
read from one file or built up from several files using \"model
merging\". An example of a single file model is used in the
\"testmine\".

Configuration
-------------

An InterMine datamine is built from sources. Each source can contribute
to the data model and also provides data. When a mine is built with the
[./gradlew builddb]{.title-ref} command, the model is created from small
\"additions\" file contributed by each source. Specifically, the model
is created by reading the [project.xml]{.title-ref} file and merging the
model fragment from each addition file for each source.

Other additions files (ie. not from sources) can be explicitly merged by
setting the [extra.model.paths.start]{.title-ref} and
[extra.model.paths.end]{.title-ref} properties in the
[project.properties]{.title-ref} of your [dbmodel]{.title-ref}
directory. An example from FlyMine\'s [build.gradle]{.title-ref} is:

``` {.groovy}
mineDBModelConfig {
  modelName = "genomic"
  extraModelsStart = "so_additions.xml genomic_additions.xml"
  extraModelsEnd = "flybase-chado-db_additions.xml chado-db-stock_additions.xml"
}
```

Here [genomic_additions.xml]{.title-ref} and
[so_additions.xml]{.title-ref} will be merged first and
[flybase-chado-db_additions.xml\' and
\'chado-db-stock_additions.xml]{.title-ref} will be merged after all
other model fragments.

Note that bio-model\'s [core.xml]{.title-ref} model fragment is always
used as a base for the merging - everything will be merge into the
classes in [core.xml]{.title-ref}

Example
-------

From \`core.xml\`:

``` {.xml}
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
```

From the uniprot source ([uniprot_additions.xml]{.title-ref}):

``` {.xml}
...
<class name="Protein" is-interface="true">
  <attribute name="description" type="java.lang.String"/>
  <attribute name="ecNumber" type="java.lang.String"/>
  <collection name="publications" referenced-type="Publication"/>
</class>
...
```

Final, merged, model definition:

``` {.xml}
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
```

The resulting class has all attributes of the [Protein]{.title-ref} from
[core.xml]{.title-ref} and from [uniprot_additions.xml]{.title-ref}.
Note that in uniprot we don\'t need to declare a base class for
[Protein]{.title-ref} (like as [extends=\"BioEntity\"]{.title-ref}) as
the base class from [core.xml]{.title-ref} is merged into the final
class.

Global Additions File
---------------------

Previously the data model was merged from all data sources\' additions
XML file (plus the SO terms, core and genomic additons). This is no
longer true. Since each source is in its own JAR now, the data model is
self-contained for each data source. Therefore if you reference a class
in your data parser, it must be present in the additions file.

Alternatively, you can specify a single data model file that will be
merged into each source:

``` {.sh}
// Place this in build.gradle in root of your mine-bio-sources directory, e.g. flymine-bio-sources/build.gradle
// 
// Must be in the subprojects {} section of the build.gradle file
// 
// bioSourceDBModelConfig {
//    # file should be in the root of your mine-bio-sources directory
//    globalAdditionsFile = "MY-MINE_additions.xml"
// }
```

This setting will merge the specified additions file, e.g.
[MY-MINE_additions.xml]{.title-ref}, into the data model for everyone of
your mine\'s data sources.

::: {.index}
model merging, data model, globalAdditionsFile, additions files
:::
