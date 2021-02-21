---
title: Setting Javascript Options
---

Many of the JavaScript tools included in InterMine pages can be customized at runtime with specific options. To do this, the recommended practice is to include a custom set of option configurations in a JavaScript file that is included in your InterMine instance, or other embedding page. To do this within the context of the InterMine web-application, we recommend following the following steps:

* Create a new JavaScript file, named something like `model-includes.js`, and place it in the `MINE_NAME/webapp/src/main/resources` directory.
* Add your options to the file \(see below\).
* Configure your mine to load this file on every page \(see below\).

## Adding options to the file

If for instance you wanted to configure the result-tables so that their cell-previews appeared on 'hover' rather than on 'click', which is the default, and also to enable the 'ChromosomeLocation' formatter, you would want the contents of your options file to be something like:

```text
(jQuery(function() { // run when the page has loaded.
  if (intermine) {   // but only if there is something to do.
    intermine.setOptions({CellPreviewTrigger: 'hover'});
    intermine.setOptions({
      'Location.start': true,
      'Location.end': true
    }, 'intermine.results.formatsets.genomic');
  }
});
```

## Configuring your mine to load your custom file

In one of your properties files \(ideally your model web properties file\), add a property beginning with `head.js.all.` that names this file. If your file is `my-mine-options.js`, then this line might look like:

```text
head.js.all.MY_JS_OPTIONS = my-mine-options.js
```
