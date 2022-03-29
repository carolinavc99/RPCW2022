As always,  I'm running this on a Windows machine, on the VSCode terminal. If you have a different setup, details may vary, but the execution should be the same.

___

# How to run the program
Make sure you have NPM and json-server installed in your machine, and initialize the program (`npm i`), then do the following:

`json-server .\arquivo-sonoro.json`

On another terminal:
- `npm run start` => for the regular execution
- `npm run dev` => for an execution with the auto-restart of the server when changes are detected

Then access `localhost:4000/` on your browser.

As you explore the pages, the terminal will also show the the ones delivered by the fileserver.
