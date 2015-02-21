require([
  "js/require-config",
  "js/app/obj",
  'js/apps/home/home_app'
], function(RequireConfig, PF){
  RegExp.escape_text= function(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  PF.start();
});
