define(function () {
  function Item(name) {
    this.name = ko.observable(name);
    
    this.editing = ko.observable(false);
    this.edit = function () {
      this.editing(!this.editing());
    };
  }

  return Item;
});