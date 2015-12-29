System.config({
  baseURL: '/',
  map: {
    traceur: 'https://cdn.rawgit.com/jmcriffey/bower-traceur/0.0.93/traceur.min.js',
    text: 'https://cdn.rawgit.com/systemjs/plugin-text/0.0.4/text.js',
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.js',
    knockout: 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-debug.js',
    underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore.js',

    helpers: 'js/helpers.js'
  },
  meta: {
    '*.html': {
      loader: 'text'
    }
  }
});

// const knockoutComponents = [
//   {}
// ]

System.import('knockout').then(function(ko) {
  ko.options.deferUpdates = true;

  ko.components.register("shared-header", {
    require: 'components/shared/shared-header.js'
  });
  ko.components.register("shared-footer", {
    require: "components/shared/shared-footer.js"
  });
  ko.components.register("input-field", {
    require: "components/shared/input-field.js"
  });
  ko.components.register("about-main", {
    require: "components/about/about-main.js"
  });
  ko.components.register("transfer-main", {
    require: "components/transfer/transfer-main.js"
  });

  ko.applyBindings();
});