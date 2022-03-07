I am running this on a Windows machine, on the VSCode terminal. If you have a different setup, details may vary, but the execution should be the same.

___

# How to run the server

`cd TP2`

`node .\fileserver.js`

Then access `localhost:2222/` on your browser. The default port is 2222 and is indicated on the terminal when you run the program, but it can be changed in `fileserver.js` on the "port" variable.

As you explore the pages, the terminal will also show the the ones delivered by the fileserver.
___

# How to generate the html files:
All the html files needed are included within the TP2 folder, but if you wish, you can generate them yourself.

## First make sure the folders
- `pages/actors`
- `pages/years`
- `pages/genres`
- `pages/movies`

**exist, but are empty**.

NOTE: `pages/movies` needs to exist but does not need to be empty, however, it is good practice to clean it just so that no possible weird mistakes happen with file overwriting.

## Then run `python3 .\TP2\html_builder.py`

The htmls are now all generated.