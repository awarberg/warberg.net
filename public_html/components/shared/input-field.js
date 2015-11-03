define(["knockout", "text!./input-field.html"], function(ko, template) {
  function InputField(params) {
    this.type = params.type;
    this.value = params.value;
    this.text = params.text;
    this.hasFocus = params.hasFocus;
    this.id = _.uniqueId("input-field");
  }

  return {
    viewModel: InputField,
    template: template
  };
});