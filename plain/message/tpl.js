// Generated by CoffeeScript 1.8.0
(function() {
  module.exports.msg_li_tpl = "<li><span class=\"glyphicon glyphicon-leaf\"></span> \n    <span class=\"username\">{{{ from }}} </span>\n    <span class=\"glyphicon glyphicon-send\"></span>\n    <span class=\"username\">{{{ to }}} </span>:\n\n    <ul class=\"file-info list-unstyled\">\n        <li><div class=\"well message \">\n                {{{ text }}}\n        </div></li>\n\n        <li>\n            <input type=\"checkbox\" name=\"filepath[]\"\n                value=\"{{{ pathuuid }}}\" />\n            <a href=\"/fileinfo-pathuuid/{{{ pathuuid }}}\" class=\"file-info-link\">\n                    {{{ filename }}}\n            </a>\n        </li>\n        <li>{{{ time }}}</li>\n    </ul>\n\n</li>";

  module.exports.msg_li_2015 = "<li><span class=\"glyphicon glyphicon-leaf\"></span> \n    <span class=\"username\">{{{ from }}} </span>\n    <span class=\"glyphicon glyphicon-send\"></span>\n    <span class=\"username\">{{{ to }}} </span>:\n\n    <ul class=\"file-info list-unstyled\">\n        <li><div class=\"well message \">\n                {{{ text }}}\n        </div></li>\n\n        <li>\n            <input type=\"checkbox\" name=\"filepath[]\"\n                value=\"{{{ pathuuid }}}\" />\n            <a href=\"/fileinfo-pathuuid/{{{ pathuuid }}}\" class=\"file-info-link\">\n                    {{{ filename }}}\n            </a>\n        </li>\n        <li>Fri Jul 10 2015 06:43:38 GMT+0000 (UTC)</li>\n    </ul>\n\n</li>";

}).call(this);