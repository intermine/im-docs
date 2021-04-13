---
title: Features
---

The `web.properties` file configures several attributes for the InterMine web application.

**attributeLink**

Used to configure hyperlinks, generally to external dbs. See [External Links](web-properties.md#external-links) below

**bag.example.identifiers**

Text present in the list upload form. See [List upload examples](web-properties.md#list-upload-examples) below

**externallink**

Redirects links in query results. See [Link redirects ](../query-results/redirects.md)

**genomicRegionSearch**

```text
## Make sure pre-defined organisms have chromosome location information in the database
genomicRegionSearch.defaultOrganisms = D. melanogaster
genomicRegionSearch.defaultSpans = 2L:14615455..14619002\\n2R:5866646..5868384\\n3R:2578486..2580016
```

**project.citation**

URL link used in the footer and in the CITE US section on the home page.
 
**xrefLink**

Used to configure hyperlinks for CrossReferences. See below

**markup.webpages.enable**

Used to enable structured data in JSON-LD format in InterMine web pages. Available options are true or false

## Branding

These parameters are returned by the branding API end point, and are used by external applications, e.g. the InterMine iOS app, the InterMine registry and the InterMine R client.

|  |  |
| :--- | :--- |
| branding.images.logo | This image should be 45px by 45px |
| branding.colors.header.main | Main colour for your mine, defaults to grey, \#595455 |
| branding.colors.header.text | Text colour for your mine, defaults to white, \#fff |

## List upload examples

Using the `bag.example.identifiers` key, one can provide a list of keyword examples on the list create/upload page. This could lead to a mixed list of items being updated and only, say Protein or Gene, identifiers being uploaded.

```
bag.example.identifiers.protein=Q8T3M3,FBpp0081318,FTZ_DROME
# one per type
bag.example.identifiers=CG9151, FBgn0000099
```

## External links

You can add links to other websites by adding entries to the `web.properties` file.

The format for this property is:

```text
# on the report page - a single identifier
'attributelink' + unique_name + class + taxonId + attributeName + (url|imageName|text)

# on the list analysis page - a list of identifiers
'attributelink' + unique_name + class + taxonId + attributeName + 'list' + (url|imageName|text)
```

**unique\_name**

Used to distinguish between multiple configurations for the same attribute/organism/class combination

**class**

Class of object to link, eg. Protein

**taxonId**

Either a proper id or '\*' when no assumption is made regarding the organism

**attributeName**

Which identifier field to pass to the URL, e.g. if attributeName is primaryIdentifier, the value of primary identifier field will be used as the attribute value

**list**

Indicates the link will have a list of identifiers

**url**

URL to link to

**imageName**

Name of logo \(optional\), must be in /model directory

**text**

Text that will appear next to the logo

The value of the attribute \(for the current object\) is substituted anywhere the string "&lt;&lt;attributeValue&gt;&gt;" occurs in the text or the URL

For example:

```text
attributelink.flybase.Gene.7227.primaryIdentifier.url=http://www.flybase.org/.bin/fbidq.html?<<attributeValue>>
attributelink.flybase.Gene.7227.primaryIdentifier.text=FlyBase: <<attributeValue>>
```

In this case `Gene` pages for Drosophila melanogaster will have a link that uses the `organismDbId` field.

A list example:

```text
attributelink.flymine.Gene.*.primaryIdentifier.list.url=http://www.flymine.org/flymine/portal.do?externalid=<<attributeValue>>&class=Gene
attributelink.flymine.Gene.*.primaryIdentifier.list.text=FlyMine
attributelink.flymine.Gene.*.primaryIdentifier.list.imageName=flymine_logo_link.gif
attributelink.flymine.Gene.*.primaryIdentifier.list.usePost=true
```

Only if a taxonId is specified, the code will check if the link to the external db is relevant.

## Settings for the xrefLink property

You can configure the URLs for querying CrossReference from external sources by adding entries to the `web.properties` file.

The format for this property is:

```text
# on the report page
'xreflink' + dataSource_name + (url|imageName)
```

**dataSource\_name**

The name of the external database

**url**

URL to link to

**imageName**

Name of logo \(optional\), must be in /model directory

For example:

```text
xreflink.PFAM.url=http://pfam.sanger.ac.uk/family?
xreflink.PIRSF.url=http://pir.georgetown.edu/cgi-bin/ipcSF?id=
```

Cross references represent identifiers used in external databases, eg. FlyBase, UniProt. An object in InterMine which has CrossReference will have an identifier and data source for that cross reference. In order to find the cross reference in that data source, a URL is required to link to, and the full path should look like url+identifier, e.g. ''[http://pfam.sanger.ac.uk/family?PF00001](http://pfam.sanger.ac.uk/family?PF00001)''. In web.properties, the first part of the full path could be configured as in "url", and identifier will be added programmatically to the rear of it. The dataSource\_name should be consistent with the source name of the CrossReferences in the InterMine database.

## Overriding properties

* `intermine/webapp/main/resources/webapp/WEB-INF/global.web.properties` -

  used by all mines. Properties set here will be available to everyone, even the test model mine.

* `bio/webapp/resources/webapp/WEB-INF/bio.web.properties` -

  used by all bio-mines. Properties set here will be available to all mines that use the bio layer. So, not the test model. Can overwrite properties in the global.web.properties file.

* `flymine/webapp/resources/web.properties` - used by a mine. Properties set here will be available to only that specific mine. Can create mine-specific properties or overwrite properties in the above two files.
* `$HOME/.intermine/flymine.properties` - used by a mine. Properties set here will be available only to that specific mine, and will override all other properties. Put sensitive values here that should not be committed to version control.
