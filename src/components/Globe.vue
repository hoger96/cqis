<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import createGlobe from 'cobe';

const globeContainer = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (globeContainer.value) {
    const canvas = document.createElement('canvas');
    globeContainer.value.appendChild(canvas);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 600,
      height: 600,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [0.3, 0.3, 0.3],
      markers: [
        // 예시 마커
        { location: [37.7749, -122.4194], size: 0.03 }, // 샌프란시스코
        { location: [40.7128, -74.0060], size: 0.05 }  // 뉴욕
      ],
      onRender: (state) => {
        // 애니메이션 효과를 위해 state 업데이트
        state.phi += 0.01;
      }
    });
  }
});

</script>
<template>
  <div ref="globeContainer" class="globe-container"></div>
</template>

<style scoped>
.globe-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
}
</style>