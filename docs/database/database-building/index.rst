Database Building
================================

A 'build' of a mine is a complete data loading run starting from an empty database.  The build will include the data integration and any post-processing steps.

Before starting the build process you will need to set up the appropriate [wiki:MineProperties properties] and then initialise your database with this command:
{{{
  cd <mine>/dbmodel/
  ant build-db
}}}


.. toctree::

  running-a-build
  primary-keys
  priority-config
  data-model
