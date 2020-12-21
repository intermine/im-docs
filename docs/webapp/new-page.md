---
---

New page
========

This tutorial describes how to add a new page to your InterMine webapp.

Struts config
-------------

Add your new page to your struts config located in your MINE_NAME/webapp
directory.

struts-config-model.xml

``` {.xml}
<action path="/initDataSummary" type="org.flymine.web.DataSummaryController" />
<action path="/dataSummary" forward="dataSummary.page" />
```

tiles-defs-model.xml

``` {.xml}
<definition name="dataSummary.tile" path="/model/dataSummary.jsp" controllerUrl="/dataSummary.do"/>
<definition name="dataSummary.page" extends="layout.template">
    <put name="body" value="projectsSummary.tile"/>
    <put name="pageName" value="dataSummary"/>
</definition>
```

/model/dataSummary.jsp

:   name and location of your new JSP file

org.flymine.web.DataSummaryController

:   name and location of your new Java file

pageName

:   must match with the values set in [model.properties]{.title-ref}

model.properties
----------------

Update your [model.properties]{.title-ref} file to set which tab to use
for this JSP.

``` {.xml}
dataSummary.title = Data sources loaded into FlyMine
dataSummary.tab = dataCategories
```

To create a new tab, follow the instructions on
`/webapp/layout/index`{.interpreted-text role="doc"}

Java controller
---------------

1.  Create a new Java class
2.  It\'s name and location should match what you entered in your Struts
    configuration files. In the above example,
    [org.flymine.web.DataSummaryController]{.title-ref}.

``` {.java}
/**
* Perform initialisation steps for displaying a tree
* @author Mark Woodbridge
* @author Kim Rutherford
*/
```
