var _, $, jQuery;
var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');

// Bind the event handler to the toolbar buttons
exports.postAceInit = function(hook, context){
  $('.subscript').click(function(){
    context.ace.callWithAce(function(ace){
      ace.ace_doToggleSubscript();
    },'insertsubscript' , true);
  })
};

// Once ace is initialized, we set ace_doToggleSubscript and bind it to the context
exports.aceInitialized = function(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doToggleSubscript = _(doToggleSubscript).bind(context);
}

exports.aceEditEvent = function(hook, call, cb){
  // If it's not a click or a key event and the text hasn't changed then do nothing
  var cs = call.callstack;
  if(!(cs.type == "handleClick") && !(cs.type == "handleKeyEvent") && !(cs.docTextChanged)){
    return false;
  }
  // If it's an initial setup event then do nothing..
  if(cs.type == "setBaseText" || cs.type == "setup") return false;

  // Attribtes are never available on the first X caret position so we need to ignore that
  if(call.rep.selStart[1] == 1){
    // Attributes are never on the first line
    $('.subscript > a').removeClass('activeButton');
  }

  // It looks like we should check to see if this section has this attribute
  setTimeout(function(){ // avoid race condition..
    // the caret is in a new position..  Let's do some funky shit
    if ( call.editorInfo.ace_getAttributeOnSelection("sub") ) {
      // show the button as being depressed..  Not sad, but active..
      $('.subscript > a').addClass('activeButton');
    }else{
      $('.subscript > a').removeClass('activeButton');
    }
  },250);
}


// Our subscript attribute will result in a subscript:1 class
exports.aceAttribsToClasses = function(hook, context){
  if(context.key == 'sub'){
    return ['sub' ];
  }
}

function doToggleSubscript(){
  this.editorInfo.ace_toggleAttributeOnSelection("sub");
}

exports.aceRegisterBlockElements = function(){
  return ["sub"];
}

exports.aceAttribClasses = function(hook, attr){
  // console.warn("attr", attr);
  attr["sub"] = "tag:sub";
}

