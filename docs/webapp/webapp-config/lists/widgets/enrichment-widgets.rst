Enrichment widgets
================================

Enrichment widgets are located on the list analysis page.  There are a number of different types of enrichment widgets, but all list a term, a count and an associated p-value.  The term can be something like a publication name or a GO term.  The count is the number of times that term appears for objects in your list.  The p-value is the probability that result occurs by chance, thus a lower p-value indicates greater enrichment.

Method
------

The p-value is calculated using the Hypergeometric distribution.  Four numbers are used to calculate each p-value:
 * n = the number of objects in your list
 * N = the number of objects in the reference population
 * k = the number of objects annotated with this item in your list
 * M = the number of objects annotated with item in the reference population

.. code-block:: math

           (M choose k) (N-M choose n-k)
      P =   -----------------------------
                    N choose n


[http://en.wikipedia.org/wiki/Hypergeometric_distribution]
Software: [http://commons.apache.org/math/apidocs/org/apache/commons/math/distribution/HypergeometricDistributionImpl.html#getDomainUpperBound%28double%29 HypergeometricDistributionImpl.java]

Multiple Test Correction
------------------------

When multiple tests (statistical inferences)are run in parallel, the probability of false positive (Type I) errors increases. To address this issue, many multiple test corrections have been developed to take into account the number of tests being carried out and to correct the p-values accordingly. Enrichment widgets have three different multiple test corrections: Bonferroni, Holm-Bonferroni, and Benjamini Hochberg.

In enrichment widgets the number of "tests run" is the number of terms associated with objects in the "reference list". Please Note, in earlier versions of InterMine (0.95 and below) the number of "tests run" was the number of terms associated with objects in the "query list". This change has made the multiple test correction more rigorous, and will reduce the occurrence of spuriously low p-values.

Each enrichment widget has four test correction options:

None
~~~~~~~~~

No test correction performed, these are the raw results.  These p-values will be lower (more significant) than if test correction was applied.

Bonferroni
~~~~~~~~~~~~~~~~~~

Bonferroni is the simplest and most conservative method of multiple test correction. The number of tests run (the number of terms associated with objects in the reference list) is multiplied by the un-corrected  p-value of each term to give the corrected p-value.

Holm-Bonferroni
~~~~~~~~~~~~~~~~~~

.. code-block:: math

	Adjusted p-value = p-value x (number of tests - rank)

Benjamini Hochberg
~~~~~~~~~~~~~~~~~~~~~~~~~~~

This correction is the less stringent than the Bonferroni, and therefore tolerates more false positives.

.. code-block:: math

	Adjusted p-value = p-value x (number of tests/rank)
    
1. The p-values of each gene are ranked from the smallest to largest.
2. The p-value is multiplied by the total number of tests divided by its rank.
 
https://github.com/intermine/intermine/blob/dev/intermine/web/main/src/org/intermine/web/logic/widget/ErrorCorrection.java

References
----------

'''GOstat: Find statistically overrepresented Gene Ontologies within a group of genes'''[[BR]]
Beissbarth T, Speed TP[[BR]]
''[http://bioinformatics.oxfordjournals.org/cgi/content/abstract/20/9/1464 Bioinformatics]'', 6.2004; 20(9): 1464-1465.[[BR]]
pubmed id:  [http://www.ncbi.nlm.nih.gov/pubmed/14962934 14962934][[BR]]

'''GO::TermFinder--open source software for accessing Gene Ontology information and finding significantly enriched Gene Ontology terms associated with a list of genes.'''[[BR]]
Boyle EI, Weng S, Gollub J, Jin H, Botstein D, Cherry JM, Sherlock G.  [[BR]]
''[http://bioinformatics.oxfordjournals.org/cgi/content/abstract/bth456v1 Bioinformatics]''. 2004 Dec 12;20(18):3710-5. Epub 2004 Aug 5.[[BR]]
pubmed id:  [http://www.ncbi.nlm.nih.gov/pubmed/15297299?dopt=Abstract 15297299][[BR]]

'''Controlling the false discovery rate: a practical and powerful approach to multiple testing'''[[BR]]
Benjamini, Yoav; Hochberg, Yosef [[BR]]
''Journal of the Royal Statistical Society'', 1995, Series B (Methodological) 57 (1): 289–300.[[BR]]

'''Augmentation Procedures for Control of the Generalized Family-Wise Error Rate and Tail Probabilities for the Proportion of False Positives'''[[BR]]
van der Laan, Mark J.; Dudoit, Sandrine; and Pollard, Katherine S. [[BR]]
''[http://www.bepress.com/sagmb/vol3/iss1/art15 Statistical Applications in Genetics and Molecular Biology]'': Vol. 3 : Iss. 1, Article 15, 2004.

 * Hypergeometric
   * [http://www.quantitativeskills.com/sisa/distributions/hypghlp.htm SISA]
   * [http://mathworld.wolfram.com/HypergeometricDistribution.html math world]
 * Bonferroni 
   * [http://www.bmj.com/cgi/content/full/316/7139/1236?view=full&pmid=9553006 What's wrong with Bonferroni adjustments]
   * http://mathworld.wolfram.com/BonferroniCorrection.html







