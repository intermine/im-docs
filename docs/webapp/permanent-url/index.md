---
title: Permanent URLs
---

InterMine generates stable and unique URLs to identify the report pages for biological entities.

They are based on class names combined with local IDs provided by the data resource providers and therefore they are persistent.

In FlyMine, for example, the URL of the report page for the gene zen, with primary identifier P19107, will be [http://flymine.org/gene:FBgn0004053](http://flymine.org/gene:FBgn0004053).

These URLs are used to share the report page with other users.

![](img/share.png)

The [class\_keys.properties](../properties/class-keys.md) file specifies the keys used to generate the permanent URLs. If not specified, the primaryidentifier key is used.

The format is:

\# class\_keys.properties 

&lt;CLASSNAME&gt;\_URI&lt;FIELDNAME&gt;

The classes and field names are case sensitive.

For example:

| key | value |
| :--- | :--- |
| Pathway\_URI | identifier |

No need to specify the keys for the classes defined in the core model \(e.g. protein, organism, publication...\).

See [Class keys](../properties/class-keys.md) for details about this file.
