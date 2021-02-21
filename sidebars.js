module.exports = {
  someSidebar: {
  	'System Requirements': ['system-requirements/index',  		
  	   {Hardware: ['system-requirements/hardware/index', 
  				   'system-requirements/hardware/solaris'],
  		Software: ['system-requirements/software/index',
  				   'system-requirements/software/git', 
  				   'system-requirements/software/java',
  				   'system-requirements/software/perl',  				   
  				   {PostgreSQL: ['system-requirements/software/postgres/index',
  				   				 'system-requirements/software/postgres/postgres',
  				   				 'system-requirements/software/postgres/hikari']},
  				   'system-requirements/software/tomcat',
  				   'system-requirements/software/macs',
  				   'system-requirements/software/maven',
  				   'system-requirements/software/intellij',
  				   'system-requirements/software/solr',	
  				   {Gradle: ['system-requirements/software/gradle/index',
  				   			 'system-requirements/software/gradle/faqs']}]}],

  	'Get started': ['get-started/index',
  					'get-started/tutorial/index',
  					'get-started/tutorial/webapp',
  					'get-started/tutorial/test-data',
  					'get-started/quick-start',
  					'get-started/create-your-mine',
  					'get-started/testmine',
  					'get-started/intermine-tests'],

  	InterMine: ['intermine/index',
  				'intermine/intermine',
  				'intermine/upgrade',
  				'intermine/roadmap',
  				'intermine/intermine-versions',
  				'intermine/get-involved',
  				'intermine/https',
  				'intermine/amazon'],

  	'Data Model': ['data-model/index',
  				   'data-model/overview',
  				   'data-model/model',
  				   'data-model/data-labels',
  				   'data-model/overlaps',
  				   'data-model/model-ontologies'],

  	Database: ['database/index',
  			   'database/download-scripts',
  			   {'Data Sources': ['database/data-sources/index',
  			   					 {'Data Source Library': ['database/data-sources/library/index',
  			   					 						  {'Gene Ontology': ['database/data-sources/library/go/index',
  			   					 											 'database/data-sources/library/go/go-annotation',
  			   					 											 'database/data-sources/library/go/go-obo']},
  			   					 						  {'Homologue Data Sources': ['database/data-sources/library/homologues/index',
  			   					 							 						  'database/data-sources/library/homologues/treefam',
  			   					 							 						  'database/data-sources/library/homologues/homologene',
  			   					 							 						  'database/data-sources/library/homologues/orthodb',
  			   					 							 						  'database/data-sources/library/homologues/panther',
  			   					 							 						  'database/data-sources/library/homologues/compara']},
  			   					 						  {Interactions: ['database/data-sources/library/interactions/index',
  			   					 				 						  'database/data-sources/library/interactions/biogrid',
  			   					 				 						  'database/data-sources/library/interactions/intact',
  			   					 				 						  'database/data-sources/library/interactions/intact-complexes',
  			   					 				 						  'database/data-sources/library/interactions/psi-mi-ontology']},
  			   					 						  {'Pathway data sources': ['database/data-sources/library/pathways/index',
  			   					 						   							'database/data-sources/library/pathways/kegg',
  			   					 						   							'database/data-sources/library/pathways/reactome']},
  			   					 						  {Proteins: ['database/data-sources/library/proteins/index',
  			   					 			 						  'database/data-sources/library/proteins/uniprot',
  			   					 			 						  'database/data-sources/library/proteins/interpro']},
  			   					 						  {Publications: ['database/data-sources/library/publications/index',
  			   					 				 						  'database/data-sources/library/publications/pubmed',
  			   					 				 						  'database/data-sources/library/publications/publications']},
  			   					 						  'database/data-sources/library/ncbi-gene',
  			   					 						  'database/data-sources/library/chado',
						  			   					  'database/data-sources/library/fasta',
						  			   					  'database/data-sources/library/gff',
						  			   					  'database/data-sources/library/identifiers/index',
						  			   					  'database/data-sources/library/intermine-items-xml',
						  			   					  'database/data-sources/library/omim',
						  			   					  'database/data-sources/library/organism',
						  			   					  'database/data-sources/library/so',
						  			   					  'database/data-sources/library/uberon',
						  			   					  'database/data-sources/library/data-sources',
						  			   					  'database/data-sources/library/data-sets',
						  			   					  'database/data-sources/library/variation/vcf']},
						  		 'database/data-sources/custom/index',
						  		 {'InterMine Items XML': ['database/data-sources/apis/index',
						  		 						  'database/data-sources/apis/java-items-api',
						  		 						  'database/data-sources/apis/perl-items-api',
						  		 						  'database/data-sources/apis/python-items-api']},
						  		 'database/data-sources/id-resolvers',
						  		 'database/data-sources/data-licences']},
			   {'Database Building': ['database/database-building/index',
			   						  'database/database-building/build-script',
			   						  'database/database-building/project-xml',
			   						  'database/database-building/data-integration',
			   						  'database/database-building/model-merging',
			   						  'database/database-building/primary-keys',
			   						  'database/database-building/priority-config',
			   						  'database/database-building/post-processing/index',
			   						  'database/database-building/post-build-updating-with-sql-triggers',
			   						  'database/database-building/debugging']},
			   {'Data Integrity Checks': ['database/data-integrity-checks/index',
			   							  'database/data-integrity-checks/template-comparison',
			   							  'database/data-integrity-checks/acceptance-tests']},
			   {'InterMine performance': ['database/performance/index',
			   							  'database/performance/data-loading',
			   							  'database/performance/precomputing',
			   							  'database/performance/configuration']}],

  	'Guide to Customising your Web Application': ['webapp/blue-genes/index',
  												  'webapp/homepage/index',
  												  {'Report Page': ['webapp/report-page/index',
  												  				   'webapp/report-page/report-page',
  												  				   'webapp/report-page/report-displayers',
  												  				   'webapp/report-page/report-displayers-examples',
  												  				   'webapp/report-page/webapp-tables']},
  												  {Lists: ['webapp/lists/index',
  												  		   'webapp/lists/lists-page',
  												  		   'webapp/lists/list-upload',
  												  		   'webapp/lists/list-upgrade',
  												  		   'webapp/lists/list-analysis/index',
  												  		   {'List Widgets': ['embedding/list-widgets/index',
  												  		   					 'embedding/list-widgets/q-and-a',
  												  		   					 'embedding/list-widgets/enrichment-widgets']}]},
  												  'webapp/template-queries/index',
  												  'webapp/query-results/index',
  												  'webapp/query-builder/index',
  												  'webapp/keyword-search/index',
  												  'webapp/layout/index',
  												  'webapp/region-search/index',
  												  {'Customise Web Application': ['webapp/properties/index',
  												  								 'webapp/properties/intermine-properties',
  												  								 'webapp/properties/model-properties',
  												  								 'webapp/properties/web-properties',
  												  								 'webapp/properties/webconfig-model',
  												  								 'webapp/properties/class-keys',
  												  								 'webapp/properties/javascript-options']},
  												  'webapp/data-categories/index',
  												  'webapp/markup/index',
  												  'webapp/help/index',
  												  'webapp/linking-in/index',
  												  {'Third party tools': ['webapp/third-party-tools/index',
  												  						 'webapp/third-party-tools/cytoscape',
  												  						 'webapp/third-party-tools/esyn',
  												  						 'webapp/third-party-tools/galaxy',
  												  						 'webapp/third-party-tools/gbrowse',
  												  						 'webapp/third-party-tools/heatmap',
  												  						 'webapp/third-party-tools/jbrowse']},


  												  {'Monitoring Site Usage': ['webapp/monitoring-site-usage/index',
  												  							 'webapp/monitoring-site-usage/google-analytics',
  												  							 'webapp/monitoring-site-usage/trackers',
  												  							 'webapp/monitoring-site-usage/search-engines']},
  												  'webapp/admin/index',
  												  {'User Accounts': ['webapp/user-accounts/index',
  												  					 'webapp/user-accounts/userprofile',
  												  					 'webapp/user-accounts/open-id']},
  												  'webapp/performance/index',

  												  'webapp/diagnostic/index',
  												  'webapp/javadoc/index',
  												  'webapp/permanent-url/index',
  												  'webapp/iodocs',
  												  'webapp/frictionless/index'],

  	'Web Services': ['web-services/index'],

  	'Embedding InterMine Components': ['embedding/index',
  									   {'List Widgets': ['embedding/list-widgets/index',
  												  		 'embedding/list-widgets/q-and-a',
  												  		 'embedding/list-widgets/enrichment-widgets']},
  									   {'Apps/C Grunt Build': ['embedding/apps-c/index',
  									   						  'embedding/apps-c/usage',
  									   						  'embedding/apps-c/publication-search',
  									   						  'embedding/apps-c/elastic-med']},
  									   'embedding/api-loader',
  									   'embedding/imjs',
  									   'embedding/examples'],

  	'InterMine API Description': ['api/index',
  								  'api/pathquery'],

  	Support: ['support/index',
  			  'support/mailing-list',
  			  'support/troubleshooting-tips'],

    'About Us': ['about/index',
    			 'about/contact-us',
    			 'about/privacy-policy'],

    'InterMine Video Tutorial Collection': ['help/index'],
    Style: ['doc1']
  },
};