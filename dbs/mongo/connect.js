
/*
 * migrate from mdb.form/...-> ui.vv...ui8  .../db2.js
 *
 * 2017 0906
 */


var MongoClient = require('mongodb').MongoClient;

var Promise = require("bluebird");




// mongodb Connection URL,
// show dbs: gg, ggsys
// db 'gg' is used by the file value system
//    where, collection 'session' is used by express-session,
//    the storage for the session is mongo store, connect-mongo
// db 'ggsys' is used by the sys value system
var baseUrl = 'mongodb://localhost:27017/';
var ggSysValue = baseUrl + 'ggsys';
var gg = baseUrl + 'gg';


// collections: words, thumbs

function makePool(){

    // data inside

    var _db = null;
    var _dbs = {};

    var _colls = {
        words: null,
        thumbs: null,
    };

    var _o = {};

    // end of data


    function connect(dbName, callback){
        if(typeof dbName !== 'string') throw 'db name must be string';

        const dbUrl = baseUrl + dbName;
        console.log(dbUrl);

        if(typeof callback === 'function'){
            return MongoClient.connect(dbUrl, function(err, db) {
                if(err) return callback(err);

                _dbs[dbName]  = db;
                _colls[dbName]= {};
                return callback(null, db);
            });
        }

        // no callback function, return promise:
        return MongoClient.connect(dbUrl).then(function(db){
                _dbs[dbName]  = db;
                _colls[dbName]= {};
                return db;
        });
    }


    function reuseConnection(dbName){
        return _dbs[dbName] ? Promise.resolve(_dbs[dbName]) : connect(dbName);
    }


    //tocheck
    function getCollection(dbName, collectionName){
        if(_dbs[dbName]){
            if(_dbs[dbName][collectionName]){
                return Promise.resolve(
                        _dbs[dbName][collectionName]
                        );
            }
        }

        return reuseConnection(dbName).then(function(db){
            return db.collection(collectionName);
        }).then(function(coll){
            console.log('coll? ', coll);
            _dbs[dbName][collectionName] = coll;
            return coll;
        });
    }


    function close(dbName, callback){
        if(_dbs[dbName]){
            return _dbs[dbName].close(callback);
        }
        callback('no connection found for ' + dbName);
    }


    _o['connect'] = connect;

    _o['getDb'] = reuseConnection;
    _o['reuseConnection'] = reuseConnection;

    _o['getCollection'] = getCollection;

    //_o['close'] = close;

    return _o;
}

var pool = makePool();


/*
 * the document collection for express-session,
 * session store is provided by connect-mongo
 */
function get_session_store_collection(){
    return pool.getCollection('gg', 'session');
}
function get_session_store_db(){
    return pool.getDb('gg');
}

// // checkings
// 
// var p = console.log;
// var o = {};
// 
// function c_connect(o){
//     pool.reuseConnection('gg').then(function(gg){
//         o.gg = gg;
//         //gg.collection
//         //return pool.getCollection('gg', 'session')
//     }).catch(function(err){
//         p(err)
//     });
// 
// };// c_connect(o);
// 
// function c_get_collection(o){
//     pool.getCollection('ggsys', 'value').then(function(collvalue){
//         o.collvalue = collvalue;
//     }).catch(function(err){
//         p(err)
//     });
// 
// }; //c_get_collection(o);
// 
// 
// if(require.main === module){
//     console.log('require main eqs module');
// 
//     //let _ = require('lodash');
//     c_connect(o);
// 
// 
//     setTimeout(()=>{
//         process.exit();
//     }, 3000);
// }
// 

module.exports.pool = pool;
