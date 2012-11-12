Database Building
================================



= Running an !InterMine build =

A 'build' of a mine is a complete data loading run starting from an empty database.  The build will include the data integration and any post-processing steps.

Before starting the build process you will need to set up the appropriate [wiki:MineProperties properties] and then initialise your database with this command:
{{{
  cd <mine>/dbmodel/
  ant build-db
}}}


== project_build script ==

We recommend running long builds from the [source:trunk/bio/scripts/project_build project_build script].  This is a perl program that reads a [wiki:ProjectXMLFormat project.xml] file and loads each source in turn.  This makes multiple calls to ant to avoid memory problems encountered when running many Java task sequentially from [http://ant.apache.org ant].  It also has the option of dumping the production database during the build and recovering from these dumps in case of problems.

''NOTE: this script requires the Expect and XML::Parser::PerlSAX Text::Glob perl modules - install with: `sudo cpan -i XML::Parser::PerlSAX Expect Text::Glob`''

Run the build script from the mine directory:

{{{
  ../bio/scripts/project_build -l -t -v server_name /some/dump/location/dump_file_prefix
}}}

The `server_name` is hostname of the machine where the `pg_dump` command should be run.  If you are running `project_build` on the same machine as PostgreSQL then you should specify `localhost` as the server name.  If the PostgreSQL server is on a remote machine, give its hostname.  In that case the script will try to run `pg_dump` on the remote machine using `ssh`.  This makes dumping a little faster and allows for the case where `/some/dump/location/dump_file_prefix` is only visible on the remote machine.

Dumps are performed when a source has `dump=true` in its `project.xml` definition:

{{{
    <source name="uniprot-malaria" type="uniprot" dump="true">
      <property name="uniprot.organisms" value="36329"/>
      <property name="src.data.dir" location="/data/flyminebuild/malaria/uniprot/7.7/36329"/>
    </source>
}}}

In this example, the dump will be made immediately after the `uniprot-malaria` source has been ''successfully'' merged.

Once all sources are integrated `project_build` will run any post-processing steps (also configured in the `project.xml`).

It is also possible to run individual integrate and post-process steps separately, see below.


== Command line options ==

`project_build` allow the following options:

 * '''-v''' - is passed to ant to make it run in verbose mode, ant output can be seen in `pbuild.log`
 * '''-l''' - attempt to restart by reading the last dump file (see note below)
 * '''-r''' - attempt to restart just after the last dump point _without_ loading a dump (see note below)
 * '''-b''' - run build-db before starting build and drop any existing backup databases  (created when using the -t flag)
 * '''-n''' - parse files and report actions, but don't execute anything
 * '''-V''' - set the release number to pass to ant (as -Drelease=release_number)
 * this allows multiple sets of properties file.  eg. in the malariamine case, passing '''-V 1.0''' causes the build system to look for `build.properties.malariamine.1.0` and `malariamine.properties.1.0` instead of the default files
 * '''-t''' - instead of dumping and reloading, make backup copies of the database in the server using the "CREATE DATABASE foo WITH TEMPLATE bar" command
 * '''-D''' - set the destination database for the completed build; the database will be copied to this name in the same postgres server that the build used
 * '''-a''' - set the list of actions (ie. source integrations or post-processes) to perform - the list must be a subset of the sources/postprocesses in the project.xml file
  * The -l and -r operate as usual.
  * To run all steps starting at <some_action> use a dash after the action name: '''-a <some_action>-'''
  * To perform only the final dump use: '''-a final-dump'''
  * To refer to dump step and skip the corresponding action, use action name with "-dump" appended. eg.
   * '''-a fly-fish-dump-''' - dump the `fly-fish` source and continues integrating
   * '''-a fly-fish-dump,flymine-static,create-utr-references,final-dump''' - do just those steps

Dump files take the name ''dump_file_prefix.source_name''.  These dumps can be used by `project_build` to restart a build process after a previous problem.  Running project_build with '''`-l`''' will reload the latest dump (if any) with `dump_file_prefix` exist and restart the build from that point.

== Integration stage ==

Each mine has an integrate project that reads the [wiki:ProjectXMLFormat project.xml] file and builds the data warehouse.  This steps through each `source` defined in the project.xml file and transates the specified data from a source format and loads it into the production database.  Data integration is governed by [wiki:PrimaryKeys primary keys], any conflicts are resolved by a [wiki:PriorityConfig priorities config] file.

Integration can be run from the `<mine>/integrate/` directory by:

{{{
ant -v -Dsource=all
}}}

To run just one `source` specify the name (as it appears in project.xml):
{{{
ant -v -Dsource=malaria-gff
}}}

Most sources have multiple stages in retrieving data, to run just one stage use:
{{{
ant -v -Dsource=malaria-gff -Daction=[retreive|load]
}}}

The stages are:
 * `retrieve` - load data from source database/files into an items database
 * `translate` - convert from a source items database to a target items database
 * `load` - read from a target items database and integrate into the production database

Note that most sources do not have a `translate` step so `retrieve` will write to the `common-tgt-items` database.


== Post-processing stage == #post-processing

Some operations are performed on the integrated data before the webapp is released - post-processing. For example, setting sequences of !LocatedSequenceFeatures, filling in additional references and collections or transferring orthologues from translations to genes.  See a list of [wiki:PostProcessing common post-processing operations].  Some postprocessing steps are core to !InterMine.bio and should always be run, others are contributed by particular sources.

Post-processing steps are specified in [wiki:ProjectXMLFormat project.xml] and run from the `<mine>/postprocess` project with:

{{{
ant -v
}}}

To run individual post-process steps use, for example:

{{{
ant -v -Daction=create-references
}}}

When running one postprocess step like this, the `action` used must match an `post-process` in the `post-processing` section of the `project.xml` file.

Post-processing is run automatically after integrating if using the `project_build` script (see above).

To add a post-process step to !InterMine, you need to add the Java definition to the [source:trunk/bio/postprocess/main/ bio/postprocess/main/] project and call the post-process from the [source:trunk/bio/postprocess/main/src/org/intermine/bio/postprocess/PostProcessOperationsTask.java PostProcessOperationsTask] class.







.. toctree::
    :maxdepth: 4

    primary-keys
    priority-config
    data-model
