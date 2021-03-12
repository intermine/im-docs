---
title: Class keys
---

Specify keys for the classes in your data model by adding them to the `class_keys.properties` file. This lets the webapp know how to uniquely identify objects of these classes. Users can then [upload](../lists/list-upload.md) lists of such objects.

 * Fields specified in this file will be links in the results table in the webapp.
 * Only objects with key fields defined can be saved in lists.

Keys defined in the `class_keys.properties` file are also used to boost the search visibility of their associated classes.

The `class_keys.properties` file specifies the keys used to generate the permanent navigable URL which is used in the "SHARE" button in the report pages. If not specified, the primaryidentifier key is used.

| key | value |
| :--- | :--- |
| Pathway\_URI | identifier |

Given the above configuration, in FlyMine, the URL of the report page for the pentose phosphate pathway with identifier 00030, will be [http://flymine.org/flymine/pathway:00030](http://flymine.org/flymine/pathway:00030). No need to specify the keys for the core model classes \(e.g. protein, publication...\).

See [Permanent URLs](../permanent-url/index.md) for details on permanent URLs.

See [FlyMine's class keys](https://github.com/intermine/flymine/blob/master/dbmodel/resources/class_keys.properties) for an example class keys file.

