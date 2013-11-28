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
  if(!(call.callstack.type == "handleClick") && !(call.callstack.type == "handleKeyEvent")) return false;

  // the caret is in a new position..  Let's do some funky shit
  if ( call.editorInfo.ace_getAttributeOnSelection("subscript") ) {
    // show the button as being depressed..  Not sad, but active.. You know the drill bitches.
   console.log("trying");
    $('.subscript > a').addClass('activeButton');
  }else{
    $('.subscript > a').removeClass('activeButton');
  }

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

function doToggleSubscript(){
  this.editorInfo.ace_toggleAttributeOnSelection("subscript");
}

// Once ace is initialized, we set ace_doToggleSubscript and bind it to the context
function aceInitialized(hook, context){
  var editorInfo = context.editorInfo;
  editorInfo.ace_doToggleSubscript = _(doToggleSubscript).bind(context);
}

// Export all hooks
exports.aceInitialized = aceInitialized;
exports.postAceInit = postAceInit;
exports.aceAttribsToClasses = aceAttribsToClasses;
