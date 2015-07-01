define(
  ["knockout", "js/queryParams", "text!./main.html", "./wishlist"],
  function (ko, queryParams, template, Wishlist) {

    function Wishit(json) {
      var self = this;
      this.selectedList = ko.observable();
      this.load = function (json) {
        var wishlist = new Wishlist(json);
        wishlist.editing(true);
        self.selectedList(wishlist);
        queryParams.set("wid", wishlist.id);
      };
      this.createNew = function () {
        $.getJSON("/cgi-bin/wishit/api/new.php")
          .done(self.load);
      };
      this.save = function () {
        var list = self.selectedList();
        var json = JSON.stringify(list);
        $.ajax({
            type: "POST",
            url: "/cgi-bin/wishit/api/save.php?" + $.param({
              wid: list.id
            }),
            dataType: "json",
            data: json
          })
          .done(function () {
            alert("Saved");
          });
      };
      var wishId = queryParams.get("wid");
      if (wishId) {
        $.getJSON("/cgi-bin/wishit/api/get.php", {
            wid: wishId
          })
          .done(self.load);
      } else {
        self.createNew();
      }
    }

    return {
      viewModel: Wishit,
      template: template
    };
  });