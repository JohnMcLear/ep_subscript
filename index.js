var eejs = require('ep_etherpad-lite/node/eejs/');
var Changeset = require("ep_etherpad-lite/static/js/Changeset");

/******************** 
* UI 
*/ 
exports.eejsBlock_editbarMenuLeft = function (hook_name, args, cb) {
  return cb();
}

exports.eejsBlock_dd_format = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_subscript/templates/fileMenu.ejs");
  return cb();
}



/******************** 
* Editor
*/

// Allow <whatever> to be an attribute 
exports.aceAttribClasses = function(hook_name, attr, cb){
  attr.sub = 'tag:sub';
  cb(attr);
}

/******************** 
* Export
*/
// Include CSS for HTML export
exports.stylesForExport = function(hook, padId, cb){
  cb("sub{vertical-align:sub;font-size:smaller}");  
};

