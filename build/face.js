(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.vanilla = global.vanilla || {})));
}(this, function (exports) { 'use strict';

  var epsilon = 1E-10;

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

  // IN: Vertices a, b, c
  function Face (a, b, c, orient) {
    this.conflicts = new ConflictList(true);
    this.verts = [a, b, c];
    this.marked = false;
    var t = (a.subtract(b)).crossproduct(b.subtract(c));

    this.normal = new Vector(-t.x, -t.y, -t.z);
    this.normal.normalize();
    this.createEdges();
    this.dualPoint = null;

    if (orient != undefined) {
      this.orient(orient);
    }
  }

  // OUT: Point2D
  Face.prototype.getDualPoint = function() {
    if (this.dualPoint == null) {
      var plane3d = new Plane3D(this);
      this.dualPoint = plane3d.getDualPointMappedToPlane();
    }
    return this.dualPoint;
  }

  Face.prototype.isVisibleFromBelow = function() {
    return (this.normal.z < -1.4259414393190911E-9);
  }

  Face.prototype.createEdges = function() {
    this.edges = [];
    this.edges[0] = new HEdge(this.verts[0], this.verts[1], this);
    this.edges[1] = new HEdge(this.verts[1], this.verts[2], this);
    this.edges[2] = new HEdge(this.verts[2], this.verts[0], this);
    this.edges[0].next = this.edges[1];
    this.edges[0].prev = this.edges[2];
    this.edges[1].next = this.edges[2];
    this.edges[1].prev = this.edges[0];
    this.edges[2].next = this.edges[0];
    this.edges[2].prev = this.edges[1];
  }

  // IN: vertex orient
  Face.prototype.orient = function(orient) {
    if (!(dot(this.normal,orient) < dot(this.normal, this.verts[0]))){
      var temp = this.verts[1];
      this.verts[1] = this.verts[2];
      this.verts[2] = temp;
      this.normal.negate();
      this.createEdges();
    }
  }

  // IN: two vertices v0 and v1
  Face.prototype.getEdge = function(v0, v1) {
    for (var i = 0; i < 3; i++) {
      if (this.edges[i].isEqual(v0, v1)) {
        return this.edges[i];
      }
    }
    return null;
  }

  // IN: Face face, vertices v0 and v1
  Face.prototype.link = function(face, v0, v1) {
    if (face instanceof Face) {
      var twin = face.getEdge(v0, v1);
      if (twin === null) {

        console.log("ERROR: twin is null");
      }
      var edge = this.getEdge(v0, v1);
      twin.twin = edge;
      edge.twin = twin;
    } else {
      var e = face;
      var edge = this.getEdge(e.orig, e.dest);
      e.twin = edge;
      edge.twin = e;
    }
  }

  // IN: vertex v
  Face.prototype.conflict = function(v) {
    return (dot(this.normal, v) > dot(this.normal, this.verts[0]) + epsilon);
  }

  Face.prototype.getHorizon = function() {
    for (var i = 0; i < 3; i++) {
      if (this.edges[i].twin !== null && this.edges[i].twin.isHorizon()) {
        return this.edges[i];
      }
    }
    return null;
  }

  Face.prototype.removeConflict = function() {
    this.conflicts.removeAll();
  }

  // IN: vectors or vertices
  // OUT: dot product
  function dot (v1, v2) {
    return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z); 
  }

  exports.Face = Face;
  exports.dot = dot;

  Object.defineProperty(exports, '__esModule', { value: true });

}));