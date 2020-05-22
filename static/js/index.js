var _, $, jQuery;
var $ = require('ep_etherpad-lite/static/js/rjquery').$;
var _ = require('ep_etherpad-lite/static/js/underscore');

// Bind the event handler to the toolbar buttons
var postAceInit = function(hook, context){
  $('.subscript').click(function(){
    context.ace.callWithAce(function(ace){
      if(ace.ace_getAttributeOnSelection("subscript")){
        ace.ace_setAttributeOnSelection("subscript", false);
      }else{
        ace.ace_setAttributeOnSelection("subscript", true);
      }
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
  var cls = context.cls;
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

// Block elements
exports.aceRegisterBlockElements = function(){
  return ["sub"];
}

// Export all hooks
exports.postAceInit = postAceInit;
exports.aceAttribsToClasses = aceAttribsToClasses;
