Id Resolvers
==================================

ID resolvers hold data of identifiers, synonyms and cross references for a particular class (e.g. gene). The ID resolver provides methods to resolve any identifier to the unique primary identifier.

ID resolvers available in InterMine: 

==============================  =============================================  ============================================================================================
EntrezGeneIdResolverFactory     NCBI gene info for a collection of organisms   ftp://ftp.ncbi.nih.gov/gene/DATA/gene_info.gz 
FlyBaseIdResolverFactory        flybase chado db, for ''D.melanogaster'' only  ftp://ftp.flybase.net/releases/current/psql flybase chado
WormBaseChadoIdResolverFactory  wormbase chado db, for ''C.elegans'' only      modENCODE specific
ZfinIdentifiersResolverFactory  zebrafish ids                                  http://zfin.org/downloads/identifiersForIntermine.txt
MgiIdentifiersResolverFactory   mouse ids                                      ftp://ftp.informatics.jax.org/pub/reports/MRK_List2.rpt 
RgdIdentifiersResolverFactory   rat ids                                        ftp://rgd.mcw.edu/pub/data_release/GENES_RAT.txt 
HgncIdResolverFactory           HGNC human gene ids                            http://www.genenames.org/cgi-bin/hgnc_downloads.cgi 
EnsemblIdResolverFactory        Ensembl id                                     customised
HumanIdResolverFactory          human ids                                      customised
==============================  =============================================  ============================================================================================

Using ID Resolvers in  InterMine data converters
----------------------------------------------------

Many data converters use the Entrez (NCBI) Gene ID resolver:

1. Download the identifier file - ftp://ftp.ncbi.nih.gov/gene/DATA/gene_info.gz
2. Unzip the file to `/DATA_DIR/ncbi/gene_info`
3. Create a sub directory `/DATA_DIR/idresolver/` as file root path and a symbolic link `entrez` to the file

.. code-block:: bash

  $ cd /DATA_DIR/idresolver/
  $ ln -s /DATA_DIR/ncbi/gene_info entrez 

4. Add the root path to the file in `~/.intermine/MINE.properties`

.. code-block:: properties

  resolver.file.rootpath=/DATA_DIR/idresolver/


Id resolvers and corresponding symbolic to data file:

==============================  =============
Resolver                        Symbolic link
==============================  =============
EntrezGeneIdResolverFactory     entrez        
WormBaseChadoIdResolverFactory  wormid
ZfinIdentifiersResolverFactory  zfin
MgiIdentifiersResolverFactory   mgi
RgdIdentifiersResolverFactory   rgd
HgncIdResolverFactory           hgnc 
EnsemblIdResolverFactory        ensembl
HumanIdResolverFactory          humangene   
==============================  =============


In the data converter, the ID resolver is given an identifier. The resolver then looks in the map for the identifier.

=================  ============
number of matches  returns
=================  ============
0                  NULL
1                  new identifier
>1                 NULL
=================  ============


Using ID Resolvers in your data converters
-----------------------------------------------------

A factory will find data root path from `~/.intermine/MINE_NAME.properties`, path needs to be absolute.

.. code-block:: properties

  resolver.file.rootpath=/DATA_DIR/idresolver/


the key and the symbolic link of the data file need to be hard-coded in factory class, e.g. in  `EntrezGeneIdResolverFactory`

.. code-block:: java

  private final String propKey = "resolver.file.rootpath";
  private final String resolverFileSymbo = "entrez";

As for database case, e.g. flybase chado

.. code-block:: properties

  # chado DB for flybase data

  db.flybase.datasource.class=org.postgresql.jdbc3.Jdbc3PoolingDataSource
  db.flybase.datasource.dataSourceName=db.flybase
  db.flybase.datasource.serverName=NAME
  db.flybase.datasource.databaseName=DBNAME
  db.flybase.datasource.user=USER
  db.flybase.datasource.password=PWD
  db.flybase.datasource.maxConnections=10
  db.flybase.driver=org.postgresql.Driver
  db.flybase.platform=PostgreSQL

