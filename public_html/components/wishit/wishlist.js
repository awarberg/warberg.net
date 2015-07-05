define(["./item"], function(Item) {
  function Wishlist(json) {
    var self = this;
    this.publicKey = json["publicKey"];
    this.name = ko.observable(json["name"]);
    this.items = ko.observableArray(
      json["items"].map(function(jsonItem) {
        return new Item(jsonItem);
      })
    );
    this.sortedItems = ko.pureComputed(function() {
      return _.sortBy(self.items(), function(item) {
        return item.priority();
      });
    }).extend({
      rateLimit: 0
    });
    this.editing = ko.observable(false);
    this.edit = function() {
      this.editing(!this.editing());
    };
    this.createNew = function() {
      var item = new Item({
        name: "Untitled wish",
        priority: 0
      });
      item.editing(true);
      self.items.push(item);
      self.reprioritize();
    };
    this.remove = function(item) {
      self.items.remove(item);
      self.reprioritize();
    };
    this.reprioritize = function() {
      self.sortedItems().forEach(function(item, index) {
        item.priority(index + 1);
      });
    };
    this.toJSON = function() {
      return {
        publicKey: self.publicKey,
        name: self.name(),
        items: self.sortedItems()
      };
    };
  }

  return Wishlist;
});
