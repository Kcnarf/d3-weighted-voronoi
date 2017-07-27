var tape = require("tape"),
    utils = require('../build/utils');
    vertex = require("../build/Vertex");
    face = require("../build/face");

tape("Face(...) should set the expected defaults", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      f = new face.Face(v0, v1, v2),
      normal = f.normal,
      he0 = f.edges[0],
      he1 = f.edges[1],
      he2 = f.edges[2];

  test.deepEqual(f.verts, [v0,v1,v2]);
  test.equal(f.marked, false);
  test.equal(normal.x, -0.8571428571428571);
  test.equal(normal.y, -0.42857142857142855);
  test.equal(normal.z, -0.2857142857142857);
  test.equal(he0.orig, v0);
  test.equal(he0.dest, v1);
  test.equal(he0.prev, he2);
  test.equal(he0.next, he1);
  test.equal(he1.orig, v1);
  test.equal(he1.dest, v2);
  test.equal(he1.prev, he0);
  test.equal(he1.next, he2);
  test.equal(he2.orig, v2);
  test.equal(he2.dest, v0);
  test.equal(he2.prev, he1);
  test.equal(he2.next, he0);
  test.end();
});

tape("Face(...) should handle orient", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      v3 = new vertex.Vertex(-0.8571428571428571, -0.42857142857142855, -0.2857142857142857),
      f = new face.Face(v0, v1, v2, v3),
      normal = f.normal,
      he0 = f.edges[0],
      he1 = f.edges[1],
      he2 = f.edges[2];

  test.deepEqual(f.verts, [v0,v2,v1]);
  test.equal(normal.x, 0.8571428571428571);
  test.equal(normal.y, 0.42857142857142855);
  test.equal(normal.z, 0.2857142857142857);
  test.equal(he0.orig, v0);
  test.equal(he0.dest, v2);
  test.equal(he0.prev, he2);
  test.equal(he0.next, he1);
  test.equal(he1.orig, v2);
  test.equal(he1.dest, v1);
  test.equal(he1.prev, he0);
  test.equal(he1.next, he2);
  test.equal(he2.orig, v1);
  test.equal(he2.dest, v0);
  test.equal(he2.prev, he1);
  test.equal(he2.next, he0);
  test.end();
});

tape("Face.getDualPoint() should return the expected Point2D", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      f = new face.Face(v0, v1, v2),
      dualPoint = f.getDualPoint();

  test.equal(dualPoint.x, -1.5);
  test.equal(dualPoint.y, -0.75);
  test.end();
});

tape("Face.createEdges(...) should compute the expected HEdges", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      f = new face.Face(v0, v1, v2);
      
  f.createEdges();
  var he0 = f.edges[0],
      he1 = f.edges[1],
      he2 = f.edges[2];

  test.equal(he0.orig, v0);
  test.equal(he0.dest, v1);
  test.equal(he0.prev, he2);
  test.equal(he0.next, he1);
  test.equal(he1.orig, v1);
  test.equal(he1.dest, v2);
  test.equal(he1.prev, he0);
  test.equal(he1.next, he2);
  test.equal(he2.orig, v2);
  test.equal(he2.dest, v0);
  test.equal(he2.prev, he1);
  test.equal(he2.next, he0);
  test.end();
});

tape("Face.orient(...) should computes the expected HEdges", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      v3 = new vertex.Vertex(-0.8571428571428571, -0.42857142857142855, -0.2857142857142857),
      f = new face.Face(v0, v1, v2);
  
  f.orient(v3);
  var he0 = f.edges[0],
      he1 = f.edges[1],
      he2 = f.edges[2];

  test.deepEqual(f.verts, [v0,v2,v1]);
  test.equal(he0.orig, v0);
  test.equal(he0.dest, v2);
  test.equal(he0.prev, he2);
  test.equal(he0.next, he1);
  test.equal(he1.orig, v2);
  test.equal(he1.dest, v1);
  test.equal(he1.prev, he0);
  test.equal(he1.next, he2);
  test.equal(he2.orig, v1);
  test.equal(he2.dest, v0);
  test.equal(he2.prev, he1);
  test.equal(he2.next, he0);
  test.end();
});

tape("Face.getEdge(...) should return expected HEdge", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      v3 = new vertex.Vertex(1, 2, 3),
      f = new face.Face(v0, v1, v2),
      he0 = f.edges[0],
      he1 = f.edges[1],
      he2 = f.edges[2];

  test.equal(f.getEdge(v0,v1), he0);
  test.equal(f.getEdge(v1,v0), he0);
  test.equal(f.getEdge(v0,v3), null);
  test.end();
});

tape("Face.link(...) should find and link twins", function(test) {
  var v00 = new vertex.Vertex(1, 0, 0),
      v01 = new vertex.Vertex(0, 2, 0),
      v02 = new vertex.Vertex(0, 0, 3),
      f0 = new face.Face(v00, v01, v02),
      h00 = f0.edges[0],
      v10 = new vertex.Vertex(1, 0, 0),
      v11 = new vertex.Vertex(0, 2, 0),
      v12 = new vertex.Vertex(0, 0, 3),
      f1 = new face.Face(v10, v11, v12),
      h10 = f1.edges[0];

  f0.link(f1, v10, v11);
  test.equal(h00.twin, h10);
  test.equal(h10.twin, h00);
  test.end();
});

tape("Face.conflict(...) should detect conflict", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      v3 = new vertex.Vertex(2, 0, 0),
      v4 = new vertex.Vertex(-2, 0, 0),
      v5 = new vertex.Vertex(1-utils.epsilon, 0, 0),
      v6 = new vertex.Vertex(1-2*utils.epsilon, 0, 0),
      f = new face.Face(v0, v1, v2);

  test.notOk(f.conflict(v0));
  test.notOk(f.conflict(v3));
  test.ok(f.conflict(v4));
  test.notOk(f.conflict(v5));
  test.ok(f.conflict(v6));
  test.end();
});