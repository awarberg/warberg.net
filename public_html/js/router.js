define(function () {
  var Router = function (scopeElem, containerElem) {
    function changeRoute(route) {
      switch (route) {
      case "wishit":
        require(["wishit/main"], function () {
          var mainElem = $("<wishit-main/>");
          mainElem.appendTo(containerElem);
          ko.applyBindings({}, mainElem[0]);
        });
        break;
      }
    }
    this.init = function () {
      $(scopeElem).on("click", "[data-route]", function () {
        $this = $(this);
        if ($this.data("active")) {
          ko.cleanNode(containerElem[0]);
          containerElem.html(null);
          $this.data("active", false);
        } else {
          var route = $this.data("route");
          changeRoute(route);
          $this.data("active", true);
        }
        $this.toggleClass("orange purple");
      });
    };
  };
  return Router;
});