---
title: Home page
---

This page describes how to customise the homepage of your mine using the `web.properties` file. See also [General Layout](../layout/index.md).

## Removing sections from the home page

You can hide each section by setting their respective `hide...` property to `true`.

```
bluegenes.homepage.hideMineIntro = true
bluegenes.homepage.hideSearch = true
bluegenes.homepage.hideTemplateQueries = true
bluegenes.homepage.hideCTA = true
bluegenes.homepage.hideMineSelector = true
bluegenes.homepage.hideAlternativeTools = true
bluegenes.homepage.hideFeedback = true
bluegenes.homepage.hideCredits = true
```

## Customising Call To Action buttons

You can override the default CTA elements by defining your own. There are 3 formats accepted. They all take `label` (*string*) and `text` (*string with markdown supported, wherein the first paragraph will be extracted*) in addition to one more property defining their action when clicked.

**Link to pages inside BlueGenes:** `route` is a [:name in bluegenes.route/routes](https://github.com/intermine/bluegenes/blob/dev/src/cljs/bluegenes/route.cljs#L124) that takes no parameters.
```
bluegenes.homepage.cta.1.label = Upload identifiers
bluegenes.homepage.cta.1.route = upload
bluegenes.homepage.cta.1.text = **Upload** your own sets of genes.
```

**Perform actions in BlueGenes:** `dispatch` is an [event handler defined with reg-event-fx](https://github.com/intermine/bluegenes/search?q=reg-event-fx) that takes no arguments.
```
bluegenes.homepage.cta.2.label = Browse datasets
bluegenes.homepage.cta.2.dispatch = home/query-data-sources
bluegenes.homepage.cta.2.text = *Browse* the full set of data.
```

**Link to external pages:** `url` will be used for a link that opens in a new tab.
```
bluegenes.homepage.cta.3.label = Documentation
bluegenes.homepage.cta.3.url = http://intermine.org/intermine-user-docs/
bluegenes.homepage.cta.3.text = Learn how to use Humanmine.
```


## Blog and RSS feed

By default, a CTA button is displayed with a link to your blog. This defaults to the [InterMine blog](http://intermineorg.wordpress.org) and can be overriden by setting the property:

```
project.news = https://intermineorg.wordpress.org
```

:::note
If you wish to remove this button, you can either set `bluegenes.homepage.hideCTA = true` or define custom CTA buttons, both documented above on this page.
:::

Below this button will be displayed the latest posts from your blog (defaulting again to the InterMine blog). For this you will also need to set the URL to your blog's RSS feed, using the property:

```
project.rss = https://intermineorg.wordpress.com/feed/
```

## Credits

By default InterMine credit is added to the bottom of the page.

![image](/img/intermine_funder.jpg)

To add additional funders, use the `project.credit.x` properties:

```text
project.credit.1.image=https://www.humanmine.org/humanmine/images/wellcome-logo-black.png
project.credit.1.url=https://wellcome.ac.uk/
```

You can also use a variation containing text that will be displayed to the right of the image. The text property supports markdown.

```text
project.credit.2.text=**HumanMine** has been funded by the [Wellcome Trust](https://wellcome.org/).
project.credit.2.image=https://www.humanmine.org/humanmine/images/wellcome-logo-black.png
project.credit.2.url=https://wellcome.ac.uk/
```
