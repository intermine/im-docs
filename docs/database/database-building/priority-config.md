# Priority Configuration

This document describes the format of the configuration file used by the InterMine system's integration to resolve conflicts between different data originating from different data sources. This file should be created as `MINE_NAME/dbmodel/resources/MODEL_NAME_priorities.properties`

When two objects from two different data sources have been identified as equivalent by the PrimaryKeys, those two objects must then be merged into a single object. It is possible that the different data sources may give different values for some of the fields of the objects, so the integration system must choose between the two values. This could be implemented as a manual data curation step, but we decided to make it automatic, by allowing data sources to be placed in priority order on a per-field basis. This means that if two data sources have a conflicting value for a field, the data source with the highest priority for that field will supply the value used in the final object.

If you think that a particular field will never have conflicting values supplied by different data sources, then it need not be mentioned in the priority configuration. However, if there is a priority configured, it must list all the data sources that will provide values for that field. A value of null is ignored as "not a value". A wildcard of "\*" matches all data sources that aren't otherwise listed, which can be useful to reduce the size of the priorities file and the number of times it needs to be updated.

## File format

The file must be called "MODEL\_NAME\_priorities.properties" and be in the classpath of the data loader. The configuration file is a Java properties file, so lines beginning with a hash character are comments, and blank lines are allowed. To specify a priority for all the fields of a particular class \(and its subclasses\), create a line in the file like this:

```text
Classname = datasource1, datasource2
```

However, individual fields can be separately specified too. The order of lines in the file does not matter. Create a line like this:

```text
Classname.fieldname = datasource2, datasource1
```

Alternatively, you can use a wildcard, for instance to say that datasource1 is right all the time:

```text
Classname = datasource1, *
```

Or to say that all the datasources provide the correct value, except datasource1:

```text
Classname = *, datasource1
```

The data sources are listed in order of decreasing priority. Note that all the field values controlled by a wildcard must be identical, so for instance datasource2 and datasource3 must not conflict in any of these examples. Some example files are our testing priorities file and our FlyMine priorities file.

## Class Hierarchy

Because this is an object-oriented database, classes of object are arranged in a class hierarchy, that is some classes are sub-classes of other super-classes. Therefore, it is possible to define a priority on Gene.name and on BioEntity.name, which refer to the same attribute. The priority system will only work if the priorities are completely unambiguous. That is, Gene.name and BioEntity.name must be set to the same thing, or an error will be reported. Generally, you should only configure one of those two classes.

## Validation

The configuration will be validated at the beginning of data loading. The validation will check that no configuration is made for classes that do not exist, and for data sources which do not exist \(which could easily be a typo\), and that no class hierarchy problems exist. Note that there is an extremely small chance that some class hierarchy problems may be spotted after validation with some extremely exotic data, but we do not expect to ever see such data.

