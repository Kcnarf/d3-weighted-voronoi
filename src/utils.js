export var epsilon = 1E-10;

export function epsilonesque(n) {
  return n <= epsilon && n >= -epsilon;
}

// IN: vectors or vertices
// OUT: dot product
export function dot (v0, v1) {
  return (v0.x * v1.x) + (v0.y * v1.y) + (v0.z * v1.z); 
}

// IN: two vertex objects, p0 and p1
// OUT: true if they are linearly dependent, false otherwise
export function linearDependent (p0, p1) {
  if (p0.x == 0 && p1.x == 0) {
    if (p0.y == 0 && p1.y == 0) {
      if (p0.z == 0 && p1.z == 0) {
        return true;
      }
      if (p0.z == 0 || p1.z == 0) {
        return false;
      }
      return true;
    }
    if (p0.y == 0 || p1.y == 0) {
      return false;
    }
    if (epsilonesque(p0.z/p0.y - p1.z/p1.y)) {
      return true;
    } else {
      return false;
    }
  }
  if (p0.x == 0 || p1.x == 0) {
    return false;
  }
  if (epsilonesque(p0.y/p0.x - p1.y/p1.x) && epsilonesque(p0.z/p0.x - p1.z/p1.x)) {
    return true;
  } else {
    return false;
  }
}