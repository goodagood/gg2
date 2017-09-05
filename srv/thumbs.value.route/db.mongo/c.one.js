
var db2  = require('./db2.js');
var crud = require('./db2.crud.js');

var p = console.log;


function cone(){
    db2.pool.getCollection('words').then(function(coll){
        p('got collection of words');
    }).catch(function(err){
        console.log(err);
    });
}

function ctwo(){
    crud.find({}, {limit:2}).then(function(ret){
        p('got find result? ');
        //p('got find result? ', ret);
        ret.toArray(function(err, arr){
            if(err) return p({err: err});

            p(arr);
        });
    }).catch(function(err){
        console.log(err);
    });
}

if(require.main === module){
    let _ = require('lodash');

    //cone();
    ctwo();

    setTimeout(()=>{
        process.exit();
    }, 3010);
}

