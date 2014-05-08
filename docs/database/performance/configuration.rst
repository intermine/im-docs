
Useful ObjectStore properties
=============================

os.query.max-query-parse-time
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

InterMine includes a cost-based query optimiser that attempts to rewrite SQL queries to make use of precomputed tables.
This involved parsing SQL strings into a Java representation, which is normally very fast but if multiple OR constraints
are found in large queries can be slow.

There is a timeout to prevent query parsing from taking too long, if the time is exceeded a query will run as normal
without possible optimisation. The default can be overridden by setting `os.query.max-query-parse-time` to an integer value
defining a number of milliseconds.
