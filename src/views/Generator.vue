<template>
  <div class="wrap">
    <div class="options">
      <select v-model="selectedGenerator">
        <option v-for="key in Object.keys(generators)" :key="key">{{ key }}</option>
      </select>
      <button @click="generate">Generate</button>
    </div>
    <div class="canvas-container">
      <canvas ref="canvas" id="canvas">

      </canvas>
    </div>
  </div>
</template>


<script setup>
import Painter from "../utils/painter"
import { reactive, ref, onMounted, watch } from 'vue'
import generators from "../generators";
import { sleep } from "../utils/util";

const canvas = ref(null);
const selectedGenerator = ref("")
let painter, options;


async function generate() {
  painter.reset();

  const generator = new generators[selectedGenerator.value]();
  generator.setup(painter, options)

  if (generator.isIterable()) {
    for (let i = 0; i < 30000; i++) {
      let time = Date.now() + 10;
      while (Date.now() < time) {
        generator.paint(painter, options);
        ++i;
      }
      await sleep(0);
    }
  } else {
    generator.paint(painter, options);
  }

}

onMounted(() => {
  painter = new Painter(canvas.value, window.innerWidth, window.innerHeight);
})


</script>

<style scoped>
.options {
  position: absolute;
  left: 5px;
  top: 5px;
  background-color: #003;
  border: 2px solid black;
  border-radius: 2;
  padding: 10px;
  box-shadow: 2px 2px 4px #000;
}

.wrap {
  width: 100%;
  height: 100%;
}

.canvas-container,
#canvas {
  width: 100%;
  height: 100%;
}
</style>