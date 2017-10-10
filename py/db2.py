
import re
from pymongo import MongoClient
from pprint import pprint


client = MongoClient()
db = client.ggsys

# value collection
vcoll = db.value
wcoll = db.words
tcoll = db.thumbs



def txtfind(txt):
    pattern = re.compile(txt)
    return wcoll.find({"words": {"$regex": pattern}})

def showTxtFind(txt):
    for i in txtfind(txt):
        print(i)
        print(" --- " * 3 + "\n\n")

def txtfindone(txt):
    pattern = re.compile(txt)
    return wcoll.find_one({"words": {"$regex": pattern}})

def topList():
    some = vcoll.find({"parentid": {"$exists": False}})
    return some

def find(filter):
    return wcoll.find({})

def populate_words():
    old = list(vcoll.find({}))
    print(len(old))

    for o in old:
        print(o['title'])
        convert_one(o)

import time
def convert_one(obj):
    millis = int(round(time.time() * 1000))
    d = {
            "words": obj['description'],
            "milli": millis,
            "test": True
        }

    if 'thumbs' in obj:
        d["thumbs"] = obj['thumbs']

    r = wcoll.insert(d)
    #print(r)


def rename(old="value", new="thumbs"):
    hasvalue = vcoll.find({"value": {"$exists": True}})
    for i in hasvalue:
        print(i["_id"])
        r = vcoll.update({"_id": i["_id"]}, {"$rename": {"value": "thumbs"}})
        print(r)

    return hasvalue

#hasvs = rename()

#    print(list(hasvalue))



def foo(txt="test"):

    for i in txtfind(txt):
        print(i['words'])


def insert_one(words):
    millis = int(round(time.time() * 1000))
    d = {
            "words": words,
            "milli": millis,
            "test": True,
            "thumbs": {"up":{}, "down":{}}
        }
    r = wcoll.insert(d)
    print(r)


def getIds():
    ids = []

    for i in wcoll.find({}):
        ids.append(str(i['_id']))
        pass

    with open("/tmp/id.list.db2", 'w') as f:
        for i in ids:
            print(i)
            f.write(i + "\n")

    return ids

def convertThumbs():

    for i in wcoll.find({}):
        convertOneThumb(i['_id'])

def doNotDict():
    for i in wcoll.find({}):
        findNotDictThumbs(i['_id'])

from bson.objectid import ObjectId

def convertOneThumb(id=None):
    #id = "599e999529c55969eae56ae3"

    if not id:
        return 'no id'

    if type(id) is str:
        oid = ObjectId(id)
    else:
        oid = id

    i = wcoll.find_one({'_id': oid})
    print(i['words'])


    thumbs = {"up":{}, "down":{}}

    if not ('thumbs' in i):
        wcoll.update_one({"_id": i['_id']}, {"$set": {'thumbs': thumbs}})
        print( 'initialized')
        return 'initialized'

    ithumbs = i['thumbs']
    print(ithumbs)

    if not ('up' in ithumbs):
        wcoll.update_one({"_id": i['_id']}, {"$set": {'thumbs.up': {}}})
        print( 'upd')
        return

    if not ('down' in ithumbs):
        wcoll.update_one({"_id": i['_id']}, {"$set": {'thumbs.down': {}}})
        print( 'downed')
        return


    thumbup = ithumbs['up']
    for key in thumbup.keys():
        if type(thumbup[key]) is dict:
            if 'milli' in thumbup[key]:
                thumbs['up'][key] = thumbup[key]['milli']
                print(thumbs['up'][key], thumbup[key]['milli'])

    thumbdown = ithumbs['down']
    for key in thumbdown.keys():
        if type(thumbdown[key]) is dict:
            if 'milli' in thumbdown[key]:
                thumbs['down'][key] = thumbdown[key]['milli']
                print(thumbs['down'][key], thumbdown[key]['milli'])

    wcoll.update_one({"_id": i['_id']}, {"$set": {'thumbs': thumbs}})


def findNotDictThumbs(id=None):
    """Find 'thumbs' which is not dict
    """

    if not id:
        return 'no id'

    if type(id) is str:
        oid = ObjectId(id)
    else:
        oid = id

    i = wcoll.find_one({'_id': oid})

    thumbs = {"up":{}, "down":{}}

    if not ('thumbs' in i):
        wcoll.update_one({"_id": i['_id']}, {"$set": {'thumbs': thumbs}})
        print( 'initialized')
        print( i['words'])
        return

    ithumbs = i['thumbs']

    if not (type(ithumbs) is dict):
        wcoll.update_one({"_id": i['_id']}, {"$set": {'thumbs': thumbs}})
        print( i['words'])
        print('--- converted')


if __name__ == "__main__":
    #write_top_ids()
    print('main')
    #convertOneThumb()
    #convertThumbs()
    #getIds()

    #doNotDict()
    showTxtFind('1532pm')
