<template>
  <gmap-map
      :center="center"
      :zoom="15"
      :options="mapStyle"
      style="width: 80%; height: 450px; overflow-y: hidden;"
  >
    <gmap-info-window
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
        @closeclick="infoOpened=false"
    >
      <a :href="link" style="text-decoration: none;" class="black--text" target="_blank">
        {{infoContent}}
      </a>
    </gmap-info-window>
    <gmap-marker
        :key="index"
        v-for="(item, index) in markers"
        :position="item.position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfo(item)"
    />
  </gmap-map>
</template>

<script>
export default {
  name: "GoogleMap",
  data: () => ({
    center: {lat: 35.945385233360376, lng: 126.68289369449809},
    markers: [
      {
        full_name: '군산대학교 디지털 정보관 3층 151-317',
        position: {lat: 35.946158, lng: 126.682144},
      },
    ],
    link: 'https://www.google.com/maps/place/%EB%94%94%EC%A7%80%ED%84%B8%EC%A0%95%EB%B3%B4%EA%B4%80/@35.9452023,126.6806436,17z/data=!3m1!4b1!4m5!3m4!1s0x3570595f7094d2bf:0x8d10f90336670204!8m2!3d35.9452023!4d126.6828376?hl=ko',
    mapStyle: {
      /*
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ],
      */
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      disableDefaultUI: false,
    },
    infoPosition: null,
    infoContent: null,
    infoOpened: false,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    },
  }),

  methods: {
    toggleInfo: function(marker) {
      this.infoPosition = marker.position
      this.infoContent = marker.full_name
      this.infoOpened = true
    }
  }
}
</script>

<style scoped>

</style>