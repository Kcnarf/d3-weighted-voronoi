export var epsilon = 1E-10;

export function epsilonesque(n) {
  return n <= epsilon && n >= -epsilon;
}

// IN: vectors or vertices
// OUT: dot product
export function dot (v0, v1) {
  return (v0.x * v1.x) + (v0.y * v1.y) + (v0.z * v1.z); 
}

// IN: two vertex objects, v0 and v1
// OUT: true if they are linearly dependent, false otherwise
// from https://math.stackexchange.com/questions/1144357/how-can-i-prove-that-two-vectors-in-%E2%84%9D3-are-linearly-independent-iff-their-cro
export function linearDependent (v0, v1) {
  return epsilonesque(v0.x*v1.y - v0.y*v1.x) && epsilonesque(v0.y*v1.z - v0.z*v1.y) && epsilonesque(v0.z*v1.x - v0.x*v1.z);
}