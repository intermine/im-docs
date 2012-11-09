Git
===========

The latest !InterMine release is hosted on [http://github.com GitHub] in the InterMine organization: [https://github.com/intermine/intermine]. 

 1. See [wiki:Prerequisites] for help installing Git on your machine.
 1. Create an account at !GitHub.
 1. Visit the !InterMine !GitHub repository at [https://github.com/intermine/intermine] and click on the "Fork" button in the top right corner of the page.
 1. Clone the [https://help.github.com/articles/fork-a-repo forked] !InterMine repo to your local machine where {{{git_username}}} is the name of your !GitHub account:
    {{{
> git clone git@github.com:git_username/intermine.git
}}} 
 1. Check out the latest stable !InterMine release from the '''master''' branch:
    {{{
 > cd intermine
 > git checkout master
}}}
    * The other branches are used by InterMine developers for testing.
    * If you would like to use a specific release of InterMine, you can use one of our tags, e.g. [https://github.com/intermine/intermine/tree/intermine-1.0.1 intermine-1.0.1]
 1. To keep track of the original !InterMine repo, assign the original repo to a remote called "upstream"
    {{{
 > git remote add upstream git@github.com:intermine/intermine.git
}}}
 1. To pull changes in your local repository and merge them into your working files:
    {{{
 > git pull upstream
}}} 
     * You can also pull changes in your local repository without modifying your files
       {{{
 > git fetch upstream
}}}
     and merge any changes fetched into your working files
{{{
 > git merge upstream/master
}}}

All InterMine code is freely available under the open source [http://www.gnu.org/licenses/lgpl.html LGPL] license.
