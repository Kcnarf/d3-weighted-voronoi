var tape = require("tape"),
    vector = require("../build/vector");

tape("Vector(...) should set the expected defaults", function(test) {
  var v = new vector.Vector(1, 2, 3);

  test.equal(v.x, 1);
  test.equal(v.y, 2);
  test.equal(v.z, 3);
  test.end();
});

tape("Vector.negate(...) should negate", function(test) {
  var v = new vector.Vector(1, 2, 3);

  v.negate();
  test.equal(v.x, -1);
  test.equal(v.y, -2);
  test.equal(v.z, -3);
  test.end();
});

tape("Vector.normalize(...) should normalize", function(test) {
  var v = new vector.Vector(1, 2, 3)
      length = Math.sqrt(14);

  v.normalize();
  test.equal(v.x, 1/length);
  test.equal(v.y, 2/length);
  test.equal(v.z, 3/length);
  test.end();
});