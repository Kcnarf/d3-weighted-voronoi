var tape = require("tape"),
    utils = require("../build/utils")
    vertex = require("../build/vertex");

tape("Vertex(...) should set the expected defaults", function(test) {
  var v = new vertex.Vertex(1, 2, null, null, undefined, null);

  test.equal(v.x, 1);
  test.equal(v.y, 2);
  test.equal(v.weight, utils.epsilon);
  test.equal(v.z, 4.9999999999);
  test.equal(v.index, 0);
  test.equal(v.isDummy, false);
  test.equal(v.neighbours, null);
  test.equal(v.nonClippedPolygon, null);
  test.equal(v.polygon, null);
  test.equal(v.originalObject, null);
  test.end();
});

tape("Vertex(...) should handle weight", function(test) {
  var v = new vertex.Vertex(1, 2, null, 0, undefined, null);

  test.equal(v.weight, 0);
  test.equal(v.z, 5);

  v = new vertex.Vertex(1, 2, null, 5, undefined, null);
  test.equal(v.weight, 5);
  test.equal(v.z, 0);

  test.end();
});

tape("Vertex(...) should handle z", function(test) {
  var v = new vertex.Vertex(1, 2, 3, null, undefined, null);

  test.equal(v.weight, utils.epsilon);
  test.equal(v.z, 3);

  // z prevails weight
  v = new vertex.Vertex(1, 2, 3, 5, undefined, null);
  test.equal(v.weight, 5);
  test.equal(v.z, 3);

  test.end();
});

tape("Vertex(...) should handle originalObject", function(test) {
  var datum = {foo: "bar"}
      v = new vertex.Vertex(1, 2, null, null, datum, null);

  test.equal(v.originalObject, datum);
  test.end();
});

tape("Vertex(...) should handle dummy", function(test) {
  var v = new vertex.Vertex(1, 2, null, null, undefined, true);

  test.equal(v.isDummy, true);
  test.end();
});

tape("Vertex.projectZ(...) should compute expected projection", function(test) {
  var v = new vertex.Vertex(1, 2, null, null, undefined, null)
      projected = v.projectZ(3, 5, 7);

  test.equal(projected, 27);
  test.end();
});

tape("Vertex.setWeight(...) should recompute weight and z", function(test) {
  var v = new vertex.Vertex(1, 2, null, null, undefined, null)
  
  v.setWeight(5);
  test.equal(v.weight, 5);
  test.equal(v.z, 0);
  test.end();
});

tape("Vertex.substract(...) should return expected Vertex", function(test) {
  var v0 = new vertex.Vertex(1, 2, 3, null, undefined, null),
      v1 = new vertex.Vertex(5, 7, 11, null, undefined, null),
      subtracted = v0.subtract(v1);
  
  test.equal(subtracted.x, 4);
  test.equal(subtracted.y, 5);
  test.equal(subtracted.z, 8);
  test.end();
});

tape("Vertex.crossproduct(...) should return expected Vertex", function(test) {
  var v0 = new vertex.Vertex(1, 2, 3, null, undefined, null),
      v1 = new vertex.Vertex(5, 7, 11, null, undefined, null),
      crossed = v0.crossproduct(v1);
  
  test.equal(crossed.x, 1);
  test.equal(crossed.y, 4);
  test.equal(crossed.z, -3);
  test.end();
});

tape("Vertex.equals(...) should detect if it corresponds to its x, y and z", function(test) {
  var v0 = new vertex.Vertex(1, 2, 3, null, undefined, null),
      v1 = new vertex.Vertex(1, 2, 3, null, undefined, null),
      v2 = new vertex.Vertex(1, 2, 4, null, undefined, null);
  
  test.ok(v0.equals(v1));
  test.notOk(v0.equals(v2));
  test.end();
});

