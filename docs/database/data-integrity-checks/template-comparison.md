# Template Comparison

We have written a script that runs queries against the templates publicly available in a mine or a pair of mines. The purpose of these scripts is to:

> * Test that all templates run.
> * In the case of multiple mines, check that updates haven't radically changed the results.

The script presents their results on standard out, with the option to have them emailed upon completion of the comparison. To have results emailed out, you should have set up and installed `sendmail` on the machine running the comparison.

The script is located here: [https://github.com/intermine/intermine-release-scripts/blob/master/compare\_templates\_for\_releases.py](https://github.com/intermine/intermine-release-scripts/blob/master/compare_templates_for_releases.py)

## Python Script

### Dependencies

This script will run on `cPython` 2.5-2.7, `pypy` and `jython`. It requires the installation of the intermine client module, which can be installed from [http://pypi.python.org](http://pypi.python.org) PyPi with the following command:

```bash
$ sudo easy_install intermine
```

### Invocation

The script can be invoked most simply against a single mine as follows:

```bash
$ python compare_templates_for_releases.py www.flymine.org/flymine
```

To have results emailed, add your email address:

```bash
$ python compare_templates_for_releases.py www.flymine.org/flymine you@your.host.org
```

Optionally set a ''from'' address:

```bash
$ python compare_templates_for_releases.py www.flymine.org/flymine you@your.host.org noreply@blackhole.net
```

Comparing against two mines is as above, except you simply need to add a second service location:

```bash
python compare_templates_for_releases.py www.flymine.org/flymine beta.flymine.org/beta you@your.host.org
```

## Results

The resulting email will look like this:

```text
-----------------------------------In Both: Diff >= 10%
BDGP_Gene                                         release-beta:     260, release-28.0:      62, diff:  76%
ChromLocation_CRMOverlappingTFBindingsite         release-beta:      42, release-28.0:     213, diff:  80%

----------------------------------------------------------------------
-----------------------------------Only in 28.0:
ChromosomeLocation_Tiffin                               8
Disease_GeneOrthologue                                363
ESTclone_LocationOverlappingGeneOrthologue_new         93
ESTclone_LocationOverlappingGeneStructure               4
Gene_Inparalogue                                       11
Gene_Tiffin                                           156
Probe_Gene                                              1
TiffinBSmotif_expressionTerm                           49
TiffinBSmotif_genes                                  1356
TiffinBSmotif_locations                                23
----------------------------------------------------------------------
-----------------------------------Only in beta:
Amplicon_RNAiResults                                   39
Gene_AdjacentGene_FlyAtlas_downstream                   0
Gene_OverlapppingGenes                                  1
Genes_Publications                                 126002
Organism_interologs                                   278
--------------------------------------------------In Both: Diff < 10%
All_Genes_In_Organism_To_Publications             release-beta:  126002, release-28.0:  121503, diff:   4%
AlleleClass_Allele                                release-beta:    2132, release-28.0:    2117, diff:   1%
```

1. '''In Both: Diff &gt;= 10%''' - templates run in both mines and result counts returned were very different.
2. '''Only in''' - template was found in one mine and not the other.
3. '''In Both: Diff &lt; 10%''' - template run in both mines and results returned were different. It\'s probably safe to assume these are okay.

