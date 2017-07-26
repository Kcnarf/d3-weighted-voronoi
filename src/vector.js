// Vector

// IN: coordinates x, y, z
export function Vector (x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

Vector.prototype.negate = function() {
  this.x *= -1;
  this.y *= -1;
  this.z *= -1;
}

// Normalizes X Y and Z in-place
Vector.prototype.normalize = function() {
  var len = Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z));
  if (len > 0) {
    this.x /= len;
    this.y /= len;
    this.z /= len;
  }
}