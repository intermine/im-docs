---
title: JBrowse
---

InterMine 1.3.1 supports the JBrowse REST web-service specification \(see [configuring JBrowse](https://github.com/GMOD/jbrowse/wiki/JBrowse_Configuration_Guide/)\), which means that you can run a JBrowse installation directly off the InterMine web-services.

This documentation has been tested with JBrowse-1.16.4.

## Build Your InterMine Database

If you want to be able to have a hierarchical view of your features on JBrowse, add this to the `<post-processing>` section of your project XML file and then build your database:

```markup
<post-process name="populate-child-features"/>
```

See [Post processing](../../database/database-building/post-processing/index.md) for details.

## Install JBrowse

You will need an installation of JBrowse for this task. Instructions on doing this can be found at [installing JBrowse](http://jbrowse.org/code/latest-release/docs/tutorial/).

Note: you need to set

```markup
<div class="jbrowse" id="GenomeBrowser" data-config='"allowCrossOriginDataRoot": true'>
```

in the index.html file of your JBrowse installation.

## Add JBrowse to InterMine

To add JBrowse to your report pages you need to [install the JBrowse BlueGenes tool](http://intermine.org/docs/user/admin-account#the-tools-store). Please replace the default URL value (`https://jbrowse.intermine.org/?data=`) in the `config.json` configuration file with the URL of your JBrowse installation.

Please note that if you are still using the old interface you should refer to the relevant documentation (4.0). 

## Point JBrowse at your InterMine

Add your new mine-based dataset to your configuration file. For example, to add _D. melanogaster_ data from [FlyMine](https://www.flymine.org) as a JBrowse dataset, the following configuration in `jbrowse_conf.json` would suffice:

```text
{ 
  "datasets": {
     "FlyMine-7227": {
      "url": "?data=https://www.flymine.org/query/service/jbrowse/config/7227",
      "name": "FlyMine"
    },
    ...
  }
}
```

Once in place, you can visit your JBrowse `index.html` and see the data from [FlyMine](https://www.flymine.org).

## Configuring InterMine's JBrowse integration

By default, all InterMine classes that inherit from the SequenceFeature model class will have tracks.

We intend to implement some JBrowse configuration properties in BlueGenes in the future (for a full list of such properties, please see the canvas section of the [JBrowse Configuration Guide](https://github.com/GMOD/jbrowse/wiki/JBrowse_Configuration_Guide/)).
