var tape = require("tape"),
    plane3D = require("../build/plane3D");

tape("Plane3D(...) creation", function(test) {
  var v0 = {x: 1, y: 0, z: 0},
      v1 = {x: 0, y: 2, z: 0},
      v2 = {x: 0, y: 0, z: 3},
      face = {verts: [v0, v1, v2]},
      plane = new plane3D.Plane3D(face);

  test.equal(plane.a, 6);
  test.equal(plane.b, 3);
  test.equal(plane.c, 2);
  test.equal(plane.d, -6);
  test.end();
});

tape("Plane3D.getNormZPlane()", function(test) {
  var v0 = {x: 1, y: 0, z: 0},
      v1 = {x: 0, y: 2, z: 0},
      v2 = {x: 0, y: 0, z: 3},
      face = {verts: [v0, v1, v2]},
      normZPlane = new plane3D.Plane3D(face).getNormZPlane() ;

  test.equal(normZPlane[0], -3);
  test.equal(normZPlane[1], -1.5);
  test.equal(normZPlane[2], 3);
  test.end();
});

tape("Plane3D.getDualPointMappedToPlane() should set the expected defaults", function(test) {
  var v0 = {x: 1, y: 0, z: 0},
      v1 = {x: 0, y: 2, z: 0},
      v2 = {x: 0, y: 0, z: 3},
      face = {verts: [v0, v1, v2]},
      normZPlane = new plane3D.Plane3D(face).getDualPointMappedToPlane() ;

  test.equal(normZPlane.x, -1.5);
  test.equal(normZPlane.y, -0.75);
  test.end();
});