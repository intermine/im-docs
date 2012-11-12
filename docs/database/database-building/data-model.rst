Model Merging
================================

= Model creation / model merging =

An InterMine model describes the classes available to the InterMine system and their relationships.  The model is used to generate the database tables, the Java class files and the [wiki:WebApp web application].

A model can be described using a [wiki:ModelDescription model file].  The model can be either read from one file or built up from several files using "model merging".  An example of a single file model is used in the [source:/trunk/intermine/objectstore/model/testmodel/ testmodel] project - [source:/trunk/intermine/objectstore/model/testmodel/testmodel_model.xml].

== Model merging configuration ==

An InterMine datamine is built from [wiki:SourceHowto sources].  Each source can contribute to the data model and also provides data.  When a mine is [wiki:RunningABuild built] with the `ant build-db` command, the model is created from small "additions" file contributed by each source.  Specifically, the model is created by reading the `project.xml` file and merging the model fragment from each addition file for each source.  As an example the additions file for uniprot is `bio/sources/uniprot/uniprot_additions.xml`

Other additions files (ie. not from sources) can be explicitly merged by setting the `extra.model.paths.start` and
`extra.model.paths.end` properties in the `project.properties` of your `dbmodel` directory.  An example from FlyMine is:
{{{
  extra.model.paths.start = bio/core/genomic_additions.xml bio/sources/so/so_additions.xml
  extra.model.paths.end = bio/core/shortcuts.xml
}}}
Here `genomic_additions.xml` and `so_additions.xml` will be merged first and `shortcuts.xml` will be merged after all other model fragments.

Note that the `bio/core/core.xml` model fragment is always used as a base for the merging - everything will be merge into the classes in `core.xml`

== Model merging example ==

From `core.xml`:
{{{
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
}}}

From the uniprot source (`uniprot_additions.xml`):
{{{
  ...
  <class name="Protein" is-interface="true">
    <attribute name="description" type="java.lang.String"/>
    <attribute name="ecNumber" type="java.lang.String"/>
    <collection name="publications" referenced-type="Publication"/>
  </class>
  ...
}}}

Final, merged, model definition:
{{{
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
}}}

The resulting class has all attributes of the `Protein` from `core.xml` and from `uniprot_additions.xml`.  Note that in uniprot we don't need to declare a base class for `Protein` (like as `extends="BioEntity"`) as the base class from `core.xml` is merged into the final class.
