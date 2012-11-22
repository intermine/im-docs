Querying over genomic ranges
================================

InterMine includes functionality for querying features with overlapping genome coordinates.  We have a custom `BIOSEG` index for postgres that is created on the `Location` table.  This is used by a 'virtual' `SequenceFeature.overlappingFeatures` collection that is a `view` in the postgres database using the `BIOSEG` index to find other features that overlap it.

In modMine (the InterMine for the modENCODE project] we also create `GeneFlankingRegion` features to represent specific distances upstream and downstream of genes to query for genes that are nearby other features. 

To use the overlapping queries in InterMine you need to:

Install BIOSEG 
-------------------

`BIOSEG` is a custom index type that you need to add to postgres. See :doc:`/system-requirements/software/postgres/bioseg` for details

Create the BIOSEG index
---------------------------

You need to create the bioseg index on the location table in your production database.  This is done simply by adding the `create-bioseg-location-index` post-process step to your `project.xml` file:

.. code-block:: xml

	<post-process name="create-bioseg-location-index"/>

Create the `overlappingFeatures` view
-------------------------------------------

Now create the view in the `SequenceFeature.overlappingFeatures` view in the database.  This allows you to query for any features that overlap any other types of features in the web interface or query API.  Just add the `create-overlap-view` post-process step, it needs to be after `create-bioseg-location-index`.

.. code-block:: xml

	<post-process name="create-overlap-view" />


See FlyMine's project.xml for an example of including these steps.


Now any queries on the `overlappingFeatures` collections will use this view and bioseg.


.. index:: overlaps, region search, bioseg, genome coordinates, overlappingFeatures, create-overlap-view, create-bioseg-location-index
