/* ---------------------------------------------------------
 * Copyright (c) 2024 Yuxuan Zhang, robotics@z-yx.cc
 * This source code is licensed under the MIT license.
 * You may find the full license in project root directory.
 * ------------------------------------------------------ */

export interface DeferredPromise<T = void> {
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
}

export function deferPromise<T>(): DeferredPromise<T> & {
  promise: Promise<T>;
} {
  let resolve!: DeferredPromise<T>["resolve"],
    reject!: DeferredPromise<T>["reject"];
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    resolve,
    reject,
    promise,
  };
}

export function degrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

export function radians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
