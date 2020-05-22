var _ = require('ep_etherpad-lite/static/js/underscore');

var collectContentPre = function(hook, context){
  var tname = context.tname;
  var state = context.state;

  if(tname == "sub"){
    context.state.lineAttributes['subscript'] = true;
  }
};

var collectContentPost = function(hook, context){
  var tname = context.tname;
  var state = context.state;
  var lineAttributes = state.lineAttributes
  var tagIndex = tname;

  if(tagIndex >= 0){
    delete lineAttributes['subscript'];
  }
};

exports.collectContentPre = collectContentPre;
exports.collectContentPost = collectContentPost;
