#!/bin/bash

cd $HOME/workspace/ui.vv/srv.express/thumbs.value/ui8
gulp build
cd $HOME/workspace/gg2/srv
cp -r $HOME/workspace/ui.vv/srv.express/thumbs.value/ui8/dist  ./public/ui8/
npm start

