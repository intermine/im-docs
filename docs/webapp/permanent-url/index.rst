Permanent URLs
================================

InterMine generates stable and unique URLs to identify the report pages for biological entities.

They are based on class names combined with local IDs provided by the data resource providers and therefore they are persistent. 

In FlyMine, for example, the URL of the report page for the gene zen, with primary identifier P19107, will be http://flymine.org/gene:FBgn0004053.

These URLs are used to share the report page with other users.

.. image:: img/share.png

The :doc:`class_keys.properties </webapp/properties/class-keys/>` file specifies the keys used to generate the permanent URLs. If not specified, the primaryidentifier key is used.

The format is:

| # class_keys.properties
| <CLASSNAME>_URI <FIELDNAME>

The classes and field names are case sensitive.

For example:

=============== ================
key             value
=============== ================
Protein_URI     primaryAccession
Organism_URI    taxonId
Publication_URI pubMedId
=============== ================

See :doc:`/webapp/properties/class-keys` for details about this file.

.. index:: permanent URL
