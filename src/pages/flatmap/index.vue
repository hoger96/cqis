<script setup lang="ts">
import { ref, onMounted } from 'vue'
import maplibregl, { Map, Marker, getZoom } from 'maplibre-gl'

interface GeoJsonFeature {
  type: 'Feature'
  properties: {
    message: string
    iconSize: number[]
  }
  geometry: {
    type: 'Point'
    coordinates: number[]
  }
}

const geojson: { type: 'FeatureCollection'; features: GeoJsonFeature[] } = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        message: 'Foo',
        iconSize: [30, 30],
        image: '/src/assets/짱구.svg'
      },
      geometry: {
        type: 'Point',
        coordinates: [12.550343, 55.665957],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Bar',
        iconSize: [30, 30],
        image: '/src/assets/짱구.svg'
      },
      geometry: {
        type: 'Point',
        coordinates: [-61.2158203125, -15.97189158092897],
      },
    },
    {
      type: 'Feature',
      properties: {
        message: 'Baz',
        iconSize: [30, 30],
        image: '/src/assets/미국국기.jpeg'
      },
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776],
      },
    },
  ],
}

const mapContainer = ref<HTMLElement | null>(null)
const markers = ref<[]>([])

// const createMarkers = (data) => {
//   console.log('ddd')
//   data.forEach((feature) => {
//     const el = document.createElement('div')
//     el.className = 'marker'
//     el.style.backgroundImage = `url(${feature.properties.image})`
//     el.style.backgroundColor = 'red'
//     el.style.backgroundSize = 'contain';
//     el.style.backgroundRepeat = 'no-repeat';
//     el.style.backgroundPosition = 'cover'
//     el.style.borderRadius = '50%'
//     el.style['pointer-events'] = 'auto';
//     el.style.cursor = 'pointer';
//     el.style.width = `${feature.properties.iconSize[0]}px`
//     el.style.height = `${feature.properties.iconSize[1]}px`

//     el.addEventListener('click', () => {
//       window.alert(feature.properties.message)
//     })

//     return new Marker({ element: el })
//       .setLngLat(feature.geometry.coordinates)
//       .addTo(map)
//   })
// }

const createMarkers = (data, zoomLabel) => {
  const markers = data.map((feature) => {
    const el = document.createElement('div')
    el.className = 'marker'
    el.style.backgroundImage = `url(${feature.properties.image})`
    el.style.backgroundColor = 'red'
    el.style.backgroundSize = 'contain';
    el.style.backgroundRepeat = 'no-repeat';
    el.style.backgroundPosition = 'cover'
    el.style.borderRadius = '50%'
    el.style['pointer-events'] = 'auto';
    el.style.cursor = 'pointer';
    el.style.width = `${feature.properties.iconSize[0] + 5 * (zoomLabel - 1)}px`
    el.style.height = `${feature.properties.iconSize[1] + 5 * (zoomLabel - 1)}px`

    el.addEventListener('click', () => {
      window.alert(feature.properties.message)
    })
    return new Marker({ element: el })
      .setLngLat(feature.geometry.coordinates)
  })
  return markers
}

const setMarkers = (map, markers) => {
  markers.forEach(marker => marker.addTo(map))
}

const handleLoadMap = () => {
  const map: Map = new maplibregl.Map({
    container: mapContainer.value,
    style: '/src/assets/mapstyle.json',
    center: [-96, 37.8],
    zoom: 1,
  });
  const originZoomLabel = map.getZoom()
  markers.value = geojson.features
  let currentMarkers = createMarkers(markers.value, originZoomLabel)
  setMarkers(map, currentMarkers)

  map.on('zoom', (e) => {
    const zoomLabel = map.getZoom()
    currentMarkers.forEach(marker => marker.remove())
    currentMarkers = createMarkers(markers.value, zoomLabel)
    setMarkers(map, currentMarkers)
  })
}


onMounted(() => {
  handleLoadMap()
})
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>


<style scoped>
@import url('https://unpkg.com/maplibre-gl@4.5.0/dist/maplibre-gl.css');

.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}


.marker {
  display: block;
  cursor: pointer;
}
</style>