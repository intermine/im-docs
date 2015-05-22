So You Want to Develop for InterMine
=====================================

This document sets out the development processes for those contributing to the
`InterMine code base`_. It specifically refers to the main application
code-base, but these practices should be employed in an ideal world on all code
bases. This document is normative.

There is no distinction between the processes that developers should follow
internally or externally - all code contributions, whether from core team
members or outside contributers, should be treated the same.

Branches
-----------

There are branches in the InterMine GitHub repository with special meaning:

``master``
    The current public release. External users should clone this branch and receive a stable, supported and well-documented application that works to all specifications.

``stable``
    The next release candidate. Identical to the master branch except for the time immediately before a release. Finished and tested features land here before     being merged into ``master``. Users should clone this branch for a preview of     upcoming features. All code contributions to this branch are subject to review (see below), but this branch is still *pre-release*, and so the application may not meet all specifications, and documentation may be incomplete.

``dev``
    The working branch. Features are merged onto this branch for integration testing. Not guaranteed to be stable.

Setting Up a Development Environment
----------------------------------------

Development does not happen on either of the special branches. The recommended practice is to fork the `intermine repo`_ and maintain development branches in your own repository.

Developing a Feature
------------------------------------------------

Code contributions should be discrete units of code. They should do one thing
(be that fix a bug or add a feature) and not be code dumps. Ideally they should
refer to existing issues in the `InterMine issue tracker`. Let's say we want to
develop a new feature - discussed in issue ``#12345: We should be better wombles and recyle everything`` - then we would do the following:

1. Checkout the current head of beta from upstream.

2. Branch beta, naming the branch something like ``i12345`` to reference the
   issue, or something descriptive like ``womblier``.

3. Checkout the new branch.

4. Commit, commit, commit.

5. Push changes to fork.

6. When you are satisfied that we have reached a sufficiently wombly state of
   being, then create a new pull request requesting that the head of
   ``you/womblier`` be merged into ``intermine/beta``.

At any point in the above process you can merge switch to work on another branch and then come back. It is probably a good idea to:

* regularly merge the head of ``intermine/beta`` into ``you/womblier``,
  especially if development is taking a long time. These merges should probably
  be ``rebase`` merges.
* regularly merge the head of ``you/womblier`` into ``you/dev``. This makes sure
  that different branches you are developing all work together. ``dev`` is not a
  special branch - it is just a general collection point for all changes in your
  repository. No guarantees are made about its safety.

Hot fix branches (serious bugs that are critical fixes to the current release)
should be branched from ``master`` rather than ``beta``, and their pull requests
should likewise be for ``master``.

As a pretty diagram for developing a couple of feature branches and and a
hot-fix branch and then getting them into master looks a bit like:

::

             .----.---.--.               hf-big-bug
            /             \
    --.--------------------.-----------.---> master
       \                              / \
        .-----------------------.--.-.---.-> beta
        |\                     /  /
        \ .---.---.---.---.---.  /         womblier
         \                      /
          .--.--.--.--.--.--.--.           smurfier


The Role of The Release Manager
-----------------------------------

The release manager's role is to ensure this all happens. They are the only
person permitted to push into ``master`` and ``beta``. All code contributions
for these branches must pass review by the release manager before they can be
merged.

The process for reviewing an merging a pull request is as follows:

1. Read the commits and review the code for style and standards. Request any    changes from the developer before proceeding (code changes, more docs, more tests, *etc*).

2. Fetch and checkout the new feature branch

3. Merge the target branch (``stable`` or ``dev``) into the feature branch. If
   there are any conflicts push the pull-request back to the developer for
   resolution.

4. Perform necessary automated and manual testing to verify that this branch is
   valid.

5. Checkout the current head of ``intermine/dev`` and merge the feature branch into it.

6. Push ``dev`` to the `intermine repo`_.

Setting up Continuous Integration
------------------------------------

Continuous integration testing is a great tool for ensuring code quality. It
involves having a computer somewhere that runs your tests on every commit, and
informs you when the tests are broken. It only works if all the tests pass at
any given time, so you absolutely must not tolerate failing tests.

Using travis-ci
~~~~~~~~~~~~~~~~~~

Travis-CI is a popular continuous integration service, and is free for
open-source projects. It is configured with a configuration file which is
checked into the source code tree at the root of the project (see intermine's
at `./.travis.yml`). This makes getting started with travis very easy. All
you need to do is register your git repository with on travis-ci.org. Tests
will be automatically run over all branches you push to your registered
repository.

Using Codeship.
~~~~~~~~~~~~~~~~~

Codeship is another continuous integration service. It has some nice
features such as checking pull requests and sending test results to s3.  It
is configured in an administration interface on the site (codeship.io). You
will need to add the following configuration stanzas:

Setup commands:

::
    
    sh config/codeship-init.sh

Test commands:

::

    ant -f intermine/objectstore/test/build.xml 2>&1 | tee >(grep FAILED | sed
    -e 's/^/[objectstore] /' >> failures.list)
    ant -f intermine/integrate/test/build.xml 2>&1 | tee >(grep FAILED | sed -e
    's/^/[integrate] /' >> failures.list)
    ant -f intermine/pathquery/test/build.xml 2>&1 | tee >(grep FAILED | sed -e
    's/^/[pathquery] /' >> failures.list)
    ant -f intermine/api/test/build.xml 2>&1 | tee >(grep FAILED | sed -e
    's/^/[api] /' >> failures.list)
    ant -f intermine/web/test/build.xml 2>&1 | tee >(grep FAILED | sed -e
    's/^/[web] /' >> failures.list)
    cat failures.list
    (cd testmodel; PSQL_USER=$PG_USER PSQL_PWD=$PG_PASSWORD sh setup.sh); sleep 10
    cat testmodel/build.log
    (cd testmodel/webapp/selenium; nosetests)
    export NOW=$(date --iso-8601=seconds | sed 's/:/-/g')
    export ARCHIVE="test-results-${NOW}.tar.gz"
    mkdir test-results
    cp -r intermine/objectstore/test/build/test/results
    test-results/object-store
    cp -r intermine/integrate/test/build/test/results test-results/integrate
    cp -r intermine/pathquery/test/build/test/results test-results/pathquery
    cp -r intermine/api/test/build/test/results test-results/api
    tar -zcvf "$ARCHIVE" test-results
    # If you want to send test results to s3, do that here:
    # pip install awscli
    # aws s3 cp "$ARCHIVE" s3://$YOUR-s3-BUCKET/"$ARCHIVE"
    test ! -s failures.list

Environment:

::
    ANT_OPTS=-server
    # If you want to send test results to s3, add your AWS keys here:
    AWS_DEFAULT_REGION=eu-west-1
    AWS_ACCESS_KEY_ID=$YOUR_ID
    AWS_SECRET_ACCESS_KEY=$YOUR_KEY

.. _intermine repo: https://github.com/intermine/intermine
.. _InterMine code base: `intermine repo`
.. _InterMine issue tracker: `http://github.com/intermine/intermine/issues

