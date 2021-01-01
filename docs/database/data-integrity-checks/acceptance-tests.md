# Acceptance Tests

## How to run the tests

1. Add a file to \[MINE\_NAME/dbmodel/resources\]{.title-ref}, eg.

   \[flymine\_acceptance\_test.conf\]{.title-ref}

2. run acceptance tests here:

```text
~/git/flymine $ ./gradlew runAcceptanceTests
```

The results will be in \[MINE\_NAME/dbmodel/build/acceptance\_test.html\]{.title-ref}

## Types of tests

You can assert that a query returns true:

```text
assert {
    sql: select count(*) >= 400000 from goannotation
}
```

Or doesn\'t have any results:

```text
no-results {
    sql: select * from datasource where url is null or name is null or description is null
    note: all fields of data source should be filled in
}
```

Or has at least some results:

```text
some-results {
    sql: select * from organism where name = 'Anopheles gambiae'
    note: We should have an Anopheles gambiae  object but not an Anopheles gambiae PEST one
}
```

::: {.index} data integrity, acceptance tests :::

