How to set up your InterMine environment on the Amazon Cloud
================================================================

Where you should learn how to start your own MalariaMine web application 
on the Amazon Cloud. 
You could also use your InterMine Amazon instance to try building MalariaMine yourself (see http://intermine.readthedocs.org/en/latest/get-started/tutorial.html)
or to build your own mine there.


Pre-requisites
----------------------
You need an Amazon account: if you don't have one
 
* go to http://aws.amazon.com
* click on ``Sign Up``
* follow the instructions

.. note:: 
 You will need to set up your key pair security mechanism (see for example step 7 below).
 Alternatively you will need your aws-access-key and your aws-secret-key 
 to start your instance (not shown here).


Starting a new Instance
------------------------
InterMine is publicly available on Amazon Cloud as an Image (AMI), with an AMI ID **ami-b1c7a9d8**.

The image contains a ready deployed MalariaMine.

1. sign in at http://aws.amazon.com
2. go to the EC2 management console 
   AWS console https://console.aws.amazon.com/console/home --> EC2 console 
3. if you don't have one, set up a security group which allows access at least to port
   * 22 (SSH)
   * 80 (HTTP)
   * 8080 (TOMCAT)
   you could set up also a few spare ones (20, 21, 8009).
   
   .. note::
    You can do this also during step 7, but  
    **you cannot change the security group of an instance after starting it for the first time**
    (unless you use a VPC instance, see http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Introduction.html).
   ..
 
4. go to the IMAGES/AMI console
5. set the location on the top header (beside your username) to *US East (N. Virginia)* 
6. set the filter to *Public Images* and search for ``InterMine``
7. select *BasicIntermine* AMI (AMI ID = ami-b1c7a9d8)
8. launch (and configure) instance
* you can use all default options for the instance characteristics and details, but use the security group you created in step 3.
* when prompted, create a new key pair (``.pem`` file), or use one that you already own. 
9. go to the Instance console
10. select your new instance
11. when public DNS appears (after checks, a couple of minutes), you can 
    open a terminal with

.. code-block:: bash
      
  $ ssh -i your_pem_file ubuntu@the_instance_public_DNS


Starting an existing Instance
------------------------------

If you are using an existing Instance, you need to

#. sign in at http://aws.amazon.com
#. go to the EC2 console (see step 2 above) 
#. go to the Instance console
#. select your instance
#. start your instance (Actions --> Start)


Working with Your Instance
---------------------------
Open a terminal in Your Instance

.. code-block:: bash

  $ ssh -i your_pem_file ubuntu@the_instance_public_DNS

you will land in  `/home/ubuntu`

here you can find these relevant directories:

.. ``code`` where the bioseq code is stored

``git/intermine`` the InterMine code base

``.intermine`` with the properties file  

``malaria`` sources for building MalariaMine


Starting/stopping the existing MalariaMine web application
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In ``/webapp`` you'll find tomcat6. You can start the webapp using this command:

.. code-block:: bash 
 
 $ ./start.sh

Your MalariaMine web application will be then available on

  http://the_instance_public_DNS:8080/malariamine

To stop the web application:

.. code-block:: bash 
 
  $ ./stop.sh

Redeploying MalariaMine
^^^^^^^^^^^^^^^^^^^^^^^^

In ``/home/ubuntu/git/intermine/malariamine/webapp``

.. code-block:: bash 
 
  $ ant -v default remove-webapp release-webapp

(Re)building MalariaMine
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
see http://intermine.readthedocs.org/en/latest/get-started/tutorial/

In `/home/ubuntu/git/intermine/malariamine`

.. code-block:: bash 
 
  $ ../bio/scripts/project_build -b -v localhost ~/malariamine-dump

You can also follow all the steps in the build as illustrated in :doc:`/get-started/tutorial/index`


..  Using Amazon API    commented block
    -------------------
    
    You need the amazon api tool installed.
    For example in Ubuntu:
    
    .. code-block:: bash
     
     $ sudo apt-get install ec2-api-tools
    
    On your terminal run
    
    .. code-block:: bash
     
     $ ec2run -O aws-access-key -W aws-secret-key ami-3526485c
    
    or
    
    .. code-block:: bash
     
     $ ec2run -k key-pair ami-3526485c
    
    
    You can now go to your Amazon console and follow...

..

----------------------


.. index:: tutorial, Amazon, malariamine, ant, project_build, cloud

