Get the Software
======================

The latest InterMine release is hosted on GitHub in the InterMine organization: https://github.com/intermine/intermine

.. warning::

    We don't recommend you download the InterMine code directly. The compiled JARs are available for you to use instead.

#. Create an account at GitHub.

#. Visit the InterMine GitHub repository at https://github.com/intermine/intermine and click on the "Fork" button in the top right corner of the page.

#. Clone the `forked <https://help.github.com/articles/fork-a-repo>`_ InterMine repo to your local machine where `git_username` is the name of your GitHub account:

	.. code-block:: bash 
		
		$ git clone git@github.com:git_username/intermine.git

#. Check out the latest stable InterMine release from the '''master''' branch:
	
	.. code-block:: bash 

		$ cd intermine
 		$ git checkout master

    a. The other branches are used by InterMine developers for testing.
    b. If you would like to use a specific release of InterMine, you can use one of our tags

#. To keep track of the original InterMine repo, assign the original repo to a remote called "upstream"
	
	.. code-block:: bash 

		$ git remote add upstream git@github.com:intermine/intermine.git

#. To pull changes in your local repository and merge them into your working files:

	.. code-block:: bash    
 
 		$ git pull upstream

    You can also pull changes in your local repository without modifying your files
 
	.. code-block:: bash    

		$ git fetch upstream

    and merge any changes fetched into your working files

	.. code-block:: bash    

 		$ git merge upstream/master

All InterMine code is freely available under the open source `LGPL <http://www.gnu.org/licenses/lgpl.html>`_  license.

.. index:: git
