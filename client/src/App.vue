<template>
  <div class="main container-fluid">
    <div class="row">
      <div class="col-8 mapDiv">
        <div id="mapContainer" class="map"></div>
      </div>
      <div class="col-3">
        <div class="row">
          <button @click="addPoint">Add</button>
          <button @click="getAllPoint">All</button>
          <div class="cardsDiv col">
            <template v-for="record of arrPoints" :key="record._id">
              <card-point :record="record"> </card-point>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "@/api/api.service";
import CardPoint from "./components/CardPoint.vue";

export default {
  name: "App",
  components: { CardPoint },
  data() {
    return {
      map: null,
      popup: null,
      center: [50.449283, 30.529558],
      curentSelect: null,
      selectMarker: null,
      arrPoints: [],
    };
  },
  methods: {
    async loadPoints() {
      // this.createPoint(50.27, 30.31);
      this.arrPoints = (await api.getRecords()).data;
      this.arrPoints.forEach((item) => {
        this.createPoint(item.lat, item.lon);
      });
    },

    setupLeafletMap: function () {
      this.map = L.map("mapContainer").setView(this.center, 26);
      this.popup = L.popup();

      //   const at =
      //     "pk.eyJ1IjoibG9yZHdvbGY4MSIsImEiOiJja3g1MWt1YTMxYmNlMm51cXM1ODZ0ZjBrIn0.qQ-uHne3y0LQBtbg2gsXEQ";
      //   L.tileLayer(
      //     "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      //     {
      //       attribution:
      //         'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      //       maxZoom: 28,
      //       tileSize: 512,
      //       zoomOffset: -1,
      //       id: "mapbox/streets-v11",
      //       accessToken:
      //         "pk.eyJ1IjoibG9yZHdvbGY4MSIsImEiOiJja3g1MWt1YTMxYmNlMm51cXM1ODZ0ZjBrIn0.qQ-uHne3y0LQBtbg2gsXEQ",
      //     }
      //   ).addTo(map);

      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 1,
      }).addTo(this.map);
    },
    createPoint(lat, lng) {
      let myIcon = L.icon({
        iconUrl: require("@/assets/images/pngwing.com.png"),
        iconSize: [24, 24],
        //  iconAnchor: [22, 94],
        //   popupAnchor: [-3, -76],
        // shadowUrl: require("@/assets/images/marker-shadow.png"),
        shadowSize: [24, 24],
        // shadowAnchor: [22, 94],
      });

      let m = L.marker([lat, lng], { icon: myIcon }).addTo(this.map);
      // let m = L.circleMarker([lat, lng], {
      //   radius: 10,
      //   color: "red",
      //   weight: 3,
      //   key: "test",
      // })
      //   .unbindPopup()
      //   .addTo(this.map);

      m.on("click", this.selectPoint);

      //.bindPopup("<b>Hello world!</b><br>I am a popup.")

      //.openPopup();
    },

    resizeMap() {
      console.log("ok");
      // console.log(this.map.getBounds());
    },
    onMapClick(e) {
      this.curentSelect = e.latlng;
      this.selectMarker.setLatLng(e.latlng);
      // this.popup
      //   .setLatLng(e.latlng)
      //   .setContent("You clicked the map at " + e.latlng.toString())
      //   .openOn(this.map);
    },
    addPoint() {
      //console.log(this.curentSelect);
      this.createPoint(this.curentSelect.lat, this.curentSelect.lng);

      console.log(this.map);
    },
    selectPoint(e) {
      //console.log(this.curentSelect);

      console.log(e.target.options);
    },
  },
  mounted() {
    this.setupLeafletMap();
    this.loadPoints();

    let myIcon = L.icon({
      iconUrl: require("@/assets/images/marker-icon.png"),
      iconSize: [24, 24],
      iconAnchor: [22, 24],
      popupAnchor: [-3, -76],
      shadowUrl: require("@/assets/images/marker-shadow.png"),
      shadowSize: [24, 24],
      shadowAnchor: [24, 24],
    });

    this.selectMarker = L.marker([this.center[0], this.center[1]], {
      icon: myIcon,
    }).addTo(this.map);
    // this.map.on("zoom", this.resizeMap);
    this.map.on("click", this.onMapClick);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10px;
  height: 95vh;
  min-height: 95vh;
}
.main {
  width: auto;
  height: 95%;
  min-height: 100%;
  margin: 10px;
  border: 1px solid red;
}

.mapDiv {
  width: 100%;
  height: 100%;
  min-height: 100%;
  /* min-height: 600px; */
  background-color: cadetblue;
  border: 1px solid green;
}

.map {
  height: 90vh;
  min-height: 100%;
}
.cardsDiv {
  height: 80vh;
  min-height: 100%;
  padding: 4px;
  overflow: auto;
}
</style>
