<script setup lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import createGlobe from 'cobe';
import { ElMessageBox } from 'element-plus'
const buttonsContainerRef = ref();
const dialogVisible = ref(false)
const canvasRef = ref();
const phi = ref(0);
const focusRef = ref([0, 0])
const pointerInteracting = ref(null);
const pointerInteractionMovement = ref(0);
const currentPhi = ref(0)
const currentTheta = ref(0)
const doublePi = ref(Math.PI * 2)

const locationToAngles = (lat, long) => {
  return [Math.PI - ((long * Math.PI) / 180 - Math.PI / 2), (lat * Math.PI) / 180]
}

const onResize = () => {
  if (canvasRef.value) {
    const width = canvasRef.value.offsetWidth;
    canvasRef.value.width = width * 2;
    canvasRef.value.height = width * 2;
  }
};

const onPointerDown = (e: PointerEvent) => {
  pointerInteracting.value = e.clientX - pointerInteractionMovement.value;
  if (canvasRef.value) {
    canvasRef.value.style.cursor = 'grabbing';
  }
};

const onPointerUp = () => {
  pointerInteracting.value = null;
  if (canvasRef.value) {
    canvasRef.value.style.cursor = 'grab';
  } 이
};

const onMouseMove = (e: MouseEvent) => {
  if (pointerInteracting.value !== null) {
    const delta = e.clientX - pointerInteracting.value;
    pointerInteractionMovement.value = delta;
    set(delta / 200);
  }
};

const onPointerOut = () => {
  pointerInteracting.value = null;
  if (canvasRef.value) {
    canvasRef.value.style.cursor = 'grab';
  }
};

const onTouchMove = (e: TouchEvent) => {
  if (pointerInteracting.value !== null && e.touches[0]) {
    const delta = e.touches[0].clientX - pointerInteracting.value;
    pointerInteractionMovement.value = delta;
    set(delta / 100);
  }
};

const handleGoLocation = (x: number, y: number) => {
  focusRef.value = locationToAngles(x, y)
  createButtonAtLocation(x, y);
}

const markers = [
  { id: 1, location: [37.78, -122.412], size: 0.1, name: 'San Francisco' },
  { id: 2, location: [52.52, 13.405], size: 0.1, name: 'Berlin' },
  { id: 3, location: [35.676, 139.65], size: 0.1, name: 'Tokyo' },
  { id: 4, location: [-34.60, -58.38], size: 0.1, name: 'Buenos Aires' },
];

const createButtonAtLocation = (lat, long) => {
  const button = document.createElement('button');
  button.innerText = `📍 ${lat}, ${long}`;
  button.style.position = 'absolute';
  button.style.cursot = 'pointer'

  // const [phi, theta] = locationToAngles(lat, long);
  // const x = (0.5 + 0.5 * Math.sin(phi) * Math.cos(theta)) * canvasRef.value.width;
  // const y = (0.5 - 0.5 * Math.sin(theta)) * canvasRef.value.height;
  // console.log('x: ', x, 'y: ', y)
  button.style.left = '142px';
  button.style.top = '142px';

  button.onclick = () => {
    ElMessageBox.alert(`Location: ${lat}, ${long}`, 'Button Clicked');
  };

  buttonsContainerRef.value.appendChild(button);
};


onMounted(() => {
  const globe = createGlobe(canvasRef.value, {
    devicePixelRatio: 2,
    width: 300 * 2,
    height: 300 * 2,
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 1],
    glowColor: [1, 1, 1],
    markers: markers,
    onRender: (state) => {
      state.phi = currentPhi.value
      state.theta = currentTheta.value
      const [focusPhi, focusTheta] = focusRef.value
      const distPositive = (focusPhi - currentPhi.value + doublePi.value) % doublePi.value
      const distNegative = (currentPhi.value - focusPhi + doublePi.value) % doublePi.value
      // Control the speed
      if (distPositive < distNegative) {
        currentPhi.value += distPositive * 0.08
      } else {
        currentPhi.value -= distNegative * 0.08
      }
      currentTheta.value = currentTheta.value * 0.92 + focusTheta * 0.08
      state.width = 300 * 2
      state.height = 300 * 2
    }
  });
});


// onMounted(() => {
//   const globe = createGlobe(canvasRef.value, {
//     devicePixelRatio: 2,
//     width: 300 * 2,
//     height: 300 * 2,
//     phi: 0,
//     theta: 0,
//     dark: 1,
//     diffuse: 1.2,
//     mapSamples: 16000,
//     mapBrightness: 6,
//     baseColor: [0.3, 0.3, 0.3],
//     markerColor: [0.1, 0.8, 1],
//     glowColor: [1, 1, 1],
//     markers: [
//       // longitude latitude
//       { location: [37.7595, -122.4367], size: 0.03 },
//       { location: [40.7128, -74.006], size: 0.1 },
//     ],
//     onRender: (state) => {
//       // Called on every animation frame.
//       // `state` will be an empty object, return updated params.
//       state.phi = phi.value;
//       phi.value += 0.01;
//     },
//   });
// });
</script>

<template>
  <div class="app">
    <h1>COBE</h1>
    <div ref="buttonsContainerRef" style="position: relative;">
      <canvas :style="{ width: '300px', height: '300px' }" ref="canvasRef"></canvas>
    </div>
    <div className="flex flex-col md:flex-row justify-center items-center control-buttons mr-3">
      <button @click="handleGoLocation(37.78, -122.412)">📍 San Francisco</button>
      <button @click="handleGoLocation(52.52, 13.405)">📍 Berlin</button>
      <button @click="handleGoLocation(35.676, 139.65)">📍 Tokyo</button>
      <button @click="handleGoLocation(-34.60, -58.38)">📍 Buenos Aires</button>
    </div>
  </div>
</template>

<style>
html,
body {
  margin: 0;
  background: black;
  color: white;
  font-family: sans-serif;
  text-align: center;
}

.app {
  display: grid;
  place-items: center;
  place-content: center;
  height: 100vh;
}
</style>
