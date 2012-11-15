Post processing
================================

These are steps that run after the data loading is completed.  They are used to set calculate/set fields that are difficult to do when data loading or that require multiple sources to be loaded.

NOTE:  Be sure to put the postprocesses in the correct order.  Each task is executed in the order listed on your project XML so be sure to put the webapp tasks last in the last, for example.  Take a look at the FlyMine or modMine project XML file if you need help.

== Sequence Features ==

=== `create-chromosome-locations-and-lengths` ===

For genome features this will set the `chromosome`, `chromosomeLocation` and `length` fields which are added to make querying more convenient.  Some parts of the webapp specific to genome features expect `chromosomeLocation` to be filled in.

'''Should I use it?''' - Yes, if you have loaded genome annotation.

=== `transfer-sequences` ===

Where a Chromosome has a sequence this will find genome features located on it that don't have sequence set this will calculate and set the sequence for those features.  

'''Should I use it?''' - Yes, if you have loaded genome annotation without sequence set for all features.

=== `create-references` ===

Create shortcut references/collections to make querying more obvious.  We are trying to eliminate the need to use this.

'''Should I use it?''' - Yes, for the moment if you are using standard InterMine sources.

=== `create-intron-features` ===

If you have loaded genome annotation that include exons but does not specify introns this will create Intron objects and name them appropriately.  

'''Should I use it?''' - If genome annotation you have loaded does not include introns.

== Overlapping and Flanking Features ==

=== `create-intergenic-region-features` ===

Looks at gene locations on chromosomes and calculates new IntergenicRegion features to represent the intergenic regions.  These are useful in combination with overlaps for working out, e.g. binding sites that overlap the upstream intergenic region of a gene.  Each Gene gets a reference to its upstream and downstream intergenic regions.

'''Should I use it?''' - Yes, if you have loaded genome annotation and think IntergenicRegions sound useful.

=== `create-bioseg-location-index` ===

Create a [BiosegInstallation bioseg] GIST index on the location table to help with overlap queries.  

'''Should I run it?''' - Yes, if you have genome annotation and would like to query overlaps and have [BiosegInstallation bioseg] installed.

=== `create-overlap-view` ===

Replace the `sequencefeatureoverlappingfeatures` table with a view that uses the [BiosegInstallation bioseg] type to calculate the overlaps.  

'''Should I run it?''' - Yes, if you have genome annotation and would like to query overlaps and have [BiosegInstallation bioseg] installed.  

=== `create-gene-flanking-features` ===

Create features to represent flanking regions of configurable distance either side of gene features.  These will be used in overlap queries.

'''Should I run it?''' - Yes, if you have genome annotation and would like to query flanking regions.

== Data ==

=== `do-sources` ===

This searches through all sources included in project.xml and runs post-processing steps if any exist.  Looks for the property `postprocessor.class` in the `project.properties` of each source, the class specified should be a subclass of `org.intermine.postprocess.PostProcessor`.

'''Should I use it?''' - Yes, if you are using standard InterMine sources, they may have post-processing steps.

== Webapp ==

=== `create-search-index` ===

Creates the lucene search index used by the webapp.  

'''Should I run it?'''  Yes, if you are releasing a webapp.

=== `create-attribute-indexes` ===

Create indexes on all attributes to help speed up queries.

'''Should I use it?''' - Always.  It should be run last of all post-processing steps.

=== `summarise-objectstore` ===

Counts of the number of objects of each class and for class fields that have a small number of value, a list of those values.  See ObjectStoreSummaryProperties for more information.

'''Should I use it?''' - Always.  

=== `create-autocomplete-index` ===

Creates the indexes for the fields set to be autocompleted in the ObjectStoreSummaryProperties file.

'''Should I use it?''' - Yes, if you have a webapp.  


Related topics:

.. toctree::
    :maxdepth: 4

    overlaps
