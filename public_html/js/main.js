requirejs.config({
  paths: {
    text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text"
  }
});

ko.components.register("input-field",{
  viewModel: {require:"viewModel/shared/input-field"},
  template: {require:"text!../template/shared/input-field.html"}
});

require(["router"], function(Router) {
  var mainRouter = new Router(document,$("#main"));
  mainRouter.init();
  
  var vm = {
  };
  var body = $("body");
  
  ko.applyBindings(vm,body[0]);
});