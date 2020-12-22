Data Categories
===============

Data category pages include various aspects of a concept on a single
page. Category pages include:

-   logo
-   short description
-   external links
-   bulk download queries
-   template queries
-   direct links to QueryBuilder

All of the above should relate to a single concept, eg. Genomics or
Interactions.

Data categories are defined in [aspects.xml]{.title-ref}.

Aspects.xml
-----------

``` {.xml}
<aspect name="Genomics">
  <subtitle>Genome annotation</subtitle>
  <icon-image>model/genomics.gif</icon-image>
  <large-image>model/genomics.gif</large-image>
  <intro-text>
    The gene structure and other genome annotation in FlyMine are provided by
    a variety of curated source databases.  In most cases FlyMine includes
    all genome features that have chromosomal locations (eg. genes and repeat regions).
  </intro-text>
  <tile-name>model/genomics.jsp</tile-name>
  <aspect-source name="FlyBase" url="http://www.flybase.org"/>
  <aspect-source name="Ensembl" url="http://www.ensembl.org/Anopheles_gambiae"/>
</aspect>
```

Configuration
-------------

-   logo
    -   \<icon-image\>model/genomics.gif\</icon-image\> - appears on the
        home and data category pages
    -   \<large-image\>model/genomics.gif\</large-image\> - appears on
        the individual data category page
-   short description
    -   \<intro-text\>TEXT HERE\</intro-text\>
    -   appears on the top of the data category page
-   external links
    -   \<aspect-source name=\"FlyBase\"
        url=\"<http://www.flybase.org%22/>\>
    -   appear on the top right corner of the data category page
-   bulk download queries
    -   appear on the top right corner of the data category page
-   template queries
    -   appear on the data category page
-   direct links to QueryBuilder
    -   links will appear at the bottom of the data categories page

To configure which template queries appear on a data category page, tag
the template.

Data page/tab
-------------

The data tab points to this JSP file
[intermine/webapp/main/resources/webapp/dataCategories.jsp]{.title-ref}.
You can overwrite this file and display your own customised file by
putting a JSP in your [/webapp]{.title-ref} directory.

::: {.index}
data page, data tab, data categories, aspects, categories
:::
