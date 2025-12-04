<!------------------------------------------------------
Copyright (c) 2024 Yuxuan Zhang, robotics@z-yx.cc
This source code is licensed under the MIT license.
You may find the full license in project root directory.
--------------------------------------------------------
TODO: Add description for this file
------------------------------------------------------->

<script setup lang="ts">
import robot from "./robot.ts";
import Gamepad from "./Gamepad.vue";
import AttitudeInstrument from "./Instruments/Attitude.vue";
import HeadingInstrument from "./Instruments/Heading.vue";
</script>

<template>
  <div class="col-layout grid-view">
    <div id="header">
      <div><span class="logo">RoverMaster</span> &nbsp; Mission Control</div>
      <div style="flex-grow: 1"><!-- SPACER --></div>
      <div v-if="robot.state.connected && robot.state.halted" class="badge red">
        HALTED
      </div>
      <div class="badge" :class="[robot.state.connected ? 'green' : 'red']">
        {{ robot.state.connected ? "CONNECTED" : "DISCONNECTED" }}
      </div>
      <div class="badge">DISARMED</div>
    </div>
    <div class="row-layout grid-view" style="height: 50%">
      <AttitudeInstrument />
      <HeadingInstrument />
    </div>
    <div class="row-layout grid-view" style="height: 50%">
      <Gamepad />
      <div style="width: 50%">
        <h1 style="color: gray">D</h1>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  padding: 1px;
  margin: 0;
  display: flex;
  min-height: none;
}

#header {
  display: flex;
  min-height: 3.6rem;
  flex-grow: 0;
  background-color: #012;
  color: #ccc;
  font-size: 1.5em;
  justify-content: flex-start;
  padding: 0 1em;
  font-weight: bold;
  border: none;

  .logo {
    font-style: italic;
    background: -webkit-linear-gradient(
      45deg,
      hsl(220, 100%, 60%),
      hsl(120, 100%, 80%)
    );
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .badge {
    font-size: 0.8rem;
    font-weight: bolder;
    padding: 0.3em 0.6em;
    border-radius: 0.5em;
    color: #fff;
    background-color: #444;
    margin-left: 1em;

    &.red {
      background-color: #600;
    }

    &.green {
      background-color: #060;
    }

    &.blue {
      background-color: #048;
    }
  }
}

.grid-view > div {
  border: 1px solid #333;
}

.col-layout > div,
.row-layout > div {
  margin: -1px;
  min-width: 10vw;
  min-height: 10vh;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.col-layout,
.row-layout {
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
}

.col-layout {
  flex-direction: column;
  height: 100%;

  & > * {
    width: 100%;
  }
}

.row-layout {
  flex-direction: row;
  width: 100%;

  & > * {
    height: 100%;
  }
}
</style>
./Gamepad.vue/index.ts
