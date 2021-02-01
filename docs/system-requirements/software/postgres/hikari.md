# HikariCP and InterMine settings

InterMine now uses [HikariCP](https://github.com/brettwooldridge/HikariCP) as its default JDBC connection pool. If this is not available, InterMine will use the default PostgreSQL distribution, `PGPoolingDataSource`.

The maximum number of connections allocated to a database, set in the properties files, is now reserved at the start and it is a ceiling to the number of connections a database can reach. As a consequence, setting for the previously used connection pool could exhaust the PostgreSQL allocation at start up \(either of building an InterMine database or a web application\).

> Reasonable settings for `datasource.maxConnections` are 20 for the production database and 5 for other databases. You may need to increase your Postgres parameter `max connections`, for example to 250.

{% hint style="info" %}
The InterMine property `datasource.maxConnections` corresponds to the `maximumPoolSize` of the HikariCP.
{% endhint %}

## Which properties?

The `maxConnections` property is set in `default.intermine.production.properties` in InterMine:

```text
# in intermine-resources
# default.intermine.production.properties
db.production.datasource.class=com.zaxxer.hikari.HikariDataSource
db.production.datasource.dataSourceClassName=org.postgresql.ds.PGSimpleDataSource
db.production.datasource.dataSourceName=db.production
#db.production.datasource.serverName=server_name
#db.production.datasource.databaseName=db_name
#db.production.datasource.user=user
#db.production.datasource.password=password
db.production.datasource.maxConnections=20
db.production.driver=org.postgresql.Driver
db.production.platform=PostgreSQL
```

You can override this property in your mine's property file.

## Tomcat

You'll also need to update your Tomcat settings. Add `clearReferencesStopTimerThreads` to your $TOMCAT/conf/context.xml file, so it should look like:

```markup
<Context sessionCookiePath="/" useHttpOnly="false" clearReferencesStopTimerThreads="true">
...
</Context>
```

## Other HikariCP configurations

While HikariCP default settings are good, there could be situations where some changes could be useful. HikariCP provides a good number of parameters that can be set \(see the configuration section at [HikariCP](https://github.com/brettwooldridge/HikariCP)\).

For example, sometimes it can be useful to set the minimumIdle number of connections in order to avoid exceeding the number of connections set in the database. This could be the case in development and when deploying multiple webapps. For performance purposes, it is suggested by Hikari people to have `minimumIdle = maximumPoolSize` \(InterMine maxConnections\). To set a minimumIdle parameter, just add a line like the following to your mine's properties file:

```text
db.production.datasource.minimumIdle=10
```

## Further reading

[About Pool Sizing](https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing/)

[Hikari Discussion Forum](https://groups.google.com/forum/#!forum/hikari-cp/)

