FAQ: Data warehouse
===================

My data takes too long to load into the database. How long should it take? How can I make it faster?
----------------------------------------------------------------------------------------------------

There are improvements you can make. Mainly, setting ``ignoreDuplicates=true`` switches off a lot of performance enhancements that are not compatible with it, and makes the build run much slower. So if possible, you should make sure that there are no duplicated objects at all in each data source, and then switch off "ignoreDuplicates". It is alright for objects to be duplicated across data sources, because then the objects will merge, but each object must appear only once in each data source. The new release branch will contain code that will tell you if it sees any duplicated objects, and which objects they are.

As far as Postgres settings go, we have a set of settings that seem to serve us pretty well. We would recommend version 8.3 of PostgreSQL, as it contains features that help quite a bit. Some of the settings we change are:

``shared_buffers``
    Set to around 150MB
``temp_buffers``
    Set to around 80MB
``work_mem``
    Set to around 1500MB
``maintenance_work_mem``
    Set to around 500MB
``default_statistics_target``
    Set to around 250
``random_page_cost``
    Set to around 2.0, rather than 4.0
``effective_cache_size``
    Set to about 2/3 the amount of RAM in the computer

Obviously these settings should be adjusted to how much RAM there is in the computer - the ``work_mem`` shouldn't be more than a third of the RAM in the computer or so.

My data isn't loading, I'm getting an error, etc
------------------------------------------------

If you need help, please :doc:`/Support/ContactUs`. We're always happy to talk to InterMine users!

It's usually most helpful if you send us the detailed error message. Try running Ant with the verbose flag:

.. code-block:: bash

    $ ant -verbose build-db

You can also check the logs. The error messages should be in ``intermine.log`` in the directory you are currently in, eg ``/dbmodel`` or ``/integrate``.

See: :doc:`TroubleshootingTips`.

Where I can find a listing of all the existing data formats that can be loaded into InterMine?
----------------------------------------------------------------------------------------------

BioSources gives an overview of the data formats we already have parsers for. Each format is loaded by a 'source', see ``trunk/bio/sources``. Many of these can easily be re-used for other organisms and data files. There isn't a document yet that lists the properties that each source takes but you can see how they are used in the FlyMine ``trunk/flymine/project.xml``.

What are the other models do we have besides the genomic model and how would I use them?
----------------------------------------------------------------------------------------

Currently all biological mines call their model "genomic". That's a bit confusing bit it's necessary because the model name is used to create the Java package name and we need to have the same package in all mines so that we can reuse code.

We do have one non-"genomic" model that might be useful for you to look at. It's called "testmodel" and as expected it's used for testing. It's defined in this file: ``trunk/intermine/objectstore/model/testmodel/testmodel_model.xml``.

Unlike the biological mines, we define the testmodel in that one file, rather than having many additions.xml files.

How do you define a primary key for a model?
--------------------------------------------

Currently, if you're building on the "genomic" model (ie. you have:

.. code-block:: xml

    <property name="target.model" value="genomic"/> 

in your ``trunk/flymine/project.xml``, all primary keys are defined in the file: ``trunk/flymine/dbmodel/resources/genomic_keyDefs.properties``

We realise that having all keys in one place isn't very scalable but it's the only solution we have at the moment.

You would need to add a line like: ``Staff.key_identifier=identifier`` or: ``Staff.key_name=name`` (or both) to that file.

There can be multiple primary keys for each class (examples with many keys are Gene and Protein) so each source must configure which key to use when merging. 

See: :doc:`PrimaryKeys`.

When we define a new model (e.g., ``MY-NEW_model.xml``), in which directory should we put it under? In ``bio/sources/MY-NEW``?
------------------------------------------------------------------------------------------------------------------------------

Do you mean a new source? If so, then ``bio/sources/MY-NEW`` is correct.

When you say "define a new model" do you mean that you would like a complete new data model (ie. without Gene, Protein etc. but with your classes) or you would like to add to/modify the existing model?

Starting from scratch will take a lot of work. All of the mines we work on are based on the model in ``trunk/bio/core/core.xml`` and ``trunk/bio/core/genomic_additions.xml`` which define basic classes like "Organism" and "Chromosome". We recommend that you build on those to make your model.

All of the mines call their model by the same name "genomic", which is specified in the project.xml using the target.model property. We suggest you name your model "genomic" too because a lot of code (eg. in the ``trunk/bio/sources bio/sources`` directory) expects the Java package for the generated model code to be ``org.intermine.model.bio``.

See: :doc:`GettingStarted`, :doc:`AnatomyOfASource`.

Once a new model is defined, how do we include it Intermine and use it?
-----------------------------------------------------------------------

1. Include your new source in ``trunk/bio/tutorial/malariamine/project.xml``.
2. Update your additions file to include any new classes.
3. In ``trunk/bio/tutorial/malariamine/dbmodel <MINE_NAME>/dbmodel``, run this command:

.. code-block:: bash

    $ ant build-db

Running build-db will destroy any existing data loaded in the production database and re-create all the tables.

See: :doc:`SourceHowto`.

How and where can I set information for an organism?
----------------------------------------------------

There is a source called entrez-organism. This looks for all organism taxon ids in the database and contacts the NCBI web service to fill in the rest of the information. This is why we just use taxon ids in all sources.

Just run the source last and it should get filled in. 

See: :doc:`BioSources`.

Since FASTA sequences can either be in nucleotide or protein, is there a way that I can set this?
-------------------------------------------------------------------------------------------------

Yes, there is a property that can be passed to the fasta source - ``fasta.sequenceType``. The default is dna, but it can be set to protein. Here's an example:

.. code-block:: xml
    
    <source name="flybase-dmel-translation-fasta" type="fasta">
        <property name="fasta.taxonId" value="7227"/>
        <property name="fasta.className" value="org.flymine.model.genomic.Translation"/>
        <property name="fasta.classAttribute" value="organismDbId"/>
        <property name="fasta.includes" value="dmel-all-translation-*.fasta"/>
        <property name="fasta.sequenceType" value="protein"/>
        <property name="src.data.dir" location="/shared/data/flybase/dmel/release_5_1/fasta"/>
    </source>

Beside 'protein', what are other values can be assigned to ``fasta.sequenceType``?
----------------------------------------------------------------------------------

The InterMine fasta loader uses the ``fileToBiojava()`` method in the `BioJava SeqIOTools package <http://www.biojava.org/docs/api/org/biojava/bio/seq/io/SeqIOTools.html>`_. It looks like the options are ``dna``, ``rna`` or ``protein``.

There are several post processing tasks listed, what do they do?
----------------------------------------------------------------

See: :doc:`PostProcessing`.

Do we have an ``ant build-all`` target that does ``build-db``, integrate all the data sources, ``build-db-userprofile``, create the war file, remove the war file, and deploy the war file?
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Sorry, there's no target that does all that. Probably a small script would do the trick for you.

What database schema is used for InterMine?
-------------------------------------------

We don't have a diagram of our database schema - we design the model at the object level and the database schema is automatically generated.