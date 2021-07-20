# fushinsha

THIS IS A VERY BUGGY CODE, I PUT IT HERE SO I CAN CHECK IT EASIER

This repository contains the backend of HN Archive site at [this link](https://nexus.elscione.com).  
The site is built using node.js, express.js, and bootstrap, with image backend hosted using nginx. The data on the site is processed from [this link](https://sukebei.nyaa.si/view/3274915).

### The Revival Process
Why did I do this? I was talking about it with my friends and I ended up doing it. It took 2 hours to parse all the metadata and archive, and about a day to create the api backend and frontend (note : I'm not a master in frontend so sorry for the crappy UI, I only made it so I can check if the site loads data from the API).

#### 1. Downloading the torrent file AND the metadata. Both are essentials.
#### 2. Creating multiple python script to help me parse the metadata for structuring purpose. 

The first script is metabatch.py. This is used to index all books avaiable from the given metadata zip file into a single json file, which is included as manga.json located in this repository root.

The second script is meta_each_books.py. This is used to process the metadata from the zip file included in the torrent. This includes artist, manga name, tags, and so on. Each books will have their own respective data.json file, which contains the page image name. The output will be saved into a newly created directory called "collected_data".

The third script is mass_extract.py. This is used to extract all the .cbz file to their respective folder. The folder name is the first number in the file name, so if the file name is for example, "69 I love it.cbz", the folder name would be 69, which will be the books id. 

The last script is thumbatch.py. This is used to process all the first page of every folder and resize it to a smaller .jpg file using OpenCV.

All the process done in this step is essentials.

#### 3. Creating the backend API to process the parsed metadata and display it using front end.

The backend is written in express.js. The front end is written in pugjs and theming is done using Bootstrap v5. The image file is hosted behind NGINX.

### 4. Prepare the file structure

The last most important part.. Now that the file has been prepared, metadata processed, backend and frontend is (kindof) ready, we need to make sure the file structure is in place.

All the images is stored in */images/<books id>/<file_name_from_metadata>.png

All the thumbimage is stored in */thumb/<books id>/cover.jpg

All the collected books metadata stored in collected_data folder should be moved to this app root folder inside data folder. The folder has some example metadata.

Note : * can be in any directory because it is hosted inside NGINX. Both folder must be inside the same server/domain, unless you know what you're doing.

