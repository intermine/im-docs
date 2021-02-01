# Customising the default queries in your io-docs application

You can have default queries defined for your [iodocs application](https://github.com/intermine/iodocs), documenting the [Web Services](../web-services/index.md) available in InterMine, see [http://iodocs.apps.intermine.org](http://iodocs.apps.intermine.org)

To set your mine default query for the _'query/results'_ service of your mine, add it to your web.properties configuration file, e.g.

add to `webapp/src/main/webapp/WEB-INF/web.properties`

```text
services.defaults.query = <query model="genomic" view="Gene.secondaryIdentifier Gene.symbol Gene.primaryIdentifier Gene.organism.name" sortOrder="Gene.secondaryIdentifier ASC" ><constraint path="Gene.organism.name" op="=" value="Drosophila melanogaster" code="A" /></query>
```
