var tape = require("tape"),
    vertex = require("../build/Vertex");
    hEdge = require("../build/hEdge");

tape("HEdge(...) should set the expected defaults", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      face = {verts: [v0, v1, v2]},
      he = new hEdge.HEdge(v0, v1, face);

  test.equal(he.next, null);
  test.equal(he.prev, null);
  test.equal(he.twin, null);
  test.equal(he.orig, v0);
  test.equal(he.dest, v1);
  test.equal(he.iFace, face);
  test.end();
});

tape("HEdge.isHorizon(...) should detect if it is an horizon", function(test) {
  var v00 = new vertex.Vertex(1, 0, 0),
      v01 = new vertex.Vertex(0, 2, 0),
      v02 = new vertex.Vertex(0, 0, 3),
      face0 = {verts: [v00, v01, v02], marked: true},
      he0 = new hEdge.HEdge(v00, v01, face0);
      v10 = new vertex.Vertex(1, 0, 0),
      v11 = new vertex.Vertex(0, 2, 0),
      v12 = new vertex.Vertex(0, 0, 3),
      face1 = {verts: [v10, v11, v12], marked: false};
      he1 = new hEdge.HEdge(v10, v11, face1);

  test.notOk(he0.isHorizon());

  he0.twin = he1;
  test.notOk(he0.isHorizon());

  face0.marked = false;
  test.notOk(he0.isHorizon());

  face1.marked = true;
  test.ok(he0.isHorizon());

  test.end();
});

tape("HEdge.isEqual(...) should detect if it corresponds to its orig and dest", function(test) {
  var v0 = new vertex.Vertex(1, 0, 0),
      v1 = new vertex.Vertex(0, 2, 0),
      v2 = new vertex.Vertex(0, 0, 3),
      face = {verts: [v0, v1, v2]},
      he = new hEdge.HEdge(v0, v1, face),
      w0 = new vertex.Vertex(1, 0, 0),
      w1 = new vertex.Vertex(0, 2, 0),
      w2 = new vertex.Vertex(1, 2, 3);

  test.ok(he.isEqual(w0, w1));
  test.ok(he.isEqual(w1, w0));
  test.notOk(he.isEqual(w0, w2));
  test.notOk(he.isEqual(w2, w0));
  test.end();
});

