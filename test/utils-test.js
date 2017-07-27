var tape = require("tape"),
    utils = require("../build/utils");

tape("linearDependent of zeroes", function(test) {
  var p0 = {x: 0, y: 0, z: 0},
      p1 = {x: 0, y: 0, z: 0};
  test.ok(utils.linearDependent(p0,p1));
  test.end();
});

tape("linearDependent with y=0 and z=0", function(test) {
  var p0 = {x: 0, y: 0, z: 0},
      p1 = {x: 1, y: 0, z: 0},
      p2 = {x: 2, y: 0, z: 0};
  test.notOk(utils.linearDependent(p0,p1));
  test.notOk(utils.linearDependent(p1,p0));
  test.ok(utils.linearDependent(p1,p2));
  test.end();
});

tape("linearDependent with x=0 and z=0", function(test) {
  var p0 = {x: 0, y: 0, z: 0},
      p1 = {x: 0, y: 1, z: 0},
      p2 = {x: 0, y: 2, z: 0};
  test.notOk(utils.linearDependent(p0,p1));
  test.notOk(utils.linearDependent(p1,p0));
  test.ok(utils.linearDependent(p1,p2));
  test.end();
});

tape("linearDependent with x=0 and y=0", function(test) {
  var p0 = {x: 0, y: 0, z: 0},
      p1 = {x: 0, y: 0, z: 1},
      p2 = {x: 0, y: 0, z: 2};
  test.notOk(utils.linearDependent(p0,p1));
  test.notOk(utils.linearDependent(p1,p0));
  test.ok(utils.linearDependent(p1,p2));
  test.end();
});

tape("linearDependent with z=0", function(test) {
  var p0 = {x: 0, y: 0, z: 0},
      p1 = {x: 1, y: 2, z: 0},
      p2 = {x: 2, y: 1, z: 0},
      p3 = {x: 2, y: 4, z: 0};
  test.notOk(utils.linearDependent(p0,p1));
  test.notOk(utils.linearDependent(p1,p0));
  test.notOk(utils.linearDependent(p1,p2));
  test.ok(utils.linearDependent(p1,p3));
  test.end();
});

tape("linearDependent with y=0", function(test) {
  var p0 = {x: 0, y: 0, z: 0},
      p1 = {x: 1, y: 0, z: 2},
      p2 = {x: 2, y: 0, z: 1},
      p3 = {x: 2, y: 0, z: 4};
  test.notOk(utils.linearDependent(p0,p1));
  test.notOk(utils.linearDependent(p1,p0));
  test.notOk(utils.linearDependent(p1,p2));
  test.ok(utils.linearDependent(p1,p3));
  test.end();
});

tape("linearDependent with x=0", function(test) {
  var p0 = {x: 0, y: 0, z: 0},
      p1 = {x: 0, y: 1, z: 2},
      p2 = {x: 0, y: 2, z: 1},
      p3 = {x: 0, y: 2, z: 4};
  test.notOk(utils.linearDependent(p0,p1));
  test.notOk(utils.linearDependent(p1,p0));
  test.notOk(utils.linearDependent(p1,p2));
  test.ok(utils.linearDependent(p1,p3));
  test.end();
});

tape("linearDependent without 0", function(test) {
  var p0 = {x: 0, y: 0, z: 0},
      p1 = {x: 1, y: 2, z: 3},
      p2 = {x: 2, y: 1, z: 3},
      p3 = {x: 2, y: 4, z: 6};
  test.notOk(utils.linearDependent(p0,p1));
  test.notOk(utils.linearDependent(p1,p0));
  test.notOk(utils.linearDependent(p1,p2));
  test.ok(utils.linearDependent(p1,p3));
  test.end();
});