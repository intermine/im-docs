---
title: Google Analytics
---

To enable Google Analytics to track usage of your webapp you need to set
up your Analytics account and get a \'\'\'code\'\'\' from Google then
add a property to your [.intermine/xxxmine.properties]{.title-ref} file:

``` {.xml}
google.analytics.id=CODE
```

This places the Google javascript to track usage views to every page of
the webapp.

To modify the message that is going to be displayed to the user asking
if they agree to the usage of cookies modify:

``` {.xml}
google.analytics.message=I accept cookies from this site
```

If no key - message is provided, no message is shown and cookies are
accepted by default.

::: {.index}
Google analytics
:::
