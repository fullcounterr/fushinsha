import json
import glob
import os

result = list()
for subdir, dirs, files in os.walk(os.getcwd()):
    for file in files:
        filedir = os.path.join(subdir, file)
        if(file == "metabatch.py" or file == "manga.json"):
            break
        with open(filedir, encoding="utf8") as infile: # open each file then insert into the json
            result.append(json.load(infile))
        with open('manga.json', 'w') as output_file: # merge together
            json.dump(result, output_file)
        print(os.path.join(subdir, file))
        break # break after first file because we only use it to identify manga data