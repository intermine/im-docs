# Tutorial

The InterMine API is made more accessible through the publication of a number of client libraries in different languages. For the purposes of this tutorial we will use the Python client library for the illustration of examples, but any of the client libraries \(in Perl, Java, Ruby and JavaScript\) provides similar functionality. Similarly we will use FlyMine \(www.flymine.org\) as an example of an InterMine web-service, but the techniques discussed here are applicable for any of available implementations.

### Logging In / Authenticating

In the web-application interface we 'log in' to gain access to our personal data. When using the web-service API we speak of authentication as the process whereby your requests are mapped to a particular user account.

The recommended manner of authentication is through the use of API tokens; you can get yours by visiting the appropriate section of the web-application \([http://www.flymine.org/query/mymine?tab=api](http://www.flymine.org/query/mymine?tab=api)\). The token is a long string which is unique across the mine - since its use is equivalent to your password, remember to keep it safe.

You can authenticate with a mine as follows:

```python
from intermine.webservice import Service

flymine = Service('www.flymine.org/query', token = 'abcd')
```

If the URL for the mine is incorrect, or the token is, an error will be thrown.

While it is also possible use your username and password to authenticate with the webservice. This is strongly discouraged, due to the security implications of transmitting your password, not to mention storing it on disk in order to use it in code.

### Managing your Personal Data: Lists

One of the main reasons to use the webservices is to read and manipulate the data important to you, and lists are the main way to manage this.

To read the set of lists you have access to:

```python
from intermine.webservice import Service

flymine = Service('www.flymine.org/query', token = TOKEN)
for imlist in flymine.get_all_lists():
  print imlist.name
```

To calculate the enrichment results for a given list:

```python
mylist = flymine.get_list('demo-list')
for item in mylist.calculate_enrichment('pathway_enrichment'):
  print item.identifier, item.description, item.p_value
```

Creating a list from a file with identifiers in it is as straight-forward as naming that file:

```python
new_list = flymine.create_list("some/file/with.ids", "Gene")
```

If the identifiers are already in memory, in anything iterable, then that can be used instead. In the following case a string will be built up by reading the results of a database query.

```python
idents = db.query('SELECT identifier FROM GENE WHERE ...')
new_list = flymine.create_list(idents, "Gene")
```

Lists can be combined with standard set operations, which are overloaded in the languages that support such features:

```python
list_on_server = service.get_list("On server")
in_both = new_list & list_on_server
in_both.name = "Intersection %s and %s" % (new_list, list_on_server)
for gene in in_both:
   do_something_with(gene)
```

### Running a simple workflow:

We should have enough pieces now to put together a simple workflow, that demonstrates the kinds of operations we want to put together and how they may be combined.

Try and develop a script which will:

* Read all the files in a directory
* Create a list for each one from their contents, named after the file.
* Find the pathways for which the genes in each list are enriched above a certaint threshold.
* Create a list of those pathways.

### Regions

One can query for features in a region as follows:

```python
from interminebio import RegionQuery

org = "D. melanogaster"
feature_types = ["Exon", "Intron"]
regions =  ["2L:14614843..14619614"]

q = RegionQuery(flymine, org, features, regions, is_interbase = false)

for fasta in q.fasta():
    print fasta
```

The items can be saved in a list and then used in any other query.

```python
flymine.create_list(q, name = "List from Regions")
```

### Queries

The interface for creating queries borrows syntax and terminology from other DB query libraries.

```python
query = s.query("Gene").\
          select("*", "pathways.*").\
          where("GENE", "IN", "demo-list").\
          order_by("symbol")
for row in query.rows(start=10, size=5):
    handle_row(row)
```

