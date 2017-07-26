(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vanilla = global.vanilla || {})));
}(this, function (exports) { 'use strict';

  // Plane3D and Point2D

  // IN: Face face
  function Plane3D (face) {
    var p1 = face.verts[0];
    var p2 = face.verts[1];
    var p3 = face.verts[2];
    this.a = p1.y * (p2.z-p3.z) + p2.y * (p3.z-p1.z) + p3.y * (p1.z-p2.z);
    this.b = p1.z * (p2.x-p3.x) + p2.z * (p3.x-p1.x) + p3.z * (p1.x-p2.x);
    this.c = p1.x * (p2.y-p3.y) + p2.x * (p3.y-p1.y) + p3.x * (p1.y-p2.y);
    this.d = -1 * (p1.x * (p2.y*p3.z - p3.y*p2.z) + p2.x * (p3.y*p1.z - p1.y*p3.z) + p3.x * (p1.y*p2.z - p2.y*p1.z));	
  }

  // OUT: point2D
  Plane3D.prototype.getDualPointMappedToPlane = function() {
    var nplane = this.getNormZPlane();
    var dualPoint = new Point2D(nplane[0]/2, nplane[1]/2);
    return dualPoint;
  }

  Plane3D.prototype.getNormZPlane = function() {
    return [
      -1 * (this.a / this.c),
      -1 * (this.b / this.c),
      -1 * (this.d / this.c)
    ];
  }

  // IN: doubles x and y
  function Point2D (x, y) {
    this.x = x;
    this.y = y;
  }

  exports.Plane3D = Plane3D;
  exports.Point2D = Point2D;

  Object.defineProperty(exports, '__esModule', { value: true });

}));