Panther
================================


1. Data
||Source||Data URL||
||panther||ftp://ftp.pantherdb.org/ortholog/current/RefGenomeOrthologs.tar.gz (gunzip to RefGenomeOrthologs.txt)||

2. project.xml

    <source name="panther" type="panther">
      <property name="src.data.dir" location="/DATA/panther"/>
      <property name="panther.organisms" value="7227 9606 10090 10116 7955 6239 4932"/>
    </source>


