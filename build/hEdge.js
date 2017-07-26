(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vanilla = global.vanilla || {})));
}(this, function (exports) { 'use strict';

  // HEdge

  // IN: vertex orig, vertex dest, Face face
  function HEdge (orig, dest, face) {
    this.next = null;
    this.prev = null;
    this.twin = null;
    this.orig = orig;
    this.dest = dest;
    this.iFace = face;
  }

  HEdge.prototype.isHorizon = function() {
    return this.twin !== null && this.twin.iFace.marked && !this.iFace.marked;
  }

  // IN: array horizon
  HEdge.prototype.findHorizon = function(horizon) {
    if (this.isHorizon()) {
      if (horizon.length > 0 && this === horizon[0]) {
        return;
      } else {
        horizon.push(this);
        this.next.findHorizon(horizon);
      }
    } else {
      if (this.twin !== null) {
        this.twin.next.findHorizon(horizon);
      }
    }
  }

  // IN: vertices origin and dest
  HEdge.prototype.isEqual = function(origin, dest) {
    return ((this.orig.equals(origin) && this.dest.equals(dest)) || (this.orig.equals(dest) && this.dest.equals(origin)));
  }

  exports.HEdge = HEdge;

  Object.defineProperty(exports, '__esModule', { value: true });

}));