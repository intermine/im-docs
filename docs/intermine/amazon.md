# How to set up your InterMine environment on the Amazon Cloud

This is where you should learn how to start your own MalariaMine web application on the Amazon Cloud. You could also use your InterMine Amazon instance to try building MalariaMine yourself or to build your own mine there.

## Pre-requisites

You need an Amazon account. If you don't have one:

* Go to [http://aws.amazon.com](http://aws.amazon.com).
* Click on `Sign Up`.
* Follow the instructions on the page.

You will need to set up your key pair security mechanism \(see step 7 below for an example\). Alternatively, you will need your aws-access-key and your aws-secret-key to start your instance \(not shown here\).

## Starting a new Instance

InterMine is publicly available on Amazon Cloud as an Image \(AMI\), with an AMI ID **ami-b1c7a9d8**.

The image contains a ready deployed MalariaMine. To start a new instance:

1. Sign in at [http://aws.amazon.com](http://aws.amazon.com).
2. Go to the EC2 management console by following these steps:

   AWS console --&gt; [https://console.aws.amazon.com/console/home](https://console.aws.amazon.com/console/home) --&gt; EC2 console.

3. Set up a security group \(if you don't have one\) which allows access

   to at least ports:

   > * 22 \(SSH\)
   > * 80 \(HTTP\)
   > * 8080 \(TOMCAT\)

   you could also set up a few spare ones \(20, 21, 8009\).

   {% hint style="info" %} 
   You can do this also during step 7, but **you cannot change the security group of an instance after starting it for the first time** \(unless you use a VPC instance, see [User Guide](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Introduction.html)\).  
   {% endhint %}

4. Go to the IMAGES/AMI console.
5. Set the location on the top header \(beside your username\) to _US_

   _East \(N. Virginia\)_.

6. Set the filter to _Public Images_ and search for **InterMine**.
7. Select _BasicIntermine_ AMI \(AMI ID = ami-b1c7a9d8\).
8. Launch \(and configure\) instance

   > * you can use all default options for the instance characteristics
   >
   >   and details, but use the security group you created in step 3.
   >
   > * when prompted, create a new key pair \(`.pem` file\), or use one
   >
   >   that you already own.

9. Go to the Instance console.
10. Select your new instance.
11. When public DNS appears \(after checks, a couple of minutes\), you can

    open a terminal with:

    ```bash
    $ ssh -i your_pem_file ubuntu@the_instance_public_DNS
    ```

## Starting an existing Instance

If you are using an existing Instance, you need to:

1. Sign in at [http://aws.amazon.com](http://aws.amazon.com).
2. Go to the EC2 console \(see step 2 above\).
3. Go to the Instance console.
4. Select your instance.
5. Start your instance \(Actions --&gt; Start\).

## Working with your Instance

Open a terminal in your Instance

```bash
$ ssh -i your_pem_file ubuntu@the_instance_public_DNS
```

you will land in `/home/ubuntu`.

Here, you can find these relevant directories:

`git/intermine` the InterMine code base

`.intermine` with the properties file

`malaria` sources for building MalariaMine

### Starting/stopping the existing MalariaMine web application

In `/webapp` you'll find tomcat6. You can start the webapp using this command:

```bash
$ ./start.sh
```

Your BioTestMine web application will then be available on

> [http://the\_instance\_public\_DNS:8080/malariamine](http://the_instance_public_DNS:8080/malariamine)

To stop the web application, use this command:

```bash
$ ./stop.sh
```

### Redeploying MalariaMine

In `/home/ubuntu/git/intermine/malariamine/webapp`, use this command:

```bash
$ ant -v default remove-webapp release-webapp
```

### \(Re\)building MalariaMine

See [http://intermine.readthedocs.org/en/latest/get-started/tutorial/](http://intermine.readthedocs.org/en/latest/get-started/tutorial/)

In `/home/ubuntu/git/intermine/malariamine`, use this command:

```bash
$ ../bio/scripts/project_build -b -v localhost ~/malariamine-dump
```

You can also follow all the steps in the build as illustrated in [Tutorial](../get-started/tutorial/index.md).

