var eejs = require('ep_etherpad-lite/node/eejs/');
var Changeset = require("ep_etherpad-lite/static/js/Changeset");
exports.eejsBlock_editbarMenuLeft = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_subscript/templates/editbarButtons.ejs");
  return cb();
}

exports.eejsBlock_dd_format = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_subscript/templates/fileMenu.ejs");
  return cb();
}

function getInlineStyle(subscript) {
  return "subscript: "+subscript+";";
}

// The below is really broken, it assumes the line has to have the style then it wraps the entire
// line in <sub> and not a specific region..
exports.getLineHTMLForExport = function (hook, context) {
//  var styleApplied = _analyzeLine(context.attribLine, context.apool);
//  if (styleApplied) {
//    var inlineStyle = getInlineStyle(styleApplied);
//    return "<sub>" + context.text.substring(0) + "</sub>";
//  }
}

function _analyzeLine(alineAttrs, apool) {
  var hasStyle = null;
  if (alineAttrs) {
    var opIter = Changeset.opIterator(alineAttrs);
    if (opIter.hasNext()) {
      var op = opIter.next();
      hasStyle = Changeset.opAttributeValue(op, 'subscript', apool);
    }
  }
  // console.warn(hasStyle);
  return hasStyle;
}

exports.aceAttribClasses = function(hook_name, attr, cb){
  // Support the sub attribute
  // Attributes are a bit different to other stuff in that they can
  // Be properly applied to text and HTML exports on a section basis
  // Unlike a lot of prehistoric implementations that can only do
  // implementations on a per line level..  
  attr.sub = 'tag:sub';
  cb(attr);
}
