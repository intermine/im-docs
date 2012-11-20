Data Source Library
================================


This page lists the current sources available for use in InterMine.  All the sources here are found in `bio/sources`.  Look at `flymine/project.xml` for examples of how to use these sources.  

You can also add your own sources to load custom file formats, see [wiki:SourceHowto 'How to create a source'] for more information.  In addition, the [wiki:GettingStarted tutorial] contains detailed steps on creating sources for a variety of different data formats.

Most of the configuration done in the config files is optional, if no config entry exists the default behaviour is followed.  For instance, if no chromosomes are specified in `ensembl_config.properties`, then all chromosomes are processed.  There are exceptions to this rule, however.

Common sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These are commonly used sources that you may want to use to load data into your own InterMine instance.

.. toctree::
    :maxdepth: 1

    chado
    ensembl
    entrez-organism
    fasta
    gff
    go/index
    homologues
    identifiers
    interactions
    intermine-items-xml
    pathways
    pdb
    pubmed
    snp
    so
    uniprot
    update-publications


||entrez-organism||All other sources refer to organisms only by their [http://www.ncbi.nlm.nih.gov/Taxonomy NCBI taxonomy id].  This source should be included at the end of the build.  It will select the taxonIds loaded into the Organism class, fetch details via the Entrez web service and fill in the organism names in the database.||updates fields for organism created by other sources||none||||
||fasta||Load features and their sequences.  Will create a feature for each entry in a fasta file and set the sequence, the class of the feature to create is set for the whole file.||protein, sequence||none||See [wiki:FASTA]||
||flybase-identifier||Loads [http://flybase.org/static_pages/downloads/FB2012_04/synonyms/fb_synonym_fb_2012_04.tsv.gz flybase synonyms dataset]||genes||none||Specified in [wiki:IdentifierDataSource]
||gff||This isn't a source itself but genome annotation from gff files can be loaded easily by creating a new source of type gff.  See redfly, malaria-gff and tiffin for examples.||features||Configuration is added to the `project.properties` file and an optional handler can be added to deal with data in the attributes section of the gff file.||See [wiki:GFF] ||
||go-annotation||Load [http://www.geneontology.org/GO.format.annotation.shtml gene association] files that link GO terms to genes or proteins.||genes, go terms||'''go-annotation_config.properties''' - determines type of object annotated and which identifiers are created.  '''Note:''' Currently we require that the gene_association file is sorted by the 'product' (gene/protein/etc) identifier in column 2.  This is to save memory while loading.  If your file isn't already sorted by column 2 you can use this command `> sort -k 2,2 input_file > output_file`||||
||go||Load the [http://www.geneontology.org Gene Ontology] term ids, names and definitions, and the relationships between terms.  Should be loaded if the go-annotation source is used.||go terms||none||||
||homologene||Loads homologue data from NCBI [http://www.ncbi.nlm.nih.gov/homologene HomoloGene]||homologues, genes||'''homologene_config.properties''' - which fields are set in the HomoloGene converter||Specified in [wiki:Homologue]||
||intact||Load interactions data from [http://www.ebi.ac.uk/intact IntAct].||genes, interactions||'''psi-intact_config.properties''' - which gene identifiers are set||organisms - If none are configured, all interactions are stored.||
||intermine-items-xml-file||Use this source to load [wiki:ItemsXmlFormat Items XML] conforming to the data model directly into the production database.||any||none||||
||intermine-items-large-xml-file||Use this source to load [wiki:ItemsXmlFormat Items XML] conforming to the data model into the production database, this uses an intermediate database to allow it to cope with very large files that would otherwise cause memory problems.||any||none||||
||interpro||Data from [http://www.ebi.ac.uk/interpro interpro]||protein domains||none||||
||kegg-orthologues||Load homologues from [http://www.genome.jp/kegg/ko.html KEGG]||homologues, genes||'''kegg_config.properties''' - which gene identifier fields are populated, mapping from organism taxonId to abbreviation||only taxonIds specified in project.xml file are downloaded, if no taxonIds are configured, all are loaded.||
||kegg-pathway||Link genes to [http://www.genome.jp/kegg/ KEGG pathways] that they operate in.||pathways, genes||'''kegg_config.properties''' - which gene identifier fields are populated, mapping from organism taxonId to abbreviation||only taxonIds specified in project.xml file are downloaded, if no taxonIds are configured, all are loaded.||
||mgi-identifier||Loads [ftp://ftp.informatics.jax.org/pub/reports/MGI_Coordinate.rpt MGI gene info dataset]||genes||none||Specified in [wiki:IdentifierDataSource]
||miranda||miRBase Targets from the Sanger Institute||MiRNATargets, MRNAs, genes||Configuration is added to the `project.properties` file and an optional handler can be added to deal with data in the attributes section of the gff file.||See [wiki:GFF] ||
||orthodb||Loads orthologous protein-coding genes data from [http://cegg.unige.ch/orthodb/ OrthoDB]||homologues, genes||'''orthodb_config.properties''' - which fields are set in the OrthoDB converter||Specified in [wiki:Homologue]||
||panther||Loads homologue data from [http://www.pantherdb.org/ PANTHER]||homologues, genes||'''panther_config.properties''' - which fields are set in the converter||Specified in [wiki:Homologue]||
||pdb||Data from [http://www.pdb.org PDB]||proteins, protein structures||none||each structure is its own PDB file.  PDB file doesn't contain taxonId, so files must live in taxonId-specific directories, eg /7227.  converter processes directories specified in project.xml.  if nothing configured, processes all directories||
||protein-atlas||Read Human Protein Atlas expression data.||genes, Tissue||none||||
||psi-mi-ontology||Include this source when loading `psi` data to fill in details of ontology terms used.  Loads the file [http://psidev.sourceforge.net/mi/psi-mi.obo psi-mi.obo file].||ontology terms||none||||
||pubmed||data from pubmed||publications||none||entire file is downloaded, only taxonIDs set in project.xml will be loaded. if nothing configured, processes all entries. From IM 1.0, gene_info won't be included||
||reactome||flat file from Reactome mart||pathways and genes||none||See [wiki:Reactome]||
||rgd-identifier||Loads [ftp://rgd.mcw.edu/pub/data_release/GENES_RAT.txt RGD genes dataset]||genes||none||Specified in [wiki:IdentifierDataSource]
||sgd-identifier||Loads [http://downloads.yeastgenome.org/curation/chromosomal_feature/SGD_features.tab Chromosomal features dataset in SGD]||genes||none||Specified in [wiki:IdentifierDataSource]
||so||This source loads no data but adds a class in the data model for every term in SOFA - a reduced version of the [http://www.sequenceontology.org sequence ontology].  SO terms represent biological features such as gene, exon, 3' UTR.  The version of SOFA we use is a little out of date.  You should include it if you are loading genome annotation.||see the SO file for complete list.||none||||
||snp||Load SNP data from a downloaded mysql database||SNPs, chromosomes||none||See [wiki:Ensembl]||
||treefam||Loads homologue data from [http://www.treefam.org TreeFam] See TreeFam||genes, homologues||'''treefam_config.properties''' - which gene identifiers are set||geneFile - location of gene file, organisms - taxonIds or organisms to process See [wiki:Homologue]||
||uniprot||Loads protein information from [http://www.uniprot.org UniProtKB] XML files.||protein sequences, lengths and molecular weights, links between proteins and genes, features located on proteins, UniProt keywords, references and comments.  This source can optionally load InterPro protein domains and GO terms||'''uniprot_config.properties''' - where to get identifiers for genes and which field should be unique ||See UniProt||
||uniprot-fasta||Loads sequences for proteins loaded in UniProt source||sequences||none||See UniProt||
||uniprot-keywords||Load definitions of UniProtKB keywords, should be included if loading data from `uniprot`.||updates uniprot keyword definitions||none||See UniProt||
||update-publications||All publications are referred to by PubMed id by other sources.  This source should be included at the end of the build.  It will query all PubMed ids from the database, fetch details from the Entrez web service and fill in Publication objects.||updates publications loaded by other sources||none||||
||wormbase-identifier||Loads worm ids from querying wormbase biomart webservice||genes||none||Specified in [wiki:IdentifierDataSource]
||zfin-identifier||Loads [http://zfin.org/downloads/ensembl_1_to_1.txt ZFIN Marker associations to Ensembl IDs dataset]||genes||none||Specified in [wiki:IdentifierDataSource]


FlyMine Specific sources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These are sources that load Drosophila specific data sets into FlyMine, we don't expect you will re-use these unless you are creating a Drosophila warehouse.  All of these sources are located in [source:trunk/bio/sources/flymine bio/sources/flymine].

 * affy-probes                         
 * anoest                       
 * anopheles-identifiers                   
 * anoph-expr               
 * arbeitman-items-xml                      
 * bdgp-clone                       
 * bdgp-insitu                                
 * drosdel-gff                       
 * drosophila-homology    
 * fly-anatomy-ontology
 * flyatlas 
 * fly-development-ontology
 * fly-fish
 * fly-misc-cvterms
 * flyreg
 * flyrnai-screens
 * homophila
 * long_oligo
 * protein_structure
 * redfly
 * rnai
 * tiffin
 * tiffin-expression
 * tiling_path

See [http://www.flymine.org/dataCategories.do FlyMine] for more information about these datasets.  Look at `flymine/project.xml` for examples of how to use these sources.
 
Other loaders
~~~~~~~~~~~~~~

These loaders were written by InterMine users.

 * CHEBI
 * Disease ontology
 * haem-atlas
 * HGNC
 * HuGE
 * Mammalian phenotypes
 * pride
 * stitch
 * omim
 * huge gwas

 











