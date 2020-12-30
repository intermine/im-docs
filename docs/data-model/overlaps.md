# Querying over genomic ranges

InterMine includes functionality for querying features with overlapping genome coordinates. We have an index that is created on the `Location` table. This is used by a 'virtual' `SequenceFeature.overlappingFeatures` collection that is a `view` in the postgres database using the native [Postgres index](https://www.postgresql.org/docs/9.5/static/rangetypes.html) to find other features that overlap it.

In modMine \(the InterMine for the modENCODE project\) we also create `GeneFlankingRegion` features to represent specific distances upstream and downstream of genes to query for genes that are nearby other features.

## Create the index

You need to create the index on the location table in your production database by adding the `create-location-range-index` post-process step to your `project.xml` file:

```markup
<post-process name="create-location-range-index"/>
```

## Create the overlappingFeatures view

Create the `SequenceFeature.overlappingFeatures` view in the database. This allows you to query for any features that overlap any other types of features in the web interface or query API. Add the `create-overlap-view` post-process step, which needs to be located **after** `create-location-range-index` in your project XML file.

```markup
<post-process name="create-overlap-view" />
```

Now any queries on the `overlappingFeatures` collections will use this view and the new index.

