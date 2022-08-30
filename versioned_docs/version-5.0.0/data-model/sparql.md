---
title: SPARQL endpoint support
---

Since InterMine 5.1.0, the platform supports the building of SPARQL endpoint, which allows to query the data integrated in the intermine instance using SPARQL language.
An example can be found here: [https://sparql.flymine.org/]([https://sparql.flymine.org/)

The SPARL endpoint is based on an existing software, [Ontop](https://ontop-vkg.org/), which translates SPARQL queries into SQL queries, relying on declarative mappings which defines how to map relational schema to RDF model.
In order to generate the mapping specific for an intermine instance, run the create-R2RML-mapping postprocess. It will generate a file mapping.ttl.

An example of configuration can be found in [flymine](https://github.com/intermine/flymine/blob/master/project.xml#L437).
 
## Install Ontop

```markup
mkdir ontop-cli
cd ontop-cli

wget "https://github.com/ontop/ontop/releases/download/ontop-4.0.3/ontop-cli-4.0.3.zip"
unzip ontop-cli-4.0.3.zip
```

Because InterMine uses postgresql, download the JDBC driver:

```markup
cd jdbc
wget "https://jdbc.postgresql.org/download/postgresql-42.2.18.jar"
```

And create a file db.properties

```markup
jdbc.url=jdbc:postgresql://localhost:5432/biotestmine #Change to your settinggs
jdbc.user=${YOUR_PGSQL_USERNAME}
jdbc.password=${YOUR_PGSQL_PASSWORD}
```

##  Run the SPARQL endpoint
./ontop endpoint -m mapping.ttl -p db.properties --port 8081