the key also needs to be hard-coded in factory class, e.g. in  FlyBaseIdResolverFactory

.. code-block:: java

  private final String propName = "db.flybase";


IdResolverService
~~~~~~~~~~~~~~~~~~~~~

IdResolverService is a java class providing static methods to get id resolver directly. It's also the most straight forward way to create an id resolver. For example, to create a fish id resolver by taxon id in a converter:

.. code-block:: java

  IdResolver rslvr = IdResolverService.getIdResolverByOrganism("7955");

You can use the IdResolverService to create resolver by taxon id, a list of taxon ids, or by organism, e.g.

.. code-block:: java

  IdResolver flyRslvr = IdResolverService.getFlyIdResolver();

Resolve an Id
~~~~~~~~~~~~~~~~~~~~~~~~~~

As the resolver maintains java maps of one or more organisms' identifiers, you must explicitly tell it which organism you want it to resolve for, e.g.

.. code-block:: java

  String pid = flyRslvr.resolveId(taxonId, identifier).iterator().next();

It is also possible there are two or more matching primary identifiers for a particular identifier, in this case, discard this identifier, e.g.

.. code-block:: java

  int resCount = flyRslvr.countResolutions(taxonId, identifier);
  if (resCount  = 1) {
    LOG.info("RESOLVER: failed to resolve fly gene to one identifier, ignoring gene: "
            + identifier + " count: " + resCount + " FBgn: "
            + flyRslvr.resolveId(taxonId, identifier));
    return null;
  }

Writing a New ID resolver
------------------------------------

An IdResolver factory will create an IdResolver which will read and parse data from a file or database containing identifier information, to save them to a Java map which will be writen to a cached file. 

The new factory class need to inherit super class IdResolverFactory:

.. code-block:: java

  public class HumanIdResolverFactory extends IdResolverFactory

createIdResolver method:

.. code-block:: java

  // 1. check if the resolver which has the taxon and class has already been created
  resolver.hasTaxonAndClassName(taxonId, this.clsCol.iterator().next())
  
  // 2. Restore cached data from file. New data will be append to the cached file.
  boolean isCachedIdResolverRestored = restoreFromFile(); 
 
  // 3. To implement reading and parsing data from a customized file/db, see createFromFile method and createFromDb method.
  
createFromFile method:

.. code-block:: java

  // Ref HumanIdResolverFactory.java
  // Parse a tab delimited file. Add to resolver.
  String symbol = line[0];

  resolver.addMainIds(taxonId, symbol, Collections.singleton(symbol));

createFromDb method:

.. code-block:: java
  
  // Ref FlyBaseIdResolverFactory.java
  // 1. Set db connection parameters in MINE.properties, scroll up to see flybase chado setting.
  // 2. Connect to the database and query the data.
  // 3. Parse ResultSet, addIdsFromResultSet method 

Multiple taxon ids:

.. code-block:: java

  // Ref EntrezGeneIdResolverFactory.java
  public IdResolver getIdResolver(Set<String> taxonIds) {
        if (taxonIds == null || taxonIds.isEmpty()) {
            return null;
        }
        return getIdResolver(taxonIds, true);
  }

Multiple classes:

.. code-block:: java

  // Ref FlyBaseIdResolverFactory.java
  public FlyBaseIdResolverFactory(Set<String> clsCol) {
      // clsCol is set in parent class IdResolverFactory.java  
      this.clsCol = clsCol;
  }

Add resolver factory to IdResolverService:

.. code-block:: java

  // Ref IdResolverService.java
  public static IdResolver getHumanIdResolver() {
      return new HumanIdResolverFactory().getIdResolver(false);
  }

  public static IdResolver getHumanIdResolver(boolean failOnError) {
      return new HumanIdResolverFactory().getIdResolver(failOnError);
  }

Future Plans
-----------------------------------

* generalized resolver factory which will read a configuration file to be aware identifier information by column. e.g. type=tab, column.0=mainId, etc.

.. index:: identifiers, old identifiers, resolvers
