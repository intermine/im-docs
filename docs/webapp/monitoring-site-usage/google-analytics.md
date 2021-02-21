---
title: Google Analytics
---

To enable Google Analytics to track usage of your webapp you need to set up your Analytics account and get a '''code''' from Google then, add a property to your `.intermine/xxxmine.properties` file:

```markup
google.analytics.id=CODE
```

This places the Google JavaScript to track usage views of every page of the webapp.

To modify the displayed message asking the user if they agree to the usage of cookies, modify:

```markup
google.analytics.message=I accept cookies from this site
```

If no key - message is provided, no message is shown and cookies are accepted by default.
