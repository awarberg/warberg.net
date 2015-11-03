requirejs.config({
  baseUrl: "..",
  paths: {
    text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text"
  }
});

define("knockout", ko);

ko.components.register("menu", {
  require: "components/shared/menu"
});
ko.components.register("input-field", {
  require: "components/shared/input-field"
});
ko.components.register("about-main", {
  require: "components/about/main"
});
ko.components.register("wishit-main", {
  require: "components/wishit/main"
});

require(["js/queryParams"], function(queryParams) {
  var vm = {};
  var body = $("body");
  ko.applyBindings(vm, body[0]);
});