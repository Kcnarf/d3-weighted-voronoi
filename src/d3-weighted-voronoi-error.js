export default function d3WeightedVoronoiError(message) {
  this.message = message;
}

d3WeightedVoronoiError.prototype = new Error();
