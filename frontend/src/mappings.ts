/* ---------------------------------------------------------
 * Copyright (c) 2024 Yuxuan Zhang, robotics@z-yx.cc
 * This source code is licensed under the MIT license.
 * You may find the full license in project root directory.
 * ---------------------------------------------------------
 * Mappings
 * 1. from gamepad channels to robot commands
 * 2. from incoming topic to robot states
 * ------------------------------------------------------ */

import { Quaternion, quaternionToEuler } from "./quaternion.ts";
import { Vector3D, Twist, type RobotState } from "./robot.ts";
import { degrees } from "./util.ts";

type Stick = { x: number; y: number };

export function gamepadToRobotTopic(
  lStick: Stick,
  rStick: Stick,
  buttons: number[],
  _: Gamepad, // reserved for checking gamepad type
): [string, any][] {
  const topics: [string, any][] = [];
  // Base velocity
  topics.push([
    "vel/set",
    new Twist({
      linear: new Vector3D({
        x: -lStick.y,
        y: -lStick.x,
      }),
      angular: new Vector3D({
        z: -rStick.x,
        y: -rStick.y, // Tilt control, may not be available
      }),
    }),
  ]);
  return topics;
}

type RobotStateUpdater = (data: any, state: RobotState) => void;

export const topicToRobotSatates: Record<string, RobotStateUpdater> = {
  ["imu"](data, state) {
    const attitude = quaternionToEuler(data.orientation as Quaternion);
    // state.attitude.angular.x = degrees(attitude.roll);
    state.attitude.angular.y = -degrees(attitude.pitch);
    state.attitude.angular.z = degrees(attitude.yaw);
  },
  ["halt"](data, state) {
    state.halted = !!data.data;
  },
  // ["info"](data, state) {},
};
