KEGG
================================


Types of data loaded
--------------------

genes, proteins, interactions 

How to download the data 
---------------------------

Genetic and protein interaction data from BioGRID  

How to load the data into your mine
--------------------------------------

project XML example


||kegg-pathway||Link genes to [http://www.genome.jp/kegg/ KEGG pathways] that they operate in.||pathways, genes||'''kegg_config.properties''' - which gene identifier fields are populated, mapping from organism taxonId to abbreviation||only taxonIds specified in project.xml file are downloaded, if no taxonIds are configured, all are loaded.||