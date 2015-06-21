define(["./wishlist"], function (Wishlist) {

  function Main() {
    var self = this;
    this.lists = ko.observableArray();
    this.selectedList = ko.observable();
    this.createNew = function () {
      var wishlist = new Wishlist("New wishlist");
      wishlist.editing(true);
      self.lists.push(wishlist);
    };
    this.toggleList = function (list) {
      self.selectedList(self.selectedList() === list ? null : list);
    };
  }

  return Main;
});