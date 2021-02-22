---
title: Homologue Data Sources
---

InterMine comes with several data converters for homologue data, e.g. TreeFam, PANTHER, OrthoDB, Homlogene, etc. Follow the instructions below to include these datasets in your InterMine.

* [Treefam](treefam.md)
	* [Data](treefam.md#data)
	* [Project XML](treefam.md#project-xml)
* [Homologene](homologene.md)
* [OrthoDB](orthodb.md)
* [Panther](panther.md)
* [Ensembl Compara](compara.md)
	* [Download data from BioMart](compara.md#download-data-from-biomart)
	* [Add entry to project XML file](compara.md#add-entry-to-project-xml-file)
	* [Run build](compara.md#run-build)
		* [Data file](compara.md#data-file)
		* [Download script](compara.md#download-script)

## Identifiers

The default rule for bio-InterMine is to put the MOD identifiers \(eg. MGI:XXX or ZDB-GENE-XXX\) in the primaryIdentifier field. This is tricky because some homologue sources use the Ensembl identifiers \(Ensembl identifiers belong in the Gene.crossReferences collection\).

To solve this problem, each homologue source uses the NCBI identifier resolver. This resolver takes the Ensembl ID and replaces it with the corresponding MOD identifier.

## How to use an ID resolver

1. Download the identifier file -

   [ftp://ftp.ncbi.nih.gov/gene/DATA/gene\_info.gz](ftp://ftp.ncbi.nih.gov/gene/DATA/gene_info.gz)

2. Unzip the file to `/DATA_DIR/ncbi/gene_info`

**Warning**
Make sure permissions on the file are correct so the build process can read this file.

      3. Download the identifier file for humans -[http://www.flymine.org/download/idresolver/humangene](http://www.flymine.org/download/idresolver/humangene) to another directory, eg. /DATA\_DIR/human/identifiers

      4. Create a sub directory `/DATA_DIR/idresolver/` as file root path and add symbolic links to the two files.

```bash
$ cd /DATA_DIR/idresolver/
$ ln -s /DATA_DIR/ncbi/gene_info entrez 
$ ln -s /DATA_DIR/human/identifiers humangene
```

      5. Add the root path to the file in `~/.intermine/MINE.properties`

```text
resolver.file.rootpath=/DATA_DIR/idresolver/
```

See [ID Resolvers](../../id-resolvers.md) for details on how ID resolvers work in InterMine.

**Warning**
The entrez identifiers file appears to only have the sequence identifier for worm instead of the WBgene identifier

Alternately you can load identifier sources.

Here are the download scripts we use here at InterMine:

[Data Download](https://github.com/intermine/intermine-scripts/tree/master/bio/DataDownloader)

We use WormMart but are happy to hear of a better source for worm identifiers.

Here are the project XML entries used by FlyMine:

[FlyMine Project XML](https://github.com/intermine/flymine/blob/master/project.xml)
