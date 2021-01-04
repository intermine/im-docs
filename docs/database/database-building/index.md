# Database Building

A 'build' of a mine is a complete data loading run starting from an empty database. It is recommended that you use the [project\_build script](build-script.md). The build script runs the data integration and any post-processing steps.

Each mine has an integrate project that reads the project.xml file and builds the data warehouse. This steps through each `source` defined in the project.xml file and transates the specified data from a source format and loads it into the production database. Data integration is governed by primary keys, any conflicts are resolved by a priorities config file.

::: {.toctree maxdepth="4"} build-script project-xml data-integration model-merging primary-keys priority-config post-processing/index post-build-updating-with-sql-triggers debugging :::

::: {.index} database building :::

