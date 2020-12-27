# Gradle - FAQs

[Gradle](https://gradle.org) is InterMine\'s build tool. In InterMine 2.0 Gradle replaced ant.

Please see `Upgrade instructions </intermine/upgrade>`{.interpreted-text role="doc"} for details on how to migrate your system to use Gradle and `Gradle Quick Start </system-requirements/software/gradle/index>`{.interpreted-text role="doc"} for common Gradle commands.

### I got an error: \"Caused by: java.security.InvalidKeyException: EC parameters error\"

InterMine 2.0 only works with Java 8+. Please update your Java version and that will fix this error.

### I got an error: \"Caused by: java.security.NoSuchProviderException: no such provider: SunEC\"

InterMine 2.0 only works with Java 8+. Please update your Java version and that will fix this error.

### I got an out of memory error! Help!

Gradle gets its properties differently from ant. Instead of \[ANT\_OPTS\]{.title-ref}, set \[GRADLE\_OPTS\]{.title-ref}. Use the same values but also append \[-Dorg.gradle.daemon=false\]{.title-ref} to prevent the use of Gradle daemons.

### I set \[GRADLE\_OPTS\]{.title-ref} properly and I still am getting an \"out of memory\" error message

Append \[-Dorg.gradle.daemon=false\]{.title-ref} to prevent the use of Gradle daemons.

### I got ANOTHER error: \"java.lang.ClassCastException: org.apache.xerces.parsers.XIncludeAwareParserConfiguration cannot be cast to org.apache.xerces.xni.parser.XMLParserConfiguration \"

Update your \[GRADLE\_OPTS\]{.title-ref} to disable deamons.

\[export GRADLE\_OPTS=\"-Dorg.gradle.daemon=false\"\]{.title-ref}

### Error in log file when I deploy my webapp: \"Caused by: java.io.IOException: Error writing request body to server\"

Try \[./gradlew cargoRedeployRemote\]{.title-ref} instead of \[./gradlew cargoDeployRemote\]{.title-ref}

### I tried to install my data source, but I got an exception saying it can\'t find a class. I know this class IS in my data model though!

Update your source\'s additions file to include this class.

Previously, all additions files listed in your project XML were merged into a single genomic\_model.xml that was placed on your classpath. Now, instead, only the core data model and your additions file are merged into genomic\_model.xml and placed in the JAR of the data source.

Alternatively, you can set the \[globalAdditionsFile\]{.title-ref} parameter to specify a single file that will be merged into each of your data sources. Look for this configuration in your mine\'s bio sources \[build.gradle\]{.title-ref} file.

### Where is InterMine code on my server?

The InterMine JARs are here on your machine:

```text
# gradle - remote repos
~/.gradle/caches/modules-2/files-2.1/org.intermine/
# maven - local installs
~/.m2
```

You normally will be pulling the JARs down from the remote repository, unless you have installed the JARs locally yourself.

### Which JAR am I using? I have JARs in both of those directories.

Here is an excerpt from the mine\'s \[build.gradle\]{.title-ref} file the determines which JAR is being used:

```text
repositories {
    mavenLocal()
    jcenter()
    maven {
        url "https://oss.jfrog.org/artifactory/oss-snapshot-local"
    }
}
```

Gradle will go through each of these repositories and use the best version it finds.

#### Maven Local

Gradle first looks in \[mavenLocal\(\)\]{.title-ref} which is your \[~/.m2/repository\]{.title-ref} directory. These are JARs you have installed locally.

#### Remote Repositiories \(JCenter and JFrog\)

Gradle then looks in the remote repositories \(JCenter and Jfrog\).

[JCenter](https://jcenter.bintray.com/org/intermine/) is where our InterMine JARs are stored remotely.

[JFrog](https://oss.jfrog.org/artifactory) is where our InterMine SNAPSHOT JARs are currently.

Gradle will use the JAR with the latest version. This is because we use the \[2.0+\]{.title-ref} notation.

The versions for the JARs are set in each project:

```text
intermine/build.gradle
plugin/build.gradle
bio/build.gradle
bio/sources/build.gradle
bio/postprocess/build.gradle
```

Currently this version is **2.1.1**

Which dependency versions to use is set in the gradle.properties file for each project:

```text
intermine/gradle.properties
plugin/gradle.properties
bio/gradle.properties
bio/sources/gradle.properties
bio/postprocess/gradle.properties
```

Currently set to **2.1+**

You can overwrite this value and set these values in your mine\'s \[gradle.properties\]{.title-ref} file.

### I want to make a change to InterMine. How do I install InterMine locally?

See `Local installation </system-requirements/software/git/>`{.interpreted-text role="doc"} for how to install InterMine locally.

### I got a different error! Help!

Please send a detailed stacktrace to the dev mailing list, or pop onto our discord -- chat.intermine.org.

Common issues:

* Always use the wrapper provided. \[./gradlew\]{.title-ref} and NOT

  \[gradle\]{.title-ref}.

* Using a \[daemon\]{.title-ref}. Update your \[GRADLE\_OPTS\]{.title-ref}

  with the \[no-daemon\]{.title-ref} flag.

See `/support/troubleshooting-tips`{.interpreted-text role="doc"} for common error messages.

::: {.index} gradle, ant, maven :::

