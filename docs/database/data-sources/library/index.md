---
title: Data Source Library
---

This page lists the current sources available for use in InterMine. All the sources here are found as ready-to-use JARs in the central repository, [JCenter](https://jcenter.bintray.com/org/intermine/).

You can also add your own sources to load custom file formats, see [Writing your own data source](../custom/index.md) for more information. In addition, the [Tutorial](../../../get-started/tutorial/index.md) contains detailed steps on creating sources for a variety of different data formats.

Most of the configuration done in the config files is optional, if no config entry exists the default behaviour is followed. However, there are exceptions to this rule.

## Core InterMine sources

These are commonly used sources that you may want to use to load data into your own InterMine instance.

* [Gene Ontology](go/index.md)
	* [GO Annotation](go/go-annotation.md)
	* [GO OBO](go/go-obo.md)
* [Homologue Data Sources](homologues/index.md)
	* [Treefam](homologues/treefam.md)
	* [Homologene](homologues/homologene.md)
	* [OrthoDB](homologues/orthodb.md)
	* [Panther](homologues/panther.md)
	* [Ensembl Compara](homologues/compara.md)
	* [Identifiers](homologues/index.md#identifiers)
	* [How to use an ID resolver](homologues/index.md#how-to-use-an-id-resolver)
* [Interactions](interactions/index.md)
	* [BioGRID](interactions/biogrid.md)
	* [IntAct](interactions/intact.md)
	* [IntAct - complexes](interactions/intact-complexes.md)
	* [PSI-MI Ontology](interactions/psi-mi-ontology)
* [Pathway data sources](pathways/index.md)
	* [KEGG](pathways/kegg.md)
	* [Reactome](pathways/reactome.md)
* [Proteins](proteins/index.md)
	* [UniProt](proteins/uniprot.md)
	* [InterPro](proteins/interpro.md)
	* [InterPro to protein](proteins/interpro.md#interpro-to-protein)
* [Publications](publications/index.md)
	* [PubMed](publications/pubmed.md)
	* [Publications](publications/publications.md)
* [NCBI - Entrez gene](ncbi-gene.md)
* [Chado](chado.md)
* [FASTA](fasta.md)
* [GFF3](gff.md)
* [Identifier Data Sources](identifiers/index.md)
* [InterMine Items XML](intermine-items-xml.md)
* [OMIM](omim.md)
* [Organisms](organism.md)
* [Sequence Ontology (SO)](so.md)
* [Uberon](uberon.md)
* [Data Sources](data-sources.md)
* [Data Sets](data-sets.md)
* [VCF files](variation/vcf.md)

## FlyMine Specific sources

These are sources that load Drosophila specific data sets into FlyMine, we don't expect you will re-use these unless you are creating a Drosophila warehouse. All of these sources are located in [https://github.com/intermine/flymine-bio-sources](https://github.com/intermine/flymine-bio-sources).

* affy-probes
* arbeitman-items-xml
* bdgp-clone
* bdgp-insitu
* drosdel-gff
* drosophila-homology
* fly-anatomy-ontology
* flyatlas
* flybase-alleles
* flybase-expression
* fly-development-ontology
* fly-fish
* fly-misc-cvterms
* flyreg
* long\_oligo
* miranda
* redfly
* rnai

See [FlyMine](http://www.flymine.org) for more information about these datasets. Look at FlyMine's [project.xml](https://github.com/intermine/flymine/blob/master/project.xml) for examples of how to use these sources.

## HumanMine Specific sources

* arrayexpress-atlas
* atlas-express
* clinvar
* ensembl-hgnc
* gtex
* hgnc
* hpo
* hpo-annotation
* huge-gwas
* human-gene
* mgi-alleles
* ncbi-summaries
* orphanet
* protein-atlas

See [HumanMine](http://www.humanmine.org) for more information about these datasets. Look at [HumanMine's project.xml](https://github.com/intermine/humanmine/blob/master/project.xml) for examples on how to use these sources.
