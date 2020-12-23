orphan

:   

Data Source Versions
====================

Your InterMine data parser has a version.

What is the version for my data parser?
---------------------------------------

The version for your mine\'s custom source is the [version]{.title-ref}
value in the [build.gradle]{.title-ref} file in your sources directory.
When you install your source, the JAR of the correct version will be
created.

``` {.guess}
# "build.gradle" in the root of your sources directory
group = 'org.intermine'
version = '4.0.1' <-- change this to change your source's version
```

See FlyMine\'s
[build.gradle](https://github.com/intermine/flymine-bio-sources/blob/master/build.gradle#L26)
file.

We recommend you use [semantic versioning](https://semver.org/).

How do I specify which version of my data parser to use in my build?
--------------------------------------------------------------------

To use a specific version, add a parameter to your project XML entry.

``` {.xml}
<source name="flyatlas" type="flyatlas" version="2.0.0">
  <property name="src.data.dir" location="/data/flyatlas"/>
</source>
```

You will get an error if it can\'t find a JAR with this version. Note
that this is a simple string comparison, e.g. \"2.0\" will NOT match
with \"2.0.0\".

If no version is provided, the default InterMine version is used. For
InterMine\'s bio sources, a global variable is set in the
[gradle.properties]{.title-ref} file in your mine.

I got an error. Maven can\'t find my JAR
----------------------------------------

Here is an example error:

``` {.guess}
> Could not find any matches for org.intermine:bio-source-mysource:4.0.+ 
```

Maven is looking in your repo and Maven central for your JAR as version
4.0.0. You have two choices:

1.  Update the version of your source to be 4.0.0.
2.  Update your project XML to set the version to look for to 4.0.0.

See the above sections for how to do this.

I got an error. Why is Maven looking in Maven Central for my JAR?
-----------------------------------------------------------------

Here is an error when Maven can\'t find your JAR:

``` {.guess}
> Could not find any matches for org.intermine:bio-source-mysource:4.0.+ as no versions of org.intermine:bio-source-mysource are available.
  Searched in the following locations:
      file:/home/$USER/.m2/repository/org/intermine/bio-source-mysource/
      https://jcenter.bintray.com/org/intermine/bio-source-mysource/
```

You can see that Maven first looking in your local Maven repo, then it
looked in the remote Maven repository, JCenter.

This is because in the gradle file, we have specified which repositories
to search. Maven will search in order. It will search the first repo for
the specified JAR. If it fails, then it will continue to the next
repository.

``` {.guess}
# in build.gradle
repositories {
    mavenLocal() <-- where your installs go
    jcenter() <-- InterMine JARs
    mavenCentral() 
}
```

::: {.index}
version, semantic versioning, JAR version, systemProp, imVersion,
bioVersion, JCenter, Maven
:::
