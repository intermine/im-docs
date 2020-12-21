---
title: Data Integration
---

Data integration works by using keys for each class of object to define
equivalence for objects of that class. For example:

-   [primaryIdentifier]{.title-ref} is used as a key for
    [Gene]{.title-ref}
-   [taxonId]{.title-ref} is used as a key for [Organism]{.title-ref}

For each [Gene]{.title-ref} object loaded, a query is performed in the
database to find any existing [Gene]{.title-ref} objects with the same
[primaryIdentifier]{.title-ref}. If any are found, fields from both
objects are merged and the resulting object stored.

Many performance optimisation steps are applied to this process. We
don\'t actually run a query for each object loaded, requests are batched
and queries can be avoided completely if the system can work out no
integration will be needed.

We may also load data from some other source that provides information
about genes but doesn\'t use the identifier scheme we have chosen for
[primaryIdentifier]{.title-ref}. Instead it only knows about the
[symbol]{.title-ref}, in that case we would want that source to use the
[symbol]{.title-ref} to define equivalence for [Gene]{.title-ref}.

Important points:

-   A [primary key]{.title-ref} defines a field or fields of a class
    that can be used to search for equivalent objects
-   Multiple primary keys can be defined for a class, sources can use
    different keys for a class if they provide different identifiers
-   One source can use multiple primary keys for a class if the objects
    of that class don\'t consistently have the same identifier type
-   [null]{.title-ref} - if a source has no value for a field that is
    defined as a primary key then the key is not used and the data is
    loaded without being integrated.

See `/database/database-building/primary-keys`{.interpreted-text
role="doc"} for more information.

::: {.index}
data integration
:::
