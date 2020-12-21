---
title: Querying over genomic ranges
---

InterMine includes functionality for querying features with overlapping
genome coordinates. We have an index that is created on the
[Location]{.title-ref} table. This is used by a \'virtual\'
[SequenceFeature.overlappingFeatures]{.title-ref} collection that is a
[view]{.title-ref} in the postgres database using the native [Postgres
index](https://www.postgresql.org/docs/9.5/static/rangetypes.html) to
find other features that overlap it.

In modMine (the InterMine for the modENCODE project) we also create
[GeneFlankingRegion]{.title-ref} features to represent specific
distances upstream and downstream of genes to query for genes that are
nearby other features.

Create the index
================

You need to create the index on the location table in your production
database by adding the [create-location-range-index]{.title-ref}
post-process step to your [project.xml]{.title-ref} file:

``` {.xml}
<post-process name="create-location-range-index"/>
```

Create the overlappingFeatures view
===================================

Create the [SequenceFeature.overlappingFeatures]{.title-ref} view in the
database. This allows you to query for any features that overlap any
other types of features in the web interface or query API. Add the
[create-overlap-view]{.title-ref} post-process step, which needs to be
located **after** [create-location-range-index]{.title-ref} in your
project XML file.

``` {.xml}
<post-process name="create-overlap-view" />
```

Now any queries on the [overlappingFeatures]{.title-ref} collections
will use this view and the new index.

::: {.index}
overlaps, region search, bioseg, genome coordinates,
overlappingFeatures, create-overlap-view, create-bioseg-location-index
:::
