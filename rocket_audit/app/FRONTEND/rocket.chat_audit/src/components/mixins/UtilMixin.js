import $ from "jquery";
import moment from "moment"


export default {
  methods: {
    formatDate: function(value, fmt, _default) {
      _default = _default === undefined ? "" : _default;
      if (!value) {
        return _default;
      }
      fmt = fmt === undefined ? "MMM D, YYYY HH:mm" : fmt;
      return moment(value).format(fmt);
    },
    closeAllNotify: function() {
      this.$toasted.toasts.forEach(t => t.goAway(0));
    },
    showMessage: function(msg, opts) {
      opts = Object.assign(
        {
          icon: "fas fa-info-circle mr-1",
          type: "info",
          duration : 5000,
          action: {
            text: "x",
            class: "text-light",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          }
        },
        opts || {}
      );
      this.$toasted.show(msg, opts);
    },
    showSuccess: function(msg, duration) {
      this.showMessage(msg, {
        icon: "fas fa-check-circle mr-1",
        type: "success",
        duration: duration !== undefined ? duration : 5000
      });
    },
    showError: function(msg, duration) {
      this.showMessage(msg, {
        icon: "fas fa-exclamation-circle mr-1",
        type: "error",
        duration: duration !== undefined ? duration : 5000
      });
    },
    showWarn: function(msg, duration) {
      this.showMessage(msg, {
        icon: "fas fa-exclamation-triangle mr-1",
        type: "warning",
        duration: duration !== undefined ? duration : 5000
      });
    },
    showInfo: function(msg, duration) {
      this.showMessage(msg, {
        className: "bg-info",
        duration: duration !== undefined ? duration : 5000
      });
    },
    showDefaultServerSuccess: function(response, duration) {
      duration = duration !== undefined ? duration : 5000;
      var defaultMsg = "Operation done successfully";
      this.showSuccess(response.statusText || defaultMsg, duration);
    },
    showDefaultServerError: function(error, showDetail, duration, extra_message) {
      var response = error.response || error.request;
      if (response.status === 401) {
        return;
      }
      var msg;
      duration = duration !== undefined ? duration : 50000;
      showDetail = showDetail !== undefined ? showDetail : true;
      if (!response || response.status <= 0) {
        msg = "<strong>Server Connection Error</strong>";
      } else {
        msg =
          "<strong>" +
          response.status +
          ": " +
          response.statusText +
          " | </strong>";
        var jData = this.safeFromJson(response.data);
        if (showDetail && jData) {
          msg += "<p>" + this.prettifyError(response.data) + "</p>";
        }
        if (extra_message) {
          msg += "<p>" + extra_message + "</p>";
        }
      }
      this.showError(msg, duration);
    },
    randomId: function(n) {
      n = n || 10;
      return Math.floor(Math.random() * Math.pow(10, n) + 1);
    },
    addQSParm: function(url, name, value, override) {
      override = override === undefined ? true : override;
      var self = this;
      if (value instanceof Array) {
        $.each(value, function(k, v) {
          url = self.addQSParm(url, name, v, false);
        });
        return url;
      }
      var re = new RegExp("([?&]" + name + "=)[^&]+", "");

      function add(sep) {
        url += sep + name + "=" + encodeURIComponent(value);
      }

      function change() {
        url = url.replace(re, "$1" + encodeURIComponent(value));
      }

      if (url.indexOf("?") === -1) {
        add("?");
      } else {
        if (override && re.test(url)) {
          change();
        } else {
          add("&");
        }
      }
      return url;
    },
  }
};
