define(function () {
  ko.components.register("wishit-main", {
    viewModel: {
      require: "viewModel/wishit/main"
    },
    template: {
      require: "text!../template/wishit/main.html"
    }
  });
});