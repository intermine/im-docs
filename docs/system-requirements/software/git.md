Git
===

[Git](http://git-scm.com) is our source control software. Download and
install git on your local machine.

::: {.note}
::: {.title}
Note
:::

InterMine is available via JCenter as executable JARs. We do not
recommend downloading the InterMine source code.
:::

InterMine source code is available via
[GitHub](https://github.com/intermine/intermine).

Getting started
---------------

See `/get-started/quick-start`{.interpreted-text role="doc"} or
`/get-started/create-your-mine`{.interpreted-text role="doc"} for
instructions on how to create a new InterMine.

Local Installation (for advanced users)
---------------------------------------

You should use the JARs available via
[JCenter](https://jcenter.bintray.com/org/intermine/). However, if you
want to make custom changes to InterMine, you can install locally.

1.  Get InterMine code

```{=html}
<!-- -->
```
    ~/git $ git clone https://github.com/intermine/intermine.git

2.  Checkout the InterMine version you need

Get the list of valid tags.

    # change into the correct directory
    ~/git $ cd intermine
    # get a list of tags
    ~/git/intermine $ git tag -l

Checkout the correct tag for the InterMine version you want to use.

    # get the correct version of the InterMine software
    ~/git/intermine $ git checkout tags/<tag_name> -b <branch_name>

3.  Copy in your changes to the InterMine code.
4.  Rebuild JARs locally.

Run the Maven task [install]{.title-ref} to compile and create the JARs
you need to run an InterMine instance.

    ~/git/intermine $ (cd plugin && ./gradlew clean && ./gradlew install) && (cd intermine && ./gradlew clean && ./gradlew install) && (cd bio && ./gradlew clean && ./gradlew install) && (cd bio/sources && ./gradlew clean && ./gradlew install)  && (cd bio/postprocess/ && ./gradlew clean && ./gradlew install)

This places the JARs in [\~/.m2/repository]{.title-ref}. You can now
build a database and deploy a webapp, and your custom local JARs will be
used.

### Why will Maven use my JARs instead of the published JARs?

The Gradle build files are configured so that Maven looks in your local
Maven ([\~/.m2/respository]{.title-ref}) directory first before looking
in JCenter. If Maven finds the correct version locally, those are the
JARs it will use. But make sure you have the correct version!

### Set your InterMine version

The InterMine version you use is determined by the system variables set
in your mine\'s [gradle.properties]{.title-ref} file.

Make sure you have your
`/intermine/intermine-versions`{.interpreted-text role="doc"} set
correctly. If you want to use local JARs, it\'s best to specify the
exact version, e.g. [1.2.3]{.title-ref}, of your local JARs. Do this in
your mine\'s [gradle.properties]{.title-ref} file.

If you use [4.0.+]{.title-ref} there\'s a possiblity a newer version of
InterMine is published. The plus sign instructs Maven to get the latest
version of InterMine in *any* repository. In which case, Maven would use
the newer JARs in JCenter instead of your local JARs.

::: {.index}
git, maven, JARs
:::
