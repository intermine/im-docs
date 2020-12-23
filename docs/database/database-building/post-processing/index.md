Post processing
===============

Some operations are performed on the integrated data before the webapp
is released - post-processing. For example, setting sequences of
SequenceFeatures, filling in additional references and collections or
transferring orthologues from translations to genes. These are steps
that run after the data loading is completed. They are used to set
calculate/set fields that are difficult to do when data loading or that
require multiple sources to be loaded. Some postprocessing steps are
core to InterMine.bio and should always be run, others are contributed
by particular sources.

Post-processing steps are specified in the project XML file and run from
the mine:

``` {.bash}
~/git/flymine $ ./gradlew postprocess --stacktrace
```

To run individual post-process steps use, for example:

``` {.bash}
~/git/flymine $ ./gradlew postprocess -Pprocess=do-sources --stacktrace
```

When running one postprocess step like this (multiple steps separated by
comma is not supported), the [-Pprocess]{.title-ref} used must match an
[post-process]{.title-ref} in the [post-processing]{.title-ref} section
of the [project.xml]{.title-ref} file.

Post-processing is run automatically after integrating if using the
[project_build]{.title-ref} script.

To add a post-process step to InterMine, you need to add the Java
definition to the project and call the post-process from the
[PostProcessOperationsTask]{.title-ref} class.

::: {.note}
::: {.title}
Note
:::

Be sure to put the postprocesses in the correct order. Each task is
executed in the order listed on your project XML so be sure to put the
webapp tasks last in the last, for example. Take a look at the FlyMine
project XML file if you need help.
:::

Sequence Features
-----------------

### create-chromosome-locations-and-lengths

For genome features this will set the [chromosome]{.title-ref},
[chromosomeLocation]{.title-ref} and [length]{.title-ref} fields which
are added to make querying more convenient. Some parts of the webapp
specific to genome features expect [chromosomeLocation]{.title-ref} to
be filled in.

*Should I use it?* Yes, if you have loaded genome annotation.

### transfer-sequences

Where a Chromosome has a sequence this will find genome features located
on it that don\'t have sequence set this will calculate and set the
sequence for those features.

*Should I use it?* Yes, if you have loaded genome annotation without
sequence set for all features.

### create-references

Create shortcut references/collections to make querying more obvious.

*Should I use it?* Yes, for the moment if you are using standard
InterMine sources.

### create-utr-references

Create shortcut references/collections to make querying more obvious.
Read the UTRs collection of MRNA then set the fivePrimeUTR and
threePrimeUTR fields with the corresponding UTRs.

*Should I use it?* Yes, if you think it sounds useful.

### create-intron-features

If you have loaded genome annotation that include exons but does not
specify introns this will create Intron objects and name them
appropriately.

*Should I use it?* If genome annotation you have loaded does not include
introns.

### make-spanning-locations

Create a Location that spans the locations of some child objects.
Creates a location for Transcript that is as big as all the exons in its
exons collection and a location for gene that\'s as big as all the
transcripts in its transcripts collection.

*Should I use it?* Only if you don\'t have locations for Genes or
Transcripts loaded from another source.

Overlapping and Flanking Features
---------------------------------

### create-intergenic-region-features

Looks at gene locations on chromosomes and calculates new
IntergenicRegion features to represent the intergenic regions. These are
useful in combination with overlaps for working out, e.g. binding sites
that overlap the upstream intergenic region of a gene. Each Gene gets a
reference to its upstream and downstream intergenic regions.

*Should I use it?* Yes, if you have loaded genome annotation and think
IntergenicRegions sound useful.

### create-location-overlap-index

Create a GIST index on the location table to help with overlap queries.

*Should I use it?* Yes, if you have genome annotation and would like to
query overlaps. You must have bioseg installed unless you are using
Postgres 9.2 or later. See `/data-model/overlaps`{.interpreted-text
role="doc"} for details.

### create-bioseg-location-index

Deprecated.

*Should I use it?* No. Use [create-location-overlap-index]{.title-ref}
instead.

### create-overlap-view

Replace the [sequencefeatureoverlappingfeatures]{.title-ref} table with
a view that uses a fast index to calculate the overlaps.

*Should I use it?* Yes, if you have genome annotation and would like to
query overlaps. You must have bioseg installed unless you are using
Postgres 9.2 or later. See `/data-model/overlaps`{.interpreted-text
role="doc"} for details.

### create-gene-flanking-features

Create features to represent flanking regions of configurable distance
either side of gene features. These will be used in overlap queries.

*Should I use it?* Yes, if you have genome annotation and would like to
query flanking regions.

Data
----

### do-sources

This searches through all sources included in project.xml and runs
post-processing steps if any exist. Looks for the property
[postprocessor.class]{.title-ref} in the
[project.properties]{.title-ref} of each source, the class specified
should be a subclass of
[org.intermine.postprocess.PostProcessor]{.title-ref}.

*Should I use it?* - Yes, if you are using standard InterMine sources,
they may have post-processing steps.

Webapp
------

### create-attribute-indexes

Create indexes on all attributes to help speed up queries.

*Should I use it?* Always. It should be run after all post-processing
steps that write new records to the database as this step creates
indexes for all columns in each table.

### create-search-index

Creates the lucene search index used by the webapp.

*Should I use it?* Yes, if you are releasing a webapp.

### populate-child-features

Populate the SequenceFeature.childFeatures() collection.

*Should I use it?* Yes, only if you use JBrowse and you want your
JBrowse web-service endpoints available (see also
`/webapp/third-party-tools/jbrowse`{.interpreted-text role="doc"} and
`/web-services/index`{.interpreted-text role="doc"}).

### summarise-objectstore

Counts of the number of objects of each class and for class fields that
have a small number of value, a list of those values. See
`/database/database-building/post-processing/objectstore-summary-properties`{.interpreted-text
role="doc"} for more information.

*Should I use it?* - Always. Run after
[create-attribute-indexes]{.title-ref} to speed this step up.

### create-autocomplete-index

Creates the indexes for the fields set to be autocompleted in the
ObjectStoreSummaryProperties file.

*Should I use it?* Yes, if you have a webapp.

::: {.index}
create-chromosome-locations-and-lengths, transfer-sequences,
create-references, create-intron-features,
create-intergenic-region-features, create-overlap-view,
create-bioseg-location-index, create-gene-flanking-features, do-sources,
create-search-index, create-attribute-indexes, summarise-objectstore,
create-autocomplete-index
:::
