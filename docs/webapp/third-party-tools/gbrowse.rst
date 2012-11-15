GBrowse
================================

How to configure the GBrowse displayer.  To install a local GBrowse instance, see [wiki:GBrowseConfiguration].

||webapp.viewByID.prefix||portal.do?externalid=||
||gbrowse.config.directory||SERVER_NAME:/gbrowse/conf/||
||gbrowse.www.directory||SERVER_NAME:/gbrowse/www/browser/gbrowse||
||gbrowse.prefix||http://www.flymine.org/cgi-bin/gbrowse||
||gbrowse_image.prefix||http://www.flymine.org/cgi-bin/gbrowse_img||

== Gbrowse and InterMine ==

[http://www.gmod.org/wiki/index.php/Gbrowse GBrowse] is an interactive, generic, web-based genome annotation viewer created as part of the [http://www.gmod.org/ GMOD project].  InterMine is able to export [http://www.sequenceontology.org/gff3.shtml GFF] and [http://en.wikipedia.org/wiki/Fasta_format FASTA] files suitable for importing into a GBrowse instance.  Links in GBrowse can then refer to InterMine object report pages and the report pages can have links to GBrowse.

The [http://www.gmod.org/wiki/index.php/Gbrowse GBrowse website] has installation instructions and a [http://gmod.cvs.sourceforge.net/*checkout*/gmod/Generic-Genome-Browser/docs/tutorial/tutorial.html tutorial].  Note that [http://www.bioperl.org/wiki/Main_Page BioPerl] is a requirement of GBrowse.

== Properties ==

The dbname, username and password are set in `<mine>.properties`:

{{{
  project.title=FlyMine
  project.sitePrefix=/flymine
  gbrowse.database=gbrowse
  gbrowse.database.adaptor=mysql
  gbrowse.database.source=my-mine-release-1.0
  gbrowse.database.host=localhost
  gbrowse.database.user=username
  gbrowse.database.password=password
  gbrowse.database.write.user=username
  gbrowse.database.write.password=password
}}}

The `gbrowse.database.source` property is user visible name of the GBrowse configuration.  It will appear in URLs and on the GBrowse pages.  For example in FlyMine a GBrowse URL could be:
{{{
  http://www.flymine.org/cgi-bin/gbrowse/flymine-release-11.0/?label=Genes;name=FlyMineInternalID_1090061028;width=750
}}}
In this case `flymine-release-11.0` is the `gbrowse.database.source`.  This property is also used by GBrowse to choose the configuration file to use from the `gbrowse.config.directory` (see below).  For example if the property is set to `test-mine`, the file will be called `test-mine.conf`.  See the [http://www.gmod.org/wiki/index.php/CONFIGURE_HOWTO Gbrowse documentation] for information about the file.

The gbrowse.database.write.*, gbrowse.database and gbrowse.database.host  properties are used by the `load-gbrowse-data-mysql` target.  The gbrowse.database.user and gbrowse.database.password, gbrowse.database.host, gbrowse.database and gbrowse.database.source properties are used by `ant install-gbrowse-conf` (see below).

== Creating files for GBrowse ==

On your local machine, in `<mine>/gbrowse`:
{{{
  ant write-gff
}}}
which writes GFF and FASTA files for each chromosome to the `<mine>/gbrowse/build/gbrowse/data/` directory.

This command may use more than the default memory available for Java.  See the note about setting `ANT_OPTS`, at the bottom the [wiki:Prerequisites] page to increase the limit.

== Loading into GBrowse ==

To load GFF and FASTA files into a local GBrowse schema you need:
 * a machine with GBrowse, BioPerl and [http://www.mysql.org MySQL] installed
 * a 'gbrowse' database present in MySQL (use: `mysqladmin create gbrowse`)
 * set your umask to 0002 (to create files readable to all), which is needed so the the MySQL server can read the files created by the next step 
{{{
  umask 0002
}}}

Then run:
{{{
  ant load-gbrowse-data-mysql
}}}

This loads the GFF and FASTA files into a local (MySQL) gbrowse schema.

If there are problems, run `ant` with the `-v` flag. 

== Installing the <mine>.conf file ==

First make sure that these two properties are in your `<mine>.properties` file:
{{{
  gbrowse.config.directory=/etc/apache2/gbrowse.conf
  gbrowse.www.directory=/var/www/gbrowse
}}}

The directories will vary depending on where GBrowse is installed.  You can also use any valid [http://samba.anu.edu.au/rsync/ rsync] path, eg. `some_user@some_machine:/some/path/`

Run this in `<mine>/gbrowse`:
{{{
  ant install-gbrowse-conf
}}}
which command copies the a GBrowse configuration file from `<mine>/gbrowse/resources/<minename>.conf` into Apache's GBrowse conf directory (as configured with the `gbrowse.config.directory` property).  While being copied the filename is changed to `<source_name>.conf` where `<source_name>` is the value of the `gbrowse.database.source` property.

You will need to make sure that the `gbrowse.config.directory` is writable by the user.

Databse host, username and password are also read from the properties and substituted into `<source_name>.conf`.

GBrowse uses the filename of the configuration file to create the URL to access.  eg. setting gbrowse.database.source to flymine-release-3.0 gives a database that can be accessed at: http://www.flymine.org/browser/bin/gbrowse/flymine-release-3.0
