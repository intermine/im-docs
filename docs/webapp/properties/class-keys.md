Class keys
================================================================================================================

Specify keys for the classes in your data model by adding them to the `class_keys.properties` file. This lets the webapp know how to uniquely identify objects of these classes. Users can then :doc:`upload </webapp/lists/list-upload>` lists of such objects.

Keys defined in the `class_keys.properties` file are also used to boost the search visibility of their associated classes.

The `class_keys.properties` file specifies the keys used to generate the permanent navigable URL which is used in the "SHARE" button in the report pages. If not specified, the primaryidentifier key is used.

=============== ================
key             value
=============== ================
Pathway_URI     identifier
=============== ================

Given the above configuration, in FlyMine, the URL of the report page for the pentose phosphate pathway with identifier 00030, will be http://flymine.org/flymine/pathway:00030.
No need to specify the keys for the core model classes (e.g. protein, publication...). 

See :doc:`/webapp/permanent-url/index` for details on permanent URLs.

See `FlyMine's class keys <https://github.com/intermine/flymine/blob/master/dbmodel/resources/class_keys.properties>`_ for an example class keys file.

.. index:: class keys, list upload classes
