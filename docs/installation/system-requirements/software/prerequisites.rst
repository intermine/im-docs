Software
===========

'''NOTE: ''' InterMine '''only''' supports installations onto Linux and Mac OS X systems. Windows systems of any kind are '''not''' supported.  We run a mixture of Debian and Fedora servers in our data centre in Cambridge.

InterMine makes use of a variety of freely available software packages.  All of the programs below are required, except for Tomcat if you are not planning to make use of InterMine's web application.

||'''Software'''||'''Minimum Version'''||'''Purpose'''||
||[http://http://git-scm.com Git]||1.7||check out and update source code||
||[http://java.sun.com/javase/downloads/index.jsp Java SDK]||6.0||build and use InterMine||
||[http://ant.apache.org Ant]||1.8||invokes the InterMine build||
||[http://tomcat.apache.org/ Tomcat]||6.0.29, 7.0.xx||website||
||[http://www.postgresql.org/download/ PostgreSQL]||8.3||database||
||[http://www.junit.org JUnit]||3.8.1||run Java tests||
||[http://www.perl.org/ Perl]||5.8.8||Run Build Scripts||

== Configuration ==

After installation, some software requires a little configuration to work correctly with !InterMine.

=== Git ===

 1. [http://http://git-scm.com Git] is our source control software.  Download and install git on your local machine.
    * Linux users can do the following:
      * install the Git command line tool
        {{{
sudo apt-get install git-core
}}}
      * configure your user and email
        {{{
git config --global user.name "Name Surname"
git config --global user.email "your.email@gmail.com"
}}}
 1. Our code is available on [https://github.com/intermine/intermine GitHub].  
     * create your account in github [https://github.com/signup/free]
     * login and go in 'Account Settings' section to configure the SSH keys. 
       * See [https://help.github.com/articles/generating-ssh-keys].
 1. See [wiki:Git here] for how to download the code.


=== Java ===

 * [http://java.sun.com/javase/6/webnotes/install/index.html Java installation instructions]
   * Debian users can just run this command: "{{{sudo apt-get install sun-java6-jdk}}}"
 * InterMine can be rather memory-intensive, so you will probably need to set memory options for Java. To do this, set the environment variable ANT_OPTS to pass in to Java, by placing the following line in your ~/.bashrc file: 
   {{{
export ANT_OPTS="-server -XX:MaxPermSize=256M -Xmx1700m -XX:+UseParallelGC -Xms1700m -XX:SoftRefLRUPolicyMSPerMB=1 -XX:MaxHeapFreeRatio=99"
}}}
   Don't forget to run '. ~/.bashrc' to use this value in the current session.
 * Although you should change the -Xmx and -Xms values if you have very little or very much RAM in your computer.
 * Increase the `MaxPermSize` setting if you get this error:
   {{{
java.lang.OutOfMemoryError: PermGen space
}}}
See also CommonErrors

=== Ant ===

NOTE: several people have had problems with Ant installations set up by Linux package managers. We recommend installing Ant manually. 

 * [wiki:AntIntroduction Introduction to Ant]
 * [http://ant.apache.org/manual/index.html Ant's manual] has detailed instructions on how to install Ant.
 * Make sure you don't have any ant-related jars on your classpath already, or else the InterMine build will fail.  

=== Tomcat ===

See: [wiki:Tomcat]

=== Postgres ===

 * [wiki:PostgresBasics Introduction to PostgreSQL]
 * [http://www.postgresql.org/download/ PostgreSQL] has packages for most systems that set up everything for you.
 * You should use at least version 8.3, as we have recently removed workarounds for some bugs in previous versions.
   Postgres 8.4 is the default for most package managers and has better performance.
     * Fedora/CentOS: follow this link: http://wiki.openscg.com/index.php/PostgreSQL_RPM_Installation
     * !Debian/Ubuntu: 'sudo apt-get postgresql-8.4'
     * Mac:  see [http://www.postgresql.org/download/macosx].  We've had the most success with !MacPorts.
     * Solaris:  see [http://wiki.postgresql.org/wiki/Detailed_installation_guides#Solaris]
 * After installation, you need to update {{{postgresql.conf}}} - this file is usually located in `/etc/postgres/8.4`: 
 * If you are going to install Postgres 9.x:
   * It's not easy to change the default encoding to [http://www.postgresql.org/docs/9.0/static/multibyte.html SQL_ASCII] anymore, so you should do this before creating any databases.
   * There are special instructions for installing BioSeg, see BiosegInstallation

Required:

||listen_addresses||'*'||||
||tcpip_socket||true||(not needed in recent releases)||
||port||5432||||

Recommended, for optimum performance:

||shared_buffers||Set to around 150MB||
||temp_buffers||Set to around 80MB||
||work_mem||Set to around 500MB but not more than 1/10 of available RAM||
||maintenance_work_mem||Set to around 3000MB but not more than 1/5 of available RAM||
||default_statistics_target||Set to around 250||
||random_page_cost||Set to around 2.0, rather than 4.0||
||effective_cache_size||Set to about 2/3 the amount of RAM in the computer||
||geqo_threshold||Set to 14||
||from_collapse_limit||Set to 14||
||join_collapse_limit||Set to 14||
||max_locks_per_transaction||Set to 640||

You should also add a line to the pg_hba.conf file to allow logging in via password:
{{{
host    all         all         0.0.0.0/0             password
}}}

Note that changing some settings requires stopping/starting postgres, restart has no effect.

You also need to install the bioseg data type, and the contrib btree_gist plug-in, as described in BiosegInstallation.

For some basic postgres commands see: PostgresBasics
 

=== JUnit ===

 1. Download the junit-X.X.jar from [http://www.junit.org/]
 2. Copy to the ant lib directory, eg. {{{apache-ant-1.6.5/lib/}}}
 3. Add to the java classpath with this command, replacing X.X with the version number.
    {{{ 
export CLASSPATH=/path/to/junit-X.X.jar

}}} 

=== Perl ===

Many of the build processes are carried out by Perl programs. You will need Perl installed on your system to build or maintain an InterMine installation. Linux and MacOS systems will have a suitable Perl already installed. Perl is available for Windows, but is not actively supported by InterMine.

You may have to install further modules from time to time. See [wiki:InstallingPerlModules our guide] for how to get started.

----

See also: MacInstallation, [wiki:Hardware]

