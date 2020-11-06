// from https://stackoverflow.com/questions/1382107/whats-a-good-way-to-extend-error-in-javascript
// (above link provided by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

export default function d3WeightedVoronoiError(message) {
  this.message = message;
  this.stack = new Error().stack;
}

d3WeightedVoronoiError.prototype.name = 'd3WeightedVoronoiError';
d3WeightedVoronoiError.prototype = new Error();
