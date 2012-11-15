Querying over genomic ranges
================================

= Queries on genomic ranges =

InterMine includes functionality for querying features with overlapping genome coordinates.  We have a custom `BIOSEG` index for postgres that is created on the `Location` table.  This is used by a 'virtual' `LocatedSequenceFeature.overlappingFeatures` collection that is a `view` in the postgres database using the `BIOSEG` index to find other features that overlap it.

In [http://intermine.modencode.org modMine] (the InterMine for the [http://www.modencode.org modENCODE project] we also create `GeneFlankingRegion` features to represent specific distances upstream and downstream of genes to query for genes that are nearby other features. 

To use the overlapping queries in InterMine you need to:

== 1. Install BIOSEG ==

`BIOSEG` is a custom index type that you need to add to postgres - [wiki:BiosegInstallation installation instructions].

== 2. Create the BIOSEG index ==

You need to create the bioseg index on the location table in your production database.  This is done simply by adding the `create-bioseg-location-index` post-process step to your `project.xml` file:

{{{
<post-process name="create-bioseg-location-index"/>
}}}

== 3. Create the `overlappingFeatures` view ==

Now create the view in the `LocatedSequenceFeature.overlappingFeatures` view in the database.  This allows you to query for any features that overlap any other types of features in the web interface or query API.  Just add the `create-overlap-view` post-process step, it needs to be after `create-bioseg-location-index`.

{{{
<post-process name="create-overlap-view" />
}}}


See [source:trunk/flymine/project.xml FlyMine's project.xml] for an example of including these steps.


Now any queries on the `overlappingFeatures` collections will use this view and bioseg.
