var tape = require('tape'),
  utils = require('../build/utils');

tape('linearDependent', function(test) {
  test.test('linearDependent of zeroes', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 0, y: 0, z: 0 };
    test.ok(utils.linearDependent(v0, v1));
    test.end();
  });

  test.test('linearDependent with y=0 and z=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 1, y: 0, z: 0 },
      v2 = { x: 2, y: 0, z: 0 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.ok(utils.linearDependent(v1, v2));
    test.end();
  });

  test.test('linearDependent with x=0 and z=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 0, y: 1, z: 0 },
      v2 = { x: 0, y: 2, z: 0 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.ok(utils.linearDependent(v1, v2));
    test.end();
  });

  test.test('linearDependent with x=0 and y=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 0, y: 0, z: 1 },
      v2 = { x: 0, y: 0, z: 2 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.ok(utils.linearDependent(v1, v2));
    test.end();
  });

  test.test('linearDependent with z=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 1, y: 2, z: 0 },
      v2 = { x: 2, y: 1, z: 0 },
      v3 = { x: 2, y: 4, z: 0 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.notOk(utils.linearDependent(v1, v2));
    test.ok(utils.linearDependent(v1, v3));
    test.end();
  });

  test.test('linearDependent with y=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 1, y: 0, z: 2 },
      v2 = { x: 2, y: 0, z: 1 },
      v3 = { x: 2, y: 0, z: 4 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.notOk(utils.linearDependent(v1, v2));
    test.ok(utils.linearDependent(v1, v3));
    test.end();
  });

  test.test('linearDependent with x=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 0, y: 1, z: 2 },
      v2 = { x: 0, y: 2, z: 1 },
      v3 = { x: 0, y: 2, z: 4 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.notOk(utils.linearDependent(v1, v2));
    test.ok(utils.linearDependent(v1, v3));
    test.end();
  });

  test.test('linearDependent without 0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 1, y: 2, z: 3 },
      v2 = { x: 2, y: 1, z: 3 },
      v3 = { x: 2, y: 4, z: 6 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.notOk(utils.linearDependent(v1, v2));
    test.ok(utils.linearDependent(v1, v3));
    test.end();
  });
});

tape('polygonDirection', function(test) {
  triangle = [[1, 1], [0, 0], [2, 0]];
  square = [[0, 0], [1, 0], [1, 1], [0, 1]];
  reversedSquare = square.slice().reverse();
  selfIntersect = [[0, 0], [0, 1], [1, 0], [1, 1]];
  largeCircle = [
    [410, 205],
    [408.87698855049604, 226.42833496986896],
    [405.52025815043015, 247.62189661764066],
    [399.96658584050647, 268.3484838468642],
    [392.27681881673317, 288.381011830539],
    [382.5352077758099, 307.5],
    [370.84848384686427, 325.495976719957],
    [357.3446892228658, 342.17177430356594],
    [342.17177430356594, 357.3446892228658],
    [325.49597671995696, 370.84848384686427],
    [307.5, 382.5352077758099],
    [288.381011830539, 392.27681881673317],
    [268.3484838468642, 399.96658584050647],
    [247.6218966176407, 405.52025815043015],
    [226.428334969869, 408.87698855049604],
    [205.00000000000006, 410],
    [183.5716650301311, 408.87698855049604],
    [162.37810338235943, 405.52025815043015],
    [141.65151615313587, 399.9665858405065],
    [121.61898816946108, 392.2768188167332],
    [102.50000000000011, 382.53520777581],
    [84.5040232800431, 370.84848384686427],
    [67.82822569643412, 357.3446892228659],
    [52.65531077713419, 342.17177430356594],
    [39.15151615313579, 325.495976719957],
    [27.464792224190063, 307.5],
    [17.723181183266803, 288.381011830539],
    [10.033414159493503, 268.34848384686416],
    [4.479741849569848, 247.62189661764057],
    [1.123011449503963, 226.42833496986884],
    [0, 204.99999999999983],
    [1.123011449503963, 183.57166503013084],
    [4.479741849569876, 162.37810338235911],
    [10.033414159493589, 141.65151615313556],
    [17.723181183266945, 121.6189881694607],
    [27.464792224190234, 102.49999999999973],
    [39.15151615313599, 84.50402328004273],
    [52.65531077713442, 67.82822569643378],
    [67.82822569643434, 52.655310777133934],
    [84.50402328004328, 39.15151615313559],
    [102.50000000000024, 27.46479222418995],
    [121.61898816946115, 17.723181183266718],
    [141.65151615313593, 10.033414159493475],
    [162.37810338235943, 4.479741849569848],
    [183.57166503013107, 1.123011449503963],
    [204.99999999999997, 0],
    [226.42833496986887, 1.123011449503963],
    [247.62189661764052, 4.47974184956982],
    [268.34848384686404, 10.033414159493447],
    [288.3810118305388, 17.723181183266718],
    [307.4999999999997, 27.464792224189893],
    [325.4959767199567, 39.15151615313553],
    [342.1717743035656, 52.65531077713385],
    [357.34468922286544, 67.82822569643366],
    [370.84848384686387, 84.50402328004253],
    [382.53520777580957, 102.49999999999943],
    [392.2768188167329, 121.61898816946031],
    [399.96658584050624, 141.65151615313505],
    [405.52025815043, 162.37810338235852],
    [408.8769885504959, 183.57166503013013]
  ];

  test.equal(utils.polygonDirection(triangle), 1);
  test.equal(utils.polygonDirection(square), 1);
  test.equal(utils.polygonDirection(reversedSquare), -1);
  test.equal(utils.polygonDirection(selfIntersect), undefined);
  test.equal(utils.polygonDirection(largeCircle), 1);
  test.end();
});
