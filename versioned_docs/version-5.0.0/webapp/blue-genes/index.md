---
title: Guide to Customising BlueGenes
---

## Content

Certain features of the BlueGenes app are controlled by parameters set in the `web.properties` file. These properties are also used in the current webapp user interface.

| purpose | parameters | example |
| :--- | :--- | :--- |
| default examples for the ID resolver | bag.example.identifiers | `bag.example.identifiers.protein=Q8T3M3,FBpp0081318,FTZ_DROME` and `bag.example.identifiers=CG9151, FBgn0000099` \(one per type\) |
| default regionsearch | genomicRegionSearch.\* | `H. sapiens` \(note: please do not use long format, e.g. `Homo sapiens`\) |

Please see [Features](../properties/web-properties.md) for details on these parameters.

## Environment

BlueGenes uses the following parameters defined in the `~/.intermine/$MINE.properties` file.

| purpose | parameters | example |
| :--- | :--- | :--- |
| location of JavaScript tools | bluegenes.toolLocation | /intermine/tools/node\_modules/ |
| base URL for requests to the InterMine instance | webapp.baseurl | http://www.flymine.org |
| path appended to the base URL | webapp.path | flymine |
| name of your InterMine instance as it will be displayed in BlueGenes | project.title | BioTestMine |

## will be displayed in BlueGenes

Please see [Database and Web application](../properties/intermine-properties.md) for details on this property file.

