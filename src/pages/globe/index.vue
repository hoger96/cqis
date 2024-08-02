<script setup lang="ts">
import Globe from "globe.gl";
import { ref, onMounted } from "vue";

const globeDiv = ref(null);
const lat = ref(0)
const lng = ref(0)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      handleLoadGlobe()
    })
    .catch((error) => {
      console.error(error)
    })
}

const myGlobe = Globe();
const handleLoadGlobe = () => {
  const markerSvg = `<svg viewBox="-4 0 36 36" />`;

  // Lat: 37.4913 Lon: 127.0165
  /*
  const gData = [...Array(N).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: 7 + Math.random() * 30,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
  }));
  */
  const marker = [
    {
      lat: 37.4913, lng: 127.0165, size: 30, color: 'yellow', image: '/src/assets/다운로드.png'
    },
    {
      lat: 37.7749295, lng: -122.4194155, size: 30, color: 'yellow', image: '/src/assets/미국국기.jpeg'
    },
  ]
  const gData = marker;

  myGlobe(globeDiv.value).globeImageUrl(new URL('/src/assets/3.png', import.meta.url).href).backgroundColor('white')

  myGlobe.htmlElementsData(gData)
    .htmlElement(d => {
      const el = document.createElement('div');
      el.innerHTML = markerSvg;
      el.style.backgroundImage = `url(${d.image})`
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.backgroundPosition = 'center'
      el.style.borderRadius = '50%'
      el.style.color = d.color;
      el.style.width = `${d.size}px`;
      el.style['pointer-events'] = 'auto';
      el.style.cursor = 'pointer';
      el.onclick = () => {
        lat.value = d.lat;
        lng.value = d.lng;
        let altitude = 2.5;
        myGlobe.pointOfView({ lat, lng, altitude });
        myGlobe.controls().autoRotate = false;
        ElMessageBox.alert(`Lat: ${lat.value}, Lng: ${lng.value}`, 'Location', {
          // if you want to disable its autofocus
          // autofocus: false,
          confirmButtonText: 'OK',
          callback: () => {
            handleLoadGlobe()
          },
        })
      }
      return el;
    });

  myGlobe.controls().autoRotate = true;
  myGlobe.controls().autoRotateSpeed = 1.0;
}

const handleStopGlobe = () => {
  myGlobe.controls().autoRotate = false;
}
const handleActiveGlobe = () => {
  myGlobe.controls().autoRotate = true;
  myGlobe.controls().autoRotateSpeed = 1.0;
}

onMounted(() => {
  handleLoadGlobe()
});
</script>

<template>
  <div class="flex">
    <button type="button" class="btn__primary-line--md" @click="handleStopGlobe">
      지구본 멈추기
    </button>
    <button type="button" class="btn__primary-line--md" @click="handleActiveGlobe">
      지구본 돌기
    </button>
  </div>
  <div class="globe-wrapper">
    <div ref="globeDiv"></div>
  </div>
</template>

<style>
.globe-wrapper {
  width: 95%;
  height: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>