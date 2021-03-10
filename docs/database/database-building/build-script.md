---
title: project_build script
---

To run a full build of InterMine, you must use the `project_build` script. This is a Perl program that reads a project.xml file and loads each source in turn. This makes multiple calls to Gradle to avoid memory problems encountered when running many Java task sequentially from Gradle. It also has the option of dumping the production database during the build and recovering from these dumps in case of problems.

**Note**
This script requires the Expect and XML::Parser::PerlSAX Text::Glob perl modules - install with: `sudo cpan -i XML::Parser::PerlSAX Expect Text::Glob`

Download the file from the intermine-scripts repository:

```bash
flymine $ wget https://raw.githubusercontent.com/intermine/intermine-scripts/master/project_build
```

Run the build script from the mine directory:

```bash
flymine $ ./project_build -b -v server_name /some/dump/location/dump_file_prefix
```

The `server_name` is hostname of the machine where the `pg_dump` command should be run. If you are running `project_build` on the same machine as PostgreSQL then you should specify `localhost` as the server name. If the PostgreSQL server is on a remote machine, give its hostname. In that case the script will try to run `pg_dump` on the remote machine using `ssh`. This makes dumping a little faster and allows for the case where `/some/dump/location/dump_file_prefix` is only visible on the remote machine.

Dumps are performed when a source has `dump=true` in its `project.xml` definition:

```markup
<source name="uniprot-malaria" type="uniprot" dump="true">
  <property name="uniprot.organisms" value="36329"/>
  <property name="src.data.dir" location="/data/flyminebuild/malaria/uniprot/7.7/36329"/>
</source>
```

In this example, the dump will be made immediately after the `uniprot-malaria` source has been ''successfully'' merged.

Once all sources are integrated `project_build` will run any post-processing steps \(also configured in the `project.xml`\).

It is also possible to run individual integrate and post-process steps separately, see below.

## Command line options

The `project_build` script accepts the following flags:

|  |  |
| :--- | :--- |
| -v | is passed to ant to make it run in verbose mode, ant output can be seen in pbuild.log |
| -l | attempt to restart by reading the last dump file \(see note below\) |
| -b | run build-db before starting build and drop any existing backup databases \(created when using the -t flag\) |
| -V | set the release number to pass to gradle \(as -Prelease=release\_number\) |

Dump files take the name `dump_file_prefix`.final.

Running project\_build with '''`-l`''' will reload the latest dump \(if any\) with `dump_file_prefix` and restart the build from that point.

**Note**
You must use the full path to the dump file, e.g. `/some/dump/location/dump_file_prefix`

## Running a Single Datasource

Before starting the build process you will need to set up the appropriate properties and then initialise your database with this command:

```bash
flymine $ ./gradlew builddb
```

**Note**
Running the `builddb` target will drop the current database and create a new, blank database.

To run a data source, run this command in your mine directory, specifying the source name \(as it appears in project.xml\):

```bash
flymine $ ./gradlew integrate -Psource=uniprot --stacktrace
```

Most sources have multiple stages in retrieving data, to run just one stage use:

```bash
flymine $ ./gradlew integrate -Psource=uniprot -Paction=load --stacktrace
```

The stages are:

**preretrieve**

pre-processing that is done

**retrieve**

load data from source database/files into an items database

**load**

read from a target items database and integrate into the production database

See `/system-requirements/software/gradle/index` for the full list of common Gradle tasks, or run `./gradlew tasks` to see the list of available tasks on the command line.

## Running a Custom Datasource

The build script expects the data source to be on the classpath already. If you are using a data source provided by InterMine, that parser will be put on the classpath for you. If you are using a custom source, you will need to put it on the classpath yourself. You can use the Gradle Maven plugin task `install` to compile your Java code, build the JAR and put on your classpath.

```bash
# run the install task to build your JAR
flymine-bio-sources $ ./gradlew install
```

```bash
# you can install a single source
flymine-bio-sources $ ./gradlew rnai:install
```

The `install` task will place the JAR in the Maven directory \"~/.m2/repository\".
