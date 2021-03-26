---
title: Home page
---

**Note**
This text describes how to customize the homepage of your mine.

**Note**
See also [General Layout](../layout/index.md) for whole app look & feel


## RSS/Blog Feed

To add the RSS feed at the bottom right corner of the page, add the following to your MINE properties file \(in `.intermine` file\):

```text
project.rss = http://<your_blog>/<your_feed_url>
```

eg:

```text
project.rss=http://blog.flymine.org/?feed=rss2
```

Two latest entries will be shown in the box. If you want to provide a link underneath the entry listing to your blog, add the following to the config file:

```text
project.news = http://<your_blog>
```

## Credits

By default InterMine credit is added to the bottome of the page.

![image](img/intermine_funder.jpg)

To add additional funders, set the following in the `web.properties` file:
 
```text
project.credit.1.image=<the_funder_logo_url>
project.credit.1.url=<the_funder_url>
```

eg:

```text
project.credit.1.image=https://www.humanmine.org/humanmine/images/wellcome-logo-black.png
project.credit.1.url=https://wellcome.ac.uk/
``` 


