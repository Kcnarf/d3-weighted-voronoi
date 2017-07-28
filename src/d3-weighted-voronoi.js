import {extent} from 'd3-array';
import {polygonHull} from 'd3-polygon';
import {epsilon} from './utils';
import {Vertex} from './vertex';
import {computePowerDiagramIntegrated} from './powerDiagram';

export function weightedVoronoi () {
  /////// Inputs ///////
  var x = function (d) { return d.x; };           // accessor to the x value
  var y = function (d) { return d.y; };           // accessor to the y value
  var weight = function (d) { return d.weight; }; // accessor to the weight
  var clip = [[0,0], [0,1], [1,1], [1,0]]         // clipping polygon

  ///////////////////////
  ///////// API /////////
  ///////////////////////

  function _weightedVoronoi (data) {
    var formatedSites;

    //begin: map sites to the expected format of PowerDiagram
    formatedSites = data.map(function(d) {
      return new Vertex(x(d), y(d), null, weight(d), d, false);
    })
    //end: map sites to the expected format of PowerDiagram

    return computePowerDiagramIntegrated(formatedSites, boundingSites(), clip);
  }

  _weightedVoronoi.x = function (_) {
    if (!arguments.length) { return x; }
    x = _;

    return _weightedVoronoi;
  };

  _weightedVoronoi.y = function (_) {
    if (!arguments.length) { return y; }
    y = _;

    return _weightedVoronoi;
  };

  _weightedVoronoi.weight = function (_) {
    if (!arguments.length) { return weight; }
    weight = _;

    return _weightedVoronoi;
  };

  _weightedVoronoi.clip = function (_) {
    if (!arguments.length) { return clip; }
    clip = polygonHull(_); // ensure clip to be a convex, hole-free, counterclockwise polygon

    return _weightedVoronoi;
  };

  ///////////////////////
  /////// Private ///////
  ///////////////////////

  function boundingSites () {
    var xExtent, yExtent,
        minX, maxX, minY, maxY,
        x0, x1, y0, y1,
        boundingData = [], boundingSites = [];

    xExtent = extent(clip.map(function(c){ return c[0]; }));
    yExtent = extent(clip.map(function(c){ return c[1]; }));
    
    minX = xExtent[0];
    maxX = xExtent[1];
    minY = yExtent[0];
    maxY = yExtent[1];
    x0 = minX - maxX;
    x1 = 2 * maxX;
    y0 = minY - maxY;
    y1 = 2 * maxY;

    // MUST be counterclockwise
    // if not, may produce 'TypeError: Cannot set property 'twin' of null' during computation
    // don't know how to test as it is not exposed
    boundingData[0] = [x0, y0];
    boundingData[1] = [x0, y1];
    boundingData[2] = [x1, y1];
    boundingData[3] = [x1, y0];
    
    for (var i = 0; i < 4; i++){
      boundingSites.push( new Vertex(boundingData[i][0], boundingData[i][1], null, epsilon, new Vertex(boundingData[i][0], boundingData[i][1], null, epsilon, null, true), true));
    }

    return boundingSites;
  }

  return _weightedVoronoi;
}