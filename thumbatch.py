import json
import glob
import os
import cv2
import pathlib

result = list()
for subdir, dirs, files in os.walk(os.getcwd()+"\\images"):
    count = 1
    for file in files:
        if os.path.splitext(file)[-1].endswith('.png'):
            filedir = os.path.join(subdir, file)
            image = cv2.imread(filedir)
            print(file)
            scale_percent = 60
            width = int(image.shape[1] * scale_percent / 100)
            height = int(image.shape[0] * scale_percent / 100)
            dim = (width, height)
            final = cv2.resize(image, dim, interpolation = cv2.INTER_AREA)
            pathlib.Path(os.getcwd()+'\\thumb\\'+subdir.split(os.path.sep)[-1]).mkdir(parents=True, exist_ok=True)
            cv2.imwrite(os.getcwd()+'\\thumb\\'+subdir.split(os.path.sep)[-1]+'\\cover.jpg', final, [int(cv2.IMWRITE_JPEG_QUALITY), 100])
            count = count+1
            break # break after first file because we only use it to identify manga data