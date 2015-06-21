define(function () {
  function InputField(params) {
    this.type = params.type;
    this.value = params.value;
    this.text = params.text;
    this.hasFocus=params.hasFocus;
    this.id = _.uniqueId("input-field");
  }

  return InputField;
});