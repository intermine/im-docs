# Id Resolvers

The ID resolver uses the files in the specified directory to create a large map. The key for the map is the unique identifier \(the MOD ID, for example the MGI:, RGD, FBgn, ZFIN: identifiers\). The values in the map are all the symbols, old identifiers, dbxrefs \(e.g. Ensembl\).

unique gene identifier symbol, name, ensembl ID ... MGI:97490 pax6, paired box gene 6 ...

The ID resolver then uses this map to replace old or non-unique identifiers with the unique identifier. This allows genes to be merged correctly into the database, and lets each mine be interoperable with other friendly mines.

The ID resolver is used in several data sources, Homologene for example.

If you look at the Homologene data, you\'ll see they don\'t use the MGI identifier. See:

1212 10090 18508 Pax6 7305369 NP\_038655.1 1212 10116 25509 Pax6 6981334 NP\_037133.1

When parsing the Homologene data file, the ID resolver replaces the symbol \"Pax6\" with the MGI identifier. The parser sets MGI:97490 to be the primary identifier then stores the gene to the database. Similarly, it replaces Pax6 with \"RGD:3258\" for the rat gene. And so on.

## ID resolvers available in InterMine

EntrezGeneIdResolverFactory NCBI gene info for a collection of organisms [ftp://ftp.ncbi.nih.gov/gene/DATA/gene\_info.gz](ftp://ftp.ncbi.nih.gov/gene/DATA/gene_info.gz) FlyBaseIdResolverFactory flybase chado db, for \'\'D.melanogaster\'\' only [ftp://ftp.flybase.net/releases/current/psql](ftp://ftp.flybase.net/releases/current/psql) flybase chado WormBaseChadoIdResolverFactory wormbase chado db, for \'\'C.elegans\'\' only modENCODE specific ZfinIdentifiersResolverFactory zebrafish ids [http://zfin.org/downloads/identifiersForIntermine.txt](http://zfin.org/downloads/identifiersForIntermine.txt) MgiIdentifiersResolverFactory mouse ids [ftp://ftp.informatics.jax.org/pub/reports/MRK\_List2.rpt](ftp://ftp.informatics.jax.org/pub/reports/MRK_List2.rpt) RgdIdentifiersResolverFactory rat ids [ftp://rgd.mcw.edu/pub/data\_release/GENES\_RAT.txt](ftp://rgd.mcw.edu/pub/data_release/GENES_RAT.txt) HgncIdResolverFactory HGNC human gene ids [http://www.genenames.org/cgi-bin/hgnc\_downloads.cgi](http://www.genenames.org/cgi-bin/hgnc_downloads.cgi) EnsemblIdResolverFactory Ensembl id customised HumanIdResolverFactory human ids customised

## Using ID Resolvers in InterMine data converters

Many data converters use the Entrez \(NCBI\) Gene ID resolver:

1. Download the identifier file -

   [ftp://ftp.ncbi.nih.gov/gene/DATA/gene\_info.gz](ftp://ftp.ncbi.nih.gov/gene/DATA/gene_info.gz)

2. Unzip the file to \[/DATA\_DIR/ncbi/gene\_info\]{.title-ref}
3. Create a sub directory \[/DATA\_DIR/idresolver/\]{.title-ref} as file

   root path and a symbolic link \[entrez\]{.title-ref} to the file

```text
$ cd /DATA_DIR/idresolver/
$ ln -s /DATA_DIR/ncbi/gene_info entrez
```

1. Add the root path to the file in

   \[~/.intermine/MINE.properties\]{.title-ref}

```text
resolver.file.rootpath=/DATA_DIR/idresolver/
```

Id resolvers and corresponding symbolic to data file:

Resolver Symbolic link

EntrezGeneIdResolverFactory entrez WormBaseChadoIdResolverFactory wormid ZfinIdentifiersResolverFactory zfin MgiIdentifiersResolverFactory mgi RgdIdentifiersResolverFactory rgd HgncIdResolverFactory hgnc EnsemblIdResolverFactory ensembl HumanIdResolverFactory humangene

In the data converter, the ID resolver is given an identifier. The resolver then looks in the map for the identifier.

number of matches returns

0 NULL 1 new identifier &gt;1 NULL

## Using ID Resolvers in your data converters

A factory will find data root path from \[~/.intermine/MINE\_NAME.properties\]{.title-ref}, path needs to be absolute.

```text
resolver.file.rootpath=/DATA_DIR/idresolver/
```

the key and the symbolic link of the data file need to be hard-coded in factory class, e.g. in \[EntrezGeneIdResolverFactory\]{.title-ref}

```text
private final String propKey = "resolver.file.rootpath";
private final String resolverFileSymbo = "entrez";
```

As for database case, e.g. flybase chado

```text
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
```

the key also needs to be hard-coded in factory class, e.g. in FlyBaseIdResolverFactory

```text
private final String propName = "db.flybase";
```

### Configuration

The Entrez gene identifier source has a configuration file, \[entrezIdResolver\_config.properties\]{.title-ref}. You shouldn\'t have to edit this file.

This config will parse fruit fly identifiers, e.g. FLYBASE:FBgn0088803

```text
7227.primaryIdentifier.xref=FLYBASE
```

If you don\'t want to strip the prefix from the identifier, use this config:

```text
10116.primaryIdentifier.prefix=RGD:
10090.primaryIdentifier.prefix=MGI:
```

::: {.warning} ::: {.title} Warning :::

The EBI changed how they format their data. If you have a recent data file, you do NOT want the above configuration for MGI. :::

To replace a taxonomy identifier with a strain, use the following:

```text
4932.strains=559292
```

To ignore certain organisms, do this:

```text
taxon.ignored = 7165,6239
```

### IdResolverService

IdResolverService is a java class providing static methods to get id resolver directly. It\'s also the most straight forward way to create an id resolver. For example, to create a fish id resolver by taxon id in a converter:

```text
IdResolver rslvr = IdResolverService.getIdResolverByOrganism("7955");
```

You can use the IdResolverService to create resolver by taxon id, a list of taxon ids, or by organism, e.g.

```text
IdResolver flyRslvr = IdResolverService.getFlyIdResolver();
```

### Resolve an Id

As the resolver maintains java maps of one or more organisms\' identifiers, you must explicitly tell it which organism you want it to resolve for, e.g.

```text
String pid = flyRslvr.resolveId(taxonId, identifier).iterator().next();
```

It is also possible there are two or more matching primary identifiers for a particular identifier, in this case, discard this identifier, e.g.

```text
int resCount = flyRslvr.countResolutions(taxonId, identifier);
if (resCount  = 1) {
  LOG.info("RESOLVER: failed to resolve fly gene to one identifier, ignoring gene: "
          + identifier + " count: " + resCount + " FBgn: "
          + flyRslvr.resolveId(taxonId, identifier));
  return null;
}
```

## Writing a New ID resolver

An IdResolver factory will create an IdResolver which will read and parse data from a file or database containing identifier information, to save them to a Java map which will be writen to a cached file.

The new factory class need to inherit super class IdResolverFactory:

```text
public class HumanIdResolverFactory extends IdResolverFactory
```

createIdResolver method:

```text
// 1. check if the resolver which has the taxon and class has already been created
resolver.hasTaxonAndClassName(taxonId, this.clsCol.iterator().next())

// 2. Restore cached data from file. New data will be append to the cached file.
boolean isCachedIdResolverRestored = restoreFromFile(); 

// 3. To implement reading and parsing data from a customized file/db, see createFromFile method and createFromDb method.
```

createFromFile method:

```text
// Ref HumanIdResolverFactory.java
// Parse a tab delimited file. Add to resolver.
String symbol = line[0];

resolver.addMainIds(taxonId, symbol, Collections.singleton(symbol));
```

createFromDb method:

```text
// Ref FlyBaseIdResolverFactory.java
// 1. Set db connection parameters in MINE.properties, scroll up to see flybase chado setting.
// 2. Connect to the database and query the data.
// 3. Parse ResultSet, addIdsFromResultSet method
```

Multiple taxon ids:

```text
// Ref EntrezGeneIdResolverFactory.java
public IdResolver getIdResolver(Set<String> taxonIds) {
      if (taxonIds == null || taxonIds.isEmpty()) {
          return null;
      }
      return getIdResolver(taxonIds, true);
}
```

Multiple classes:

```text
// Ref FlyBaseIdResolverFactory.java
public FlyBaseIdResolverFactory(Set<String> clsCol) {
    // clsCol is set in parent class IdResolverFactory.java  
    this.clsCol = clsCol;
}
```

Multiple files or mixture of file and db:

```text
// We don't have an example to handle muliple files, but one can always add them and parse them one by one.
// We have an example of handling db and file together, ref WormBaseIdResolverFactory.java
```

Add resolver factory to IdResolverService:

```text
// Ref IdResolverService.java
public static IdResolver getHumanIdResolver() {
    return new HumanIdResolverFactory().getIdResolver(false);
}

public static IdResolver getHumanIdResolver(boolean failOnError) {
    return new HumanIdResolverFactory().getIdResolver(failOnError);
}
```

## Future Plans

* generalized resolver factory which will read a configuration file to

  be aware identifier information by column. e.g. type=tab,

  column.0=mainId, etc.

::: {.index} identifiers, old identifiers, resolvers :::

