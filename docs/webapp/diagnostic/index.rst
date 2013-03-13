Diagnostic
================================

Here is list of check points before you release a webapp or when you have any issues:

1. Check MINE.properties files

    a. make sure base-url is valid
    b. correct placement / name

1. Is tomcat running?

    a. stop tomcat
    b. run `ps aux | grep tomcat`, any live tomcat process?
    c. restart tomcat

2. Remove old code

    a. run `ant clean-all`
    b. `ls` (make sure /build is gone)

3. release webapp

    a. run `ant default remove-webapp release-webapp` 
