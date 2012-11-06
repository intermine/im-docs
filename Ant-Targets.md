# Target common to most InterMine project build files =

## Common targets

<table>
<tr>
<td>clean</td>
<td></td>
</tr>
<tr>
<td>clean-all</td>
<td>clean this project and all dependencies</td>
</tr>

<tr>
<td>compile</td>
<td></td>
</tr>

<tr>
<td>jar</td>
<td>produce jar/war</td>
</tr>

<tr>
<td>generate</td>
<td>create generated code</td>
</tr>

<tr>
<td>action</td>
<td>do the action for this project, if any</td>
</tr>

<tr>
<td>javadoc</td>
<td>build javadoc to build/javadoc</td>
</tr>
</table>

## Test project targets

||default||will produce a jar *and* run tests||
| test | | | |
||test-all||test all dependencies as well as this project||

To run a single test class:
{{{
ant -Dtest.includes=org/intermine/ClassToTest.class
}}}

## dbmodel targets

||build-db||build the objectstore||

## Webapp project targets 

||'''target'''||'''purpose'''||
||clean||removes temporary directories||
||default||forces rebuild of .war file||
||release-webapp|| deploy to tomcat ||
||remove-webapp|| remove from tomcat ||

## Production webapp targets 

||build-db-userprofile|| initialise/clear the userprofile database (loads default templates too)||
||load-default-templates|| load default-template-queries.xml to the superuser account ||
||write-userprofile-xml||exports user profile database xml file to build/userprofile.xml||
||read-userprofile-xml||imports user profile database from build/userprofile.xml||
||drop-precomputed-tables||||
||precompute-queries||||
||precompute-queries-test||||
||precompute-templates||||


## Targets specific to testmodel/dbmodel 

||insert-data-unittest || insert test data into database||

