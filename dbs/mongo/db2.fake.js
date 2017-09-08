
var ObjectID = require('mongodb').ObjectID;

var fake = require('./fake.thumbs.js');

var db2 = require('./db2.js');
const pool = db2.pool;

const crud = require("./db2.crud.js");


function addOneThumb(username, oid, isUp){
    username = username || fake.fakeUsername();
    //p('username: ', username);
    //p('oid: ', oid);

    // mongodb dot notation for sub field
    var dotIndex = '';
    if(isUp){
        dotIndex = `thumbs.up.${username}`;
    }else{
        dotIndex = `thumbs.down.${username}`;
    }

    var set2 = {};
    set2['$set'] = {};
    set2['$set'][dotIndex] = Date.now();

    //console.log('dot index: ', dotIndex);
    //console.log('set2: ', set2);

    return pool.getCollection('words').then(function(coll){
        return coll.update({_id: oid}, set2);
    });
        
}


function fakeAddThumb(idStr, isUp){
    console.log("mdb/db2.fake.js  fake add thumb");
    var oid = ObjectID(idStr);
    var name = fake.fakeUsername();

    return addOneThumb(name, oid, isUp).then(function(dbRte){
        var n = dbRte.result.n;
        if(n !== 1) throw 'not 1 record modified in fake add thumb';

        return crud.findOneByIdStr(idStr);
    }).then(function(one){
        var ret = {};
        Object.assign(ret, {thumbs: one.thumbs}, {"id": one._id.toString()});
        return ret;
    });
}


module.exports.addOneThumb = addOneThumb;
module.exports.fakeAddThumb = fakeAddThumb;
