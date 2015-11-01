define(["knockout"],
  function(ko) {
    function parseQueryString() {
      var search = window.location.search.substr(1);
      if (!search) {
        return [];
      }
      var pairs = search.split("&");
      return pairs.map(function(pair) {
        var parts = pair.split("=");
        return {
          name: parts[0],
          value: parts[1]
        };
      });
    }

    function QueryParams() {
      var self = this;
      var callbacks = [];
      var suppressPushState = false;
      var queryParams = ko.observableArray(
        parseQueryString()
        .map(function(queryParam) {
          return {
            name: queryParam.name,
            value: ko.observable(queryParam.value)
          };
        })
      );

      function toParams(nameValuePairs) {
        var params = {};
        (nameValuePairs || []).forEach(function(nvp) {
          params[nvp.name] = nvp.value;
        });
        return params;
      }
      window.addEventListener("popstate", function(e) {
        try {
          suppressPushState = true;
          var params = toParams(e.state);
          self.replace(params);
        } finally {
          suppressPushState = false;
        }
      });
      ko.pureComputed(function() {
          var nameValuePairs = queryParams()
            .map(function(queryParam) {
              return {
                name: queryParam.name,
                value: queryParam.value()
              };
            })
            .filter(function(nvp) {
              return nvp.value !== undefined;
            });
          return nameValuePairs;
        })
        .subscribe(function(nameValuePairs) {
          if (suppressPushState === false) {
            var url = nameValuePairs.length > 0 ? (
              "?" + nameValuePairs.map(function(nvp) {
                return nvp.name + "=" + nvp.value;
              }).join("&")) : "";

            var oldParams = toParams(history.state);
            var newParams = toParams(nameValuePairs);
            var isSuperset = _.isMatch(newParams, oldParams);

            history[isSuperset ? "replaceState" : "pushState"](nameValuePairs, "", url);
          }
        });
      this.get = function(name) {
        var queryParam = _.findWhere(queryParams(), {
          name: name
        });
        return queryParam ? queryParam.value() : "";
      };
      this.set = function(name, value) {
        var queryParam = _.findWhere(queryParams(), {
          name: name
        });
        if (queryParam) {
          queryParam.value(value);
        } else {
          queryParam = {
            name: name,
            value: ko.observable(value)
          };
          queryParams.push(queryParam);
        }
        var callback = _.findWhere(callbacks, {
          name: name
        });
        if (callback) {
          callback.callback(value);
        }
      };
      this.replace = function(params) {
        queryParams().forEach(function(queryParam) {
          if (!params.hasOwnProperty(queryParam.name)) {
            self.set(queryParam.name, undefined);
          }
        });
        for (var name in params) {
          if (params.hasOwnProperty(name)) {
            self.set(name, params[name]);
          }
        }
      };
      this.subscribe = function(name, callback) {
        callbacks.push({
          name: name,
          callback: callback
        });
      };
      this.reset = function(names) {
        names.forEach(function(name) {
          var queryParam = _.findWhere(queryParams(), {
            name: name
          });
          if (queryParam) {
            self.set(name, queryParam.value());
          }
        });
      };
    }

    return new QueryParams();
  }
);
