interface _Vector2D {
  x: number;
  y: number;
}

interface _Vector3D extends _Vector2D {
  z: number;
}

function calcLen(vec: _Vector2D) {
  return (vec.x ** 2 + vec.y ** 2) ** 0.5;
}

function _normalize(vec: _Vector3D) {
  const len = calcLen(vec);
  return {
    x: vec.x / len,
    y: vec.y / len,
    z: vec.z / len
  };
}

const vec2d = {x: 1.8, y: 0.34};
const vec3d = {x: 1.8, y: 0.34, z: -0.24};

console.log(calcLen(vec2d));
console.log(calcLen(vec3d)); // types are not closed, therefore it's possible to call calcLen on vec3d
console.log(_normalize(vec3d));

/* Nominal Typing Using Interfaces*/

interface Vector2D {
  _brand: '2d';
  x: number;
  y: number;
}

interface Vector3D {
  _brand: '3d';
  x: number;
  y: number;
  z: number;
}

function vec2D(x: number, y: number): Vector2D {
  return {x, y} as Vector2D;
}

function vec3D(x: number, y: number, z: number): Vector3D {
  return {x, y, z} as Vector3D
}

const v2d = vec2D(1.8, 0.34);
const v3d = vec3D(1.8, 0.34, -0.24);

function normalize(vec: Vector3D) {
  const len = calcLen(vec); // TS2345: Argument of type 'Vector3D' is not assignable to parameter of type 'Vector2D'.
  return {
    x: vec.x / len,
    y: vec.y / len,
    z: vec.z / len
  };
}

console.log(calcLen(v2d));
console.log(calcLen(v3d)); // TS2345: Argument of type 'Vector3D' is not assignable to parameter of type 'Vector2D'.
console.log(normalize(v3d));

/* Nominal Typing Using enums */

// Two enums are not equal if they differ by name.
enum DatabaseIdBrand {_ = ""};
enum UserIdBrand {_ = ""};
// _ = "" forces typescript to infer that these are string-based enums, with values of type 'string', and not enums with values of type 'number'.
type DatabaseId = string & DatabaseIdBrand;
type UserId = string & UserIdBrand;

function getUserInfo(id: UserId): unknown {
  return {};
}

const dbId = 'ae89cb9d0e9d73c23' as DatabaseId;

// @ts-expect-error - Argument of type '"DatabaseIdBrand"' is not assignable to parameter of type 'UserIdBrand'.
getUserInfo(dbId);
