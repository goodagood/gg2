
const $ = require("jquery");
const pcolor = require("../mycolor.js");


function w3topnavFun() {
  var x = document.getElementById("w3topnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

document.getElementById('w3topnavSwitch').onclick = w3topnavFun;
document.getElementById('randomColor').onclick = function(e){
    e.preventDefault();
    pcolor.randomBodyColor();
};
document.getElementById('textColor').onclick = function(e){
    e.preventDefault();
    pcolor.rollBodyForeground();
};



$( document ).ready(function() {
    //console.log( (this == $ ? 'yes' : 'no') );
    //$.inspect(this, 'window');

    //var width = $(window).width();
    //console.log('width', width);

    //$("#password").keypress(function(e) {
    //  $("form span.hint")
    //  .html(String.fromCharCode(e.which))
    //  .stop()
    //  .fadeIn(100, function(){
    //    $(this).fadeOut(2000);        
    //  });

    //});

    //$("#text-password").keypress(function(e) {
    //  var value = $("#text-password").val();
    //  // set the other password:
    //  $("#password").val(value);

    //  // testing:
    //  //if( $("#password").val() !== $("#text-password") ) alert('not equal ' + value);
    //});


    //$("div#other-id a").click(function(e){
    //  e.preventDefault();
    //});


    // do my translate 

    var dictionary = {
        en: {
            "login":  "LOGIN",
            "username":  "User Name",
            "password":  "Password",
            "i18key": "hello world",
            "testi18n": "TEST I18N"
        },

        zh: {
            "login":  "登录",
            "username":  "用户名",
            "password":  "密码",

            "i18key": "hello world",
            "testi18n": "测试 i18next "
        }
    };

    function trans(key, lang){
        if(!key) return null;
        if(!lang) return null;

        if(dictionary[lang]){
            if(dictionary[lang][key]) return dictionary[lang][key];
        }
        return null;
    }

    //$("#ptesti18n").html(trans("testi18n", 'zh'));

    var userLang = navigator.language || navigator.userLanguage;
    //console.log('userLang');
    //console.log(userLang);

    if(/zh/.test(userLang)){
        $(".ggtt").each(function(){
            //console.log($(this).html());
            //console.log($(this).data("ggtt"));
            //console.log( trans($(this).data("ggtt"), "zh"));

            var key = $(this).data("ggtt");
            if(key){
                var translated = trans(key, "zh");
                if(translated) $(this).html(translated);
            }
        });
    }

    //$(".ggtt").html(trans($(this).data("ggtt"), "zh"));

    //console.log('here, 0308');

});
