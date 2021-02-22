---
title: EsyN
---

A network viewer that you can place on your gene report and list pages.

Users can click on the links to follow the data to esyn.org, and construct interaction networks and models of biological processes using publicly available data.

## Configuration

### Report page

Add the following entry to your `webconfig-model.xml` file:

```markup
<reportdisplayer javaClass="org.intermine.bio.web.displayer.EsynDisplayer"
                 jspName="model/esynDisplayer.jsp"
                 replacesFields=""
                 placement="summary"
                 types="Gene"/>
```

### List analysis

1. Add the following entries to your `struts-config-model.xml` file:

   ```markup
   <action path="/initEsynListDisplayer" type="org.intermine.bio.web.EsynListDisplayer"/>
   ```

2. Add the following entries to your `tiles-def-model.xml` file:

   ```markup
   <definition name="esynListDisplayer.tile" path="/model/esynListDisplayer.jsp" controllerUrl="/initEsynListDisplayer.do"/>
   ```
