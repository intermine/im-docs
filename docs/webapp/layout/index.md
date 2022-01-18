---
title: General Layout
---

This page describes how to customise the look & feel of the whole InterMine webapp.

### Logo

The logo is independent from any themes and is located here `MINE_NAME/webapp/src/main/webapp/model/images/logo.png`. The recommended size is 45px x 43px. An example:

![FlyMine's logo](../../imgs/logo.png)

### Intro

**`project.title`**

in [Web application name and location](../../web-services/intermine-properties.md#web-application-name-and-location), configure the name of the mine

**`project.releaseVersion`**

in [Web application name and location](../../web-services/intermine-properties.md#web-application-name-and-location), configure the version of the mine

**`project.subTitle`**

in [Web application name and location](../../web-services/intermine-properties.md#web-application-name-and-location), configure the subtitle showing in the header

![FlyMine's intro text](/img/mine-intro.png)

### Branding

These parameters are returned by the branding API end point, and are used by the new user interface BlueGenes and external applications, e.g. the InterMine iOS app, the InterMine registry and the InterMine R client.
Add the the following properties to your `web.properties`:

|  |  |
| :--- | :--- |
| branding.images.logo | The image's URL |
| branding.colors.header.main | Main colour for your mine, defaults to grey, \#595455 |
| branding.colors.header.text | Text colour for your mine, defaults to white, \#fff |

As example, the FlyMine's configuration:
```text
branding.images.logo = https://www.flymine.org/flymine/model/images/logo.png
branding.colors.header.main = #5c0075
branding.colors.header.text = #fff
```
![FlyMine's layout](/img/branding.png)

### Favicon

The favicon is a small icon displayed beside the tab or window title in the web browser.

The favicon itself should be located in `<your_mine>/webapp/src/main/webapp/model/images/favicon.ico`, and BlueGenes will use it if it's present for the default mine (otherwise it will fallback to the InterMine logo).

You can also configure a favicon for BlueGenes (useful if you have one webapp serving multiple mines) by adding it as a [resource](../bluegenes/index#resources) under the `resources/public/favicon.ico` path.

:::tip
If you want to generate a favicon from an image, use this [Dynamic Drive](http://tools.dynamicdrive.com/favicon/) tool.
:::

### Footer

The following can be configured in the `web.properties` file.

| Property | Description | Default |
| -------- | ----------- | ------- |
| project.url.github | Display *GitHub icon* linking to URL | Hidden |
| project.supportEmail | Display *email icon* linking to email address | Hidden |
| project.news | Display *blog icon* linking to URL | Hidden |
| project.url.twitter | Display *Twitter icon* linking to URL | Hidden |
| project.url.discord | Display *Discord icon* linking to URL | Hidden |
| project.citation | URL used for **CITE <MINENAME\>** link | http://intermine.org/publications/ |
| project.url.aboutUs | URL used for **ABOUT US** link | http://intermine.org/about-intermine/ |
| project.url.privacyPolicy | URL used for **PRIVACY POLICY** link | http://intermine.org/privacy-policy/ |
