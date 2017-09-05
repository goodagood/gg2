
/*
 * CRUD operations of db2.
 * db2 is version 2 of data structure and storage,
 * title description converts to words/contents only.
 */

var ObjectID = require('mongodb').ObjectID;
var Promised = require('bluebird');

var db2 = require('./db2.js');
const pool = db2.pool;


//let _ = require('lodash');
//var p = console.log;



function findOne(filter){
    filter = filter || {upLinkId:{'$exists':false}};

    return pool.getCollection('words').then(function(wcoll){
        return wcoll.findOne(filter);
    });
}

function find(filter, opt){

    filter = filter || {upLinkId:{'$exists':false}};

    // opt can have: skip, limit

    return pool.getCollection('words').then(function(wcoll){
        return wcoll.find(filter, opt);
    });
}

function insertOne(dataObj){
    return pool.getCollection('words').then(function(wcoll){
        return wcoll.insertOne(dataObj);
    });
}


// for new data
//function insertDoc(contentString)
function insertDoc(data){
    var dataObj = Object.assign({
        milli: Date.now(),
        thumbs: {up:{}, down:{}},
        //contribute2: null,
        test: true,
    }, data);

    return insertOne(dataObj).then(function(ret){
        var d = {
            "id": ret.insertedId.toString(),
            "op": ret.ops[0]
        };
        return  d;
    });
}


function insertSub(data){
    return Promised.resolve(null);
}


// update or insert
// return different for the 2 cases.
function upsertWords(data){

    // should we check and do the insert? it's overcautious?
    if(!data._id && !data['id']){
        return insertDoc(data.words);

        //if(!data.upLinkId){
        //    return insertDoc(data.words);
        //}else{
        //    return insertSub(data);
        //}
    }

    return updateWords(data);
}

function updateWords(data){
    // data : {id: ID, words: string of text}

    let oid = data._id || ObjectID(data['id']) || null;
    if(!oid) return Promised.reject('no id to update words');

    return pool.getCollection('words').then(function(wcoll){

        // err, updated data?, mongodb status?
        return wcoll.update({'_id':oid}, {$set:{'words':data.words}});
    });
}


function findOneByIdStr(idStr){
    if(!(typeof idStr === 'string')) idStr = idStr.toString();

    var oid = ObjectID(idStr);

    return findOne({"_id": oid});
}


module.exports.findOne = findOne;
module.exports.find = find;
module.exports.findOneByIdStr = findOneByIdStr;
module.exports.insertOne = insertOne;
module.exports.insertDoc = insertDoc;

module.exports.updateWords = updateWords;
module.exports.upsertWords = upsertWords;
