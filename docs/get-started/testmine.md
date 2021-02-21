---
title: Testmine
---

This is an InterMine used for testing new features, and for continuous integration tests on Travis. Its tables include: Employee, Company and Department. The mine does not contain biological data.

To start a testmine, run the [setup](https://github.com/intermine/intermine/blob/master/testmine/setup.sh) script:

```text
testmine $ ./setup.sh
```

It uses your UNIX username if you haven't set the PSQL\_USER, PSQL\_PWD ENV variables. The script copies the [testmodel.properties](https://github.com/intermine/intermine/blob/master/testmine/dbmodel/resources/testmodel.properties) file into your home `.intermine` directory.

There are different targets to load data:

* insertData - Loads basic data, e.g. EmployeeA, EmployeeB
* loadsadata - Loads basic data set and testmodel\_extra\_data.xml
* enormocorp - Loads basic data set, testmodel\_extra\_data.xml, and

  testmodel\_enormo\_data.xml

The setup script runs `loadsadata`.

```text
# run to see which tasks are available for you
testmine $ ./gradlew tasks
```

