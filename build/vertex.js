(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vanilla = global.vanilla || {})));
}(this, function (exports) { 'use strict';

  var epsilon = 1E-10;

  // IN: boolean forFace
  function ConflictList (forFace) {
    this.forFace = forFace;
    this.head = null;
  }

  // IN: ConflictListNode cln
  ConflictList.prototype.add = function(cln) {
    if (this.head === null) {
      this.head = cln;
    } else {
      if (this.forFace) {  // Is FaceList
        this.head.prevv = cln;
        cln.nextv = this.head;
        this.head = cln;
      } else {  // Is VertexList
        this.head.prevf = cln;
        cln.nextf = this.head;
        this.head = cln;
      }
    }
  }

  ConflictList.prototype.isEmpty = function() {
    return this.head === null;
  }

  // Array of faces visible
  ConflictList.prototype.fill = function(visible) {
    if (this.forFace) {
      return;
    }
    var curr = this.head;
    do {
      visible.push(curr.face);
      curr.face.marked = true;
      curr = curr.nextf;
    } while (curr !== null);
  }

  ConflictList.prototype.removeAll = function() {
    if (this.forFace) {  // Remove all vertices from Face
      var curr = this.head;
      do {
        if (curr.prevf === null) {  // Node is head
          if (curr.nextf === null) {
            curr.vert.conflicts.head = null;
          } else {
            curr.nextf.prevf = null;
            curr.vert.conflicts.head = curr.nextf;
          }
        } else {  // Node is not head
          if (curr.nextf != null) {
            curr.nextf.prevf = curr.prevf;
          }
          curr.prevf.nextf = curr.nextf;
        }
        curr = curr.nextv;
        if (curr != null) {
          curr.prevv = null;
        }
      } while (curr != null);
    } else {  // Remove all JFaces from vertex
      var curr = this.head;
      do {
        if (curr.prevv == null) {  // Node is head
          if (curr.nextv == null) {
            curr.face.conflicts.head = null;
          } else {
            curr.nextv.prevv = null;
            curr.face.conflicts.head = curr.nextv;
          }
        } else {  // Node is not head
          if (curr.nextv != null) {
            curr.nextv.prevv = curr.prevv;
          }
          curr.prevv.nextv = curr.nextv;
        }
        curr = curr.nextf;
        if (curr != null)
          curr.prevf = null;
      } while (curr != null);
    }
  }

  // IN: list of vertices
  ConflictList.prototype.getVertices = function() {
    var list = [],
    		curr = this.head;
    while (curr !== null) {
      list.push(curr.vert);
      curr = curr.nextv;
    }
    return list;
  }

  // IN: coordinates x, y, z
  function Vertex (x, y, z, weight, orig, isDummy) {
    this.x = x;
    this.y = y;
    this.weight = epsilon;
    this.index = 0;
    this.conflicts = new ConflictList(false);
    this.neighbours = null;  // Potential trouble
    this.nonClippedPolygon = null;
    this.polygon = null;
    this.originalObject = null;
    this.isDummy = false;

    if (orig !== undefined) {
      this.originalObject = orig;
    }
    if (isDummy != undefined) {
      this.isDummy = isDummy;
    }
    if (weight != null) {
      this.weight = weight;
    }
    if (z != null) {
      this.z = z;
    } else {
      this.z = this.projectZ(this.x, this.y, this.weight);
    }
  }

  Vertex.prototype.setWeight = function(weight) {
    this.weight = weight;
    this.z = this.projectZ(this.x, this.y, this.weight);
  }

  Vertex.prototype.projectZ = function(x, y, weight) {
    return ((x*x) + (y*y) - weight);
  }

  Vertex.prototype.subtract = function(v) {
    return new Vertex(v.x - this.x, v.y - this.y, v.z - this.z);
  }

  Vertex.prototype.crossproduct = function(v) {
    return new Vertex((this.y * v.z) - (this.z * v.y), (this.z * v.x) - (this.x * v.z), (this.x * v.y) - (this.y * v.x));
  }

  Vertex.prototype.equals = function(v) {
    return (this.x === v.x && this.y === v.y && this.z === v.z);
  }

  exports.Vertex = Vertex;

  Object.defineProperty(exports, '__esModule', { value: true });

}));