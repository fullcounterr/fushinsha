import json
import glob
import os
import pathlib

result = list()
for subdir, dirs, files in os.walk(os.getcwd()):
    count = 1
    result = list()
    for file in files:
        filedir = os.path.join(subdir, file)
        if(subdir.split(os.path.sep)[-1] == 'collected_data'):
            break
        print(subdir.split(os.path.sep)[-1])
        result.append({count: file})
        print(os.path.join(subdir, file))
        count = count+1
    pathlib.Path('collected_data\\'+subdir.split(os.path.sep)[-1]).mkdir(parents=True, exist_ok=True)
    with open('collected_data\\'+subdir.split(os.path.sep)[-1]+'\\data.json', 'w+') as output_file: # merge together
        json.dump(result, output_file)