---
title: Website Admin
---

The SuperUser is the administrator of your InterMine webapp. The SuperUser can use tagging to configure the appearance and functionality of the webapp.

The SuperUser account is created when the UserProfile database is built using the properties specified in the [Intermine properties](../properties/intermine-properties.md) file.

Most of the website administration and customization is now done directly in the [BlueGenes administrator page](http://intermine.org/docs/user/admin-account), but a couple of settings are still defined using the old webapp admin login.

## Templates queries and lists 
All logged in users can create template queries and lists, but the SuperUser can make them available to all users by tagging them as public via the templates and lists pages in the MyMine section of the webapp. 
The tag data is stored in the user-profile database.

| tag | purpose |
| :--- | :--- |
| [im:public](im:public) \[1\] | make list/template available to all users |

> \[1\] Editable by all admins

Making a template query is an easy way to get users of your webapp to the data they want very quickly.

### Other tags

The SuperUser can change the order of **classes** in the class selection dropdown by adding the `im:preferredBagType` tag via the model browser.

| tag | purpose |
| :--- | :--- |
| [im:preferredBagType](im:preferredBagType) | class appears first in the class selection |

If a **template** is tagged with `im:converter`, it is used by the list upload page to convert between types.

> * E.g., the user pastes in a protein identifier, but chooses "Gene" from the type dropdown menu. A converter template can be used to look up the `Gene` corresponding to the given `Protein`.

To work as a converter, the template must follow the following pattern:

* the top-level class in the query must be the class we wish to convert _from_ \(eg. `Gene`\)
* there must be exactly one editable constraint - the `id` field of the top level class \(eg. `Gene.id`\)
* the fields selected for output must be `Gene.id` and the id field of the class to convert _to_

Normally the `id` field isn't shown in the query builder and probably isn't useful in other queries. Only the administrator user can create queries using the `id` field. Here is an example converter template:

```markup
<template name="Gene_To_Protein_Type_Converter" title="Gene to protein type converter" longDescription="" comment="">
    <query name="Gene_To_Protein_Type_Converter" model="genomic" view="Gene.id Gene.proteins.id" longDescription="" sortOrder="Gene.id asc">
        <node path="Gene" type="Gene"></node>
        <node path="Gene.id" type="Integer">
            <constraint op="=" value="0" description="Gene.id" identifier="Gene.id" editable="true" code="A"></constraint>
        </node>
    </query>
</template>
```
