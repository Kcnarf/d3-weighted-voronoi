(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vanilla = global.vanilla || {})));
}(this, function (exports) { 'use strict';

  var epsilon = 1E-10;

  function epsilonesque(n) {
    return n >= -epsilon && n <= epsilon;
  }

  exports.epsilon = epsilon;
  exports.epsilonesque = epsilonesque;

  Object.defineProperty(exports, '__esModule', { value: true });

}));