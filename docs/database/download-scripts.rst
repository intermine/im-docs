Data download scripts
================================

= A System for Downloading Data from a variety of Sources using Plugins =

The new DataDownloader system uses a plugin architecture to make it
more straightforward to download data from arbitrary sources, and to 
add new sources to the system

== Location ==

The system is a package located at [source:trunk/bio/scripts/DataDownloader].
The package contains:
  lib/DataDownloader::
    Core libraries
  lib/DataDownloader/Source::
    Source Plugins
  config::
    configuration files
  bin::
    The executable launcher

== Prerequisites ==

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

== Running ==

To run a set of data downloads, the following call should suffice:
{{{
#sh
    perl svn/dev/bio/scripts/DataDownloader/bin/download_data -e flymine
}}}

The Current working directory of the script is immaterial.

Specific sources can be run by naming them on the command line:
{{{
#sh
    perl svn/dev/bio/scripts/DataDownloader/bin/download_data -e flymine Uniprot RNAiScreens
}}}

Source names are case-sensitive. You can get a list of the available sources with the
switch '--sources'.

== Adding a new Source ==

A source is a class in the 'DataDownloader::Source' package
that implements the following method:
  * 'get_data': Get all the data for this source
And accepts the following arguments in its constructor:
  * {{{data_dir => "dirname"}}}: the name of a directory to put data in, preferably in a sub-directory.
  * {{{logger => Log::Handler}}}: A logger to use to log error and debug messages.
Exceptions may be thrown by a source at any time. They will be caught and logged. It is 
the source's responsibility to clean up after itself however.

A template for creating a source is available in the form of 
an abstract class all Sources are expected to inherit from. This class, 
{{{DataDownloader::Source::ABC}}} makes it simple to add straightforward 
source downloaders, and provides helpers to make it convenient to add complex ones.

A minimal source can be seen in the form of [source: trunk/bio/scripts/DataDownloader/lib/DataDownloader/Source/FlyAnatomyOntology.pm]:


.. code-block:: perl

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
  }}}
  
This source fully inherits the behaviour of the 'DataDownloader::Source::ABC' abstract class,
and only adds configuration. In this case, it defines a set of constants that describe this source:
  * 'TITLE': The human readable name of the source shown in log messages.
  * 'DESCRIPTION': A Longer description of the data that appears in a version file.
  * 'SOURCE_LINK': A link to the origin of the material that appears in the version file.
  * 'SOURCE_DIR': The sub-directory under the 'data_dir' of the constructor where the new files should be placed.

And some constants that define the data to fetch:
  * 'SOURCES': Any data sources defined by this constant will automatically be added to the queue of files to download. 
               Each source is a hash-reference with the following keys:
                 * 'FILE': The name of the file on the remote server
                 * 'SERVER': The path to the location of the file to fetch.
               Further keys that can be defined include:
                 * 'POSTPROCESSOR': A code-reference which will called as a method and passed the downloaded file, and the location where it should end up.


