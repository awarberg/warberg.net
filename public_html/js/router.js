define(function() {
  var Router = function(scopeElem, containerElem) {
    function changeRoute(route) {
      switch (route) {
        case "wishit":
          var mainElem = $("<wishit-main/>");
          mainElem.appendTo(containerElem);
          ko.applyBindings({}, mainElem[0]);
          break;
        case "about":
          var mainElem = $("<about-main/>");
          mainElem.appendTo(containerElem);
          ko.applyBindings({}, mainElem[0]);
          break;
      }
    }
    this.init = function() {
      $(scopeElem).on("click", "[data-route]", function() {
        $this = $(this);
        if (!$this.data("active")) {
          ko.cleanNode(containerElem[0]);
          containerElem.html(null);

          var route = $this.data("route");
          changeRoute(route);
          $this.data("active", true);
          $this.toggleClass("orange purple");

          $("[data-route]").each(function() {
            var $that = $(this);
            if (!$this.is($that)) {
              if ($that.data("active")) {
                $that.data("active", false);
                $that.toggleClass("orange purple");
              }
            }
          });
        }
      });
    };
  };
  return Router;
});
