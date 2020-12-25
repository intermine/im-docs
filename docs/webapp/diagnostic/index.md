# Diagnostic

Occasionally something may go wrong with your webapp - your webapp may fail to load in your browser, not reflect your most recent changes and so on. In our experience, following the steps listed here should fix ~99% of any problems you encounter.

## Restart Tomcat

Restarting Tomcat may fix your issue. If you find you have to restart Tomcat often, you may want to give Tomcat more memory.

Also, if in a deadlock, Tomcat may not shutdown successfully. Be sure to check the Tomcat process really is gone before starting a new one.

## Verify MINE.properties file

The \[base-url\]{.title-ref} property must valid or else queries will not run properly.

This file must live in the \[.intermine\]{.title-ref} directory.

## Verify Tomcat config

Please make sure you have configured Tomcat correctly. See `/system-requirements/software/tomcat`{.interpreted-text role="doc"}

## Force recompile

Run this command in your \[webapp\]{.title-ref} directory:

```text
$ ./gradlew clean
```

Verify \[/build\]{.title-ref} is gone from your \[webapp\]{.title-ref} directory.

## Re-release webapp

```text
$ ./gradlew cargoReDeployRemote
```

