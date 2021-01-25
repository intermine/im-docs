# Useful ObjectStore properties

You can configure some parameters to update how queries are handled by setting these in your mine.properties file. If you do not, the default values will be used.

## os.query.max-query-parse-time

InterMine includes a cost-based query optimiser that attempts to rewrite SQL queries to make use of precomputed tables. This involved parsing SQL strings into a Java representation, which is normally very fast but if multiple OR constraints are found in large queries can be slow.

There is a timeout to prevent query parsing from taking too long, if the time is exceeded a query will run as normal without possible optimisation. The default can be overridden by setting `os.query.max-query-parse-time` in `*mine.properties` to an integer value defining a number of milliseconds.

Used in `QueryOptimiserContext.java`.

## os.query.max-time

When the query is executed, via `ObjectStoreInterMineImpl.executeWithConnection()`, [SQL EXPLAIN](https://www.postgresql.org/docs/9.1/static/sql-explain.html) is run on the generated query. If the estimated time to complete the query is more than the `max-time` parameter set, the query will fail.

Defaults to 100000000 milliseconds.

## os.query.max-limit

When the query is executed, via `ObjectStoreInterMineImpl.executeWithConnection()`, [SQL EXPLAIN](https://www.postgresql.org/docs/9.1/static/sql-explain.html) is run on the generated query. If the estimated number of rows is more than the `max-limit` parameter set, the query will fail.

Note this relies on Postgres's statistics being up to date and correct, be sure to run `ANALYSE`.

Defaults to 100000000 rows.

## os.query.max-offset

Sets the maximum number of rows available to export.

If the offset for a query is greater than the `os.query.max-offset`, the query will fail to run. See `TableExportAction.checkTable()` for the exact ExportException used.

```java
// exception thrown in TableExportAction.checkTable()
if (pt.getExactSize() > pt.getMaxRetrievableIndex()) {
    throw new ExportException("Result is too big for export. "
        + "Table for export can have at the most "
        + pt.getMaxRetrievableIndex() + " rows.");
}
```

Defaults to 100000000 rows.

## os.queue-len

&lt;obsolete&gt;

