


function randint(start, stop){
    let gap = stop - start;

    if( gap < 1)  return parseInt(start);

    let r = Math.random();

    let x = r * gap + start;

    return parseInt(x);
}

function fakeUsername(n=3){

    let start = Math.pow(10, n-1)
    let stop  = Math.pow(10, n) -1
    let rint = randint(start, stop);

    let userName = `test-${rint}`;
    console.log('fake user name: ', userName);
    return userName;
}



function fakeRec(){
    var num = randint(0, 20);

    var r = {};

    for(i = 0; i < num; i++){
        r[fakeUsername()] = {milli: Date.now()};
    }

    return r;
}

function fakeThumbsObj(){
    let v = {};
    v.up   = fakeRec();
    v.down = fakeRec();

    return v;
}



module.exports.fakeThumbsObj = fakeThumbsObj;
module.exports.fakeUsername = fakeUsername;
