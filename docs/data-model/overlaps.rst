Querying over genomic ranges
================================

.. note::
  
   Starting with InterMine 1.4 Bioseg is no longer required if you are using Postgres version 9.2 or later.

InterMine includes functionality for querying features with overlapping genome coordinates.  We have an index that is created on the `Location` table.  This is used by a 'virtual' `SequenceFeature.overlappingFeatures` collection that is a `view` in the postgres database using the index (either bioseg or the native Postgres one) to find other features that overlap it.

In modMine (the InterMine for the modENCODE project) we also create `GeneFlankingRegion` features to represent specific distances upstream and downstream of genes to query for genes that are nearby other features. 

Install BIOSEG (Postgres versions 9.1 and older only)
--------------------------------------------------------------------------------------------------

`BIOSEG` is a custom index type that you need to add to postgres. See :doc:`/system-requirements/software/postgres/bioseg` for details

Create the index
--------------------------------------------------------------------------------------------------

You need to create the index on the location table in your production database by adding the `create-location-range-index` post-process step to your `project.xml` file:

.. code-block:: xml

	<post-process name="create-location-range-index"/>

If you are using an older version of Postgres, this task will create a BIOSEG index. Otherwise it will use a native Postgres index.

Create the overlappingFeatures view
--------------------------------------------------------------------------------------------------

Create the `SequenceFeature.overlappingFeatures` view in the database. This allows you to query for any features that overlap any other types of features in the web interface or query API.  Add the `create-overlap-view` post-process step, which needs to be located **after** `create-location-range-index` in your project XML file.

.. code-block:: xml

	<post-process name="create-overlap-view" />

Now any queries on the `overlappingFeatures` collections will use this view and the new index.

.. index:: overlaps, region search, bioseg, genome coordinates, overlappingFeatures, create-overlap-view, create-bioseg-location-index
