define(["./Item"], function (Item) {
  function Wishlist(name) {
    var self=this;
    this.name = ko.observable(name);
    this.items = ko.observableArray();
    this.editing = ko.observable(false);
    this.edit = function () {
      this.editing(!this.editing());
    };
    this.createNew=function(){
      var item = new Item("New wish");
      item.editing (true);
      self.items.push(item);
    };
  }

  return Wishlist;
});