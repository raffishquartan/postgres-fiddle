require([
  'js/require-config',
  'js/app/obj',
  'js/apps/footer/footer_app',
  'js/apps/header/header_app',
  'js/apps/home/home_app',
  'js/apps/about/about_app'
], function(RequireConfig, PF){
  var logger = PF.logger.get_logger('root/js/main');
  logger.trace('require:lambda -- enter');
  RegExp.escape_text= function(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };
  PF.start();
  logger.trace('require:lambda -- exit');
});
