
/*
 * 2017 0824
 *
 * simple the data structure, only words to be thumbed,
 * no title and description field.
 */


var MongoClient = require('mongodb').MongoClient;

var Promise = require("bluebird");


//var p = console.log;


// Connection URL
var dburl = 'mongodb://localhost:27017/ggsys';


// collections: words, thumbs

function makeCollectionPool(){

    // data inside

    var _db = null;

    var _colls = {
        words: null,
        thumbs: null,
    };

    var _o = {};

    // end of data


    function connect(callback){
        if(typeof callback === 'function'){
            return MongoClient.connect(dburl, function(err, db) {
                if(err) return callback(err);

                _db           = db;
                _colls.words  = db.collection('words');
                _colls.thumbs = db.collection('thumbs');
                return callback(null, _db);
            });
        }

        return MongoClient.connect(dburl).then(function(db){
                _db           = db;
                _colls.words  = db.collection('words');
                _colls.thumbs = db.collection('thumbs');
                return _db;
        });
    }


    function _reuseConnection(callback){
        if(typeof callback === 'function'){
            if(_db !== null){
                return callback(null, _db);
            }else{
                return connect(callback);
            }
        }else{
            // suppose there is no callback offerred.
            return (_db !== null)? Promise.resolve(_db) : connect();
        }
    }


    //d/*
    // * promised get collection OR callback if provided.
    // */
    //function _getCollection(callback){
    //    if(callback) return getCollection(callback);

    //    return new Promise((resolve, reject)=>{
    //        getCollection(function(err, coll){
    //            if(err) return reject(err);

    //            resolve(coll);
    //        });
    //    });
    //}


    function getCollection(name, callback){
        if(typeof callback === 'function'){
            return _reuseConnection(function(err){
                if(err) return callback(err);

                callback(null, _colls[name]);
            });
        }

        return _reuseConnection().then(function(){
            return _colls[name];
        });
    }


    function close(callback){
        _db.close(callback);
    }


    _o['getCollection'] = getCollection;

    _o['connect'] = connect;
    _o['getDb'] = connect;

    _o['close'] = close;

    return _o;
}




const pool = makeCollectionPool();
module.exports.pool = pool;

//
//function get_one_value_rec(callback){
//    valueCollection(function(err, col){
//        if(err) return callback(err);
//
//        col.findOne({parentid: {$exists: false}}, callback);
//    });
//}
//


// checkings 



///*
// * check to insert one sample data, it's value record,
// * random words generated by reading the 'shawshank redemption'
// */
//function insertOne(){
//    gensamp.genSample(function(err, sam){
//        p(sam, err);
//
//        valueCollection(function(err, vcoll){
//            vcoll.insertOne(sam, function(err, what){
//                p(Object.keys(what), err);
//            });
//        });
//    });
//}
//
//function insert_one_sample_value_rec(callback){
//    gensamp.genSample(function(err, sam){
//        p(sam, err);
//
//        valueCollection(function(err, vcoll){
//            vcoll.insertOne(sam, callback);
//        });
//    });
//}
//

//
//function checkInsert(){
//    for(var i = 0; i<10; i++){
//        insert_one_sample_value_rec(function(){});
//    }
//}
//
//function checkGetOne(){
//    get_one_value_rec(function(err, what){
//        p(what, err);
//    });
//}
//


if(require.main === module){
    let _ = require('lodash');


    setTimeout(()=>{
        process.exit();
    }, 3010);
}
