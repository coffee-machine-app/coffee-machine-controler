<template>
  <safe-area-view class="container">
    <view class="header">
      <text class="title">Coffee maker</text>
    </view>
    <view class="body">
      <text class="primary-text">What kind of coffee do you want ?</text>
      <touchable-opacity class="button-container"
        :on-press="makeShortCoffee"
        accessibility-label="Create a short coffee">
            <text class="button-text">Short coffee</text>
    </touchable-opacity>
    <touchable-opacity class="button-container"
        :on-press="makeLongCoffee"
        accessibility-label="Create a long coffee">
            <text class="button-text">Long coffee</text>
    </touchable-opacity>
    </view>
  </safe-area-view>
</template>

<style>
.container {
  flex: 1;
}
.title {
  font-size: 30;
  margin: 5;
  align-items: center;
  text-align: center;
}
.body {
  align-items: center;
  justify-content: center;
  flex: 1;
}
.button-container {
  background-color: rgba(0, 162, 255, 0.555);
  border-radius: 10;
  padding: 15px;
  margin : 5px;
  width:90%;
}
.button-text {
  font-size: 15px;
  text-align: center;
}
.primary-text {
  font-size: 17px;
  text-align: center;
}
</style>

<script>
import { sendCommand } from "./firebase/commands";

export default {
  methods: {
    makeShortCoffee: async function() {
      console.log("short")
      var command = await sendCommand("short");
    },
    makeLongCoffee: async function() {
      console.log("long")
      var command = await sendCommand("long");
    },
  }
}
</script>