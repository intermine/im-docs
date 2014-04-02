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

There are two branches in with special meaning:

``master``
    The current public release. External users should clone this
    branch and receive a stable, supported and well-documented application that
    works to all specifications.

``beta``
    The next release candidate. Finished and tested features land here before
    being merged into ``master``. Users should clone this branch for a preview of
    upcoming features. All code contributions to this branch are subject to
    review (see below), but this branch is still *pre-release*, and so the
    application may not meet all specifications, and documentation may be
    incomplete.

Setting Up a Development Environment
----------------------------------------

Development does not happen on either of the special branches. The recommended
practice is to fork the `intermine repo`_ and maintain development branches
there.

Developing a Feature
------------------------

Code contributions should be discrete units of code. They should do one thing
(be that fix a bug or add a feature) and not be code dumps. Ideally they should
refer to existing issues in the `InterMine issue tracker`. Let's say we want to
develop a new feature - discussed in issue ``#12345: We should be better wombles
and recyle everything`` - then we would do the following:

1. Checkout the current head of beta from upstream.

2. Branch beta, naming the branch something like ``i12345`` to reference the
   issue, or something descriptive like ``womblier``.

3. Checkout the new branch.

4. Commit, commit, commit.

5. Push changes to fork.

6. When you are satisfied that we have reached a sufficiently wombly state of
   being, then create a new pull request requesting that the head of
   ``you/womblier`` be merged into ``intermine/beta``.

At any point in the above process you can merge switch to work on another branch
and then come back. It is probably a good idea to:

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

1. Read the commits and review the code for style and standards. Request any
   changes from the developer before proceeding (code changes, more docs, more
   tests, *etc*).

2. Fetch and checkout the new feature branch

3. Merge the target branch (``beta`` or ``master``) into the feature branch. If
   there are any conflicts push the pull-request back to the developer for
   resolution.

4. Perform necessary automated and manual testing to verify that this branch is
   valid.

5. Checkout the current head of ``intermine/beta`` and merge the feature branch into it.

6. Push ``beta`` to the `intermine repo`_.

.. _intermine repo: https://github.com/intermine/intermine
.. _InterMine code base: `intermine repo`
.. _InterMine issue tracker: `http://github.com/intermine/intermine/issues

