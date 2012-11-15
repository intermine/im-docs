Perl
===========

Many of the build processes are carried out by Perl programs. You will need Perl installed on your system to build or maintain an InterMine installation. Linux and MacOS systems will have a suitable Perl already installed. Perl is available for Windows, but is not actively supported by InterMine.

[[PageOutline]]

= Installing Perl Modules = 

At various times you will be requested to install various Perl modules. Here you can find instructions for how to do this using the native CPAN tool which comes with every Perl distribution on Linux and OSX, using Debian/Ubuntu package managers, as well as manual installs:

== CPAN ==

[http://www.cpan.org/ CPAN] stands for the Comprehensive Perl Archive Network - and is '''the''' software repository for Perl modules. (you can compare it to [http://pypi.python.org/pypi PyPi in Python], Yum/Apt repositories in Linux, or even Apple's App Store). If you have Perl you have CPAN. (To check type `cpan` in a terminal). 

To install modules with CPAN you may first need to set up the installer: in a terminal run
{{{
cpan
}}}
This will take you to a cpan shell, which will allow you to configure your properties. to review your current configuration type:
{{{
o conf
}}}
When you first run cpan should run:
{{{
o conf init
}}}
This will guide you through the set-up procedure. You can run this later change the settings which are set automatically.

To change a setting manually, type:
{{{ 
o conf [SETTING NAME] "NEW VALUE"
}}}
eg to make modules installed uninstall previous versions and use sudo to elevate permissions (very good ideas), type:
{{{
o conf mbuild_install_arg "--uninst 1"
o conf mbuild_install_build_command "sudo ./Build"
o conf make_install_make_command "sudo make"
}}} 
If you change options, remember to save your changes with:
{{{
 o conf commit
}}}

To install modules, type:
{{{
cpan Module::Name Another::Module::Name
}}}
To force the install for any reason, use the "-f" flag, so type:
{{{
cpan -f Module::Name
}}}
Don't forget to use sudo in front of the CPAN command if you have not set the sudo option in the CPAN configuration

== DEB Packages ==

Many Perl libraries are packaged for different Linux distributions. Debian/Ubuntu has a great number of these, and in many cases this is a good alternative to the CPAN install. The procedure is the same as for any other package:
{{{
sudo apt-get install libxml-writer-perl # installs XML::Writer
}}}
There is a predictable name to package mapping: "::" becomes "-", there will be a "lib" on the front, and a "-perl" on the end, so:
  * "`XML::DOM`" becomes "`libxml-dom-perl`"
  * "`Moose`" becomes "`libmoose-perl`"
  * and so on

To search for a package you can type:
{{{
apt-cache search package-name
}}}

== Manually installing InterMine modules ==

The InterMine Perl modules are available on CPAN, and you are encouraged to download them from there. However, you can install them manually too. First you will need to check-out the [http://www.intermine.org/wiki/GettingStarted source code] or [http://www.intermine.org/wiki/SVNCheckout#Downloadatar.gzfile download a tar.gz file]. (It is recommended you update your version of Module::Build to at least version 0.36, as this will allow you to automate the dependency installation.)

From your check out (or unzipped tar file) go to the directory "`intermine/perl/`"
{{{
cd [SVN-DIR]/intermine/perl
}}}
Here there are four "distributions" of modules you may want to install:
  * InterMine-TypeLibrary 
  * InterMine-Model (depends on InterMine::TypeLibrary)
  * InterMine-Item (depends on InterMine::Model)
  * Webservice-InterMine (depends on InterMine::Model)
The installation procedure for these is the same:
{{{
cd [DISTRIBUTION-DIRECTORY]
perl Build.PL            # Checks your system
sudo ./Build installdeps # If you have Module::Build >= 0.36
./Build test             # tests the modules: optional but HIGHLY recommended
sudo ./Build install     # Installs the modules
}}}
If you do not have Module::Build 0.36 or above, you can install the dependencies using the above methods (CPAN and Packages).

== List of Perl Modules to Install ==

 * For the InterMine modules:
   - [http://search.cpan.org/~vparseval/List-MoreUtils-0.22/lib/List/MoreUtils.pm List::MoreUtils] (utility functions for handling lists)
   - [http://search.cpan.org/~gaas/libwww-perl-5.837/lib/LWP.pm LWP] (Handling network communication)
   - [http://search.cpan.org/~crenz/Module-Find-0.10/Find.pm Module::Find] (Automatically locating modules by name)
   - [http://search.cpan.org/dist/Moose/lib/Moose.pm Moose] (Object system)
   - [http://search.cpan.org/dist/MooseX-Role-WithOverloading/ MooseX::Roles::WithOverloading] (Allows roles to overload operators)
   - [http://search.cpan.org/dist/MooseX-Types/ MooseX::Types] (Type constraint system)
   - [http://search.cpan.org/dist/Text-CSV_XS/CSV_XS.pm Text::CSV_XS] (Processing .csv and .tsv files)
   - [http://search.cpan.org/dist/URI/URI.pm URI] (Handling urls)
   - [http://search.cpan.org/~kmacleod/libxml-perl/lib/XML/Parser/PerlSAX.pm XML::Parser::PerlSAX] (Parsing XML)
   - [http://search.cpan.org/~tjmather/XML-DOM-1.44/lib/XML/DOM.pm XML::DOM] (XML processing and output)
   - Glob
   - Text::Glob

 * for the upgrade procedure:
   - Webservice::InterMine
   - AppConfig
   - Log::Handler
   - XML::Rules  
   - XML::Writer 
   - YAML

 * for the download scripts:
   - Log::Handler
   - DateTime
   - Module::Find
   - Web::Scraper
   - Ouch
   - Number::Format
   - PerlIO::gzip
   - Perl6::Junction 
