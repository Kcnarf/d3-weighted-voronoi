var tape = require("tape"),
    d3WeightedVoronoi = require('../build/d3-weighted-voronoi');

tape("weightedVoronoi(...) creation with defaults", function(test) {
  var weightedVoronoi = d3WeightedVoronoi.weightedVoronoi(),
      datum = {x: 1, y: 2, weight: 3};

  test.equal(weightedVoronoi.x()(datum), 1);
  test.equal(weightedVoronoi.y()(datum), 2);
  test.equal(weightedVoronoi.weight()(datum), 3);
  test.deepEqual(weightedVoronoi.clip(), [[0,0], [0,1], [1,1], [1,0]]);
  test.end();
});

tape("weightedVoronoi.x(...)", function(test) {
  var weightedVoronoi = d3WeightedVoronoi.weightedVoronoi(),
      datum = {xPrime: 1, y: 2, weight: 3};

  test.equal(weightedVoronoi.x(function(d){ return d.xPrime; }), weightedVoronoi);
  test.equal(weightedVoronoi.x()(datum), 1);
  test.end();
});

tape("weightedVoronoi.y(...)", function(test) {
  var weightedVoronoi = d3WeightedVoronoi.weightedVoronoi(),
      datum = {x: 1, yPrime: 2, weight: 3};

  test.equal(weightedVoronoi.y(function(d){ return d.yPrime; }), weightedVoronoi);
  test.equal(weightedVoronoi.y()(datum), 2);
  test.end();
});

tape("weightedVoronoi.weight(...)", function(test) {
  var weightedVoronoi = d3WeightedVoronoi.weightedVoronoi(),
      datum = {xPrime: 1, y: 2, weightPrime: 3};

  test.equal(weightedVoronoi.weight(function(d){ return d.weightPrime; }), weightedVoronoi);
  test.equal(weightedVoronoi.weight()(datum), 3);
  test.end();
});

tape("weightedVoronoi.clip(...)", function(test) {
  var weightedVoronoi = d3WeightedVoronoi.weightedVoronoi(),
      newClip = [[0,1], [-1,0], [1,0]];

  test.equal(weightedVoronoi.clip(newClip), weightedVoronoi);
  test.deepEqual(weightedVoronoi.clip(), [[0,1], [-1,0], [1,0]]);
  test.end();
});