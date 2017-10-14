// Generated by CoffeeScript 1.8.0
(function() {
  var Promise, assert, data, file_name, file_path, fm, folder_name, folder_path, gg_folder_name, new_folder_name, p, path, root_name, stop, u;

  assert = require("assert");

  u = require("underscore");

  path = require("path");

  Promise = require("bluebird");

  data = require("./config.js");

  fm = require("../aws/folder-v5.js");

  folder_name = 'abc';

  folder_path = 'abc';

  root_name = 'abc';

  gg_folder_name = 'goodagood';

  new_folder_name = 'test';

  file_name = 'txt22';

  file_path = 'abc/txt22';

  p = console.log;

  stop = function() {
    return setTimeout(process.exit, 500);
  };

  describe("t-folder-v5c, 1", function() {
    it("promisify the methods in folder obj", function(done) {
      return fm.make_promisified_s3folder(data.config.folder_path).then(function(obj) {
        assert(obj.init != null);
        assert(obj.init_promised != null);
        assert(obj.promise_to_retrieve_saved_meta_promised == null);
        return done();
      });
    });
    return it("folder obj can do: init", function(done) {
      var name, opt;
      name = 'test-folder-not-save';
      opt = {
        name: name,
        path: path.join(data.config.user_name, name)
      };
      return fm.make_s3folder(data.config.folder_path).then(function(folder) {
        assert(u.isObject(folder));
        assert(!u.isEmpty(folder));
        return folder.init(opt);
      }).then(function(meta) {
        assert(u.isObject(meta));
        assert(!u.isEmpty(meta));
        assert(meta.meta_s3key.indexOf(name) >= 0);
        return done();
      });
    });
  });

  describe("t-folder-v5c, 2, folder goodagood should exists ", function() {
    return it("test retrieve gg folder obj", function(done) {
      var gg_folder_path;
      gg_folder_path = path.join(root_name, gg_folder_name);
      return fm.retrieve_folder(gg_folder_path).then(function(folder) {
        var meta;
        assert(!u.isNull(folder));
        return meta = folder.get_meta();
      }).then(function(meta) {
        assert(u.isString(meta.name));
        assert(meta.name === 'goodagood');
        return done();
      });
    });
  });

  describe("t-folder-v5c, 2.1 ", function() {
    return it("test gg folder to build file list", function(done) {
      var Folder, gg_folder_path;
      this.timeout(10 * 1000);
      gg_folder_path = path.join(root_name, gg_folder_name);
      Folder = null;
      return fm.retrieve_promisified_folder(gg_folder_path).then(function(folder) {
        Folder = folder;
        assert(u.isFunction(folder.retrieve_saved_meta_promised));
        return folder.list_files_and_save_promised();
      }).then(function(folder) {
        var meta;
        meta = Folder.get_meta();
        assert(meta.renders.ul.indexOf('glyphicon-folder') > 0);
        return done();
      });
    });
  });

  describe("t-folder-v5c, 3", function() {
    return it("test retrieve msg folder obj", function(done) {
      var gg_folder_path;
      gg_folder_path = path.join(root_name, gg_folder_name);
      return fm.retrieve_folder(gg_folder_path).then(function(folder) {
        var meta;
        return meta = folder.get_meta();
      }).then(function(meta) {
        assert(u.isString(meta.name));
        return done();
      });
    });
  });

}).call(this);