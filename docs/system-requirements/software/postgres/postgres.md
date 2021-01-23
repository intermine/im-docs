# Installing PostgreSQL

{% hint style="warning" %}
We recommend you install PostgreSQL 9.2 and above. We currently run our [continuous integration tests](https://travis-ci.org/intermine/intermine) on PostgreSQL 9.2. [The PostgreSQL downloads page](http://www.postgresql.org/download) has packages \(for most systems\) that set up everything for you.
{% endhint %}

**Fedora/CentOS**

[https://computingforgeeks.com/how-to-install-postgresql-on-fedora/](https://computingforgeeks.com/how-to-install-postgresql-on-fedora/)

**Debian/Ubuntu**

`sudo apt-get install postgresql`

**Mac**

There are several good options:

> * [Postgres.app](http://postgresapp.com/) - Very easy for a development machine, requires zero configuration.
> * [MacPorts](https://github.com/codeforamerica/ohana-api/wiki/Installing-PostgreSQL-with-MacPorts-on-OS-X)
> * [Homebrew](https://gist.github.com/ibraheem4/ce5ccd3e4d7a65589ce84f2a3b7c23a3)
> * [Manually](http://www.postgresql.org/download/macosx)
>
> We have had good experiences with Postgres.app and Macports.

Some of the recommended settings below may not apply to older versions of PostgreSQL.

## Configuration file

Most of the configurations below are made by updating the file `postgresql.conf`, usually located in `/etc/postgres/version-nr/main`.

## Required Configurations

### Allow remote connections

| listen\_addresses | ‘\*’ |
| :--- | :--- |
| port | 5432 |

## Recommended Configurations

The system works reasonably well with the default configuration. For better performance, we recommend to make the changes below.

### Character Set Encoding

You should only use either `SQL_ASCII` or `UTF-8`. If performance is an issue, the use of `SQL_ASCII` is strongly recommended. \[1\]

Procedures to change character encoding to `SQL_ASCII` in PostgreSQL 9.x:

```bash
sudo -u postgres psql
update pg_database set datallowconn = TRUE where datname = 'template0';
\c template0
update pg_database set datistemplate = FALSE where datname = 'template1';
drop database template1;
create database template1 with template = template0 encoding = 'SQL_ASCII' LC_COLLATE='C' LC_CTYPE='C';
update pg_database set datistemplate = TRUE where datname = 'template1';
\c template1
update pg_database set datallowconn = FALSE where datname = 'template0';
\q
exit
```

you can check the expected screenshot here \[2\] .

### Database Server Configuration

#### Kernel Memory setting

Please check your server kernel setting

```bash
getconf PAGE_SIZE
getconf _PHYS_PAGES

sysctl -a | grep -E "shmall|shmmax"
```

\(use sudo if necessary\)

Set

```bash
shmall = phys_pages / 2
shmmax = shmall * pagesize
```

by editing the file

```bash
/etc/sysctl.d/30-postgresql-shm.conf
```

and sourcing it

```bash
sudo sysctl -p /etc/sysctl.d/30-postgresql-shm.conf
```

#### PostgreSQL parameters

For better performance. Read [Tuning your PostgreSQL Server](http://wiki.postgresql.org/wiki/Tuning_Your_PostgreSQL_Server/) for more information.

| Parameter | Suggested value \(build\) |
| :--- | :--- |
| shared\_buffers | 10-25% of RAM |
| temp\_buffers | around 80MB |
| work\_mem | around 500MB but &lt; 10% of RAM |
| maintenance\_work\_mem | 5% of RAM but &lt; 20% of RAM |
| default\_statistics\_target | around 250 |
| random\_page\_cost | around 2.0-2.5 |
| effective\_cache\_size | 50% of RAM |
| synchronous\_commit | off |
| geqo\_threshold | 14 |
| from\_collapse\_limit | 14 |
| join\_collapse\_limit | 14 |
| max\_locks\_per\_transaction | 640 |
| max\_pred\_locks\_per\_transaction | 640 |
| checkpoint\_segments | 128 |
| checkpoint\_timeout | 10min |
| checkpoint\_completion\_target | 0.9 |

Note that most of the changes above require starting postgres.

{% hint style="info" %}
Depending on your system configuration \(production or development\), the type of sources used in the build \(files or databases\) and the load on your web application, you may need to increase the **max\_connections** parameter \(for example to 250\).
{% endhint %}

#### Client Authentication

You should also add a line to the pg\_hba.conf file to allow logging in via password:

```text
host    all         all         0.0.0.0/0             password
```

> \[1\] 
>
> The InterMine system stores all text in the database in `UTF-8` format. If you set PostgreSQL to `LATIN-9`, then PostgreSQL will perform some incorrect conversions, and may even give an error. Setting the format to `UTF-8` results in PostgreSQL treating the text completely correctly, which is quite a complicated and slow operation in `UTF-8`.
>
> If you set PostgreSQL to `SQL_ASCII`, then that is a special character set in Postgres, which basically means “do no conversions”. This is sufficient for almost all operations. All comparisons and index lookups will be done on a byte-by-byte basis, which is much faster than having to deal with Unicode’s complications.
>
> Please try to treat InterMine as a black box. The fact that it uses PostgreSQL to store its data should be a detail that should be hidden as much as possible. The InterMine system is written in Java, and therefore handles all text in Unicode.
>
> The template1 database is the database used as a template when you run the `createdb` command. Update the encoding for template1 to be SQL\_ASCII, then every database you create from now on will have the correct encoding.

> \[2\]
>
>
>
> ```text
> postgres=# update pg_database set datallowconn = TRUE where datname = 'template0';
> UPDATE 1
> postgres=# \c template0
> You are now connected to database "template0" as user "postgres".
> template0=# update pg_database set datistemplate = FALSE where datname = 'template1';
> UPDATE 1
> template0=# drop database template1;
> DROP DATABASE
> template0=# create database template1 with template = template0 encoding = 'SQL_ASCII' LC_COLLATE='C'    LC_CTYPE='C';
> CREATE DATABASE
> template0=# update pg_database set datistemplate = TRUE where datname = 'template1';
> UPDATE 1
> template0=# \c template1
> You are now connected to database "template1" as user "postgres".
> template1=# update pg_database set datallowconn = FALSE where datname = 'template0';
> UPDATE 1
> ```

See also: [HikariCP and InterMine settings](hikari.md)

