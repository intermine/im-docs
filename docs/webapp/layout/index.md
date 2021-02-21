---
title: General Layout
---

This page describes how to customise the look & feel of the whole InterMine webapp.

## Parts

### Logo

The logo is independent from any themes and is located here `MINE_NAME/webapp/src/main/webapp/model/images/logo.png`. The recommended size is 45px x 43px.

### Menu Tabs

The tabs are set in InterMine's internationalisation file: `intermine/webapp/main/resources/webapp/WEB-INF/classes/InterMineWebApp.properties`.

Each page has a name and a tab, for example:

```text
mymine.tab = mymine
```

In addition to InterMine's file, each mine has its own internationalisation file: `MINE_NAME/webapp/src/main/resources/model.properties`. Properties set in this file overwrite the ones set in InterMine's `InterMineWebApp.properties`. Below is an example of how to add tabs to your mine. Replace "api" with the name of your new tab.

First, copy `headMenu.jsp` from InterMine to your local mine: `MINE_NAME/webapp/src/main/webapp`. Then add your new tab:

```text
<li id="api"  <c:if test="${tab == 'api'}">class="activelink"</c:if>>
  <a href="/${WEB_PROPERTIES['webapp.path']}/api.do">
    <fmt:message key="menu.api"/>
  </a>
</li>
```

Then add the text for that tab to your `MINE_NAME/webapp/src/main/resources/model.properties` file:

```text
# HEADER
menu.api = API
```

You'll need to configure our web framework \(Struts\) to properly load your JSP page:

```markup
# in MINE_NAME/webapp/src/main/resources/struts-config-model.xml
<action path="/api" forward="api.page"/>

# in MINE_NAME/webapp/resources/tiles-defs-model.xml
<definition name="api.page" extends="layout.template">
    <put name="body" value="api.tile"/>
    <put name="pageName" value="api"/>
</definition>

<definition name="api.tile" path="/api.jsp"/>
```

Finally, add your JSP file to the `MINE_NAME/webapp/src/main/webapp` directory and re-release your webapp.

### Keyword search box

This search box queries the search index created in the postprocess `create-search-index`. To change which placeholder identifiers will appear in the box, edit the `quickSearch.identifiers` property in [Database and Web application](../properties/intermine-properties.md).

{% hint style="info" %}
See also [Keyword Search](../keyword-search/index.md) for details on how to configure the search index. 
{% endhint %}

### Footer

**`feedback.destination`**

in [Database and Web application](../properties/intermine-properties.md), change the recipient email address for contact form

**`funding`**

in [Text and messages](../properties/model-properties.md), change the "funded by" text

**`project.citation`**

in [Features](../properties/web-properties.md), change the "cite" text

### Favicon

Favicon \(icon seen next to the URL of the webapp in the browser URL bar\) can be set by adding the following line into the `webapp/resources/webapp/layout.jsp` file and its `</head>` section:

```markup
<link rel="shortcut icon" type="image/x-icon" href="model/images/favicon.ico">
```

The favicon itself should be located in `<your_mine>/webapp/src/main/webapp/model/images/favicon.ico`.

If you want to generate a favicon from an image, use this [Dynamic Drive](http://tools.dynamicdrive.com/favicon/) tool.

### Other properties

**`project.sitePrefix`**

in [Database and Web application](../properties/intermine-properties.md), configure the link

**`project.title`**

in [Database and Web application](../properties/intermine-properties.md), configure the name of the mine

**`project.releaseVersion`**

in [Database and Web application](../properties/intermine-properties.md), configure the version of the mine

**`project.subTitle`**

in [Database and Web application](../properties/intermine-properties.md), configure the subtitle showing in the header

**`header.links`**

in [Features](../properties/web-properties.md), configure the links in the upper right corner

## Changing look and feel, the theme

InterMine provides a set of default themes, but you can also create your own. All themes are defined in [/themes](https://github.com/intermine/intermine/tree/dev/intermine/webapp/src/main/webapp/themes) directory in InterMine. Explore the folder to see the themes available.

To switch a theme edit [Features](../properties/web-properties.md):

```text
# web.properties
theme = purple
```

You need to change this property to the name of the theme you want to use \(the directory name\), then re-release the webapp. Be sure to run `./gradlew clean` first to ensure that all of the old files are deleted.

### Developing your own theme

With CSS knowledge and open source image software such as [Gimp](http://www.gimp.org) or [Inkscape](http://www.inkscape.org) you can develop your own theme. Each theme directory contains a `theme.css` file, which is broken down in annotated sections, and image files. The image files are required for displaying menus, headers and backgrounds and can be modified with image software to match your colour scheme. Create a new directory under `webapp/src/main/webapp/themes`, copy the contents of another theme directory into it and start editing.
