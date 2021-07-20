# -*- coding: utf-8 -*-
import os
import zipfile
import re

REGEX = "^(?:(.)[\s\.])(.*)"
result = list()
for subdir, dirs, files in os.walk(os.getcwd()):
    for file in files:
        if os.path.splitext(file)[-1].endswith('.cbz'):
            filedir = os.path.join(subdir, file)
            l = file.split()
            print(file)
            with zipfile.ZipFile(filedir,'r') as zip_ref: 
               zip_ref.extractall("\\images\\"+l[0])
        else :
            break
        