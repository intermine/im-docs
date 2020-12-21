---
title: Customising the default queries in your io-docs application
---

You can have default queries defined for your [iodocs
application](https://github.com/intermine/iodocs) documenting the
`../web-services/index`{.interpreted-text role="doc"} available in
InterMine, see <http://iodocs.apps.intermine.org>

To set your mine default query for the *\'query/results\'* service of
your mine, add it to your web.properties configuration file, e.g.

add to `webapp/src/main/webapp/WEB-INF/web.properties`

    services.defaults.query = <query model="genomic" view="Gene.secondaryIdentifier Gene.symbol Gene.primaryIdentifier Gene.organism.name" sortOrder="Gene.secondaryIdentifier ASC" ><constraint path="Gene.organism.name" op="=" value="Drosophila melanogaster" code="A" /></query>
