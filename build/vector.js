(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vanilla = global.vanilla || {})));
}(this, function (exports) { 'use strict';

  // Vector

  // IN: coordinates x, y, z
  function Vector (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  Vector.prototype.negate = function() {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;
  }

  // Normalizes X Y and Z in-place
  Vector.prototype.normalize = function() {
    var len = Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
    if (len > 0) {
      this.x /= len;
      this.y /= len;
      this.z /= len;
    }
  }

  exports.Vector = Vector;

  Object.defineProperty(exports, '__esModule', { value: true });

}));