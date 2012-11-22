project_build script
========================

We recommend running long builds from the `bio/scripts/project_build` script.  This is a perl program that reads a project.xml file and loads each source in turn.  This makes multiple calls to ant to avoid memory problems encountered when running many Java task sequentially from ant.  It also has the option of dumping the production database during the build and recovering from these dumps in case of problems.

.. note::

  NOTE: this script requires the Expect and XML::Parser::PerlSAX Text::Glob perl modules - install with: `sudo cpan -i XML::Parser::PerlSAX Expect Text::Glob`


Run the build script from the mine directory:

.. code-block:: bash

  $ ../bio/scripts/project_build -l -t -v server_name /some/dump/location/dump_file_prefix

The `server_name` is hostname of the machine where the `pg_dump` command should be run.  If you are running `project_build` on the same machine as PostgreSQL then you should specify `localhost` as the server name.  If the PostgreSQL server is on a remote machine, give its hostname.  In that case the script will try to run `pg_dump` on the remote machine using `ssh`.  This makes dumping a little faster and allows for the case where `/some/dump/location/dump_file_prefix` is only visible on the remote machine.

Dumps are performed when a source has `dump=true` in its `project.xml` definition:

.. code-block:: xml

    <source name="uniprot-malaria" type="uniprot" dump="true">
      <property name="uniprot.organisms" value="36329"/>
      <property name="src.data.dir" location="/data/flyminebuild/malaria/uniprot/7.7/36329"/>
    </source>

In this example, the dump will be made immediately after the `uniprot-malaria` source has been ''successfully'' merged.

Once all sources are integrated `project_build` will run any post-processing steps (also configured in the `project.xml`).

It is also possible to run individual integrate and post-process steps separately, see below.


Command line options
---------------------------

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

