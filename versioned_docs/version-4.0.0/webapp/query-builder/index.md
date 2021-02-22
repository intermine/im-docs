---
title: QueryBuilder
---

## Select a Data Type to Begin a Query

**types in bold**

Tag types with `im:preferredBagType` tag. Use the model browser to tag classes, eg. [http://www.flymine.org/query/tree.do](http://www.flymine.org/query/tree.do)

**intro text**

Most text in InterMine can be set in model.properties, see [Text and messages](../properties/model-properties.md).

**help text**

Set in `classDecriptions.properties` file

## query builder

**SUMMARY**

Which columns appear when you click on SUMMARY button are set in WebConfigModel.

**autocomplete**

Add fields to the [ObjectStore Summary](../../database/database-building/post-processing/objectstore-summary-properties.md) file to have their form fields autocomplete.

## Hiding fields

In your `webconfig-model.xml`, set a property `showInQB` for a`<fieldconfig />` to `true` to hide a field from a Class.

An example of hiding an attribute field:

```markup
<class className="org.intermine.model.testmodel.Manager">
    <fields>
        <fieldconfig fieldExpr="age" showInQB="false"/>
    </fields>
</class>
```

An example of hiding a Reference or a Collection field:

```markup
<class className="org.intermine.model.testmodel.Manager">
    <fields>
        <fieldconfig fieldExpr="address" showInQB="false"/>
    </fields>
</class>
```

