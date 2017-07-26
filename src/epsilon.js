export var epsilon = 1E-10;

export function epsilonesque(n) {
  return n >= -epsilon && n <= epsilon;
}