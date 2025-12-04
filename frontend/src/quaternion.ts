export type Quaternion = {
  x: number;
  y: number;
  z: number;
  w: number;
};

export function quaternionToEuler(q: Quaternion): {
  roll: number;
  pitch: number;
  yaw: number;
} {
  const ysqr = q.y * q.y;

  // roll (x-axis rotation)
  const t0 = +2.0 * (q.w * q.x + q.y * q.z);
  const t1 = +1.0 - 2.0 * (q.x * q.x + ysqr);
  const roll = Math.atan2(t0, t1);

  // pitch (y-axis rotation)
  let t2 = +2.0 * (q.w * q.y - q.z * q.x);
  t2 = t2 > +1.0 ? +1.0 : t2;
  t2 = t2 < -1.0 ? -1.0 : t2;
  const pitch = Math.asin(t2);

  // yaw (z-axis rotation)
  const t3 = +2.0 * (q.w * q.z + q.x * q.y);
  const t4 = +1.0 - 2.0 * (ysqr + q.z * q.z);
  const yaw = Math.atan2(t3, t4);

  return { roll, pitch, yaw };
}
