---
title: SPARQL endpoint support
---

Since InterMine 5.1.0, the platform provides support for building a SPARQL endpoint, which allows to query via SPARQL, the data integrated in the intermine instance.

An example which exposes data integrated in [FlyMine](https://www.flymine.org), can be found [here](https://sparql.flymine.org/).

The SPARL endpoint is based on an existing software, [Ontop](https://ontop-vkg.org/), which translates SPARQL queries into SQL queries, relying on declarative mappings which defines how to map relational schema to RDF model.

In order to generate the intermine specific mapping, run the create-R2RML-mapping postprocess.

The create-R2RML-mapping postprocess reads the genomic_model.xml file and generates the mapping.ttl file; it can be run at any time and it doesn't require any further action. You can find an example in [biotestmine](https://github.com/intermine/biotestmine/blob/master/mapping.ttl).

In the [project.xml](https://github.com/intermine/flymine/blob/master/project.xml#L437) file of FlyMine, you can find an example on how to configure the create-R2RML-mapping postprocess.
 
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

and create th file db.properties:

```markup
jdbc.url=jdbc:postgresql://localhost:5432/biotestmine #Change to your settinggs
jdbc.user=${YOUR_PGSQL_USERNAME}
jdbc.password=${YOUR_PGSQL_PASSWORD}
```

##  Run the SPARQL endpoint

```markup
./ontop endpoint -m mapping.ttl -p db.properties --port 8081
```
