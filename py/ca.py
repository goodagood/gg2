
import re

def find_the_man():
    reg = re.compile(r'.+the man was.+')

    r = coll.find_one({'title': reg})

    print(r.up.keys())
    print(r.down.keys())

    return r


#r = find_the_man()

