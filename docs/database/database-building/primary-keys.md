---
title: Primary Keys
---

This document describes the configuration used by the InterMine
integration system to identify objects that are identical to each other.
Two objects are deemed to be identical if they have matching fields for
at least one primary key used for the class of object. Primary keys are
defined in the resources directory of the data source, and should be
called \"\$DATA-SOURCE-NAME_keys.properties\".

Data source keys configuration files
====================================

For each data source, there is a properties file providing a list of the
primary keys that can be used when integrating that data source. The
file lists the primary keys by name for each class. When loading objects
of a particular class the keys define which fields should be used to
look up in the database for existing objects to merge with.

The keys are specified in each source in a file:
[\$DATA-SOURCE-NAME/src/main/resources/\$DATA-SOURCE-NAME_keys.properties]{.title-ref}.

These [\_keys.properties]{.title-ref} files define keys in the format:

``` {.properties}
Class.name_of_key = field1, field2
```

The [name_of_key]{.title-ref} can be any string but you must use
different names if defining more than one key for the same class, for
example in [uniprot_keys.properties]{.title-ref} there are two different
keys defined for \`Gene\`:

``` {.properties}
Gene.key_primaryidentifier = primaryIdentifier
Gene.key_secondaryidentifier = secondaryIdentifier
```

Use common names for identical keys between sources as this will help
avoid duplicating database indexes. Postgres uses the key names to
create indexes.

Each key should list one or more fields that can be a combination of
[attributes]{.title-ref} of the class specified or
[references]{.title-ref} to other classes - in which case there should
be a key defined for the referenced class as well.

::: {.warning}
::: {.title}
Warning
:::

The build system will use any valid key it finds - so be careful! e.g.
if you have keys for BioEntity and SequenceFeature and Gene in your keys
file, any of the three keys may be used to merge a Gene into the
database.
:::

It is still possible to use a legacy method of configuring keys, where
keys are defined centrally in
[dbmodel/resources/genomic_keyDefs.properties]{.title-ref} and
referenced in source [\$DATA-SOURCE-NAME_keys.properties]{.title-ref}
files.

Global primary key configuration file \[DEPRECATED\]
====================================================

::: {.warning}
::: {.title}
Warning
:::

This is an older method of defining keys in a central configuration
file. Use the method described above instead.
:::

Define keys in a central file \[DEPRECATED\]
--------------------------------------------

This file is a Java properties file, so all the data is in form of
single lines of the form \"property name = property value\". A line is a
comment if it begins with a hash character, and blank lines may be
present. This file defines a set of primary keys by name for each class.
Defining a primary key on a class makes it apply to all the subclasses
too. This file should be located in
[MINE_NAME/dbmodel/resources]{.title-ref}.

To define a primary key, enter a line in the following form:

``` {.properties}
# <name of model>_keyDefs.properties file in MINE_NAME/dbmodel/resources
Classname.primary_key_name = field1, field2
```

This line means that the class \"Classname\" and all its subclasses have
a primary key called \"primary_key_name\" that matches two objects if
the values of both of the fields \"field1\" and \"field2\" are
identical. Only attributes and references can be used as fields in a
primary key, not collections.

Here is a short example of the configuration file. The configuration
file we use for the FlyMine system is a good example.

``` {.properties}
# some keys defined in flymine/dbmodel/resources/genomic_keyDefs.properties
Gene.key_identifier_org=identifier, organism
Gene.key_symbol_org=symbol, organism
Gene.key_organismdbid=organismDbId
Gene.key_ncbiGeneNumber=ncbiGeneNumber
Protein.key_identifier_org=identifier, organism
Protein.key_primaryacc=primaryAccession
```

Using keys (from central file) in each source \[DEPRECATED\]
------------------------------------------------------------

The properties file for each data source lists primary key names from
the the central [genomic_keyDefs.properties]{.title-ref} file. The file
lists the primary keys by name for each class; the primary key names
must be defined in the global keyDefs file mentioned in the previous
section. If a class is not mentioned, then instances of that class will
never be merged with other objects. For each class, there should be a
line like the following:

``` {.properties}
# keys file in SOURCE/resources that references keys defined in global keyDefs properties file. 
Gene = key_identifier_org, key_symbol_org
```

This line means that the class \"Gene\" and all its subclasses have a
two primary keys available for this data source, called
\"key_identifier_org\" and \"key_symbol_org\", which should be defined
properly in the global configuration.

::: {.warning}
::: {.title}
Warning
:::

This is an older method of defining keys in a central configuration
file. Use the method described in the first section instead.
:::

::: {.index}
primary keys, genomic_keyDefs.properties, integration keys, keys
:::
