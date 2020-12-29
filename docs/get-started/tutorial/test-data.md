# Data files to integrate

All data required to build an InterMine is included in [biotestmine/data/malaria-data.tar.gz](https://github.com/intermine/biotestmine/tree/master/data/malaria-data.tar.gz). Copy this file to your local directory and extract from the archive.

```bash
cp biotestmine/data/malaria-data.tar.gz DATA_DIR
cd DATA_DIR
tar -zxvf malaria-data.tar.gz
```

Edit the project.xml file so that all occurrences of ''DATA\_DIR'' point to the your local data directory location.

## Data sources

### malaria-genome

The malaria genome as gff3 and fasta, originally downloaded from PlasmoDB

#### uniprot

UniProt XML with protein information and sequences from SwissProt and Trembl. Downloaded from uniprot.org and filtered on taxon id 36329.

### gene\_ontology

The Gene Ontology structure. Downloaded from [http://www.geneontology.org/](http://www.geneontology.org/)

### go\_annotation

GO term assignments for _P. falciparum_. Downloaded from [http://www.geneontology.org/](http://www.geneontology.org/)

