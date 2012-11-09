Troubleshooting tips
========================

This page describes what to do if you encounter problems when installing or maintaining InterMine.  Please feel free to [wiki:ContactUs contact us] with any questions you may have.

Error messages
~~~~~~~~~~~~~~

If you encounter a problem when running Ant, try adding the verbose flag:
{{{
> ant -verbose
}}}
This should output a more useful error message.

=== Logs ===

'''Data warehouse'''

When integrating data, usually the errors are in intermine.log file in the directory you are in, eg. {{{/integrate}}} or {{{/dbmodel}}}.

'''Webapp'''

In order for the intermine webapp to write logs, you must correctly set the {{{webapp.logdir}}} property in {{{~/.intermine/malariamine.properties}}}. The property must be an absolute path to a directory on the tomcat machine, writable by tomcat.

When you see an error on the webapp or get a blank page and nothing appears in the webapp log from log4j, it is likely you will be able to find more information on what went wrong in the tomcat logs:

  * tomcat/logs/catalina.out  
  * tomcat/logs/localhost.DATE.logs

It will likely be the log that was modified last.  

A good way of looking at the output to these logs in real time is to use the command:
{{{
> tail -f tomcat/logs/LOGNAME
}}}

If you reload the webapp you will see the error output directly on the screen.

