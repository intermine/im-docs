Intellij
========

It\'s recommended that if you are working with InterMine\'s Java code,
you use an IDE. Our favourite IDE at InterMine towers is Intellij.

Intellij has a Gradle plugin so it automatically handles Gradle projects
correctly. Here are detailed instructions that are quite clear:

<https://www.jetbrains.com/help/idea/gradle.html>

Depending on your Intellij version you should:

> 1.  New \>
> 2.  Project from existing source \>
> 3.  Then select the [build.gradle]{.title-ref} file from your
>     [bio/sources]{.title-ref} directory.

::: {.warning}
::: {.title}
Warning
:::

Don\'t select the [build.gradle]{.title-ref} files from your sources.
Instead, select the [build.gradle]{.title-ref} file from the
[bio/sources]{.title-ref} directory. The dependencies are listed in the
main project\'s [build.gradle]{.title-ref} file. If you load each
subproject by itself, Intellij won\'t load the dependencies correctly.
:::

You should import two projects for your mine:

-   flymine (webapp and dbmodel)
-   flymine-bio-sources

If you are working with the core InterMine code for whatever reason, we
have several projects to import:

-   plugin
-   intermine
-   bio
-   bio-sources
-   bio-postprocess

Errors
------

You\'ll get errors at first as the dependencies are not in place. Build
each project, and the dependencies will be downloaded and put on your
classpath. We recommend you check the option \"Build project
automatically\", located under Compiler Settings.

Running Unit Tests
------------------

To run a unit test, right click on the \"test\" task and execute.
\"Test\" is under \"Verification\".

Here is a detailed explanation:

<https://www.jetbrains.com/help/idea/gradle.html#gradle_context_menu>

::: {.index}
Intellij, IDE, Eclipse
:::
