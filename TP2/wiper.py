# this is just a wuick script to wipe all the data inside the html folders
import shutil
import os

shutil.rmtree("./actors")
shutil.rmtree("./genres")
shutil.rmtree("./years")

os.mkdir("./actors")
os.mkdir("./genres")
os.mkdir("./years")