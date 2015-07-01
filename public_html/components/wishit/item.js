define(function () {
  function Item(json) {
    this.name = ko.observable(json["name"]);
    this.order = ko.observable(json["order"]);

    this.editing = ko.observable(false);
    this.edit = function () {
      this.editing(!this.editing());
    };
  }

  return Item;
});