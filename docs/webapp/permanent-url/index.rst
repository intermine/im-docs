Permanent URLs
================================

InterMine generates stable and unique URLs to identify the report pages for biological entities.

They are based on class names combined with local IDs provided by the data resource providers and therefore they are persistent. 

In FlyMine, for example, the URL of the report page for the gene zen, with primary identifier P19107, will be http://flymine.org/gene:FBgn0004053.

They are used to share the report page with other users.

.. image:: img/share.jpg

The class_keys.properties file speficies the keys used to generate the permanent URLs.
If not specified, the primaryidentifier key is used.

=============== ================
key             value
=============== ================
Protein_URI     primaryAccession
Organism_URI    taxonId
Publication_URI pubMedId
=============== ================


.. index:: permanent URL
