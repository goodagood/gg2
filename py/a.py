
import re
from pymongo import MongoClient
from pprint import pprint


client = MongoClient()
db = client.ggsys

# value collection
coll = db.value

def find_the_man():
    reg = re.compile(r'.+the man was.+')

    r = coll.find_one({'title': reg})

    print(r.keys())
    print('up:')
    print(r['value']['up'].keys())
    print('down:')
    print(r['value']['down'].keys())

    return r


#r = find_the_man()


def find_one_in_title(hint):
    regstr = r'.+{}.+'.format(hint)

    print('regstr: ', regstr)

    reg = re.compile(regstr)

    r = coll.find_one({'title': reg})
    return r

def find_in_title(hint):
    regstr = r'.+{}.+'.format(hint)

    print('regstr: ', regstr)

    reg = re.compile(regstr)

    r = coll.find_one({'title': reg})

    upnames = list(r['thumbs']['up'].keys())
    upnames.sort()
    downnames = list(r['thumbs']['down'].keys())
    downnames.sort()

    print(r.keys())
    print('up:')
    print(upnames)
    print('down:')
    print(downnames)

    return r

#r = find_one_in_title('gun empty')


def topList():
    some = coll.find({"parentid": {"$exists": False}})
    return some



def rename(old="value", new="thumbs"):
    hasvalue = coll.find({"value": {"$exists": True}})
    for i in hasvalue:
        print(i["_id"])
        r = coll.update({"_id": i["_id"]}, {"$rename": {"value": "thumbs"}})
        print(r)

    return hasvalue

#hasvs = rename()

#    print(list(hasvalue))

def write_top_ids():
    tops = topList()
    ltops = list(tops)

    a = []
    for t in ltops:
        a.append(str(t["_id"]))
        pass

    with open('/tmp/ids', 'w') as f:
        for s in a:
            print(s)
            f.write(s)
            f.write("\n")

    return a


write_top_ids()
