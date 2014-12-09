var _ = require('ep_etherpad-lite/static/js/underscore');

var collectContentPre = function(hook, context){
  var tname = context.tname;
  var state = context.state;
  var lineAttributes = state.lineAttributes
  var tagIndex = tname;
  if(tname == "sub"){
    context.cc.doAttrib(state, "sub");
  }
};

var collectContentPost = function(hook, context){
  var tname = context.tname;
  var state = context.state;
  var lineAttributes = state.lineAttributes
  var tagIndex = tname;

  if(tagIndex >= 0){
    delete lineAttributes['sub'];
  }
};

exports.collectContentPre = collectContentPre;
exports.collectContentPost = collectContentPost;
