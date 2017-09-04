
var filter = require("ip.path.403");

function foo(){
    console.log('in foo');
}


if(require.main === module){
    console.log(foo.toString());
    console.log(filter.toString());
}
