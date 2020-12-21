---
title: List upload
---

InterMine has a sophisticated list import system for genes. The page
aims to describe how it works.

Users can paste identifiers into the list upload form; e.g. for data
types \"gene\" it can be an identifier, symbol or name. Which key is
used is determined by the class_keys file. The list upload form runs a
series of queries to try to match the identifier to an object in the
database.

This is also how the LOOKUP constraint works.

The list upload form runs the three queries listed below until it finds
a match for the user\'s identifiers. It\'s now possible to run all three
queries every time regardless of if a match was returned. You may want
to configure your mine to do this if your database contains lots of
identifiers that are assigned to different objects, this option would
allow your users to see more options - not just the first.

Queries
=======

Default Query
-------------

First, we query for the value in key fields. For example:

``` {.sql}
select * from gene 
where name = 'adh' OR 
      symbol = 'adh' or 
    primaryIdentifier = 'adh' or 
    secondaryIdentifier = 'adh';
```

If this query returned results, that object is added to our list and we
are done.

If this query didn\'t return any results, we move on to the next step.

::: {.note}
::: {.title}
Note
:::

You can set a parameter in bag-queries.xml, matchOnFirst=\"false\", to
always run all queries.
:::

\"Bag Queries\"
---------------

Next we run queries listed in [bag-queries.xml]{.title-ref}

1.  looks for cross references
2.  looks for synonyms

Matches returned from this query are not added to the list (if
[matchesAreIssues=true]{.title-ref}), they are displayed under the
\"synonyms matched\" heading. Users can optionally add them to their
list.

If this query didn\'t return any results, we move on to the next step.

Converters
----------

Next we run appropriate converter template, which are templates tagged
with [im:converter]{.title-ref}. Here is an example converter template:

``` {.xml}
<template name="Gene_To_Protein_Type_Converter" title="Gene to protein type converter" comment="">
    <query name="Gene_To_Protein_Type_Converter" model="genomic" view="Gene.id Gene.proteins.id" longDescription="" sortOrder="Gene.id asc">
        <constraint path="Gene.id" editable="true" description="Gene.id" op="=" value="0"/>
    </query>
</template>
```

Matches returned from this query are not added to the list, they are
displayed under the \"converted type\" heading. Users can optionally add
them to their list.

Configuration
=============

types (classes)

:   Add a class to [dbmodel/resources/class_keys.properties]{.title-ref}
    file to get it to show up on the list upload form. To *bold* a
    class, tag it with [im:preferredBagType]{.title-ref}.

organisms

:   All organisms in your database will be displayed here. You can set
    the default in WebProperties.

example list

:   The example list is set in \"bag.example.identifiers\" property in
    WebProperties.

valid delimiters

:   The default valid delimiters are comma, space, tab or new line. You
    can change this value by setting the \"list.upload.delimiters\"
    property in WebProperties.

matchOnFirst

:   Set this value in the bag-queries.xml file. Default value is TRUE.
    If false, all queries will always be run.

::: {.index}
list upload, bagqueryrunner, bag-queries, LOOKUP, converter templates
:::
