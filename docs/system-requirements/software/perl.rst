Perl
===========

Many of the build processes are carried out by Perl programs. You will need Perl
installed on your system to build or maintain an InterMine installation. Linux
and MacOS systems will have a suitable Perl already installed. Perl is available for Windows,
but is not actively supported by InterMine.

You are encouraged to use http://perlbrew.pl to set up your Perl environment, and
make use of the modern toolchain, such as https://metacpan.org/pod/cpanm.

At various times you will be requested to install various Perl modules. Here you can
find instructions for how to do this using the native CPAN tool which comes with every
Perl distribution on Linux and OSX, using Debian/Ubuntu package managers, as well as manual installs:

CPAN
----------------------------

CPAN stands for the Comprehensive Perl Archive Network - and is the software repository for
Perl modules. (you can compare it to http://pypi.python.org/pypi, Yum/Apt
repositories in Linux, or even Apple's App Store). If you have Perl you have CPAN. (To check
type `cpan` in a terminal).

To install modules with CPAN you may first need to set up the installer: in a terminal run

.. code-block:: bash

  $ cpan

This will take you to a cpan shell, which will allow you to configure your properties. to review your current configuration type:

.. code-block:: bash

  $ o conf

When you first run cpan should run:

.. code-block:: bash

  $ o conf init

This will guide you through the set-up procedure. You can run this later change the settings which are set automatically.

To change a setting manually, type:

.. code-block:: bash

  $ o conf [SETTING NAME] "NEW VALUE"


eg to make modules installed uninstall previous versions and use sudo to elevate permissions (very good ideas), type:

.. code-block:: bash

  $ o conf mbuild_install_arg "--uninst 1"
  $ o conf mbuild_install_build_command "sudo ./Build"
  $ o conf make_install_make_command "sudo make"

If you change options, remember to save your changes with:

.. code-block:: bash

   $ o conf commit

To install modules, type:

.. code-block:: bash

  $ cpan Module::Name Another::Module::Name

To force the install for any reason, use the "-f" flag, so type:

.. code-block:: bash

  $ cpan -f Module::Name

Don't forget to use sudo in front of the CPAN command if you have not set the sudo option in the CPAN configuration

DEB Packages
-------------------

Many Perl libraries are packaged for different Linux distributions. Debian/Ubuntu has a great number of these, and in many cases this is a good alternative to the CPAN install. 

The procedure is the same as for any other package:

.. code-block:: bash

  $ sudo apt-get install libxml-writer-perl # installs XML::Writer

There is a predictable name to package mapping: "::" becomes "-", there will be a "lib" on the front, and a "-perl" on the end, so:

* "`XML::DOM`" becomes "`libxml-dom-perl`"
* "`Moose`" becomes "`libmoose-perl`"
* and so on

These are the modules you need to build a database:

.. code-block:: bash

  $ sudo apt-get install libxml-writer-perl libxml-sax-base-perl libxml-perl libxml-filter-saxt-perl libtext-glob-perl


To search for a package you can type:

.. code-block:: bash

  $ apt-cache search package-name

Manually installing InterMine modules
-------------------------------------------------

The InterMine Perl modules are available on CPAN, and you are encouraged to download them from there. However, you can install them manually too. First you will need to check-out the source code. (It is recommended you update your version of Module::Build to at least version 0.36, as this will allow you to automate the dependency installation.)

From your check out (or unzipped tar file) go to the directory "`intermine/perl/`"

.. code-block:: bash

  $ cd git/intermine/perl

Here there are three "distributions" of modules you may want to install:

* InterMine-Model
* InterMine-Item (depends on InterMine::Model)
* Webservice-InterMine (depends on InterMine::Model)

The installation procedure for these is the same:

.. code-block:: bash

  $ cd [DISTRIBUTION-DIRECTORY]
  $ perl Build.PL            # Checks your system
  $ sudo ./Build installdeps # If you have Module::Build >= 0.36
  $ ./Build test             # tests the modules: optional but HIGHLY recommended
  $ sudo ./Build install     # Installs the modules

If you do not have Module::Build 0.36 or above, you can install the
dependencies using the above methods (CPAN and Packages).

List of Perl Modules to Install
---------------------------------------------

* For the InterMine modules:

 * `List::MoreUtils` (utility functions for handling lists)
 * `LWP` (Handling network communication)
 * `Module::Find` (Automatically locating modules by name)
 * `Moose` (Object system)
 * `MooseX::Role::WithOverloading` (Allows roles to overload operators)
 * `MooseX::Types` (Type constraint system)
 * `Text::CSV_XS` (Processing .csv and .tsv files)
 * `URI` (Handling urls)
 * `XML::Parser::PerlSAX` (Parsing XML)
 * `XML::DOM` (XML processing and output)
 * `Text::Glob` (used by the `project_build` script)

* for the download scripts:

 * Log::Handler
 * DateTime
 * Module::Find
 * Web::Scraper
 * Ouch
 * Number::Format
 * PerlIO::gzip
 * Perl6::Junction 

* for generating InterMine Items XML:

 * Getopt::Std
 * Log::Handler;
 * Digest::MD5

.. index:: Perl installation

How to install all the Perl Modules to Run the Data Downloader Script
----------------------------------------------------------------------

In order to download all the Perl scripts required by the Data Downloader script, use the following cpan installation command:

.. code-block:: bash

  $ cpan install DateTime Module::Find Web::Scraper Ouch Number::Format PerlIO::gzip Perl6::Junction List::MoreUtils LWP Module::Find Moose MooseX::Role::WithOverloading MooseX::Types Text::CSV_XS URI XML::Parser::PerlSAX XML::DOM Text::Glob MooseX::FollowPBP MooseX::ABC MooseX::FileAttribute
