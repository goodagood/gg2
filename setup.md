
# self reference

in root folder

    npm init -y

in the package.json,
change name to: gg

    npm link

so, we registered as 'gg', change to sub folders using node.js

    npm link gg

we should be able to do:

    var something = require('gg/sub/folder/something.js')


# global npm install

nodemon, gulp-cli, express-generator    


# firefox dev tools font size:

about:config
devtools.toolbox.zoomValue 

