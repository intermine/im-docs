Data files to integrate
~~~~~~~~~~~~~~~~~~~~~~~

All data required to build an InterMine is included in [source:trunk/bio/tutorial/malariamine/malaria-data.tar.gz bio/tutorial/malariamine/malaria-data.tar.gz].  Copy this file to your local directory and extract from the archive.

.. code-block:: bash

	cp bio/tutorial/malariamine/malaria-data.tar.gz DATA_DIR
	cd DATA_DIR
	tar -zxvf malaria-data.tar.gz

Edit the project.xml file so that all occurances of ''DATA_DIR'' point to the your local data directory location. 

Data sources
^^^^^^^^^^^^^

malaria-genome
""""""""""""""""

The malaria genome as gff3 and fasta, originally downloaded from PlasmoDB

uniprot
""""""""""""""""

UniProt XML with protein information and sequences from SwissProt and Trembl.  Downloaded from: http://www.ebi.ac.uk/uniprot/database/download.html and filtered on taxon id 36329.

gene_ontology
""""""""""""""""

The Gene Ontology structure.  Downloaded from http://www.geneontology.org/

go_annotation
""""""""""""""""
GO term assignments for ''P. falciparum''.  Downloaded from http://www.geneontology.org/
