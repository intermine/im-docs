# Perl Items API

In the `intermine/perl` directory we provide a Perl library for creating files in InterMine "Item XML" format. Files in this format can be loaded into an InterMine database by creating a "source".

## Usage

Most code using these modules will follow this pattern:

Make a model

```perl
my $model = InterMine::Model->new(file => $model_file);
```

Make a new InterMine item XML document:

```perl
my $document = InterMine::Item::Document->new(
  model  => $model,
  output => $out_file,
);
```

Make an item:

```perl
my $gene = $factory->make_item("Gene");
```

Set some attributes

```perl
$gene->set(identifier => "CG10811");
```

or references:

```perl
my $org = $factory->make_item("Organism");
$org->set(taxonId => 7227);
$gene->set(organism => $org);
```

or collections:

```perl
$gene->set(transcripts => [$transcript1, $transcript2]);
```

It is also possible to combine creation and attribute setting in one command:

```perl
my $gene = $factory->make_item(
  'Gene',
  identifier  => 'CG10811',
  organism    => $org,
  transcripts => [$transcript1, $transcript2],
);
```

Repeat step 4 as necessary then call `$document->write` to write the items to the output.

## FlyMine example

Example using the FlyMine model:

```perl
use InterMine::Model;
use InterMine::Item::Document;

my $model_file = $ARGV[0] or die;

my $model   = InterMine::Model->new(file => $model_file);
my $document = InterMine::Item::Document->new(model => $model);

my $organism = $document->add_item(
    'Organism',
    taxonId => 7227,
);

my $pub1 = $document->add_item(
    'Publication',
    pubMedId => 11700288,
);
my $pub2 = $document->add_item(
    'Publication',
    pubMedId => 16496002,
);

my $gene = $document->add_item(
    'Gene',
    identifier   => "CG10811",
    organism     => $organism,
    publications => [$pub1, $pub2]
);

# write as InterMine Items XML
$document->write();
```

Output:

```markup
<items>
   <item id="0_4" class="" implements="Gene">
      <attribute name="identifier" value="CG10811" />
      <collection name="publications">
         <reference ref_id="0_2" />
         <reference ref_id="0_3" />
      </collection>
      <reference name="organism" ref_id="0_1" />
   </item>
   <item id="0_1" class="" implements="Organism">
      <attribute name="taxonId" value="7227" />
   </item>
   <item id="0_2" class="" implements="Publication">
      <attribute name="pubMedId" value="11700288" />
   </item>
   <item id="0_3" class="" implements="Publication">
      <attribute name="pubMedId" value="16496002" />
   </item>
</items>
```

## Example

In the InterMine `scripts` repository there is a longer example: [intermine\_items\_example.pl](https://github.com/intermine/intermine-scripts/blob/master/examples/intermine_items_example.pl)

The script has three arguments:

* a string describing a `DataSet`
* a taxon id
* the path to a genomic model file

If you install XML::Writer, the script should run as:

Example command line:

```perl
./intermine_items_example.pl \"FlyMine\" 5833 flymine/dbmodel/resources/main/genomic_model.xml
```
