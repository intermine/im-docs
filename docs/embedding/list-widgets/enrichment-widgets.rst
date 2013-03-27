List enrichment widgets statistics
==================================

Enrichment widgets are located on the list analysis page. There are a number of different types of enrichment widgets, but all list a term, a count and an associated p-value. The term can be something like a publication name or a GO term. The count is the number of times that term appears for objects in your list.  The p-value is the probability that result occurs by chance, thus a lower p-value indicates greater enrichment.

Method
------

The p-value is calculated using the `Hypergeometric distribution <http://en.wikipedia.org/wiki/Hypergeometric_distribution>`_. Four numbers are used to calculate each p-value:

.. code-block:: matlab

           (M choose k) (N-M choose n-k)
      P =   -----------------------------
                    N choose n

n
    the number of objects in your list
N
    the number of objects in the reference population
k
    the number of objects annotated with this item in your list
M
    the number of objects annotated with item in the reference population

.. note::

    The relevant `Java source <http://commons.apache.org/math/apidocs/org/apache/commons/math/distribution/HypergeometricDistributionImpl.html#getDomainUpperBound%28double%29 HypergeometricDistributionImpl.java>`_.

Multiple Test Correction
------------------------

When multiple tests (statistical inferences)are run in parallel, the probability of false positive (Type I) errors increases. To address this issue, many multiple test corrections have been developed to take into account the number of tests being carried out and to correct the p-values accordingly. Enrichment widgets have three different multiple test corrections: Bonferroni, Holm-Bonferroni, and Benjamini Hochberg.

In enrichment widgets the number of "tests run" is the number of terms associated with objects in the "reference list". Please Note, in earlier versions of InterMine (0.95 and below) the number of "tests run" was the number of terms associated with objects in the "query list". This change has made the multiple test correction more rigorous, and will reduce the occurrence of spuriously low p-values.

Each enrichment widget has four test correction options:

None
~~~~

No test correction performed, these are the raw results. These p-values will be lower (more significant) than if test correction was applied.

Bonferroni
~~~~~~~~~~

Bonferroni is the simplest and most conservative method of multiple test correction. The number of tests run (the number of terms associated with objects in the reference list) is multiplied by the un-corrected  p-value of each term to give the corrected p-value.

Holm-Bonferroni
~~~~~~~~~~~~~~~

.. code-block:: matlab

	Adjusted p-value = p-value x (number of tests - rank)

Benjamini Hochberg
~~~~~~~~~~~~~~~~~~

This correction is the less stringent than the Bonferroni, and therefore tolerates more false positives.

.. code-block:: matlab

	Adjusted p-value = p-value x (number of tests/rank)
    
#. The p-values of each gene are ranked from the smallest to largest.
#. The p-value is multiplied by the total number of tests divided by its rank.

Gene length correction
~~~~~~~~~~~~~~~~~~~~~~
The probability of a given set of genes being hit in a ChIP experiment is amongst other things proportional to their length – very long genes are much more likely to be randomly hit than very short genes are.
This is an issue for some widgets – for example, if a given GO term (such as gene expression regulation) is associated with very long genes in general, these will be much more likely to be hit in a ChIP experiment than the ones belonging to a GO term with very short genes on average.
The p-values should be scaled accordingly to take this into account.
There are a number of different implementations of corrections, we have choosen the simplest one.
The algorithm was developed by Taher and Ovcharenko (2009) for correcting GO enrichment.
Corrected probability of observing a given GO term is equal to the original GO probability times the correction coefficient CCGO defined for each GO term.

.. code-block:: matlab
        Adjusted P = P x CCGO

where the correction coefficient CCGO is calculated as:

.. code-block:: matlab
                 LGO/LWH
      CCGO = ----------------
                 NGO/NWG 
               
LGO 
    Average gene length of genes associated with a GO term
LWG 
    Average length of the genes in the whole genome
NGO 
    Number of genes in the genome associated with this GO term
NWG 
    Total number of genes in the whole genome


.. note::
    
    The relevant `InterMine source <https://github.com/intermine/intermine/blob/dev/intermine/web/main/src/org/intermine/web/logic/widget/ErrorCorrection.java>`_.

References
----------

| **GOstat: Find statistically overrepresented Gene Ontologies within a group of genes**
| Beissbarth T, Speed TP.
| `Bioinformatics <http://bioinformatics.oxfordjournals.org/cgi/content/abstract/20/9/1464>`__. 6.2004; 20(9): 1464-1465.
| PubMed id: `14962934 <http://www.ncbi.nlm.nih.gov/pubmed/14962934>`_

| **GO::TermFinder--open source software for accessing Gene Ontology information and finding significantly enriched Gene Ontology terms associated with a list of genes**
| Boyle EI, Weng S, Gollub J, Jin H, Botstein D, Cherry JM, Sherlock G.
| `Bioinformatics <http://bioinformatics.oxfordjournals.org/cgi/content/abstract/bth456v1>`__. 2004 Dec 12;20(18):3710-5. Epub 2004 Aug 5.
| PubMed id: `15297299 <http://www.ncbi.nlm.nih.gov/pubmed/15297299?dopt=Abstract 15297299>`_

| **Controlling the false discovery rate: a practical and powerful approach to multiple testing**
| Benjamini, Yoav; Hochberg, Yosef
| `Journal of the Royal Statistical Society <http://www.jstor.org/stable/2346101>`_. 1995, Series B (Methodological) 57 (1): 289–300.

| **Augmentation Procedures for Control of the Generalized Family-Wise Error Rate and Tail Probabilities for the Proportion of False Positives**
| van der Laan, Mark J.; Dudoit, Sandrine; and Pollard, Katherine S.
| `Statistical Applications in Genetics and Molecular Biology <http://www.bepress.com/sagmb/vol3/iss1/art15>`_: Vol. 3 : Iss. 1, Article 15, 2004.

| **What's wrong with Bonferroni adjustments**
| Perneger, TV.
| `BMJ Publishing Group <http://www.bmj.com/content/316/7139/1236>`_. 1998;316:1236.

| **Variable locus length in the human genome leads to ascertainment bias in functional inference for non-coding elements**
| Taher, L. and Ovcharenko, I. (2009), Bioinformatics
| 25(5): 578–584


.. note::

    You can read more about **Hypergeometric Distribution** at `Simple Interactive Statistical Analysis <http://www.quantitativeskills.com/sisa/distributions/hypghlp.htm>`_ or `Wolfram MathWorld <http://mathworld.wolfram.com/HypergeometricDistribution.html>`__. **Bonferroni Correction** is discussed in this `Wolfram MathWorld <http://mathworld.wolfram.com/BonferroniCorrection.html>`__ article.


.. index:: widgets, Bonferroni, Holm-Bonferroni, Benjamini Hochberg, Hypergeometric Distribution, Multiple Test Correction, enrichment widgets
