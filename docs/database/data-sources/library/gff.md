GFF3
====

InterMine comes with a GFF parser which loads GFF3 data files into your
mine - without writing any Perl or Java code. This isn\'t a source
itself but genome annotation from gff files can be loaded easily by
creating a new source of type gff. See redfly, malaria-gff and tiffin
for examples.

Configuration is added to the [project.properties]{.title-ref} file and
an optional handler can be added to deal with data in the attributes
section of the gff file.

Types of data loaded
--------------------

sequence features

How to download the data
------------------------

N/A - will parse any file in GFF3 format

How to load the data into your mine
-----------------------------------

1.  place valid GFF3 files into a directory
2.  add entry to project XML file
3.  run build

``` {.properties}
# example GFF3 file
MAL1    ApiDB   gene    183057  184457  .       -       .       ID=gene.46311;description=hypothetical%20protein;Name=PFA0210c
MAL1    ApiDB   mRNA    183057  184457  .       +       .       ID=mRNA.46312;Parent=gene.46311
```

If you follow the above steps with this data file, the following will
happen:

1.  gene and mRNA objects created
2.  \"MAL1\" will be the identifier
3.  start = 183057, end = 184457
4.  gene will be located in -1 strand, mRNA will be located on the 1
    strand.

### Configuration File

By default, columns such as \"type\", \"start\", \"end\", \"strand\" and
\"ID\" field in \"attributes\" column are parsed automatically. To do
more processing or access the attributes, you are able to configure in
[gff_config.properties]{.title-ref}. This file should live in your
mine\'s [dbmodel/resources]{.title-ref} directory.

``` {.properties}
# gff_config.properties example for E. coil gff3 attributes
511145.terms=gene,exon                             # feature types to load, e.g. load gene and exon for E. coli
511145.excludes=CDS                                # comma-separated list of feature types to exclude from load
511145.gene.attributes.Dbxref.EcoGene=primaryIdentifier # use Dbxref EcoGene field as primaryIdentifier
511145.gene.attributes.locus_tag=secondaryIdentifier    # use locus_tag field as secondaryIdentifier
511145.attributes.gene=symbol                      # use gene field as symbol
511145.attributes.gene_synonym=synonym             # use gene_synonym field for synonym
511145.exon.attributes.type=scoreType              # a class specific attribute 
```

For more advanced processing, you will have to write your own GFF3
parser.

### Parent relationship

The parent-child relationship between features can also be handled
automatically if you set it up properly. Take MalariaGFF3RecordHandler
for example:

``` {.java}
public MalariaGFF3RecordHandler(Model tgtModel) {
    super(tgtModel);
    // refsAndCollections controls references and collections that are set from the
    // Parent= attributes in the GFF3 file.
    refsAndCollections.put("Exon", "transcripts");
    refsAndCollections.put("MRNA", "gene");
}
```

#### Project XML

Here is an example GFF3 entry in the project XML file:

``` {.xml}
# add to project.xml file
# NOTE: update the "type" if you are using your own custom GFF3 parser

<source name="example-gff3" type="gff">
  <property name="gff3.taxonId" value="9606"/>
  <property name="gff3.seqClsName" value="Chromosome"/>
  <property name="src.data.dir" location="/DATA/*.gff3"/>
  <property name="gff3.dataSourceName" value="NCBI"/>
  <property name="gff3.dataSetTitle" value="Release GRCh38 of the Homo sapiens genome sequence"/>
  <!-- add licence here -->
  <property name="gff3.licence" value="https://creativecommons.org/licenses/by-sa/3.0/" />
</source>
```

Here are the descriptions of the properties available:

  property                 example definition                                  
  ------------------------ --------------------------------------------------- -----------------------------------------------------------------------------------------------------------
  gff3.seqClsName          Chromosome                                          the ids in the first column represent Chromosome objects, e.g. MAL1
  gff3.taxonId             36329                                               taxon id
  gff3.dataSourceName      PlasmoDB                                            the data source for features and their identifiers, this is used for the DataSet (evidence) and synonyms.
  gff3.seqDataSourceName   PlasmoDB                                            the source of the seqids (chromosomes) is sometimes different to the features described
  gff3.dataSetTitle        PlasmoDB P. falciparum genome                       a DataSet object is created as evidence for the features, it is linked to a DataSource (PlasmoDB)
  gff3.licence             <https://creativecommons.org/licenses/by-sa/3.0/>   URL to a standard data licence

#### Writing a custom GFF parser

You can extend the generic parser by writing your own Java code to
process the GFF3 data.

### Make Source script

Create your custom source by running the create source script:

``` {.bash}
$ ./bio/scripts/make_source mouse-cdna gff
created /home/USER_NAME/git/bio/sources/mouse-cdna directory for mouse-cdna
```

The script has created a new source for you in the
[bio/sources]{.title-ref} directory.

### Java code

The Java file you now want to edit is here:
[bio/sources/SOURCE_NAME/main/src/org/intermine/bio/dataconversion]{.title-ref}

The [process()]{.title-ref} method is called for every line of GFF3
file(s) being read. Features and their locations are already created but
not stored so you can make changes here. Attributes are from the last
column of the file are available in a map with the attribute name as the
key. For example:

``` {.java}
Item feature = getFeature();
String symbol = record.getAttributes().get("symbol");
feature.setAttribute("symbol", symbol);
```

Any new Items created can be stored by calling addItem(). For example:

``` {.java}
String geneIdentifier = record.getAttributes().get("gene");
gene = createItem("Gene");
gene.setAttribute("primaryIdentifier", geneIdentifier);
addItem(gene);
```

You should make sure that new Items you create are unique, i.e. by
storing in a map by some identifier.

It may be helpful to look at current GFF3 parsers:

1.  [LongOligoGFF3RecordHandler.java]{.title-ref}
2.  [MirandaGFF3RecordHandler.java]{.title-ref}
3.  [RedFlyGFF3RecordHandler.java]{.title-ref}
4.  [FlyRegGFF3RecordHandler.java]{.title-ref}
5.  [DrosDelGFF3RecordHandler.java]{.title-ref}

See `/get-started/tutorial/index`{.interpreted-text role="doc"} for more
information on how to run a GFF source.

::: {.index}
GFF3, sequence features
:::
