---
title: General Layout
---

This page describes how to customise the look & feel of the whole InterMine webapp.

### Logo

The logo is independent from any themes and is located here `MINE_NAME/webapp/src/main/webapp/model/images/logo.png`. The recommended size is 45px x 43px. An example:

![FlyMine's logo](../../imgs/logo.png)


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
### Footer

**`project.citation`**

in [Features](../properties/web-properties.md), change the "cite" text

### Other properties

**`project.title`**

in [Web application name and location](../../web-services/intermine-properties.md#web-application-name-and-location), configure the name of the mine

**`project.releaseVersion`**

in [Web application name and location](../../web-services/intermine-properties.md#web-application-name-and-location), configure the version of the mine

**`project.subTitle`**

in [Web application name and location](../../web-services/intermine-properties.md#web-application-name-and-location), configure the subtitle showing in the header
