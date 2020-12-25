# QueryBuilder

## Select a Data Type to Begin a Query

types in bold

: Tag types with \[im:preferredBagType\]{.title-ref} tag. Use the model browser to tag classes, eg. [http://www.flymine.org/query/tree.do](http://www.flymine.org/query/tree.do)

intro text

: Most text in InterMine can be set in model.properties, see `/webapp/properties/model-properties`{.interpreted-text role="doc"}.

help text

: Set in \[classDecriptions.properties\]{.title-ref} file

## query builder

SUMMARY

: Which columns appear when you click on SUMMARY button are set in WebConfigModel.

autocomplete

: Add fields to the `/database/database-building/post-processing/objectstore-summary-properties`{.interpreted-text role="doc"} file to have their form fields autocomplete.

## Hiding fields

In your `webconfig-model.xml`, set a property `showInQB` for a `<fieldconfig />` to `true` to hide a field from a Class.

An example of hiding an attribute field:

```text
<class className="org.intermine.model.testmodel.Manager">
    <fields>
        <fieldconfig fieldExpr="age" showInQB="false"/>
    </fields>
</class>
```

An example of hiding a Reference or a Collection field:

```text
<class className="org.intermine.model.testmodel.Manager">
    <fields>
        <fieldconfig fieldExpr="address" showInQB="false"/>
    </fields>
</class>
```

::: {.index} querybuilder, summary, autocomplete, hide :::

