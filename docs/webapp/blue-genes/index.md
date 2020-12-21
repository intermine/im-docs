---
title: Guide to Customising BlueGenes
---

Content
=======

Certain features of the BlueGenes app are controlled by parameters set
in the [web.properties]{.title-ref} file. These properties are also used
in the current webapp user interface.

  purpose                                parameters                example
  -------------------------------------- ------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  default examples for the ID resolver   bag.example.identifiers   `bag.example.identifiers.protein=Q8T3M3,FBpp0081318,FTZ_DROME` and `bag.example.identifiers=CG9151, FBgn0000099` (one per type)
  default separators                     list.upload.delimiters    `\n\t,`
  default regionsearch                   genomicRegionSearch.\*    `H. sapiens` (note: please do not use long format, e.g. `Homo sapiens`)
  default query builder query            services.defaults.query   `"{ \"from\": \"Gene\", \"select\": [ \"secondaryIdentifier\", \"symbol\", \"primaryIdentifier\", \"organism.name\" ], \"orderBy\": [ { \"path\": \"secondaryIdentifier\", \"direction\": \"ASC\" } ], \"where\": [ { \"path\": \"organism.name\", \"op\": \"=\", \"value\": \"Drosophila melanogaster\", \"code\": \"A\" } ] }"`
  default keyword search                 quickSearch.identifiers   `e.g. PPARG, Insulin, rs876498`

Please see `/webapp/properties/web-properties`{.interpreted-text
role="doc"} for details on these parameters.

Environment
===========

BlueGenes uses the following parameters defined in the
[\~/.intermine/\$MINE.properties]{.title-ref} file.

  --------------------------------------------------------------------------------------------------------------
  purpose                                parameters               example
  -------------------------------------- ------------------------ ----------------------------------------------
  location of JavaScript tools           bluegenes.toolLocation   [/intermine/tools/node_modules/]{.title-ref}

  base URL for requests to the InterMine webapp.baseurl           [http://www.flymine.org]{.title-ref}
  instance                                                        

  path appended to the base URL          webapp.path              [flymine]{.title-ref}

  name of your InterMine instance as it  project.title            [BioTestMine]{.title-ref}
  will be displayed in BlueGenes                                  
  --------------------------------------------------------------------------------------------------------------

Please see `/webapp/properties/intermine-properties`{.interpreted-text
role="doc"} for details on this property file.

::: {.index}
bluegenes, tools, javascript
:::
