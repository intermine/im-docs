# Diagnostic

Occasionally something may go wrong with your webapp - your webapp may fail to load in your browser, not reflect your most recent changes and so on. In our experience, following the steps listed here should fix ~99% of any problems you encounter.

## Restart Tomcat

Restarting Tomcat may fix your issue. If you find you have to restart Tomcat often, you may want to give Tomcat more memory.

Also, if in a deadlock, Tomcat may not shutdown successfully. Be sure to check the Tomcat process really is gone before starting a new one.

## Verify MINE.properties file

The `base-url` property must valid or else queries will not run properly.

This file must live in the `.intermine` directory.

## Verify Tomcat config

Please make sure you have configured Tomcat correctly. See [Tomcat](../../system-requirements/software/tomcat.md)

## Force recompile

Run this command in your `webapp` directory:

```bash
$ ./gradlew clean
```

Verify `/build` is gone from your `webapp` directory.

## Re-release webapp

```bash
$ ./gradlew cargoReDeployRemote
```

