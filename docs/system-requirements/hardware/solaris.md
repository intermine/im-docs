# Solaris

[Installation guide](http://wiki.postgresql.org/wiki/Detailed_installation_guides#Solaris)

[Installation notes](http://www.postgresql.org/docs/8.4/static/installation-platform-notes.html)

[Update postgres.conf](http://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server)

[autovacuum is not turned off](http://www.postgresql.org/docs/8.4/static/routine-vacuuming.html#AUTOVACUUM) \(it's on by default\)

[Improvements for COPY](http://archives.postgresql.org/pgsql-performance/2006-02/msg00190.php)

```text
wal_sync_method = fsync
wal_buffers = 128
checkpoint_segments = 128
bgwriter_percent = 0
bgwriter_maxpages = 0
```

And also for `/etc/system` on Solaris 10, 9 SPARC use the following

```text
set maxphys=1048576
set md:md_maxphys=1048576
set segmap_percent=50
set ufs:freebehind=0
set msgsys:msginfo_msgmni = 3584
set semsys:seminfo_semmni = 4096
set shmsys:shminfo_shmmax = 15392386252
set shmsys:shminfo_shmmni = 4096
```

[Run analyse](http://www.postgresql.org/docs/8.4/static/sql-analyze.html)

Try using the `-fast` compile flag. The binaries might not be portable to other Solaris systems, and you might need to compile everything that links to PostgreSQL with `-fast`, but PostgreSQL will run significantly faster, 50% faster on some tests.

