# Post build updating with SQL triggers

::: {.warning} ::: {.title} Warning :::

Please note this is an experimental facility and is subject to a number of caveats \(see below\). Please always take a backup of your database before trying. :::

We very much welcome feedback, discussion and additional patches for this. Many thanks to Joe Carlson of the DOE Joint Genome Institute for the idea and implementation!

## Requirements

1. InterMine release &gt; 1.7.3
2. plpgsql must be installed in your postgres \(select \* from

   pg\_language where lanname=\'plpgsql\';\) Check the postgreSQL manuals

   for instructions on installing languages if needed.

3. Backup the database prior to making changes, especially if there are

   changes that affect foreign keys.

## Procedure

Traditionally, once the data for a mine has been built, it can only be updated by a complete rebuild. However, sometimes, after a long loading process, you see that something is not right: perhaps a minor issue such as a typo in a name, or perhaps something more major such as errors in an entire dataset. Rather than rebuilding the entire mine from scratch, a process that can take many hours or even many days, you\'d like to make changes to your existing data build.

Making such updates requires co-ordinated changes to a number of InterMine tables. For instance, to update a value, one needs to at least:

1. Update the value in InterMine\'s table for that object \(e.g. the

   length column in the Gene table\).

2. Update the value in InterMine\'s tables for all the ancestor classes

   of that object \(e.g. the length column in the SequenceFeature

   table\).

3. Update the serialized object in the object column of the

   intermineobject table.

One way to do this is by installing triggers into the PostgreSQL database that will co-ordinate these updates. InterMine can now generate such triggers if you invoke the ant generate-update-triggers in your mine\'s dbmodel/ directory like so:

```text
cd $MINE
./gradlew generateUpdateTriggers
```

This will generate two SQL files in the dbmodel/build/resources/main/ subdirectory

```text
add-update-triggers.sql
remove-update-triggers.sql
```

\[add-update-triggers.sql\]{.title-ref} contains the SQL triggers necessary to co-ordinate table updates. \[remove-update-triggers.sql\]{.title-ref} contains the removal code. All the triggers have a prefix of \[im\_\]{.title-ref}.

### Adding triggers

To add the triggers just execute add-update-triggers.sql using psql like so

```text
psql -f add-update-triggers.sql MINE-NAME
```

You can now do basic create/update/delete operations such as:

* UPDATE organism set genus=\'Homo\" where genus=\'Homer\';
* DELETE FROM organism where commonname=\'yeti\';

The triggers propogate the operations to the superclasses and InterMineObjec tables

Tables have default values supplied for id and class, so you can create new records

* INSERT INTO organism \(genus,species\) values \(\'Hello\',\'world\'\);

The id is supplied from a sequence im\_post\_build\_insert\_serial which is initially set to the maximum id of InterMineObject.

Once you\'ve completed update operations, you must remove the triggers. Failure to do so may cause interference with InterMine\'s run time serial use, though this point needs to be clarified.

### Removing triggers

You can remove triggers by executing the \[remove-update-triggers.sql\]{.title-ref} SQL:

```text
psql -f remove-update-triggers.sql MINE-NAME
```

### What can\'t be done \(yet\)

Please note that there are a number of database changes that the triggers CANNOT handle as of yet:

1. Foreign key constraints are not enforced. If you delete a gene,

   there may still entries in the genesproteins table or a reference to

   this from the geneid field in the mrna table. Foreign keys are

   enforced at the application layer. This means whoever is doing the

   update needs to keep things straight. \(This is possible to

   implement. It may be done in the future.\)

2. The tracker table is not updated. If you do an integration step

   after manual operations and the integrator is trying to update a

   column value that you inserted manually, the integration step will

   fail.

3. The clob table cannot be manipulated. Again, this may also be

   changed in the future.

4. If the id field in InterMineObject has exceeded 2\^31 and gone

   negative, the sequence im\_post\_build\_insert\_serial cannot be used in

   INSERT operations without \(probably\) colliding with another object.

   The value of the serial must be set manually in this case.

