define(["knockout", "text!./main.html"], function(ko, template) {
  function About(params) {}

  return {
    viewModel: About,
    template: template
  };
});