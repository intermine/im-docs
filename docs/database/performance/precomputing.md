# Query performance \(precomputed tables\)

InterMine can make use of precomputed tables \(analagous to materialised views\) for faster execution of queries. These can represent any SQL query \(or InterMine query\) and can automatically be substituted into incoming queries by our own cost-based query optimiser. For example, a precompute that joins three tables could be used in a larger query that includes that join thus reducing the total number of tables joined in the query. Template queries can be precomputed completely so that for any value entered in an editable constraint, the query will be executed from a single database table.

## Template queries

### Webapp

As the superuser, when you create a new template or edit an existing one there is a 'precompute' link on the MyMine saved templates list. Clicking this will create a precomputed table for just this query. It can take some time to create the tables and requests aren't put in a queue so it is not a good idea to click many of these links at once. The 'precompute' link will change to 'precomputed' once there is a precomputed table created.

### Command line

Precomputing template queries makes sure that public templates will always run quickly. You can precompute all templates saved as the superuser in your userprofile database from the command line. This checks each template first to see if it is already precomputed.

```bash
~/git/flymine $ ./gradlew precomputeTemplates
```

## Manual specification of queries

You can specify any IQL query to precompute in the file `MINE_NAME/dbmodel/resources/genomic_precompute.properties`. These allow you to design queries you think are likely to be created commonly or be parts of larger queries. It is the place to put queries that will be used in list upload and widgets to ensure they run fast.

```bash
~/git/flymine $ ./gradlew precomputeQueries
```

Here is an example query:

```sql
precompute.query.6 = 
 SELECT a1_.id AS a3_, a2_.name AS a4_ 
 FROM org.intermine.model.bio.Protein AS a1_, org.intermine.model.bio.Organism AS a2_ 
 WHERE a1_.organism CONTAINS a2_
```

You can also specify the classes involved:

```text
precompute.constructquery.20 = Protein organism Organism
```

## Dropping precomputed tables

To drop all precomputed tables in a database:

```bash
~/git/flymine $ ./gradlew dropPrecomputedTables
```

## Size of precomputed tables

You can see the names and sizes of all precomputed tables by running this SQL query in psql:

```sql
SELECT relname,category,pg_size_pretty(pg_relation_size(oid)) 
FROM pg_class, precompute_index 
WHERE relname NOT LIKE 'pg_%' and relname = name 
ORDER BY pg_relation_size(oid) DESC;
```

Note that this only lists the table sizes, there may be many indexes associated with each table which may also be large. To see the size of all tables and indexes in the database use:

```sql
SELECT relname,pg_size_pretty(pg_relation_size(oid)) 
FROM pg_class 
WHERE relname NOT LIKE 'pg_%' 
ORDER BY pg_relation_size(oid) DESC;
```

## Template Summaries

After the templates are precomputed, they are "summarised". This means any dropdowns for the templates will be updated to only include valid values for that specific templates. Here's how it's done:

* All editable constraints are dropped, non-editable constraints are kept
* Valid values \(summaries\) for dropdowns are recalculated

For example, if you have a template with an option to select a chromosome, all chromosomes in the database will be displayed. However if you have a non-editable constraint setting the value of the organism to be human, only the human chromosomes will be displayed after summarisation.

## FAQs

### How do you know what to put in the precomputes file?

This is what we did for FlyMine:

1. Common joins to be done, e.g. Gene to protein
2. Widgets - see what queries the widgets are running, add those queries
3. Problem areas being reported, certain queries being slower than expected, e.g. interaction queries

These three things, along with precomputing templates, seem to work best.

Ideally we would have some sort of query profiling and would be able to tell where precomputing helps.

### How do you tell if what you put in there is actually helping?

When the query is logged, it gives the execution time as well:

&gt; bag tables: 0 ms, generate: 1 ms, optimise: 0 ms, ms, estimate: 9 ms, execute: 61 ms, convert results: 7 ms, extra queries: 0 ms, total: 78 ms, rows: 806

This lets you compare query speeds. You can tell the query used a precomputed table by checking the logs for the prefix `precomp_`

### Were all these queries \(in the flymine file\) created by hand?

No. We ran all of our analysis tools on the list analysis page, e.g GO enrichment widget and captured the queries being run via the logs.

### PostgreSQL is not using my precomputed table when running a query. Help!

