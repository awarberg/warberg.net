requirejs.config({
  baseUrl: "..",
  paths: {
    text: "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text"
  }
});

define("knockout", ko);

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
  var vm = {
    page: ko.observable()
  };
  var main = $("#main");
  queryParams.subscribe("page", function(page) {
    vm.page(page);
    $("[data-page]").each(function() {
      var $this = $(this);
      var active = $this.data("page") === page;
      $this.toggleClass("orange", active);
      $this.toggleClass("purple", !active);
    });
  });
  queryParams.reset(["page"]);
  $("body").on("click", "[data-page]", function() {
    var page = $(this).data("page");
    if (queryParams.get("page") !== page) {
      queryParams.replace({
        "page": page
      });
    }
  });

  ko.applyBindings(vm, main[0]);
});
