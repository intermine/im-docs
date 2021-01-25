# Data Download Scripts

The DataDownloader system uses a plugin architecture to make it more straightforward to download data from arbitrary sources, and to add new sources to the system

## Location

The system is a package located in our scripts repo here: [https://github.com/intermine/intermine-scripts/tree/master/bio/DataDownloader](https://github.com/intermine/intermine-scripts/tree/master/bio/DataDownloader)

The package contains:

**lib/DataDownloader**

Core libraries

**lib/DataDownloader/Source**

Source Plugins

**config**

configuration files

**bin**

The executable launcher

## Prerequisites

* Moose
* MooseX::ABC
* MooseX::FollowPBP
* MooseX::FileAttribute
* Net::FTP
* Log::Handler
* DateTime
* Module::Find
* Web::Scraper
* Ouch
* Number::Format
* PerlIO::gzip
* Perl6::Junction

If you are using Ubuntu \(tested on 12.10\), you can run the following command to install the packages:

```bash
$ sudo apt-get install libpath-class-perl libmoosex-types-path-class-perl liblog-handler-perl liblog-report-perl libdatetime-perl libmoosex-followpbp-perl libyaml-perl libmodule-find-perl libperlio-gzip-perl libouch-perl libnumber-format-perl
```

Other perl modules need to be installed via CPAN:

```bash
$ cpan
cpan[1]> install MooseX::ABC
cpan[2]> install MooseX::FileAttribute
```

## Data Source Configuration

To learn how to configure data sources of your mine, look here for examples:

> `DataDownloader/config`

The yaml file of your mine is where data download script reads the instruction

## Running

To run a set of data downloads, the following call should suffice:

```bash
perl DataDownloader/bin/download_data -e intermine
```

The Current working directory of the script is immaterial.

Specific sources can be run by naming them on the command line:

```bash
perl DataDownloader/bin/download_data -e intermine Uniprot GOAnnotation
```

Source names are case-sensitive. You can get a list of the available sources with the switch '--sources'.

## Adding a new Source

A source is a class in the 'DataDownloader::Source' package that implements the following method:

* 'get\_data': Get all the data for this source

And accepts the following arguments in its constructor:

* `data_dir => "dirname"` the name of a directory to put data in, preferably in a sub-directory.\* `logger => Log::Handler` A logger to use to log error and debug messages. Exceptions may be thrown by a source at any time. They will be caught and logged. It is the source's responsibility to clean up after itself however.

A template for creating a source is available in the form of an abstract class all sources are expected to inherit from. This class, `DataDownloader::Source::ABC` makes it simple to add straightforward source downloaders, and provides helpers to make it convenient to add complex ones.

A minimal source can be seen in the form of `bio/scripts/DataDownloader/lib/DataDownloader/Source/FlyAnatomyOntology.pm`:

```perl
package DataDownloader::Source::FlyAnatomyOntology;

use Moose;
extends 'DataDownloader::Source::ABC';

use constant {
    TITLE  => 'Fly Anatomy Ontology',
    DESCRIPTION => "Drosophila Anatomy ontology from FlyBase",
    SOURCE_LINK => "http://www.flybase.net/",
    SOURCE_DIR => 'ontologies/fly-anatomy',
    SOURCES => [{
        FILE   => 'fly_anatomy.obo',
        SERVER => 'http://obo.cvs.sourceforge.net/*checkout*/obo/obo/ontology/anatomy/gross_anatomy/animal_gross_anatomy/fly',
    }],
};

1;
```

This source fully inherits the behaviour of the 'DataDownloader::Source::ABC' abstract class, and only adds configuration. In this case, it defines a set of constants that describe this source:

* 'TITLE': The human readable name of the source shown in log messages.
* 'DESCRIPTION': A longer description of the data that appears in a version file.
* 'SOURCE\_LINK': A link to the origin of the material that appears in the version file.
* 'SOURCE\_DIR': The sub-directory under the 'data\_dir' of the constructor where the new files should be placed.

And some constants that define the data to fetch:

* 'SOURCES': Any data source defined by this constant will automatically be added to the queue of files to download.

Each source is a hash-reference with the following keys:

* 'FILE': The name of the file on the remote server
* 'SERVER': The path to the location of the file to fetch.

Further keys that can be defined include:

* 'POSTPROCESSOR': A code-reference which will called as a method and passed the downloaded file, and the location where it should end up.

