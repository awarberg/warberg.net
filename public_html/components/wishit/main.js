define(
  ["knockout", "text!./main.html", "./wishlist"],
  function (ko, template, Wishlist) {

    function Wishit(json) {
      var self = this;
      this.selectedList = ko.observable();
      this.createNew = function () {
        $.getJSON("/cgi-bin/wishit.php?op=new")
          .done(function(json){
            var wishlist = new Wishlist(json);
            wishlist.editing(true);
            self.selectedList(wishlist);
          });
      };
      self.createNew();
    }

    return {
      viewModel: Wishit,
      template: template
    };
  }
);