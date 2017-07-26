export var epsilon = 1E-10;

export function epsilonesque(n) {
  return n <= epsilon && n >= -epsilon;
}

// IN: vectors or vertices
// OUT: dot product
export function dot (v1, v2) {
  return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z); 
}

// IN: two vertex objects, p1 and p2
// OUT: true if they are linearly dependent, false otherwise
export function linearDependent (p1, p2) {
  if (p1.x == 0 && p2.x == 0) {
    if (p1.y == 0 && p2.y == 0) {
      if (p1.z == 0 && p2.z == 0) {
        return true;
      }
      if (p1.z == 0 || p2.z == 0) {
        return false;
      }
      return true;
    }
    if (p1.y == 0 || p2.y == 0) {
      return false;
    }
    if (epsilonesque(p1.z/p1.y - p2.z/p2.y)) {
      return true;
    } else {
      return false;
    }
  }
  if (p1.x == 0 || p2.x == 0) {
    return false;
  }
  if (epsilonesque(p1.y/p1.x - p2.y/p2.x) && epsilonesque(p1.z/p1.x - p2.y/p2.x)) {
    return true;
  } else {
    return false;
  }
}