So You Want to Develop for InterMine
=====================================

This document sets out the development processes for those contributing to the
`InterMine code base <https://github.com/intermine/intermine>`_. It specifically refers to the main application
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

``dev``
    The working branch. Features are merged onto this branch for integration testing. Not guaranteed to be stable.

Setting Up a Development Environment
----------------------------------------

Development does not happen on any of the special branches. The recommended practice is to fork the `intermine repo <https://github.com/intermine/intermine>`_ and maintain development branches in your own repository.

Developing a Feature
------------------------------------------------

Code contributions should be discrete units of code. They should do one thing (be that fix a bug or add a feature) and not be code dumps. Ideally they should refer to existing issues in the `InterMine issue tracker`. Let's say we want to develop a new feature - discussed in issue ``#12345: We should be better wombles and recyle everything`` - then we would do the following:

1. Checkout the current head of `dev` from upstream.

2. Branch `dev`, naming the branch something descriptive like ``womblier``.

3. Checkout the new branch.

4. Commit, commit, commit. Using detailed commit messages.

5. Push changes to your fork.

6. When you are satisfied that we have reached a sufficiently wombly state of being, then create a new pull request requesting that the head of ``you/womblier`` be merged into ``intermine/dev``.

At any point in the above process you can merge switch to work on another branch and then come back. It is probably a good idea to regularly merge the head of ``intermine/dev`` into ``you/womblier``, especially if development is taking a long time. These merges should probably be ``rebase`` merges.

Hot fix branches (serious bugs that are critical fixes to the current release) should be branched from ``master`` rather than ``dev``, and their pull requests should likewise be for ``master``.

The Role of The Release Manager
-----------------------------------

The release manager's role is to ensure this all happens. They are the only person permitted to push into ``master`` and ``dev``. All code contributions for these branches must pass review by the release manager before they can be merged.

The process for reviewing an merging a pull request is as follows:

1. Read the commits and review the code for style and standards. Request any changes from the developer before proceeding. The criteria for acceptance is:

 * Passing unit test for new code (if applicable)
 * Passes all tests -- according to Travis
 * Documentation (if applicable)
 * Single purpose
 * Detailed commit messages
 * Well commented code
 * Checkstyle

2. Fetch and checkout the new feature branch

3. Merge the target branch (``master`` or ``dev``) into the feature branch. If there are any conflicts push the pull-request back to the developer for resolution.

4. Perform necessary automated and manual testing to verify that this branch is valid.

5. Checkout the current head of ``intermine/dev`` and merge the feature branch into it.

6. Push ``dev`` to the `intermine repo <https://github.com/intermine/intermine>`_.

Release Process
-----------------------------------

Once all pull requests and tickets for a specific milestone are tested and complete, the release manager merges the `dev` branch onto the `master` branch tagging the merge with the milestone's label.  The release notes are available on the `Releases <http://github.com/intermine/intermine/releases>`_ page, and announcments are posted on twitter and the mailing lists and discussed in detail on the community calls.

[intermine repo]: https://github.com/intermine/intermine