1. You must restart Tomcat after you have created all of the precomputed tables or else your new tables won't be used
2. PostgreSQL uses EXPLAIN to decide which query is fastest. If using your table isn't going to be faster, it won't use it. PostgreSQL may be wrong, but that's how it decides which table to use. See

   [http://www.postgresql.org/docs/9.2/static/using-explain.html](http://www.postgresql.org/docs/9.2/static/using-explain.html) for

   details.

## A Log Entry

The LOG records three queries:

1. the IQL \(InterMine Query Language\) query
2. the generated SQL query
3. the optimised query &lt;-- this is where you will see your precomputed tables used

### IQL

```text
2013-10-30 16:59:24 INFO                              sqllogger     - (VERBOSE) iql: SELECT DISTINCT a7_, a2_, a3_, a8_, a5_, a6_ FROM org.intermine.model.bio.Interaction AS a1_, org.intermine.model.bio.Gene AS a2_, org.intermine.model.bio.InteractionDetail AS a3_, org.intermine.model.bio.InteractionExperiment AS a4_, org.intermine.model.bio.InteractionTerm AS a5_, org.intermine.model.bio.Publication AS a6_, org.intermine.model.bio.Gene AS a7_, org.intermine.model.bio.InteractionTerm AS a8_ WHERE (a1_.gene2 CONTAINS a2_ AND a1_.details CONTAINS a3_ AND a3_.experiment CONTAINS a4_ AND a3_.relationshipType CONTAINS a5_ AND a4_.publication CONTAINS a6_ AND a1_.gene1 CONTAINS a7_ AND a4_.interactionDetectionMethods CONTAINS a8_ AND a7_.id IN ? AND a2_.id IN ?) ORDER BY a7_.symbol, a2_.symbol, a3_.name, a3_.role1, a3_.role2, a3_.type, a8_.name, a5_.name, a6_.pubMedId 1: [1007850] 2: [2848406]
```

### Generated SQL

```text
generated sql: SELECT DISTINCT a7_.id AS a7_id, a2_.id AS a2_id, a3_.id AS a3_id, a8_.id AS a8_id, a5_.id AS a5_id, a6_.id AS a6_id, a7_.symbol AS orderbyfield1, a2_.symbol AS orderbyfield2, a3_.name AS orderbyfield3, a3_.role1 AS orderbyfield4, a3_.role2 AS orderbyfield5, a3_.type AS orderbyfield6, a8_.name AS orderbyfield7, a5_.name AS orderbyfield8, a6_.pubMedId AS orderbyfield9 FROM Interaction AS a1_, Gene AS a2_, InteractionDetail AS a3_, InteractionExperiment AS a4_, InteractionTerm AS a5_, Publication AS a6_, Gene AS a7_, InteractionTerm AS a8_, InteractionDetectionMethodsInteractionExperiment AS indirect0 WHERE a1_.gene2Id = a2_.id AND a1_.id = a3_.interactionId AND a3_.experimentId = a4_.id AND a3_.relationshipTypeId = a5_.id AND a4_.publicationId = a6_.id AND a1_.gene1Id = a7_.id AND a4_.id = indirect0.InteractionExperiment AND indirect0.InteractionDetectionMethods = a8_.id AND a7_.id IN (1007850) AND a2_.id IN (2848406) ORDER BY a7_.symbol, a2_.symbol, a3_.name, a3_.role1, a3_.role2, a3_.type, a8_.name, a5_.name, a6_.pubMedId, a7_.id, a2_.id, a3_.id, a8_.id, a5_.id, a6_.id LIMIT 5000
```

### Optimised sql

```text
optimised sql: SELECT DISTINCT P98.a1_id AS a7_id, P98.a3_id AS a2_id, P96.id AS a3_id, a8_.id AS a8_id, a5_.id AS a5_id, a6_.id AS a6_id, P98.a1_symbol AS orderbyfield1, P98.a3_symbol AS orderbyfield2, P96.name AS orderbyfield3, P96.role1 AS orderbyfield4, P96.role2 AS orderbyfield5, P96.type AS orderbyfield6, a8_.name AS orderbyfield7, a5_.name AS orderbyfield8, a6_.pubMedId AS orderbyfield9 FROM precomp_45503 AS P98, InteractionDetail AS P96, InteractionExperiment AS P97, InteractionTerm AS a5_, Publication AS a6_, InteractionTerm AS a8_, InteractionDetectionMethodsInteractionExperiment AS indirect0 WHERE P98.a2_id = P96.interactionId AND P96.experimentId = P97.id AND P96.relationshipTypeId = a5_.id AND P97.publicationId = a6_.id AND P97.id = indirect0.InteractionExperiment AND indirect0.InteractionDetectionMethods = a8_.id AND P98.a1_id IN (1007850) AND P98.a3_id IN (2848406) ORDER BY P98.a1_symbol, P98.a3_symbol, P96.name, P96.role1, P96.role2, P96.type, a8_.name, a5_.name, a6_.pubMedId, P98.a1_id, P98.a3_id, P96.id, a8_.id, a5_.id, a6_.id LIMIT 5000
```

bag tables: 0 ms, generate: 1 ms, optimise: 0 ms, ms, estimate: 14 ms, execute: 11 ms, convert results: 0 ms, extra queries: 27 ms, total: 53 ms, rows: 1

Note the `FROM` clause now includes `precomp_45503`. You can query for this name in the database:

```sql
select * from precompute_index where name ='precomp_45503';
```

You can also run IQL queries directly in the console:

```bash
~/git/flymine $ ./gradlew runIQLQuery -Pquery='some IQL'
```
