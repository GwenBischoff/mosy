HOW IT WORKS:
Every project gets its subfolder. This folder can have any name it wants.
Every subfolder needs to have an main.js . This needs to export an module that have a function initialize(socket,express,ap).
If you want to use socketio please consider using a namespace in the form (MYPROJECTNAME/...)
When defining express use directives please make sure are the directive (/MYPROJECTNAME) is declared.

The newest version will also require a npm install in the /public/index and public/logging folder
To start the server:
npm install
node app
open "http://localhost:80/" in ur browser or http://localhost:80/mymodulename (if everything is setup correct)
