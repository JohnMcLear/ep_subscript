var _, $, jQuery;
var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');

// Bind the event handler to the toolbar buttons
var postAceInit = function(hook, context){
  $('.subscript').click(function(){
    context.ace.callWithAce(function(ace){
      ace.ace_doToggleSubscript();
    },'insertsubscript' , true);
  })
};

exports.aceEditEvent = function(hook, call, info, rep, attr){
  // If it's not a click or a key event and the text hasn't changed then do nothing
  if(!(call.callstack.type == "handleClick") && !(call.callstack.type == "handleKeyEvent") && !(call.callstack.docTextChanged)){
    return false;
  }

  setTimeout(function(){ // avoid race condition..
    // the caret is in a new position..  Let's do some funky shit
    if ( call.editorInfo.ace_getAttributeOnSelection("subscript") ) {
      // show the button as being depressed..  Not sad, but active.. You know the drill bitches.
      $('.subscript > a').addClass('activeButton');
    }else{
      $('.subscript > a').removeClass('activeButton');
    }
  },250);
}


// Our subscript attribute will result in a subscript:1 class
function aceAttribsToClasses(hook, context){
  if(context.key == 'subscript'){
    return ['subscript:' + 1 ];
  }
}

// Here we convert the class subscript into a tag
exports.aceCreateDomLine = function(name, context){
  var cls = context.cls; // no use
  var domline = context.domline;

  var subscript = /(?:^| )subscript:([A-Za-z0-9]*)/.exec(cls);
  var tagIndex;
  if (subscript){
    tagIndex = true;
  }

  if (tagIndex){
    var modifier = {
      extraOpenTags: '<sub>',
      extraCloseTags: '</sub>',
      cls: cls
    };
    return [modifier];
  }
  return [];
};

function doToggleSubscript(){
  this.editorInfo.ace_toggleAttributeOnSelection("subscript");
}

// Once ace is initialized, we set ace_doToggleSubscript and bind it to the context
exports.aceInitialized = function(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doToggleSubscript = _(doToggleSubscript).bind(context);
}

var aceRegisterBlockElements = function(){
//  return [ "sub" ];
}


// Export all hooks
exports.aceInitialized = aceInitialized;
exports.postAceInit = postAceInit;
exports.aceAttribsToClasses = aceAttribsToClasses;

exports.aceRegisterBlockElements = function(){
  return ["sub"];
}

