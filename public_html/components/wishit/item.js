define(function () {
  function Item(json) {
    var self = this;
    this.name = ko.observable(json["name"]);
    this.priority = ko.observable(json["priority"]);

    this.editing = ko.observable(false);
    this.edit = function () {
      this.editing(!this.editing());
    };
    this.toJSON = function () {
      return {
        name: self.name(),
        priority: self.priority()
      };
    };
  }

  return Item;
});
