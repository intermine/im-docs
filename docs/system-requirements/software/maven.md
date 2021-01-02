# Maven

InterMine uses [Maven](https://maven.apache.org/) to manage local dependencies, including your mine-specific data sources.

```bash
# for Ubuntu
sudo apt-get install maven
```

Previously you had to download and compile InterMine. Now, instead, you'll be using the compiled InterMine JARs available via jCenter. They will be automatically dowloaded and stored in the gradle cache ~/.gradle/caches/modules-2/files-2.1/org.intermine/.

To use your mine-specific bio sources, you will install Maven locally. The install task, recompiles the bio-source code, creates a new jar and installs it in you local Maven. These JARs are located in ~/.m2.

