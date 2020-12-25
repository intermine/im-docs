# EsyN

A network viewer that you can place on your gene report and list pages.

Users can click on the links to follow the data to esyn.org, and construct interaction networks and models of biological processes using publically available data.

## Configuration

### Report page

Add the following entry to your \[webconfig-model.xml\]{.title-ref} file:

```text
<reportdisplayer javaClass="org.intermine.bio.web.displayer.EsynDisplayer"
                 jspName="model/esynDisplayer.jsp"
                 replacesFields=""
                 placement="summary"
                 types="Gene"/>
```

### List analysis

1. add the following entries to your

   \[struts-config-model.xml\]{.title-ref} file:

```text
<action path="/initEsynListDisplayer" type="org.intermine.bio.web.EsynListDisplayer"/>
```

1. add the following entries to your \[tiles-def-model.xml\]{.title-ref}

   file:

```text
<definition name="esynListDisplayer.tile" path="/model/esynListDisplayer.jsp" controllerUrl="/initEsynListDisplayer.do"/>
```

::: {.index} EsyN, network viewer, interaction viewer :::

