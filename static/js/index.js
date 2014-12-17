var $, jQuery;
var $ = require('ep_etherpad-lite/static/js/rjquery').$;

/*****
* Basic setup
******/

// Bind the event handler to the toolbar buttons
exports.postAceInit = function(hook, context){
  $('.subscript').click(function(){
    context.ace.callWithAce(function(ace){
      ace.ace_toggleAttributeOnSelection("sub");
    },'insertsubscript' , true);
  })
};

// Show the subscript button as depressed when subscript is active 
// at the caret location
// TODO: create a postAceEditEvent hook that is fired once ace events
// have been fully processed by the content collector.
exports.aceEditEvent = function(hook, call, cb){
  // If it's not a click or a key event and the text hasn't changed then do nothing
  var cs = call.callstack;
  if(!(cs.type == "handleClick") && !(cs.type == "handleKeyEvent") && !(cs.docTextChanged)){
    return false;
  }
  // If it's an initial setup event then do nothing..
  if(cs.type == "setBaseText" || cs.type == "setup") return false;

  // It looks like we should check to see if this section has this attribute
  setTimeout(function(){ // avoid race condition..

    // Attribtes are never available on the first X caret position so we need to ignore that
    if(call.rep.selStart[1] === 0){
      // Attributes are never on the first line
      $('.subscript > a').removeClass('activeButton');
      return;
    }

    // the caret is in a new position..  Let's do some funky shit
    if ( call.editorInfo.ace_getAttributeOnSelection("sub") ) {
      // show the button as being depressed..  Not sad, but active..
      $('.subscript > a').addClass('activeButton');
    }else{
      $('.subscript > a').removeClass('activeButton');
    }
  },250);
}

/*****
* Editor setup
******/

// Our subscript attribute will result in a class
// I'm not sure if this is actually required..
exports.aceAttribsToClasses = function(hook, context){
  if(context.key == 'sub'){
    return ['sub'];
  }
}

// Block elements
// I'm not sure if this is actually required..
exports.aceRegisterBlockElements = function(){
  return ["sub"];
}

// Register attributes that are html markup / blocks not just classes
// This should make export export properly IE <sub>helllo</sub>world
// will be the output and not <span class=sub>helllo</span>
exports.aceAttribClasses = function(hook, attr){
  attr["sub"] = "tag:sub";
}

