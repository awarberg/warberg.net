define(
  ["knockout", "js/queryParams", "text!./main.html", "./wishlist"],
  function (ko, queryParams, template, Wishlist) {

    function Wishit(json) {
      var self = this;
      this.selectedList = ko.observable();
      this.load = function (json) {
        var wishlist = new Wishlist(json);
        wishlist.editing(true);
        wishlist.reprioritize();
        self.selectedList(wishlist);
        queryParams.set("publicKey", wishlist.publicKey);
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
            url: "/cgi-bin/wishit/api/save.php",
            dataType: "json",
            data: json
          })
          .done(function () {
            alert("Saved");
          });
      };
      var publicKey = queryParams.get("publicKey");
      if (publicKey) {
        $.getJSON("/cgi-bin/wishit/api/get.php", {
            publicKey: publicKey
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
