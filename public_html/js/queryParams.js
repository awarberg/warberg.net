define(["knockout"],
  function (ko) {
    function parseQueryString() {
      var search = window.location.search.substr(1);
      if (!search) {
        return [];
      }
      var pairs = search.split("&");
      return pairs.map(function (pair) {
        var parts = pair.split("=");
        return {
          name: parts[0],
          value: parts[1]
        };
      });
    }

    function QueryParams() {
      var self = this;
      var queryParams = ko.observableArray(
        parseQueryString()
        .map(function (queryParam) {
          return {
            name: queryParam.name,
            value: ko.observable(queryParam.value)
          }
        })
      );
      ko.pureComputed(function () {
          var nameValuePairs = queryParams()
            .map(function (queryParam) {
              return {
                name: queryParam.name,
                value: queryParam.value()
              };
            });
          return nameValuePairs;
        })
        .subscribe(function (nameValuePairs) {
          var url = nameValuePairs.length > 0 ? (
            "?" + nameValuePairs.map(function (nvp) {
              return nvp.name + "=" + nvp.value;
            }).join("&")) : "";
          history.pushState(nameValuePairs, "", url);
        });
      this.get = function (name) {
        var queryParam = _.findWhere(queryParams(), {
          name: name
        });
        return queryParam ? queryParam.value() : "";
      };
      this.set = function (name, value) {
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
      };
    }

    return new QueryParams();
  }
);