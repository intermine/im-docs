# Creates a suitable refSeqs.json file for JBrowse.
# This program requires Python >= 2.6.
# You will need to install the intermine module for this to work.
#   Usage: python create-ref-seqs.py > refSeqs.json
import json
import intermine.webservice

mine_uri = "http://www.flymine.org/query"
taxonId = "7227"

mine = intermine.webservice.Service(mine_uri)
refs = mine.model.Chromosome.where("length", ">", 0).where("organism.taxonId", "=", taxonId)

print json.dumps([{"name": r.primaryIdentifier, "start": 0, "end": r.length} for r in refs], indent = 2)
