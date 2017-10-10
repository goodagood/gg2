
import db2

def find_exists(key):
    results = db2.wcoll.find(
            {key: {"$exists": True}},
            )

    return results

def show_exists(key='parentId'):
    for i in find_exists(key):
        print(i["_id"])

def find_upline():
    r = db2.wcoll.find({"upLineId": {"$exists": 1}})
    print(r)

    for i in r:
        print(i)
        print (" >> rename \n")

        rename = db2.wcoll.update({"_id": i["_id"]}, {"$rename": {"upLineId": "upLinkId"}})
        print( rename)
    return r


if __name__ == "__main__":
    True
    #find_upline()

    r = find_exists('parentId')
    show_exists('parentId')
