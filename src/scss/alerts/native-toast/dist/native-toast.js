(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.nativeToast = factory());
}(this, (function () { 'use strict';

  /*!
   * nano-assign v1.0.0
   * (c) 2017-present egoist <0x142857@gmail.com>
   * Released under the MIT License.
   */

  var index = function(obj) {
    var arguments$1 = arguments;

    for (var i = 1; i < arguments.length; i++) {
      // eslint-disable-next-line guard-for-in, prefer-rest-params
      for (var p in arguments[i]) { obj[p] = arguments$1[i][p]; }
    }
    return obj
  };

  var nanoAssign_common = index;

  var prevToast = null;
  var icons = {
    warning: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6\" /></svg>",
    success: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M2 20 L12 28 30 4\" /></svg>",
    info: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M16 14 L16 23 M16 8 L16 10\" /><circle cx=\"16\" cy=\"16\" r=\"14\" /></svg>",
    error: "<svg viewBox=\"0 0 32 32\" width=\"32\" height=\"32\" fill=\"none\" stroke=\"currentcolor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"6.25%\"><path d=\"M16 3 L30 29 2 29 Z M16 11 L16 19 M16 23 L16 25\" /></svg>"
  };

  var Toast = function Toast(ref) {
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var message = ref.message; if ( message === void 0 ) message = '';
    var position = ref.position; if ( position === void 0 ) position = 'bottom';
    var timeout = ref.timeout; if ( timeout === void 0 ) timeout = 3000;
    var el = ref.el; if ( el === void 0 ) el = document.body;
    var square = ref.square; if ( square === void 0 ) square = false;
    var type = ref.type; if ( type === void 0 ) type = '';
    var debug = ref.debug; if ( debug === void 0 ) debug = false;
    var edge = ref.edge; if ( edge === void 0 ) edge = false;
    var icon = ref.icon; if ( icon === void 0 ) icon = true;
    var closeOnClick = ref.closeOnClick; if ( closeOnClick === void 0 ) closeOnClick = false;

    if (prevToast) {
      prevToast.destroy();
    }

    this.message = message;
    this.position = position;
    this.el = el;
    this.timeout = timeout;
    this.closeOnClick = closeOnClick;
    this.toast = document.createElement('div');
    this.toast.className = "native-toast native-toast-" + (this.position);

    if (type) {
      this.toast.className += " native-toast-" + type;

      if (icon) {
        this.message = "<span class=\"native-toast-icon-" + type + "\">" + (icons[type] || '') + "</span>" + (this.message);
      }
    }

    this.toast.innerHTML = this.message;

    if (edge) {
      this.toast.className += ' native-toast-edge';
    } else if (square) {
      this.toast.style.borderRadius = '3px';
    }

    this.el.appendChild(this.toast);
    prevToast = this;
    this.show();

    if (!debug && timeout > 0) {
      this.hide();
    }

    if (this.closeOnClick) {
      this.toast.addEventListener('click', function () {
        this$1.destroy();
      });
    }
  };

  Toast.prototype.show = function show () {
      var this$1 = this;

    setTimeout(function () {
      this$1.toast.classList.add('native-toast-shown');
    }, 300);
  };

  Toast.prototype.hide = function hide () {
      var this$1 = this;

    setTimeout(function () {
      this$1.destroy();
    }, this.timeout);
  };

  Toast.prototype.destroy = function destroy () {
      var this$1 = this;

    if (!this.toast) { return; }
    this.toast.classList.remove('native-toast-shown');
    setTimeout(function () {
      if (this$1.toast) {
        this$1.el.removeChild(this$1.toast);
        this$1.toast = null;
      }
    }, 300);
  };

  function toast(options) {
    return new Toast(options);
  }

  var loop = function () {
    toast[type] = function (options) { return toast(nanoAssign_common({
      type: type
    }, options)); };
  };

  for (var type of ['success', 'info', 'warning', 'error']) loop();

  return toast;

})));
