# JBrowse

InterMine 1.3.1 supports the JBrowse REST web-service specification \(see [configuring JBrowse](https://github.com/GMOD/jbrowse/wiki/JBrowse_Configuration_Guide/)\) which means that you can run a JBrowse installation directly off the InterMine web-services.

This documentation has been tested with JBrowse-1.16.4.

## Build Your InterMine Database

If you want to be able to have a hierarchical view of your features on JBrowse add this to the \[\\]{.title-ref} section of your project XML file and then build your database:

```text
<post-process name="populate-child-features"/>
```

See `/database/database-building/post-processing/index`{.interpreted-text role="doc"} for details.

## Install JBrowse

You will need an installation of JBrowse for this task. Instructions on doing this can be found at [installing JBrowse](http://jbrowse.org/code/latest-release/docs/tutorial/).

Note: you need to set

```text
<div class="jbrowse" id="GenomeBrowser" data-config='"allowCrossOriginDataRoot": true'>
```

in the index.html file of your JBrowse installation.

## Add JBrowse to InterMine

Add JBrowse to your report pages by adding this entry to your [webconfig-model.xml](https://github.com/SanniM3/im-docs/tree/2068d45bad51f136059fbb7b7a5a5cbb3a970a83/webapp/properties/webconfig-model/index/README.md) file:

```text
<reportdisplayer javaClass="org.intermine.bio.web.displayer.JBrowseDisplayer"
                 jspName="model/jbrowseDisplayer.jsp"
                 replacesFields=""
                 placement="Genomics"
                 types="SequenceFeature"/>
```

See `/webapp/report-page/report-displayers-examples/`{.interpreted-text role="doc"} for more information.

Add the location of your JBrowse installation to your \[web.properties\]{.title-ref} or mine properties file, for example:

```text
jbrowse.install.url = http://jbrowse.intermine.org
```

## Point JBrowse at your InterMine

Add your new mine-based dataset to your configuration file. For example to add _D. melanogaster_ data from [FlyMine](http://www.flymine.org) as a JBrowse dataset, the following configuration in \[jbrowse\_conf.json\]{.title-ref} would suffice:

```text
{ 
  "datasets": {
     "FlyMine-7227": {
      "url": "?data=http://www.flymine.org/query/service/jbrowse/config/7227",
      "name": "FlyMine"
    },
    ...
  }
}
```

Once in place, you can visit your JBrowse \[index.html\]{.title-ref} and see the data from [FlyMine](http://www.flymine.org).

## Configuring InterMine\'s JBrowse integration

By default, all InterMine classes that inherit from the SequenceFeature model class will have tracks.

However, this can be inappropriate since some of those classes may not have data.

You can make entries in \[web.properties\]{.title-ref} to configure which tracks appear. For instance, if you just want Gene, CDS, UTR and Promoter tracks then in \[\/webapp/resources/web.properties\]{.title-ref} configure

```text
org.intermine.webservice.server.jbrowse.genomic.track.Gene.class=Gene
org.intermine.webservice.server.jbrowse.genomic.track.CDS.class=CDS
org.intermine.webservice.server.jbrowse.genomic.track.UTR.class=UTR
org.intermine.webservice.server.jbrowse.genomic.track.Promoter.class=Promoter
```

Here, track names are the first component of the key after org.intermine.webservice.server.jbrowse.genomic.track \(e.g. Gene on the first line\). These track names are used to group related properties and are not used in JBrowse display. The rest of the key name \(here always class\) specifies the InterMine class to be used for this track. \ JBrowse parameters can also be set for individual tracks within InterMine. For instance, in \[web.properties\]{.title-ref}, if one wanted to give all 4 of the tracks defined above different colours then one would set

```text
org.intermine.webservice.server.jbrowse.genomic.track.Gene.style.color=red
org.intermine.webservice.server.jbrowse.genomic.track.CDS.style.color=yellow
org.intermine.webservice.server.jbrowse.genomic.track.UTR.style.color=green
org.intermine.webservice.server.jbrowse.genomic.track.Promoter.style.color=blue
```

For the full list of properties, please see the canvas section of the [JBrowse Configuration Guide](https://github.com/GMOD/jbrowse/wiki/JBrowse_Configuration_Guide/).

::: {.index} JBrowse, GBrowse, das :::

