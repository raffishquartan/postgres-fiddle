require([
  "js/require-config",
  "js/app-obj"
], function(PF){
  RegExp.escape_text= function(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  PF.start();
});
