---
title: Web pages markup
---

We have applied structured data in JSON-LD format to InterMine web pages
(using [Bioschemas.org](https://bioschemas.org) types and profiles), to
improve findability so search engines can give more relevant results to
users.

The markup are disabled by default, to enable them set the property
*markup.webpages.enable* to [true]{.title-ref} in the
`web.properties file </webapp/properties/web-properties>`{.interpreted-text
role="doc"}.

We have applied the following markup:

  Type          Applicable
  ------------- ---------------------------------------------
  DataCatalog   Main Home Page
  DataSet       Report page for entitites with type DataSet

Home page markup
================

  property      description                                                                                                           example
  ------------- --------------------------------------------------------------------------------------------------------------------- --------------------------------------------------------------
  identifier    The identifier for the mine instance, based on the namespace assigned in the intermine registry[^1]                   <https://registry.intermine.org/flymine>
  name          The name of the InterMine instance                                                                                    FlyMine
  descrition    The description of the InterMine instance                                                                             An integrated database for Drosophila and Anopheles genomics
  url dataset   The url of the InterMine instance The list of the datasets stored in the InterMine instance containing name and url   <http://flymine.org>

Report page markup for DataSet
==============================

  property      description                                                                    example
  ------------- ------------------------------------------------------------------------------ -----------------------------------------------
  name          The name of the dataset                                                        FlyAtlas
  description   The description of the dataset                                                 Affymetrix microarray-based atlas
  identifier    The url of the dataset, if provided, or the permanent URL of the report page   <http://www.flyatlas.org/>
  url           The permanent URL of the report page                                           <http://flymine.org/flymine/dataset:flyatlas>

::: {.index}
JSON-LD markup
:::

[^1]: When an InterMine instance is added to the registry, an unique and
    persistent namespace is assigned by the administrator. Some examples
    of namespaces: flymine, humanmine, flymine.beta. The identifier will
    be: <https://registry.intermine.org/%7Bnamespace%7D>. These
    identifiers are actionable, so if you put
    <https://registry.intermine.org/%7Bnamespace%7D> in the address bar
    of your browser, you will be redirected to URL set in the registry
    for the FlyMine. If the InterMine instance is not register, the url
    will be used instead.
