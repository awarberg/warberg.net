define(["./item"], function (Item) {
  function Wishlist(json) {
    var self = this;
    this.id = json["id"];
    this.name = ko.observable(json["name"]);
    this.items = ko.observableArray(
      json["items"].map(function (jsonItem) {
        return new Item(jsonItem);
      })
    );
    this.sortedItems = ko.pureComputed(function () {
      return _.sortBy(self.items(), function (item) {
        return item.order();
      });
    }).extend({
      rateLimit: 0
    });
    this.editing = ko.observable(false);
    this.edit = function () {
      this.editing(!this.editing());
    };
    this.createNew = function () {
      var item = new Item({
        name: "Untitled wish",
        order: 0
      });
      item.editing(true);
      self.items.push(item);
      self.reorder();
    };
    this.remove = function (item) {
      self.items.remove(item);
      self.reorder();
    };
    this.reorder = function () {
      self.sortedItems().forEach(function (item, index) {
        item.order(index + 1);
      });
    };
    this.toJSON = function () {
      return {
        id: self.id,
        name: self.name(),
        items: self.sortedItems()
      };
    };
  }

  return Wishlist;
});