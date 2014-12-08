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
// line, apool,attribLine,text
exports.getLineHTMLForExport = function (hook, context) {
  var styleApplied = _analyzeLine(context.attribLine, context.apool);
  if (styleApplied) {
    var inlineStyle = getInlineStyle(styleApplied);
    return "<sub>" + context.text.substring(0) + "</sub>";
  }
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
  console.warn(hasStyle);
  return hasStyle;
}
